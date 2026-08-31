import type { Metadata } from "next";
import { Container, PageHeader } from "@/components/ui";
import { siteConfig, whatsappLink } from "@/lib/site";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <>
      <PageHeader eyebrow="Contact" title="Tell us what you need help with." subtitle="Tutor matching, preparation questions and study-material support are handled directly by the ALIG MINDS team." />
      <section className="bg-white py-16 sm:py-20">
        <Container className="grid gap-10 lg:grid-cols-3">
          <a href={whatsappLink("Hello ALIG MINDS, I have a query and would like to speak with your team.")} target="_blank" rel="noopener noreferrer" className="border border-stone-300 p-7 transition hover:border-[#17352d]">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#8b6b42]">Fastest Response</p><h2 className="mt-4 text-2xl font-semibold text-[#17352d]">WhatsApp</h2><p className="mt-3 text-sm leading-6 text-stone-600">Ask about tutors, entrance preparation, board preparation or PDF access.</p><p className="mt-7 text-sm font-semibold text-[#17352d]">Start a chat →</p>
          </a>
          <div className="border border-stone-300 p-7"><p className="text-xs font-bold uppercase tracking-[0.18em] text-[#8b6b42]">Email</p><h2 className="mt-4 text-2xl font-semibold text-[#17352d]">{siteConfig.contact.email}</h2><p className="mt-3 text-sm leading-6 text-stone-600">Best for detailed questions, payment references or document-related support.</p></div>
          <div className="border border-stone-300 p-7"><p className="text-xs font-bold uppercase tracking-[0.18em] text-[#8b6b42]">Phone</p><h2 className="mt-4 text-2xl font-semibold text-[#17352d]">{siteConfig.contact.phone}</h2><p className="mt-3 text-sm leading-6 text-stone-600">Location: {siteConfig.contact.address}</p></div>
        </Container>
      </section>
    </>
  );
}
