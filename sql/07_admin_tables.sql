create table if not exists admin_profiles (
  id uuid primary key default uuid_generate_v4(),
  profile_id uuid references profiles(id) on delete cascade,
  created_at timestamp default now()
);

alter table admin_profiles enable row level security;
create policy "admin self select" on admin_profiles for select using (
  auth.uid() = (select profile_id from profiles where id = auth.uid() and role = 'admin')
);