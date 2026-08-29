-- ============================================================
-- ALIG MINDS Learning Network — Supabase Schema (Run in SQL Editor)
-- Run ONCE on your Supabase project. Idempotent-ish: uses
-- CREATE TABLE IF NOT EXISTS and CREATE POLICY guard helper.
-- ============================================================

-- ------------------------------------------------------------------
-- 0. Enable extensions
-- ------------------------------------------------------------------
create extension if not exists "uuid-ossp";

-- ------------------------------------------------------------------
-- 1. USERS (extends Supabase auth.users)
-- role: 'student' | 'admin'
-- ------------------------------------------------------------------
create table if not exists public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  name text,
  email text,
  mobile text,
  role text not null default 'student' check (role in ('student','admin')),
  created_at timestamptz not null default now()
);

-- Auto-create a public.users row when someone signs up via Supabase Auth
create or replace function public.handle_new_user()
returns trigger
language plpgsql security definer set search_path = public
as $$
begin
  insert into public.users (id, email)
  values (new.id, new.email)
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ------------------------------------------------------------------
-- 2. TUTOR ENQUIRIES (Need a Tutor form)
-- ------------------------------------------------------------------
create table if not exists public.tutor_enquiries (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  mobile text not null,
  class text,
  subject text,
  location text,
  preferred_time text,
  status text not null default 'new' check (status in ('new','contacted','handled','closed')),
  created_at timestamptz not null default now()
);

-- ------------------------------------------------------------------
-- 3. TUTOR REGISTRATIONS (Become a Tutor form)
-- status gate: pending -> approved / rejected (manual admin review)
-- ------------------------------------------------------------------
create table if not exists public.tutor_registrations (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  mobile text not null,
  qualification text not null,
  subjects text[] not null default '{}',
  classes text[] not null default '{}',
  experience numeric,
  location text,
  id_certificate_url text,
  status text not null default 'pending' check (status in ('pending','approved','rejected')),
  notes text,
  created_at timestamptz not null default now()
);

