import type { Metadata } from "next";
import { ButtonLink, Container, PageHeader } from "@/components/ui";
import { siteConfig, whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with the ALIG MINDS team.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Hamse baat karein"
        subtitle="Sawaal hai, feedback hai, ya shuru karna chahte hain? Hum yahan hain."
      />
      <Container className="py-12 sm:py-16">
        <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-3">
          <a
            href={whatsappLink("Namaste! Mujhe madad chahiye.")}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-2xl border border-slate-200 p-6 text-center transition hover:shadow-md"
          >
            <div className="text-2xl">💬</div>
            <h3 className="mt-3 font-bold text-slate-900">WhatsApp</h3>
            <p className="mt-1 text-sm text-slate-600">Sabse fast response ke liye</p>
          </a>
          <a href={`mailto:${siteConfig.contact.email}`} className="rounded-2xl border border-slate-200 p-6 text-center transition hover:shadow-md">
            <div className="text-2xl">✉️</div>
            <h3 className="mt-3 font-bold text-slate-900">Email</h3>
            <p className="mt-1 text-sm text-slate-600">{siteConfig.contact.email}</p>
          </a>
          <a href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`} className="rounded-2xl border border-slate-200 p-6 text-center transition hover:shadow-md">
            <div className="text-2xl">📞</div>
            <h3 className="mt-3 font-bold text-slate-900">Call</h3>
            <p className="mt-1 text-sm text-slate-600">{siteConfig.contact.phone}</p>
          </a>
        </div>

        <div className="mt-12 text-center">
          <ButtonLink href="/need-a-tutor">Request a Tutor</ButtonLink>
        </div>
      </Container>
    </>
  );
}
