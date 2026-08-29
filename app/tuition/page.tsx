import type { Metadata } from "next";
import { ButtonLink, Container, SectionTitle } from "@/components/ui";

export const metadata: Metadata = {
  title: "Home & Online Tuition",
  description: "Qualified home and online tuition for every class and subject.",
};

const modes = [
  {
    title: "Home Tuition",
    desc: "Aapke ghar par, aapke schedule ke hisaab se. Teacher ghar aakar padhaye — aapke child ke liye most comfortable.",
    points: ["Verified local tutors", "Flexible timings", "One-on-one attention", "All classes & subjects"],
  },
  {
    title: "Online Tuition",
    desc: "Kahi bhi, kabhi bhi. Live online classes with screen sharing, recorded notes, aur homework support.",
    points: ["Learn from anywhere", "Recorded sessions", "Interactive live classes", "Affordable plans"],
  },
];

export default function TuitionPage() {
  return (
    <>
      <Container className="py-12 sm:py-16">
        <SectionTitle
          eyebrow="Tuition"
          title="Home ya Online — dono available"
          subtitle="Chunein kaunsa mode aapke liye behtar hai, aur hamari team aapko sahi tutor se jod degi."
        />
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {modes.map((m) => (
            <div key={m.title} className="rounded-2xl border border-slate-200 p-8">
              <h3 className="text-2xl font-bold text-slate-900">{m.title}</h3>
              <p className="mt-3 text-slate-600">{m.desc}</p>
              <ul className="mt-5 grid list-inside gap-2 text-sm text-slate-700 sm:list-disc">
                {m.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
              <ButtonLink href="/need-a-tutor" className="mt-6">Request {m.title === "Home Tuition" ? "Home" : "Online"} Tutor</ButtonLink>
            </div>
          ))}
        </div>
      </Container>
    </>
  );
}
