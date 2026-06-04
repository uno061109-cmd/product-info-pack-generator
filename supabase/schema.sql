create table if not exists public.subscriptions (
  user_id uuid primary key references auth.users(id) on delete cascade,
  email text,
  plan text not null default 'Free',
  sku_limit integer not null default 3,
  status text not null default 'active',
  payment_note text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.subscriptions enable row level security;

drop policy if exists "Users can read own subscription" on public.subscriptions;
create policy "Users can read own subscription"
on public.subscriptions
for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists "Users can update own profile note only" on public.subscriptions;

create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists subscriptions_touch_updated_at on public.subscriptions;
create trigger subscriptions_touch_updated_at
before update on public.subscriptions
for each row
execute procedure public.touch_updated_at();
