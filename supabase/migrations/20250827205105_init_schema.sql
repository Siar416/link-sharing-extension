-- Users table
create table if not exists users (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  created_at timestamptz default now()
);

-- Link usage table
create table if not exists link_usage (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users (id) on delete cascade,
  url text not null,
  created_at timestamptz default now()
);

-- Enable RLS
alter table users enable row level security;
alter table link_usage enable row level security;

-- Policies
drop policy if exists "Users can view their own profile" on users;
create policy "Users can view their own profile"
  on users for select
  using (auth.uid() = id);

drop policy if exists "Users manage own usage" on link_usage;
create policy "Users manage own usage"
  on link_usage for all
  using (auth.uid() = user_id);