-- ------------------------------------------------------------------
-- 4. COURSES + CONTENT
-- ------------------------------------------------------------------
create table if not exists public.courses (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  description text,
  class text,
  subject text,
  price numeric not null default 0,
  is_free boolean not null default false,
  thumbnail_url text,
  video_url text,
  is_published boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.course_content (
  id uuid primary key default uuid_generate_v4(),
  course_id uuid not null references public.courses(id) on delete cascade,
  type text not null default 'pdf' check (type in ('video','pdf','module')),
  title text,
  url text,
  sort_order int not null default 0
);

-- ------------------------------------------------------------------
-- 5. STUDY MATERIAL / PYQs
-- ------------------------------------------------------------------
create table if not exists public.study_material (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  class text,
  subject text,
  year text,
  file_url text,
  is_free boolean not null default true,
  price numeric not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default now()
);

-- ------------------------------------------------------------------
-- 6. MOCK TESTS
-- ------------------------------------------------------------------
create table if not exists public.mock_tests (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  class text,
  subject text,
  duration_minutes int not null default 30,
  is_published boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.mock_test_questions (
  id uuid primary key default uuid_generate_v4(),
  test_id uuid not null references public.mock_tests(id) on delete cascade,
  question text not null,
  option_a text,
  option_b text,
  option_c text,
  option_d text,
  correct_option text check (correct_option in ('A','B','C','D')),
  marks numeric not null default 1,
  negative_marks numeric not null default 0
);

-- ------------------------------------------------------------------
-- 7. PURCHASES (courses or study material)
-- ------------------------------------------------------------------
create table if not exists public.purchases (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references public.users(id) on delete cascade,
  item_type text not null check (item_type in ('course','material')),
  item_id uuid not null,
  amount numeric not null default 0,
  razorpay_payment_id text,
  razorpay_order_id text,
  status text not null default 'pending' check (status in ('pending','paid','failed','refunded')),
  created_at timestamptz not null default now()
);

-- ------------------------------------------------------------------
-- 8. MOCK TEST ATTEMPTS (normalized per feedback #5)
-- answers_json kept for quick access; attempt_answers for reporting
-- ------------------------------------------------------------------
create table if not exists public.mock_test_attempts (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references public.users(id) on delete cascade,
  test_id uuid not null references public.mock_tests(id) on delete cascade,
  score numeric not null default 0,
  total_marks numeric not null default 0,
  correct_count int not null default 0,
  wrong_count int not null default 0,
  unanswered_count int not null default 0,
  time_taken_seconds int not null default 0,
  -- JSONB blob for quick display (MVP)
  answers_json jsonb,
  started_at timestamptz not null default now(),
  submitted_at timestamptz
);

create table if not exists public.mock_test_attempt_answers (
  id uuid primary key default uuid_generate_v4(),
  attempt_id uuid not null references public.mock_test_attempts(id) on delete cascade,
  question_id uuid not null references public.mock_test_questions(id) on delete cascade,
  selected_option text,
  is_correct boolean,
  marks_awarded numeric not null default 0,
  created_at timestamptz not null default now()
);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================
-- Helper: is the current user an admin?
create or replace function public.is_admin()
returns boolean
language sql stable security definer set search_path = public
as $$
  select exists (
    select 1 from public.users
    where id = auth.uid() and role = 'admin'
  );
$$;

alter table public.users enable row level security;
alter table public.tutor_enquiries enable row level security;
alter table public.tutor_registrations enable row level security;
alter table public.courses enable row level security;
alter table public.course_content enable row level security;
alter table public.study_material enable row level security;
alter table public.mock_tests enable row level security;
alter table public.mock_test_questions enable row level security;
alter table public.purchases enable row level security;
alter table public.mock_test_attempts enable row level security;
alter table public.mock_test_attempt_answers enable row level security;

-- ----------------- USERS -----------------
drop policy if exists "users_select_own" on public.users;
create policy "users_select_own" on public.users
  for select using (id = auth.uid() or public.is_admin());

drop policy if exists "users_update_own" on public.users;
create policy "users_update_own" on public.users
  for update using (id = auth.uid());

-- ----------------- TUTOR ENQUIRIES (anyone can submit) -----------------
drop policy if exists "enquiries_insert" on public.tutor_enquiries;
create policy "enquiries_insert" on public.tutor_enquiries
  for insert with check (true);

drop policy if exists "enquiries_admin" on public.tutor_enquiries;
create policy "enquiries_admin" on public.tutor_enquiries
  for all using (public.is_admin()) with check (public.is_admin());

-- ----------------- TUTOR REGISTRATIONS (anyone can submit) -----------------
drop policy if exists "registrations_insert" on public.tutor_registrations;
create policy "registrations_insert" on public.tutor_registrations
  for insert with check (true);

drop policy if exists "registrations_admin" on public.tutor_registrations;
create policy "registrations_admin" on public.tutor_registrations
  for all using (public.is_admin()) with check (public.is_admin());

-- ----------------- COURSES (public read, admin write) -----------------
drop policy if exists "courses_read" on public.courses;
create policy "courses_read" on public.courses
  for select using (is_published = true or public.is_admin());

drop policy if exists "courses_admin" on public.courses;
create policy "courses_admin" on public.courses
  for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists "course_content_read" on public.course_content;
create policy "course_content_read" on public.course_content
  for select using (public.is_admin() or exists (
    select 1 from public.courses c
    where c.id = course_id and c.is_published = true
  ));

drop policy if exists "course_content_admin" on public.course_content;
create policy "course_content_admin" on public.course_content
  for all using (public.is_admin()) with check (public.is_admin());

-- ----------------- STUDY MATERIAL -----------------
drop policy if exists "material_read" on public.study_material;
create policy "material_read" on public.study_material
  for select using (is_published = true or public.is_admin());

drop policy if exists "material_admin" on public.study_material;
create policy "material_admin" on public.study_material
  for all using (public.is_admin()) with check (public.is_admin());

-- ----------------- MOCK TESTS -----------------
drop policy if exists "tests_read" on public.mock_tests;
create policy "tests_read" on public.mock_tests
  for select using (is_published = true or public.is_admin());

drop policy if exists "tests_admin" on public.mock_tests;
create policy "tests_admin" on public.mock_tests
  for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists "questions_read" on public.mock_test_questions;
create policy "questions_read" on public.mock_test_questions
  for select using (
    public.is_admin() or exists (
      select 1 from public.mock_tests t
      where t.id = test_id and t.is_published = true
    )
  );

drop policy if exists "questions_admin" on public.mock_test_questions;
create policy "questions_admin" on public.mock_test_questions
  for all using (public.is_admin()) with check (public.is_admin());

-- ----------------- PURCHASES -----------------
drop policy if exists "purchases_own" on public.purchases;
create policy "purchases_own" on public.purchases
  for select using (user_id = auth.uid() or public.is_admin());

drop policy if exists "purchases_insert" on public.purchases;
create policy "purchases_insert" on public.purchases
  for insert with check (user_id = auth.uid());

drop policy if exists "purchases_admin" on public.purchases;
create policy "purchases_admin" on public.purchases
  for all using (public.is_admin()) with check (public.is_admin());

-- ----------------- ATTEMPTS -----------------
drop policy if exists "attempts_own" on public.mock_test_attempts;
create policy "attempts_own" on public.mock_test_attempts
  for select using (user_id = auth.uid() or public.is_admin());

drop policy if exists "attempts_insert_own" on public.mock_test_attempts;
create policy "attempts_insert_own" on public.mock_test_attempts
  for insert with check (user_id = auth.uid());

drop policy if exists "attempt_answers_own" on public.mock_test_attempt_answers;
create policy "attempt_answers_own" on public.mock_test_attempt_answers
  for select using (
    public.is_admin() or exists (
      select 1 from public.mock_test_attempts a
      where a.id = attempt_id and a.user_id = auth.uid()
    )
  );

drop policy if exists "attempt_answers_insert" on public.mock_test_attempt_answers;
create policy "attempt_answers_insert" on public.mock_test_attempt_answers
  for insert with check (
    exists (
      select 1 from public.mock_test_attempts a
      where a.id = attempt_id and a.user_id = auth.uid()
    )
  );

-- ============================================================
-- REALTIME (optional: live admin dashboard updates)
-- ============================================================
alter publication supabase_realtime add table public.tutor_enquiries;
alter publication supabase_realtime add table public.tutor_registrations;
alter publication supabase_realtime add table public.purchases;
