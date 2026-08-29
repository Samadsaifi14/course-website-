import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui";
import { TestPlayer } from "@/components/TestPlayer";
import { createClient } from "@/lib/supabase/server";
import type { MockTestQuestion } from "@/lib/types";

interface Props {
  params: { id: string };
}

export async function generateMetadata(): Promise<Metadata> {
  return { title: "Mock Test" };
}

export default async function MockTestDetailPage({ params }: Props) {
  const id = params.id;
  const supabase = await createClient();

  const [{ data: test }, { data: questions }, { data: sessionUser }] = await Promise.all([
    supabase.from("mock_tests").select("*").eq("id", id).maybeSingle(),
    supabase.from("mock_test_questions").select("*").eq("test_id", id).order("created_at"),
    supabase.auth.getUser(),
  ]);

  if (!test || !test.is_published) {
    return notFound();
  }

  const qs = (questions as MockTestQuestion[]) ?? [];

  return (
    <section className="bg-slate-50 py-10">
      <Container className="mx-auto max-w-3xl">
        {sessionUser?.user ? (
          <TestPlayer
            testId={test.id}
            title={test.title}
            durationMinutes={test.duration_minutes}
            questions={qs}
            userId={sessionUser.user.id}
          />
        ) : (
          <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center">
            <h1 className="text-2xl font-extrabold text-slate-900">{test.title}</h1>
            <p className="mt-2 text-slate-600">
              Test attempt karne aur result save karne ke liye login karein.
            </p>
            <Link
              href="/login"
              className="mt-4 inline-block rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white hover:bg-brand-700"
            >
              Login / Sign up
            </Link>
            <p className="mt-3 text-xs text-slate-400">
              Ya bina login ke directly attempt karein (result yahan hi dikhega).
            </p>
            <div className="mt-4">
              <TestPlayer
                testId={test.id}
                title={test.title}
                durationMinutes={test.duration_minutes}
                questions={qs}
                userId={null}
              />
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}
