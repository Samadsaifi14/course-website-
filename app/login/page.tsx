import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui";
import { signIn, signUp } from "@/lib/actions";

export const metadata: Metadata = {
  title: "Login",
};

const inputBase =
  "w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200";

export default async function LoginPage({
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
            <h1 className="text-2xl font-extrabold text-slate-900">Student Login</h1>
            <p className="mt-1 text-sm text-slate-600">Apne account mein login karein</p>

            {(error || message) && (
              <div
                className={`mt-4 rounded-lg px-4 py-2 text-sm ${
                  error ? "bg-red-50 text-red-700" : "bg-blue-50 text-blue-700"
                }`}
              >
                {error || message}
              </div>
            )}

            <form action={signIn} className="mt-6 space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Email</label>
                <input name="email" type="email" required className={inputBase} placeholder="you@example.com" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Password</label>
                <input name="password" type="password" required className={inputBase} placeholder="••••••••" />
              </div>
              <button
                type="submit"
                className="w-full rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white hover:bg-brand-700"
              >
                Login
              </button>
            </form>

            <div className="my-6 flex items-center gap-3 text-xs text-slate-400">
              <div className="h-px flex-1 bg-slate-200" />
              OR
              <div className="h-px flex-1 bg-slate-200" />
            </div>

            <form action={signUp} className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Full Name</label>
                <input name="name" className={inputBase} placeholder="Aapka naam" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Email</label>
                <input name="email" type="email" required className={inputBase} placeholder="you@example.com" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Password</label>
                <input
                  name="password"
                  type="password"
                  required
                  minLength={6}
                  className={inputBase}
                  placeholder="Minimum 6 characters"
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-full border border-brand-600 px-6 py-3 text-sm font-semibold text-brand-600 hover:bg-brand-50"
              >
                Create Account
              </button>
            </form>
          </div>

          <p className="mt-4 text-center text-xs text-slate-500">
            Tutor banne ke liye form bharein —{" "}
            <Link href="/become-a-tutor" className="text-brand-600 hover:underline">
              Become a Tutor
            </Link>
          </p>
        </div>
      </Container>
    </section>
  );
}
