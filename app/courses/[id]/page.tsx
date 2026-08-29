import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui";
import { createClient } from "@/lib/supabase/server";
import { whatsappLink } from "@/lib/site";
import type { Course } from "@/lib/types";

interface Props {
  params: { id: string };
}

export default async function CourseDetailPage({ params }: Props) {
  const id = params.id;
  const supabase = await createClient();
  const { data: course } = await supabase
    .from("courses")
    .select("*")
    .eq("id", id)
    .eq("is_published", true)
    .maybeSingle();

  if (!course) return notFound();
  const c = course as Course;

  return (
    <section className="bg-slate-50 py-10">
      <Container className="mx-auto max-w-3xl">
        <Link href="/courses" className="text-sm text-brand-600 hover:underline">← All courses</Link>
        <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-8">
          <div className="flex items-center gap-3">
            <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
              {c.subject || "Course"}
            </span>
            {c.class && (
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                {c.class}
              </span>
            )}
          </div>
          <h1 className="mt-4 text-3xl font-extrabold text-slate-900">{c.title}</h1>
          <p className="mt-3 text-slate-600">{c.description}</p>

          <div className="mt-6 rounded-xl bg-slate-50 p-4 text-center">
            <p className="text-sm text-slate-500">Price</p>
            <p className="text-3xl font-extrabold text-slate-900">
              {c.is_free ? "FREE" : `₹${c.price}`}
            </p>
          </div>

          <p className="mt-4 rounded-lg bg-amber-50 px-4 py-3 text-sm text-amber-700">
            Online payment (Razorpay) aur auto-enrolment v2 mein aa raha hai. Abhi ke liye WhatsApp par baat karke
            enrol karein.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a
              href={whatsappLink(`Namaste! Mujhe course "${c.title}" kharidna hai.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-green-600 px-6 py-3 text-center text-sm font-semibold text-white hover:bg-green-700"
            >
              WhatsApp par enrol karein
            </a>
            <Link
              href="/courses"
              className="rounded-full border border-slate-300 px-6 py-3 text-center text-sm font-semibold text-slate-700 hover:border-brand-500"
            >
              Browse more courses
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
