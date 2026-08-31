-- ALIG MINDS production upgrade
-- Run this AFTER supabase/schema.sql in the Supabase SQL Editor.

-- Private paid/free study PDFs. Access is delivered through short-lived signed URLs.
insert into storage.buckets (id, name, public)
values ('study-materials', 'study-materials', false)
on conflict (id) do update set public = excluded.public;

-- Tutor verification uploads use the existing public-URL form flow.
-- Replace this with a private signed-URL flow later if sensitive identity documents are collected.
insert into storage.buckets (id, name, public)
values ('tutor-certificates', 'tutor-certificates', true)
on conflict (id) do update set public = excluded.public;

-- Public visitors may upload a certificate while applying as a tutor.
drop policy if exists "tutor_certificates_public_upload" on storage.objects;
create policy "tutor_certificates_public_upload" on storage.objects
for insert to anon, authenticated
with check (bucket_id = 'tutor-certificates');

-- Admins can manage tutor certificate files.
drop policy if exists "tutor_certificates_admin_manage" on storage.objects;
create policy "tutor_certificates_admin_manage" on storage.objects
for all to authenticated
using (bucket_id = 'tutor-certificates' and public.is_admin())
with check (bucket_id = 'tutor-certificates' and public.is_admin());

-- Only admins can upload, replace or delete storefront PDFs.
drop policy if exists "study_material_storage_admin_manage" on storage.objects;
create policy "study_material_storage_admin_manage" on storage.objects
for all to authenticated
using (bucket_id = 'study-materials' and public.is_admin())
with check (bucket_id = 'study-materials' and public.is_admin());

-- Prevent duplicate paid-material grants for the same user/item.
create unique index if not exists purchases_unique_paid_material
on public.purchases (user_id, item_type, item_id)
where status = 'paid' and item_type = 'material';
