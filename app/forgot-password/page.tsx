import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui";
import { resetPassword } from "@/lib/actions";

export const metadata: Metadata = { title: "Forgot Password" };

const inputBase = "w-full rounded-lg border border-stone-300 bg-white px-4 py-3 text-sm text-stone-900 placeholder-stone-400 outline-none focus:border-[#397662] focus:ring-2 focus:ring-[#bad4c8]";

export default async function ForgotPasswordPage({
  searchParams,
}: {
  searchParams: { error?: string; message?: string };
}) {
  const error = searchParams.error;
  const message = searchParams.message;

  return (
    <section className="bg-[#f7f3ea] py-14 sm:py-20">
      <Container>
        <div className="mx-auto max-w-lg border border-stone-300 bg-white p-7 sm:p-10">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#8b6b42]">Student Library</p>
          <h1 className="mt-3 font-serif text-4xl font-semibold tracking-[-0.035em] text-[#17352d]">Forgot Password?</h1>
          <p className="mt-3 text-sm leading-6 text-stone-600">Apna email daalein — hum aapko password reset link bhejenge.</p>

          {(error || message) && (
            <div className={`mt-5 rounded-lg px-4 py-3 text-sm ${error ? "bg-red-50 text-red-700" : "bg-[#edf4f0] text-[#17352d]"}`}>
              {error || message}
            </div>
          )}

          <form action={resetPassword} className="mt-7 space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-stone-700">Email</label>
              <input name="email" type="email" required className={inputBase} placeholder="you@example.com" />
            </div>
            <button type="submit" className="w-full rounded-full bg-[#17352d] px-6 py-3.5 text-sm font-semibold text-white hover:bg-[#24493f]">
              Send Reset Link
            </button>
          </form>

          <p className="mt-7 border-t border-stone-200 pt-6 text-center text-sm text-stone-600">
            <Link href="/login" className="font-semibold text-[#17352d] underline">Back to Login</Link>
          </p>
        </div>
      </Container>
    </section>
  );
}
