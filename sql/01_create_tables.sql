create schema if not exists public;

-- profiles stores auth uid and role
create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  phone text,
  role text not null check (role in ('student', 'company', 'admin')),
  created_at timestamp default now()
);

-- student specific details
create table if not exists students (
  id uuid primary key default uuid_generate_v4(),
  profile_id uuid references profiles(id) on delete cascade,
  register_number text,
  department text,
  course text,
  year int,
  cgpa numeric(3,2),
  backlog_count int,
  resume_url text,
  created_at timestamp default now()
);

-- company specific details
create table if not exists companies (
  id uuid primary key default uuid_generate_v4(),
  profile_id uuid references profiles(id) on delete cascade,
  company_name text,
  hr_name text,
  mobile text,
  website text,
  description text,
  approval_status text default 'pending',
  created_at timestamp default now()
);

-- jobs posted by companies
create table if not exists jobs (
  id uuid primary key default uuid_generate_v4(),
  company_id uuid references companies(id) on delete cascade,
  title text,
  description text,
  package text,
  min_cgpa numeric(3,2),
  max_backlogs int,
  job_type text,
  location text,
  application_deadline date,
  drive_date date,
  status text default 'draft' check (status in ('draft','published','closed')),
  created_at timestamp default now()
);

-- applications from students to jobs
create table if not exists applications (
  id uuid primary key default uuid_generate_v4(),
  student_id uuid references students(id) on delete cascade,
  job_id uuid references jobs(id) on delete cascade,
  status text default 'applied' check (status in ('applied','shortlisted','aptitude_test','technical_interview','hr_interview','selected','rejected','withdrawn')),
  applied_at timestamp default now(),
  updated_at timestamp default now()
);

-- ensure a student can't apply twice to same job
create unique index if not exists uniq_student_job on applications (student_id, job_id);

-- notifications
create table if not exists notifications (
  id uuid primary key default uuid_generate_v4(),
  profile_id uuid references profiles(id) on delete cascade,
  title text,
  message text,
  type text default 'info',
  is_read boolean default false,
  created_at timestamp default now()
);

-- admin audit logs
create table if not exists audit_logs (
  id uuid primary key default uuid_generate_v4(),
  admin_profile_id uuid references profiles(id) on delete cascade,
  action text,
  details jsonb,
  created_at timestamp default now()
);