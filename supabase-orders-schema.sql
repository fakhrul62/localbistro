create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  items jsonb not null,
  total numeric(10, 2) not null,
  customer_name text not null,
  customer_email text not null,
  shipping_address jsonb not null,
  stripe_payment_id text not null,
  status text not null default 'paid',
  created_at timestamptz not null default now()
);

alter table public.orders enable row level security;

create policy "Service role can manage orders"
on public.orders
for all
using (auth.role() = 'service_role')
with check (auth.role() = 'service_role');
