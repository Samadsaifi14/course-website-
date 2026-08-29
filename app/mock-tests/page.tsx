import type { Metadata } from "next";
import { ButtonLink, Container, PageHeader } from "@/components/ui";
import { getPublishedTests } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Mock Tests",
  description: "Practice with timed mock tests that follow the real exam pattern.",
};

export default async function MockTestsPage() {
  const tests = await getPublishedTests();

  return (
    <>
      <PageHeader
        eyebrow="Mock Tests"
        title="Mock Tests"
        subtitle="Real exam pattern par practice karein — timer ke saath, instant scoring ke saath."
      />
      <Container className="py-12 sm:py-16">
        {tests.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {tests.map((t) => (
              <div key={t.id} className="rounded-2xl border border-slate-200 p-6">
                <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
                  {t.subject || "Test"}
                </span>
                <h3 className="mt-4 text-lg font-bold text-slate-900">{t.title}</h3>
                <p className="mt-1 text-sm text-slate-500">
                  {t.class || "All classes"} · {t.duration_minutes} minutes
                </p>
                <ButtonLink href={`/mock-tests/${t.id}`} className="mt-4">Take Test</ButtonLink>
              </div>
            ))}
          </div>
        ) : (
          <div className="mx-auto max-w-xl text-center">
            <p className="text-slate-500">Mock tests jald aa rahe hain. Tab tak practice karein or form bharein.</p>
            <ButtonLink href="/need-a-tutor" className="mt-6">Request a Tutor</ButtonLink>
          </div>
        )}
      </Container>
    </>
  );
}
