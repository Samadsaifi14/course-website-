# ALIG MINDS — Click-by-Click Setup Guide

Follow these in order, top to bottom. Each step tells you exactly what to click.
No terminal skills needed for the Supabase parts — everything is in the browser.

---

## PART A — Supabase (database + auth + storage)

### Step A1 — Create your free Supabase project
1. Open https://supabase.com in your browser.
2. Click **Start your project** (or **Sign up** if you don't have an account — email login is fine, free tier).
3. Once in the dashboard, click **New project** / **Create a project**.
4. Fill in:
   - **Name:** `alig-minds`
   - **Database Password:** create one and WRITE IT DOWN (you'll rarely need it).
   - **Region:** pick something near India (e.g. `Southeast Asia (Singapore)` or `Mumbai` if listed).
5. Click **Create new project**. Wait ~1–2 minutes for it to spin up.

### Step A2 — Run the database schema
1. On the left sidebar click **SQL Editor**.
2. Click **New query**.
3. Open the file **`supabase/schema.sql`** (in this project folder) and copy ALL its text.
4. Paste it into the SQL Editor box.
5. Click **Run** (bottom right).
6. You should see a green banner: **"Success. No rows returned"** — that's correct and expected.
   > If you see red errors, tell me exactly what they say.

### Step A3 — (Optional but recommended) Add sample data
Makes the site look alive immediately so you can test courses/tests/material right away.
1. In **SQL Editor** click **New query** again.
2. Copy all of **`supabase/seed.sql`**, paste, click **Run**.
3. This adds a few sample courses, two mock tests with questions, and study material.

### Step A4 — Create the storage bucket (for tutor ID/certificate uploads)
1. Left sidebar → **Storage**.
2. Click **New bucket**.
3. Name it exactly → **`tutor-certificates`**
4. Toggle **Public bucket:** ON.
5. Click **Create bucket**.

### Step A5 — Grab your API keys
1. Left sidebar (gear icon) → **Project Settings** → **API**.
2. Copy your **Project URL** (looks like `https://abcdefgh.supabase.co`).
3. Copy your **anon public key** (the long `eyJ...` string).
4. Keep these two — you'll paste them into the project in Part B.

---

## PART B — Connect this website to your Supabase

### Step B1 — Put your keys into the project
1. In the project folder, open the file **`.env.local`** with any text editor (Notepad is fine).
2. Replace these two lines:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://YOUR-PROJECT-ref.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-public-key
   ```
   with your real values from **Step A5**.
3. Save the file.

### Step B2 — Make yourself the admin
The admin panel only opens for your account. Do this AFTER you run the site once.
1. Run the site (Part C) and sign up at `http://localhost:3000/login`.
2. In Supabase dashboard → left sidebar → **Table Editor** → table **`users`**.
3. Find your row (your email), change the **`role`** value from `student` to `admin`.
4. Now `http://localhost:3000/admin` works only for you.

---

## PART C — Run the website

### Step C1 — Install (only the first time)
Open a terminal in the project folder and run:
```bash
npm install
```

### Step C2 — Start the dev server
```bash
npm run dev
```
Then open **http://localhost:3000** in your browser.

### Step C3 — Test that forms save to the database
1. Go to **http://localhost:3000/need-a-tutor** and submit the form.
2. In Supabase → **Table Editor** → table **`tutor_enquiries`**.
3. Your entry should be there. ✅ (Visit **`/admin/enquiries`** in the app to see it styled.)
4. Same test for **`/become-a-tutor`** → check `tutor_registrations`.

---

## PART D — Customize your brand (optional)

| What | Where |
|---|---|
| WhatsApp number, email, city, tagline, name | `lib/site.ts` |
| Colors / theme | `tailwind.config.ts` (the `brand` palette) |
| Nav links | `components/Navbar.tsx` |

**Important:** your WhatsApp number in `lib/site.ts` must be in international format with country code but NO `+`, e.g. `9198XXXXXXXX`.

---

## PART E — Go live (Vercel, FREE)

1. Create a repo on https://github.com and upload this project folder.
2. Go to https://vercel.com → **Add New** → **Project** → import the repo.
3. Add the same environment variables (Project Settings → Environment Variables):
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_APP_URL` = your live URL e.g. `https://aligminds.vercel.app`
4. Deployment settings: framework **Next.js** (auto-detected). Click **Deploy**.
5. Back in Supabase → **Authentication** → **URL Configuration**:
   - Add your live URL to **Site URL** and to the **Redirect URLs** allow list.
6. That's it — live. 🎉

---

## Trouble? Quick fixes

| Problem | Fix |
|---|---|
| Forms show a red error on submit | Your `.env.local` keys are wrong/missing, or `schema.sql` wasn't run. Re-check Steps A2, B1. |
| `<empty>` or stale Supabase anywhere | Retry in a couple seconds; dev server warms up. |
| `/admin` doesn't open even when logged in | Your `users.role` is still `student` → re-check Step B2. |
| Certificate upload fails | Bucket must be named exactly `tutor-certificates` → re-check Step A4. |
| Logo/brand/WhatsApp looks wrong | Edit `lib/site.ts` (Part D). |

If anything errors, paste me the exact message and I'll fix it.
