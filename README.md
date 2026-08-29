# ALIG MINDS Learning Network

Ek all-in-one tuition + edtech platform — tutors, courses, mock tests aur study material ek hi jagah.

Built with **Next.js 14 (App Router) + TypeScript + Tailwind CSS + Supabase**.

---

## 🚀 What's built (MVP)

**Public site**
- Home page (hero, offerings, course/test/material previews, CTA)
- **Need a Tutor** form → saves to Supabase `tutor_enquiries`
- **Become a Tutor** form → saves to `tutor_registrations` (with optional certificate upload)
- Static listing pages: Tuition, Courses, Mock Tests, Study Material
- Course detail page, Mock Test player (timer + auto-submit + scoring)
- About, Contact, 404, sitemap.xml, robots.txt
- Floating **WhatsApp click-to-chat** button everywhere

**Student** (`/login`, `/dashboard`)
- Email/password signup + login via Supabase Auth
- Dashboard with courses, test attempts, result history

**Admin** (`/admin` — role-protected, Samad only)
- Overview stats
- Tutor Enquiries (status tracking) + Tutor Registrations (approve/reject gate)
- Students, Courses, Material, Tests, Payments tables

---

## ✅ Step-by-step setup (from zero to running)

### Step 0 — Prerequisites
- [Node.js LTS](https://nodejs.org) installed (v18+). Already installed here.
- A [Supabase](https://supabase.com) account (free tier is fine for MVP).
- Optional: a [Vercel](https://vercel.com) account (free) for hosting later.

### Step 1 — Install dependencies
```bash
npm install
```

### Step 2 — Create your Supabase project
1. Go to https://supabase.com → **Start your project** (free tier).
2. Pick a region close to India.
3. Note your **Database Password** — you'll only see it once.

### Step 3 — Run the database schema
1. In Supabase dashboard, open **SQL Editor** → **New query**.
2. Copy the entire contents of **`supabase/schema.sql`** and paste it in.
3. Click **Run**. (You should see "Success, no rows returned" — that's normal.)
4. This creates all tables + row-level-security policies.

### Step 4 — Create the tutor-certificates storage bucket (for tutor ID uploads)
1. In Supabase dashboard → **Storage** → **New bucket**.
2. Name it exactly: `tutor-certificates`
3. Make it **Public** (only files placed here by tutors; fine for MVP).

### Step 5 — Plug in your API keys
1. In Supabase dashboard → **Project Settings** → **API**.
2. Copy the **Project URL** and the **anon public key**.
3. Open **`.env.local`** (already created for you) and fill in the two values:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://YOUR-PROJECT-ref.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-public-key
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

### Step 6 — Make YOURSELF admin
The admin panel only opens for users with `role = 'admin'` in the `users` table.
1. First, sign up as a normal user at `http://localhost:3000/login`.
2. Go to Supabase dashboard → **Table Editor** → `users`.
3. Find your row and change `role` from `student` → `admin`.
4. Now `/admin` will work for you.

### Step 7 — Run it
```bash
npm run dev
```
Open http://localhost:3000

Test it: submit the **Need a Tutor** form, then check Supabase → Table Editor → `tutor_enquiries` — your entry should be there. ✓

---

## 🔑 Where everything lives

| You want to... | Where you go |
|---|---|
| See form submissions | Supabase → Table Editor → `tutor_enquiries` / `tutor_registrations` |
| Approve/reject tutors | `/admin/tutors` (in the app) |
| Add a course / test / material | Supabase → Table Editor (add rows to the tables) |
| Upload study PDFs | Supabase → **Storage** bucket + set the path in the `study_material` row |
| Change brand name / WhatsApp number / contact | `lib/site.ts` |
| Change colors/theme | `tailwind.config.ts` (the `brand` palette) |

---

## 🌍 Deploy to production (Vercel)

1. Push this folder to a GitHub repo.
2. On [vercel.com](https://vercel.com) → **New Project** → import the repo.
3. Add the same env vars from `.env.local` (Project Settings → Environment Variables).
4. Set `NEXT_PUBLIC_APP_URL` to your production URL (e.g. `https://aligminds.in`).
5. In Supabase → **Authentication** → **URL Configuration** → add your production URL to the Site URL + redirect allow list (and change the email redirect in `lib/actions.ts` if needed — it already reads `NEXT_PUBLIC_APP_URL`).
6. Deploy. ✅

---

## 🔜 Deliberately deferred to v2 (per MVP cut)
- Razorpay payments + auto-enrolment (currently a WhatsApp CTA placeholder)
- Automated email/WhatsApp admin notifications (Resend + Interakt/Zapier)
- Multi-staff admin permissions (single admin now)
- Signed-URL gating for paid PDFs (paid material access control)
- Live online classes, tutor self-login dashboard, referrals

---

## 📁 Project structure
```
app/
  page.tsx            Home
  tuition/ courses/ mock-tests/ study-material/ about/ contact/
  need-a-tutor/ become-a-tutor/      forms
  login/ dashboard/                  auth + student app
  auth/callback/                     OTP/email redirect
  admin/                             protected admin panel
  sitemap.ts robots.ts not-found.tsx
components/
  Navbar Footer WhatsAppButton ui.tsx
  forms/                             enquiry + registration forms
  admin/                             admin tables
  TestPlayer.tsx                     mock test engine (timer/scoring)
lib/
  supabase/client.ts supabase/server.ts
  site.ts                            all branding/contact config
  actions.ts                        auth server actions
  types.ts queries.ts admin.ts admin-data.ts
supabase/schema.sql                  full DB + RLS (run once)
```
