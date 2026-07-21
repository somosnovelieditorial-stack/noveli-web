const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const jsonResponse = (body: Record<string, unknown>, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      ...corsHeaders,
      "Content-Type": "application/json",
    },
  });

const escapeHtml = (value: unknown) =>
  String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

const renderField = (label: string, value: unknown) => `
  <tr>
    <td style="padding:8px 12px;border-bottom:1px solid #eee;font-weight:700;color:#222;">${escapeHtml(label)}</td>
    <td style="padding:8px 12px;border-bottom:1px solid #eee;color:#333;white-space:pre-wrap;">${escapeHtml(value || "No informado")}</td>
  </tr>
`;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return jsonResponse({ ok: false, error: "Method not allowed" }, 405);
  }

  try {
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    if (!resendApiKey) {
      return jsonResponse({ ok: false, error: "RESEND_API_KEY is not configured" }, 500);
    }

    const notificationEmail =
      Deno.env.get("NOTIFICATION_EMAIL") || "somosnovelieditorial@gmail.com";

    const {
      name,
      email,
      phone,
      instagram,
      service_interest,
      message,
      manuscript_info,
      created_at,
    } = await req.json();

    const html = `
      <div style="font-family:Arial,sans-serif;max-width:680px;margin:0 auto;color:#222;">
        <h1 style="font-size:22px;margin:0 0 16px;color:#111;">Nueva solicitud editorial desde la web</h1>
        <p style="font-size:14px;line-height:1.5;color:#555;">
          Se recibio una nueva solicitud editorial desde el formulario de Noveli.
        </p>
        <table style="width:100%;border-collapse:collapse;margin-top:18px;border:1px solid #eee;">
          ${renderField("Nombre", name)}
          ${renderField("Email", email)}
          ${renderField("Telefono", phone)}
          ${renderField("Instagram", instagram)}
          ${renderField("Servicio de interes", service_interest)}
          ${renderField("Mensaje", message)}
          ${renderField("Informacion del manuscrito", manuscript_info)}
          ${renderField("Fecha", created_at)}
        </table>
      </div>
    `;

    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Noveli Web <onboarding@resend.dev>",
        to: [notificationEmail],
        subject: "Nueva solicitud editorial desde la web",
        html,
      }),
    });

    if (!resendResponse.ok) {
      const errorText = await resendResponse.text();
      return jsonResponse({ ok: false, error: errorText }, 502);
    }

    return jsonResponse({ ok: true });
  } catch (error) {
    return jsonResponse(
      { ok: false, error: error instanceof Error ? error.message : String(error) },
      500,
    );
  }
});
