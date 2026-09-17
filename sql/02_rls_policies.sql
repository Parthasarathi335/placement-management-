-- Enable RLS for all tables
alter table profiles enable row level security;
alter table students enable row level security;
alter table companies enable row level security;
alter table jobs enable row level security;
alter table applications enable row level security;
alter table notifications enable row level security;
alter table audit_logs enable row level security;

-- Profiles: users can view & update only their own row
create policy "self select" on profiles for select using (auth.uid() = id);
create policy "self update" on profiles for update using (auth.uid() = id);

-- Students: owner can select/update; admin can select all
create policy "student self select" on students for select using (auth.uid() = (select profile_id from profiles where id = auth.uid()));
create policy "student self update" on students for update using (auth.uid() = (select profile_id from profiles where id = auth.uid()));
create policy "admin select students" on students for select using (exists (select 1 from profiles where id = auth.uid() and role = 'admin'));

-- Companies: similar to students
create policy "company self select" on companies for select using (auth.uid() = (select profile_id from profiles where id = auth.uid()));
create policy "company self update" on companies for update using (auth.uid() = (select profile_id from profiles where id = auth.uid()));
create policy "admin select companies" on companies for select using (exists (select 1 from profiles where id = auth.uid() and role = 'admin'));

-- Jobs: companies can manage own jobs, students can read published jobs, admin can read all
create policy "company manage own jobs" on jobs for all using (auth.uid() = (select profile_id from companies where id = company_id));
create policy "student read published jobs" on jobs for select using (status = 'published');
create policy "admin read all jobs" on jobs for select using (exists (select 1 from profiles where id = auth.uid() and role = 'admin'));

-- Applications: students can create/read own, companies can read applications for their jobs, admin can read all
create policy "student own applications" on applications for all using (auth.uid() = (select profile_id from students where id = student_id));
create policy "company read applications for own jobs" on applications for select using (
  auth.uid() = (select profile_id from companies where id = (select company_id from jobs where id = applications.job_id))
);
create policy "admin read all applications" on applications for select using (exists (select 1 from profiles where id = auth.uid() and role = 'admin'));

-- Notifications: owner read/write, admin read all
create policy "owner notification" on notifications for all using (auth.uid() = profile_id);
create policy "admin notifications" on notifications for select using (exists (select 1 from profiles where id = auth.uid() and role = 'admin'));

-- Audit logs: admin only
create policy "admin audit" on audit_logs for all using (exists (select 1 from profiles where id = auth.uid() and role = 'admin'));