create table if not exists public.kv_store_0d49d71e (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now()
);

alter table public.kv_store_0d49d71e enable row level security;

drop policy if exists "Service role can manage kv store" on public.kv_store_0d49d71e;

create policy "Service role can manage kv store"
on public.kv_store_0d49d71e
for all
using (auth.role() = 'service_role')
with check (auth.role() = 'service_role');
