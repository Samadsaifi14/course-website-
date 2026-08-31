import type { Metadata } from "next";
import { Container } from "@/components/ui";
import { TutorRegistrationForm } from "@/components/forms/TutorRegistrationForm";
import { whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Become a Tutor",
  description: "Join the ALIG MINDS tutor network with a verified tutor profile and ₹100 registration fee.",
};

export default function BecomeATutorPage() {
  return (
    <section className="bg-[#f7f3ea] py-14 sm:py-20">
      <Container className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <div className="lg:sticky lg:top-28">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#8b6b42]">Join the Tutor Network</p>
          <h1 className="mt-4 max-w-xl font-serif text-5xl font-semibold leading-[1.02] tracking-[-0.045em] text-[#17352d] sm:text-6xl">Teach the right students, on terms that fit your work.</h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-stone-600">Create your tutor profile, pay the one-time ₹100 registration fee and submit your details for review. Approved tutors can be considered for relevant student requirements.</p>
          <div className="mt-9 border-y border-stone-300 py-6">
            <div className="flex items-baseline justify-between gap-5"><span className="text-sm font-medium text-stone-600">Registration fee</span><span className="text-3xl font-semibold text-[#17352d]">₹100</span></div>
            <p className="mt-3 text-xs leading-5 text-stone-500">Payment does not guarantee student allocation. Every tutor profile is reviewed before it can be considered for matching.</p>
          </div>
          <div className="mt-7 space-y-3 text-sm leading-6 text-stone-600">
            <p>Teach home or online depending on the requirement.</p>
            <p>Choose the subjects and class levels you are comfortable teaching.</p>
            <p>Upload an ID or qualification certificate to support verification.</p>
          </div>
          <a href={whatsappLink("Hello ALIG MINDS, I have a question about tutor registration.")} target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex rounded-full border border-[#17352d]/25 px-5 py-3 text-sm font-semibold text-[#17352d] hover:border-[#17352d]">Questions? Chat on WhatsApp</a>
        </div>
        <div className="border border-stone-300 bg-white p-6 sm:p-9">
          <div className="mb-7 border-b border-stone-200 pb-6"><p className="text-xs font-bold uppercase tracking-[0.18em] text-[#8b6b42]">Tutor Registration</p><h2 className="mt-2 text-2xl font-semibold text-[#17352d]">Build your teaching profile</h2></div>
          <TutorRegistrationForm />
        </div>
      </Container>
    </section>
  );
}
