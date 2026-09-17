-- Skills catalog
create table if not exists skills (
  id uuid primary key default uuid_generate_v4(),
  name text unique not null
);

-- Junction tables
create table if not exists student_skills (
  id uuid primary key default uuid_generate_v4(),
  student_id uuid references students(id) on delete cascade,
  skill_id uuid references skills(id) on delete cascade,
  unique (student_id, skill_id)
);

create table if not exists certifications (
  id uuid primary key default uuid_generate_v4(),
  student_id uuid references students(id) on delete cascade,
  name text,
  issuer text,
  issued_at date
);

create table if not exists projects (
  id uuid primary key default uuid_generate_v4(),
  student_id uuid references students(id) on delete cascade,
  title text,
  description text,
  link text
);