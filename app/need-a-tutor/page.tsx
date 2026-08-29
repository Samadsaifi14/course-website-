import type { Metadata } from "next";
import { Container, SectionTitle } from "@/components/ui";
import { TutorEnquiryForm } from "@/components/forms/TutorEnquiryForm";
import { whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Need a Tutor",
  description: "Tell us what you need and we'll connect you with a qualified home or online tutor.",
};

export default function NeedATutorPage() {
  return (
    <section className="bg-slate-50 py-14">
      <Container className="grid gap-10 lg:grid-cols-2">
        <div>
          <SectionTitle
            center={false}
            eyebrow="Need a Tutor"
            title="Apne liye sahi tutor paayein"
            subtitle="Form bharein aur hamari team ek qualified tutor se aapko jod degi — home ya online, aapki class aur subject ke hisaab se."
          />
          <div className="mt-8 space-y-4 text-sm text-slate-700">
            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <h3 className="font-semibold text-slate-900">Kaise kaam karta hai?</h3>
              <ul className="mt-2 list-inside list-disc space-y-1">
                <li>Form bhariye — 1 minute lagta hai</li>
                <li>Hamari team aapko contact karegi</li>
                <li>Verified tutors mein se best match milta hai</li>
                <li>Koi advance payment nahi, pehle demo baat karein</li>
              </ul>
            </div>
            <a
              href={whatsappLink("Namaste! Mujhe tutor chahiye.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-green-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-green-700"
            >
              WhatsApp par turant baat karein
            </a>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <TutorEnquiryForm />
        </div>
      </Container>
    </section>
  );
}
