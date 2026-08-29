import type { Metadata } from "next";
import { Container, PageHeader } from "@/components/ui";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about ALIG MINDS Learning Network.",
};

const values = [
  { title: "Qualified tutors", desc: "Har tutor ki verification hoti hai taaki students ko best milta rahe." },
  { title: "Affordable", desc: "Har family ke liye affordable tuition aur learning options." },
  { title: "One platform", desc: "Tuition, courses, tests aur material — sab ek jagah." },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About us"
        title="ALIG MINDS Learning Network"
        subtitle="Ek all-in-one tuition aur edtech platform jo students, parents aur tutors ko jodta hai."
      />
      <Container className="py-12 sm:py-16">
        <div className="mx-auto max-w-3xl space-y-6 text-slate-700">
          <p>
            {siteConfig.name} ka mission simple hai — <strong>ghar baithe quality education</strong>. Hum parents ko
            qualified home ya online tutors se jodte hain, students ko courses, mock tests aur PYQs dete hain, aur
            tutors ko ek simple registration channel dete hain.
          </p>
          <p>
            Chahe aap class 1 se ho ya competitive exams ki taiyari kar rahe ho, humara network aapke liye hai.
            Hai &quot;Learning Network&quot; — sirf ek website nahi, balki ek pura ecosystem.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {values.map((v) => (
            <div key={v.title} className="rounded-2xl border border-slate-200 p-6">
              <h3 className="text-lg font-bold text-slate-900">{v.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{v.desc}</p>
            </div>
          ))}
        </div>
      </Container>
    </>
  );
}
