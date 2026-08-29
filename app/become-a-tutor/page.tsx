import type { Metadata } from "next";
import { Container, SectionTitle } from "@/components/ui";
import { TutorRegistrationForm } from "@/components/forms/TutorRegistrationForm";
import { whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Become a Tutor",
  description: "Join the ALIG MINDS tutor network. Register and start teaching students near you.",
};

export default function BecomeATutorPage() {
  return (
    <section className="bg-slate-50 py-14">
      <Container className="grid gap-10 lg:grid-cols-2">
        <div>
          <SectionTitle
            center={false}
            eyebrow="Become a Tutor"
            title="Apni expertise se aur bhi students ki madad karein"
            subtitle="Ek simple registration — hamari team verification ke baad aapko interested students se jod degi."
          />
          <div className="mt-8 space-y-4 text-sm text-slate-700">
            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <h3 className="font-semibold text-slate-900">Aapko kyun jhula lena chahiye?</h3>
              <ul className="mt-2 list-inside list-disc space-y-1">
                <li>Ghar ya online — dono mode par teach karein</li>
                <li>Aapka schedule, aapka rate</li>
                <li>Verified students se direct connect</li>
                <li>Registration bilkul free</li>
              </ul>
            </div>
            <p className="text-xs text-slate-500">
              Aapki ID/certificate verification mandatory review ke liye helpful hai. Bad-actor se bachne ke liye
              aapki details verify ki jaati hain.
            </p>
            <a
              href={whatsappLink("Namaste! Main tutor ban-na chahta/chahti hoon.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-green-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-green-700"
            >
              WhatsApp par baat karein
            </a>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <TutorRegistrationForm />
        </div>
      </Container>
    </section>
  );
}
