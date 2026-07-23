do $$
begin
  if to_regclass('public.website_leads') is not null then
    alter table public.website_leads
      add column if not exists accepted_terms boolean default false,
      add column if not exists accepted_terms_at timestamp with time zone;
  end if;
end $$;
