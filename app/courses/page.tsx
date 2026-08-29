import type { Metadata } from "next";
import Link from "next/link";
import { Container, PageHeader } from "@/components/ui";
import { getPublishedCourses } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Courses",
  description: "Browse courses across all classes and subjects.",
};

export default async function CoursesPage() {
  const courses = await getPublishedCourses();

  return (
    <>
      <PageHeader
        eyebrow="Courses"
        title="Courses"
        subtitle="Class aur subject ke hisaab se curated courses. Sab ek jagah, systematic padhai ke liye."
      />
      <Container className="py-12 sm:py-16">
        {courses.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map((c) => (
              <Link
                key={c.id}
                href={`/courses/${c.id}`}
                className="group rounded-2xl border border-slate-200 p-6 transition hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
                    {c.subject || "Course"}
                  </span>
                  <span className={`text-sm font-bold ${c.is_free ? "text-green-600" : "text-slate-900"}`}>
                    {c.is_free ? "FREE" : `₹${c.price}`}
                  </span>
                </div>
                <h3 className="mt-4 text-lg font-bold text-slate-900 group-hover:text-brand-600">{c.title}</h3>
                <p className="mt-1 text-sm text-slate-500">{c.class || ""}</p>
                <p className="mt-2 text-sm text-slate-600 line-clamp-2">{c.description}</p>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-center text-slate-500">
            Courses jald aa rahe hain. Tab tak &quot;Need a Tutor&quot; form bharein ya WhatsApp karein.
          </p>
        )}
      </Container>
    </>
  );
}
