import type { Metadata } from "next";
import Link from "next/link";
import { Container, PageHeader } from "@/components/ui";

export const metadata: Metadata = {
  title: "About",
  description: "Learn how ALIG MINDS connects students with tutors, preparation guidance and focused study material.",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader eyebrow="About ALIG MINDS" title="A learning network built around useful connections, not unnecessary complexity." subtitle="We help families find tutors, help students ask the right preparation questions and make focused study material easier to access." />
      <section className="bg-white py-16 sm:py-20">
        <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#8b6b42]">Why We Exist</p><h2 className="mt-4 font-serif text-4xl font-semibold tracking-[-0.035em] text-[#17352d]">Academic support should begin with the student&apos;s actual need.</h2></div>
          <div className="space-y-6 text-base leading-8 text-stone-600">
            <p>ALIG MINDS Learning Network is designed for students and families who want a straightforward way to find the right academic support. Instead of turning every need into another online course, we focus on human tutor matching, direct preparation enquiries and practical digital study resources.</p>
            <p>For home and online tuition, families submit the student&apos;s requirement and our team reviews it before helping with a suitable tutor connection. For AMU, JMI, entrance and board preparation, interested students can speak directly with the team on WhatsApp. For self-study, students can purchase or access notes, books, practice material and previous-year-question PDFs.</p>
          </div>
        </Container>
      </section>
      <section className="bg-[#f7f3ea] py-16 sm:py-20"><Container><div className="grid gap-px bg-stone-300 md:grid-cols-3">{[
        ["Tutor Connect", "Requirements are reviewed around class, subject, location and timing."],
        ["Preparation Guidance", "Entrance and board enquiries are handled directly through WhatsApp."],
        ["Study Material", "Focused PDFs can be browsed, purchased and accessed through a student library."],
      ].map(([title, text]) => <div key={title} className="bg-[#f7f3ea] p-8"><h3 className="text-xl font-semibold text-[#17352d]">{title}</h3><p className="mt-3 text-sm leading-6 text-stone-600">{text}</p></div>)}</div><div className="mt-10 text-center"><Link href="/need-a-tutor" className="inline-flex rounded-full bg-[#17352d] px-6 py-3 text-sm font-semibold text-white">Find the Right Tutor</Link></div></Container></section>
    </>
  );
}
