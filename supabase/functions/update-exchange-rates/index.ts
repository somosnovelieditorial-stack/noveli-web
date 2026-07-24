const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const TARGET_CURRENCIES = ["USD", "EUR", "MXN", "ARS", "PEN", "COP"] as const;

const currencyMetadata: Record<
  (typeof TARGET_CURRENCIES)[number],
  {
    country_name: string;
    country_code: string;
    symbol: string;
  }
> = {
  USD: {
    country_name: "Estados Unidos / Internacional",
    country_code: "US",
    symbol: "US$",
  },
  EUR: {
    country_name: "Europa",
    country_code: "EU",
    symbol: "€",
  },
  MXN: {
    country_name: "México",
    country_code: "MX",
    symbol: "MX$",
  },
  ARS: {
    country_name: "Argentina",
    country_code: "AR",
    symbol: "AR$",
  },
  PEN: {
    country_name: "Perú",
    country_code: "PE",
    symbol: "S/",
  },
  COP: {
    country_name: "Colombia",
    country_code: "CO",
    symbol: "COL$",
  },
};

type FrankfurterResponse = {
  amount?: number;
  base?: string;
  date?: string;
  rates?: Record<string, number>;
};

type ExistingRateRow = {
  target_currency: string;
  created_at: string | null;
};

const jsonResponse = (body: Record<string, unknown>, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      ...corsHeaders,
      "Content-Type": "application/json",
    },
  });

const requireEnv = (key: string) => {
  const value = Deno.env.get(key);
  if (!value) {
    throw new Error(`${key} is not configured`);
  }
  return value;
};

const getExistingCreatedAt = async (
  supabaseUrl: string,
  serviceRoleKey: string,
): Promise<Map<string, string | null>> => {
  const targets = TARGET_CURRENCIES.join(",");
  const url = `${supabaseUrl}/rest/v1/website_exchange_rates?select=target_currency,created_at&target_currency=in.(${targets})`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      apikey: serviceRoleKey,
      Authorization: `Bearer ${serviceRoleKey}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Could not read existing exchange rates: ${errorText}`);
  }

  const rows = (await response.json()) as ExistingRateRow[];
  return new Map(rows.map((row) => [row.target_currency, row.created_at ?? null]));
};

const upsertExchangeRates = async (
  supabaseUrl: string,
  serviceRoleKey: string,
  rows: Record<string, unknown>[],
) => {
  const response = await fetch(
    `${supabaseUrl}/rest/v1/website_exchange_rates?on_conflict=target_currency`,
    {
      method: "POST",
      headers: {
        apikey: serviceRoleKey,
        Authorization: `Bearer ${serviceRoleKey}`,
        "Content-Type": "application/json",
        Prefer: "resolution=merge-duplicates,return=representation",
      },
      body: JSON.stringify(rows),
    },
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Could not upsert exchange rates: ${errorText}`);
  }

  return await response.json();
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return jsonResponse({ ok: false, error: "Method not allowed" }, 405);
  }

  try {
    const supabaseUrl = requireEnv("SUPABASE_URL").replace(/\/$/, "");
    const serviceRoleKey = requireEnv("SUPABASE_SERVICE_ROLE_KEY");

    const frankfurterUrl =
      "https://api.frankfurter.dev/v1/latest?from=EUR&to=CLP,USD,MXN,ARS,PEN,COP";
    const frankfurterResponse = await fetch(frankfurterUrl, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    if (!frankfurterResponse.ok) {
      const errorText = await frankfurterResponse.text();
      throw new Error(`Frankfurter API failed: ${errorText}`);
    }

    const exchangeData = (await frankfurterResponse.json()) as FrankfurterResponse;
    const rates = exchangeData.rates || {};
    const clpPerEur = Number(rates.CLP || 0);

    if (!clpPerEur || clpPerEur <= 0) {
      throw new Error("Frankfurter response does not include a valid CLP rate");
    }

    const now = new Date().toISOString();
    const existingCreatedAt = await getExistingCreatedAt(supabaseUrl, serviceRoleKey);

    const rows = TARGET_CURRENCIES.map((targetCurrency) => {
      const targetRate =
        targetCurrency === "EUR"
          ? 1 / clpPerEur
          : Number(rates[targetCurrency] || 0) / clpPerEur;

      if (!targetRate || targetRate <= 0) {
        throw new Error(`Frankfurter response does not include a valid ${targetCurrency} rate`);
      }

      return {
        base_currency: "CLP",
        target_currency: targetCurrency,
        rate: targetRate,
        ...currencyMetadata[targetCurrency],
        active: true,
        updated_at: now,
        created_at: existingCreatedAt.get(targetCurrency) || now,
      };
    });

    const updatedRates = await upsertExchangeRates(supabaseUrl, serviceRoleKey, rows);

    return jsonResponse({
      ok: true,
      source: "frankfurter",
      source_date: exchangeData.date || null,
      base_currency: "CLP",
      updated_at: now,
      rates: updatedRates,
    });
  } catch (error) {
    console.error("Error updating website exchange rates:", error);
    return jsonResponse(
      {
        ok: false,
        error: error instanceof Error ? error.message : String(error),
      },
      502,
    );
  }
});
