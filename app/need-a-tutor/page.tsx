import type { Metadata } from "next";
import { Container } from "@/components/ui";
import { TutorEnquiryForm } from "@/components/forms/TutorEnquiryForm";
import { whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Find the Right Tutor",
  description: "Share your child's learning needs and let ALIG MINDS help connect you with a suitable home or online tutor.",
};

const steps = [
  ["01", "Tell us what your child needs", "Share the class, subject, location and preferred timing."],
  ["02", "We review the requirement", "Our team looks for a tutor whose profile fits the request."],
  ["03", "We contact you", "We discuss the match and help you decide the next step."],
];

export default function NeedATutorPage() {
  return (
    <section className="bg-[#f7f3ea] py-14 sm:py-20">
      <Container className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <div className="lg:sticky lg:top-28">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#8b6b42]">Home Tutor Connect</p>
          <h1 className="mt-4 max-w-xl font-serif text-5xl font-semibold leading-[1.02] tracking-[-0.045em] text-[#17352d] sm:text-6xl">
            A tutor matched to your child&apos;s real needs.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-stone-600">
            Send us the requirement once. ALIG MINDS will review it and help connect your family with a suitable tutor for home or online learning.
          </p>

          <div className="mt-10 border-t border-stone-300">
            {steps.map(([number, title, description]) => (
              <div key={number} className="grid grid-cols-[48px_1fr] gap-4 border-b border-stone-300 py-5">
                <span className="text-xs font-bold text-[#9a7a4e]">{number}</span>
                <div>
                  <h2 className="font-semibold text-[#17352d]">{title}</h2>
                  <p className="mt-1 text-sm leading-6 text-stone-600">{description}</p>
                </div>
              </div>
            ))}
          </div>

          <a href={whatsappLink("Hello ALIG MINDS, I am looking for a tutor and would like to discuss my requirement.")} target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex rounded-full border border-[#17352d]/25 px-5 py-3 text-sm font-semibold text-[#17352d] hover:border-[#17352d]">
            Prefer WhatsApp? Chat with us
          </a>
        </div>

        <div className="border border-stone-300 bg-white p-6 sm:p-9">
          <div className="mb-7 border-b border-stone-200 pb-6">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#8b6b42]">Tutor Requirement Form</p>
            <h2 className="mt-2 text-2xl font-semibold text-[#17352d]">Tell us about the student</h2>
          </div>
          <TutorEnquiryForm />
        </div>
      </Container>
    </section>
  );
}
