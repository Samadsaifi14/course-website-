import type { Metadata } from "next";
import { Container } from "@/components/ui";
import { whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Entrance & Board Preparation",
  description: "Speak with ALIG MINDS about AMU, JMI, school entrance, undergraduate entrance and board examination preparation.",
};

const areas = ["AMU Entrance", "JMI Entrance", "Class 6 Entrance", "Class 9 Entrance", "Class 11 Entrance", "B.A. Entrance", "B.A. Foreign Languages", "B.A. LL.B.", "CUET", "NCET", "Board Examination Preparation"];

export default function PreparationPage() {
  const link = whatsappLink("Hello ALIG MINDS, I am interested in entrance or board examination preparation. Please share the suitable preparation options and details.");
  return (
    <>
      <section className="bg-[#17352d] py-16 text-white sm:py-24">
        <Container className="grid gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#d6bd92]">Entrance & Board Preparation</p>
            <h1 className="mt-5 max-w-3xl font-serif text-5xl font-semibold leading-[1.02] tracking-[-0.045em] sm:text-7xl">Preparation guidance with a real person at the other end.</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-stone-200">Tell us the examination, class or programme you are preparing for. Our team will explain the relevant preparation option directly on WhatsApp.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a href={link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-full bg-[#f2dfbd] px-7 py-3.5 text-sm font-bold text-[#17352d] hover:bg-white">Chat on WhatsApp</a>
              <span className="text-sm font-medium text-stone-300">Online preparation from ₹800/month</span>
            </div>
          </div>
          <div className="border-t border-white/25 pt-5">
            <p className="text-sm leading-7 text-stone-300">This website does not sell lectures, video courses or class subscriptions. Preparation enquiries are handled personally so students can ask questions before deciding.</p>
          </div>
        </Container>
      </section>
      <section className="bg-[#f7f3ea] py-16 sm:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.65fr_1.35fr]">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#8b6b42]">Preparation Areas</p>
              <h2 className="mt-4 font-serif text-4xl font-semibold tracking-[-0.035em] text-[#17352d]">Tell us your target. We will guide the conversation from there.</h2>
            </div>
            <div className="grid border-t border-stone-300 sm:grid-cols-2">
              {areas.map((area) => <div key={area} className="border-b border-stone-300 py-5 text-base font-semibold text-[#17352d] sm:odd:pr-6 sm:even:border-l sm:even:pl-6">{area}</div>)}
            </div>
          </div>
          <div className="mt-14 flex flex-col justify-between gap-6 border-y border-stone-300 py-8 sm:flex-row sm:items-center">
            <div><h2 className="text-2xl font-semibold text-[#17352d]">Want to know more?</h2><p className="mt-1 text-sm text-stone-600">Ask about syllabus, schedule, fees or the right preparation plan.</p></div>
            <a href={link} target="_blank" rel="noopener noreferrer" className="inline-flex justify-center rounded-full bg-[#17352d] px-7 py-3.5 text-sm font-semibold text-white hover:bg-[#24493f]">Start your WhatsApp enquiry</a>
          </div>
        </Container>
      </section>
    </>
  );
}
