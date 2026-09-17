create table if not exists departments (
  id uuid primary key default uuid_generate_v4(),
  name text unique not null
);

create table if not exists job_departments (
  id uuid primary key default uuid_generate_v4(),
  job_id uuid references jobs(id) on delete cascade,
  department_id uuid references departments(id) on delete cascade,
  unique (job_id, department_id)
);

create table if not exists job_skills (
  id uuid primary key default uuid_generate_v4(),
  job_id uuid references jobs(id) on delete cascade,
  skill_id uuid references skills(id) on delete cascade,
  unique (job_id, skill_id)
);