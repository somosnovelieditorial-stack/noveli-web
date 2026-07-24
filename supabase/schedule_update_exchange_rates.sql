-- Schedule the update-exchange-rates Edge Function once per day.
-- Replace <SUPABASE_SERVICE_ROLE_KEY> before running this SQL in Supabase.
-- Do not commit real service role keys.

create extension if not exists pg_cron with schema pg_catalog;
create extension if not exists pg_net with schema extensions;

select cron.schedule(
  'update-website-exchange-rates-daily',
  '0 6 * * *',
  $$
  select net.http_post(
    url := 'https://bdxlzhpmifxwmqjnnmxa.supabase.co/functions/v1/update-exchange-rates',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer <SUPABASE_SERVICE_ROLE_KEY>',
      'apikey', '<SUPABASE_SERVICE_ROLE_KEY>'
    ),
    body := '{}'::jsonb
  ) as request_id;
  $$
);
