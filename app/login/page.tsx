import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui";
import { signIn, signUp } from "@/lib/actions";

export const metadata: Metadata = { title: "Student Library Login" };
const inputBase = "w-full rounded-lg border border-stone-300 bg-white px-4 py-3 text-sm text-stone-900 placeholder-stone-400 outline-none focus:border-[#397662] focus:ring-2 focus:ring-[#bad4c8]";

export default function LoginPage({ searchParams }: { searchParams: { error?: string; message?: string; next?: string } }) {
  const next = searchParams.next && searchParams.next.startsWith("/") && !searchParams.next.startsWith("//") ? searchParams.next : "/dashboard";
  return (
    <section className="bg-[#f7f3ea] py-14 sm:py-20">
      <Container>
        <div className="mx-auto max-w-lg border border-stone-300 bg-white p-7 sm:p-10">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#8b6b42]">Student Library</p>
          <h1 className="mt-3 font-serif text-4xl font-semibold tracking-[-0.035em] text-[#17352d]">Sign in to access your PDFs.</h1>
          <p className="mt-3 text-sm leading-6 text-stone-600">An account is required for paid PDF purchases so your access remains available after checkout.</p>
          {(searchParams.error || searchParams.message) && <div className={`mt-5 rounded-lg px-4 py-3 text-sm ${searchParams.error ? "bg-red-50 text-red-700" : "bg-[#edf4f0] text-[#17352d]"}`}>{searchParams.error || searchParams.message}</div>}

          <form action={signIn} className="mt-7 space-y-4">
            <input type="hidden" name="next" value={next} />
            <div><label className="mb-1.5 block text-sm font-medium text-stone-700">Email</label><input name="email" type="email" required className={inputBase} placeholder="you@example.com" /></div>
            <div><label className="mb-1.5 block text-sm font-medium text-stone-700">Password</label><input name="password" type="password" required className={inputBase} placeholder="Your password" />
              <div className="mt-1 text-right"><Link href="/forgot-password" className="text-xs text-[#397662] hover:underline">Forgot Password?</Link></div>
            </div>
            <button type="submit" className="w-full rounded-full bg-[#17352d] px-6 py-3.5 text-sm font-semibold text-white hover:bg-[#24493f]">Sign In</button>
          </form>

          <div className="my-7 flex items-center gap-3 text-xs font-semibold uppercase tracking-wide text-stone-400"><div className="h-px flex-1 bg-stone-200" />New student<div className="h-px flex-1 bg-stone-200" /></div>

          <form action={signUp} className="space-y-4">
            <input type="hidden" name="next" value={next} />
            <div><label className="mb-1.5 block text-sm font-medium text-stone-700">Full Name</label><input name="name" required className={inputBase} placeholder="Your full name" /></div>
            <div><label className="mb-1.5 block text-sm font-medium text-stone-700">Email</label><input name="email" type="email" required className={inputBase} placeholder="you@example.com" /></div>
            <div><label className="mb-1.5 block text-sm font-medium text-stone-700">Password</label><input name="password" type="password" required minLength={6} className={inputBase} placeholder="Minimum 6 characters" /></div>
            <button type="submit" className="w-full rounded-full border border-[#17352d] px-6 py-3.5 text-sm font-semibold text-[#17352d] hover:bg-[#edf4f0]">Create Student Account</button>
          </form>
          <p className="mt-7 border-t border-stone-200 pt-6 text-center text-xs text-stone-500">Want to join the teaching network? <Link href="/become-a-tutor" className="font-semibold text-[#17352d] underline">Become a Tutor</Link></p>
        </div>
      </Container>
    </section>
  );
}
