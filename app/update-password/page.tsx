import type { Metadata } from "next";
import { Container } from "@/components/ui";
import { updatePassword } from "@/lib/actions";

export const metadata: Metadata = { title: "Update Password" };

const inputBase = "w-full rounded-lg border border-stone-300 bg-white px-4 py-3 text-sm text-stone-900 placeholder-stone-400 outline-none focus:border-[#397662] focus:ring-2 focus:ring-[#bad4c8]";

export default async function UpdatePasswordPage({
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
          <h1 className="mt-3 font-serif text-4xl font-semibold tracking-[-0.035em] text-[#17352d]">Update Password</h1>
          <p className="mt-3 text-sm leading-6 text-stone-600">Naya password daalein apne account ke liye.</p>

          {(error || message) && (
            <div className={`mt-5 rounded-lg px-4 py-3 text-sm ${error ? "bg-red-50 text-red-700" : "bg-[#edf4f0] text-[#17352d]"}`}>
              {error || message}
            </div>
          )}

          <form action={updatePassword} className="mt-7 space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-stone-700">New Password</label>
              <input name="password" type="password" required minLength={6} className={inputBase} placeholder="Minimum 6 characters" />
            </div>
            <button type="submit" className="w-full rounded-full bg-[#17352d] px-6 py-3.5 text-sm font-semibold text-white hover:bg-[#24493f]">
              Update Password
            </button>
          </form>
        </div>
      </Container>
    </section>
  );
}
