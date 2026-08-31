# ALIG MINDS Learning Network

A focused education-services website built with Next.js 14, TypeScript, Tailwind CSS, Supabase and Razorpay.

## Business model implemented

- **Find the Right Tutor**: parents/students submit a tutor requirement; enquiries are stored in Supabase and managed from `/admin/enquiries`.
- **Become a Tutor**: tutors create a teaching profile, optionally upload a certificate, pay the **₹100 registration fee through Razorpay**, and enter the admin verification queue only after payment is verified.
- **Entrance & Board Preparation**: AMU, JMI, Classes 6/9/11, undergraduate entrances, CUET, NCET and board-preparation enquiries are routed to WhatsApp. There is no lecture/video-course checkout system.
- **Notes / Books / PYQs**: admins upload real PDFs, choose free or paid access, publish them to the storefront, and students can buy paid PDFs through Razorpay.
- **Student Library**: verified paid purchases appear under `/dashboard`; private PDFs are delivered with short-lived Supabase signed URLs.
- **Admin**: tutor enquiries, tutor registrations, study PDFs, customers and payments are managed from `/admin`.

All customer-facing copy is intended to remain in English.

## Local setup

1. Install dependencies:

```bash
npm install
```

2. Create `.env.local` from `.env.local.example` and add:

```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=https://YOUR-PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
RAZORPAY_KEY_ID=rzp_test_or_live_key
RAZORPAY_KEY_SECRET=your-razorpay-secret
```

`SUPABASE_SERVICE_ROLE_KEY` and `RAZORPAY_KEY_SECRET` are server-only secrets. Never expose them with a `NEXT_PUBLIC_` prefix and never commit real values.

3. In Supabase SQL Editor, run:

- `supabase/schema.sql`
- `supabase/production-upgrade.sql`

The second file creates the private `study-materials` bucket, tutor-certificate bucket, storage policies and the paid-material purchase uniqueness rule.

4. Create your first account at `/login`, then in the Supabase `users` table change that account's `role` to `admin`.

5. Run:

```bash
npm run dev
```

## Admin workflow

Open `/admin/material` to upload a PDF and create its listing. Set **Free PDF** when no payment should be required; otherwise enter the price. Keep **Published** enabled to show it publicly.

Paid PDF flow:

1. Student opens `/study-material/[id]`.
2. Student signs in or creates an account.
3. Razorpay order is created server-side from the price stored in Supabase.
4. Razorpay signature, payment status, order status and amount are verified server-side.
5. A paid purchase grant is recorded for the authenticated user.
6. `/material-access/[id]` checks the purchase before generating a short-lived signed PDF URL.

Tutor-registration flow follows the same server-verified pattern for the fixed ₹100 fee.

## Production deployment on Vercel

Add every variable from `.env.local.example` to Vercel Project Settings → Environment Variables. Use the production site URL for `NEXT_PUBLIC_APP_URL`.

In Supabase Authentication URL Configuration, add the production domain as the Site URL and an allowed redirect URL.

In Razorpay, use test keys while validating the full checkout flow, then replace them with live keys for production. Do not hard-code keys in the repository.

## Client configuration still required

Update `lib/site.ts` with the client's real WhatsApp number, phone number, email, address and production domain. The repository currently keeps placeholder contact data intentionally so private client details are not invented.

## Legacy routes

Old `/courses`, `/mock-tests` and `/tuition` URLs are retained only as redirects so old bookmarks do not break. They no longer expose a course or mock-test marketplace.
