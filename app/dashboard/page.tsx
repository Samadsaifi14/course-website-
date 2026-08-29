import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/ui";
import { createClient } from "@/lib/supabase/server";
import { signOut } from "@/lib/actions";

export const metadata: Metadata = {
  title: "Student Dashboard",
};

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const [{ data: enrollments }, { data: attemptsRaw }] = await Promise.all([
    supabase.from("purchases").select("*").eq("user_id", user.id).eq("status", "paid"),
    supabase
      .from("mock_test_attempts")
      .select("*, mock_tests(title, subject)")
      .eq("user_id", user.id)
      .order("submitted_at", { ascending: false }),
  ]);
  const attempts: Array<{
    id: string;
    score: number;
    total_marks: number;
    mock_tests: { title?: string; subject?: string } | null;
  }> = ((attemptsRaw as Array<{
    id: string;
    score: number;
    total_marks: number;
    mock_tests: { title?: string; subject?: string } | null;
  }> | null) ?? []);

  return (
    <section className="bg-slate-50 py-10">
      <Container>
        <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900">
              Namaste, {(user.user_metadata?.name as string) || "Student"} 👋
            </h1>
            <p className="text-sm text-slate-600">{user.email}</p>
          </div>
          <form action={signOut}>
            <button className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:border-red-400 hover:text-red-600">
              Log out
            </button>
          </form>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">My Courses</h2>
            <p className="mt-3 text-3xl font-bold text-slate-900">{enrollments?.length ?? 0}</p>
            <p className="text-sm text-slate-500">enrolled courses</p>
            <Link href="/courses" className="mt-4 inline-block text-sm font-semibold text-brand-600 hover:underline">
              Browse courses →
            </Link>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Mock Tests Attempted</h2>
            <p className="mt-3 text-3xl font-bold text-slate-900">{attempts?.length ?? 0}</p>
            <p className="text-sm text-slate-500">total attempts</p>
            <Link href="/mock-tests" className="mt-4 inline-block text-sm font-semibold text-brand-600 hover:underline">
              Take a test →
            </Link>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Study Material</h2>
            <p className="mt-3 text-sm text-slate-600">
              PYQs aur notes yahan dikhenge. Abhi mock tests aur courses se shuru karein.
            </p>
            <Link href="/study-material" className="mt-4 inline-block text-sm font-semibold text-brand-600 hover:underline">
              View material →
            </Link>
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="text-lg font-bold text-slate-900">Result History</h2>
          {attempts && attempts.length > 0 ? (
            <ul className="mt-4 divide-y divide-slate-100">
              {attempts.map((a) => (
                <li key={a.id} className="flex items-center justify-between py-3 text-sm">
                  <div>
                    <span className="font-semibold text-slate-800">
                      {a.mock_tests?.title ?? "Test"}
                    </span>
                    <span className="ml-2 text-xs text-slate-400">
                      {a.mock_tests?.subject ?? ""}
                    </span>
                  </div>
                  <span className="font-bold text-brand-600">
                    {a.score} / {a.total_marks}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-sm text-slate-500">Abhi tak koi test attempt nahi kiya.</p>
          )}
        </div>
      </Container>
    </section>
  );
}
