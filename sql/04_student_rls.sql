alter table skills enable row level security;
create policy "allow all read skills" on skills for select using (true);

alter table student_skills enable row level security;
create policy "student own skill links" on student_skills for all using (
  auth.uid() = (select profile_id from students where id = student_id)
);

alter table certifications enable row level security;
create policy "student own certifications" on certifications for all using (
  auth.uid() = (select profile_id from students where id = student_id)
);

alter table projects enable row level security;
create policy "student own projects" on projects for all using (
  auth.uid() = (select profile_id from students where id = student_id)
);