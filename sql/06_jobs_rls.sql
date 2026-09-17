alter table departments enable row level security;
create policy "allow read departments" on departments for select using (true);

alter table job_departments enable row level security;
create policy "company manage own job departments" on job_departments for all using (
  auth.uid() = (select profile_id from companies where id = (select company_id from jobs where id = job_id))
);

alter table job_skills enable row level security;
create policy "company manage own job skills" on job_skills for all using (
  auth.uid() = (select profile_id from companies where id = (select company_id from jobs where id = job_id))
);