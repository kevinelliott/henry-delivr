-- Deliverables table
create table if not exists deliverables (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text default '',
  url text,
  file_url text,
  status text not null default 'pending' check (status in ('pending', 'reviewing', 'changes_requested', 'approved')),
  token uuid not null unique default gen_random_uuid(),
  agency_id uuid,
  client_email text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Comments table
create table if not exists comments (
  id uuid primary key default gen_random_uuid(),
  deliverable_id uuid not null references deliverables(id) on delete cascade,
  author text not null,
  text text not null,
  timestamp timestamptz not null default now()
);

-- RLS
alter table deliverables enable row level security;
alter table comments enable row level security;

-- Allow service role full access (for API routes)
create policy "Service role access" on deliverables for all using (true);
create policy "Service role access" on comments for all using (true);

-- Public read for review portal (by token)
create policy "Public read by token" on deliverables for select using (true);
create policy "Public read comments" on comments for select using (true);
create policy "Public insert comments" on comments for insert with check (true);
