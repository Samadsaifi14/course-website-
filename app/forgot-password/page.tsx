import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui";
import { resetPassword } from "@/lib/actions";

export const metadata: Metadata = {
  title: "Forgot Password",
};

const inputBase =
  "w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200";

export default async function ForgotPasswordPage({
  searchParams,
}: {
  searchParams: { error?: string; message?: string };
}) {
  const error = searchParams.error;
  const message = searchParams.message;

  return (
    <section className="bg-slate-50 py-14">
      <Container>
        <div className="mx-auto max-w-md">
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <h1 className="text-2xl font-extrabold text-slate-900">Forgot Password</h1>
            <p className="mt-1 text-sm text-slate-600">
              Apna email daalein — hum aapko password reset link bhejenge
            </p>

            {(error || message) && (
              <div
                className={`mt-4 rounded-lg px-4 py-2 text-sm ${
                  error ? "bg-red-50 text-red-700" : "bg-blue-50 text-blue-700"
                }`}
              >
                {error || message}
              </div>
            )}

            <form action={resetPassword} className="mt-6 space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Email</label>
                <input
                  name="email"
                  type="email"
                  required
                  className={inputBase}
                  placeholder="you@example.com"
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white hover:bg-brand-700"
              >
                Send Reset Link
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-slate-600">
              <Link href="/login" className="font-semibold text-brand-600 hover:underline">
                Back to Login
              </Link>
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
