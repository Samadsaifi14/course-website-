import type { Metadata } from "next";
import Link from "next/link";
import { Container, PageHeader } from "@/components/ui";
import { getPublishedMaterial } from "@/lib/queries";
import { whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Notes, Books & PYQs",
  description: "Browse ALIG MINDS entrance notes, previous year questions, practice material and study PDFs.",
};

function categoryFor(title: string) {
  const value = title.toLowerCase();
  if (value.includes("pyq") || value.includes("previous year")) return "Previous Year Questions";
  if (value.includes("book")) return "Books & Study PDFs";
  if (value.includes("practice")) return "Practice Material";
  return "Entrance & Study Notes";
}

export default async function StudyMaterialPage() {
  const material = await getPublishedMaterial();
  return (
    <>
      <PageHeader eyebrow="ALIG MINDS Study Material" title="Notes, books and PYQs built for focused preparation." subtitle="Choose a PDF, review its details and purchase securely. Paid material becomes available in your student library after payment." />
      <section className="bg-white py-14 sm:py-20">
        <Container>
          {material.length > 0 ? (
            <div className="grid gap-px bg-stone-300 sm:grid-cols-2 lg:grid-cols-3">
              {material.map((item) => (
                <Link key={item.id} href={`/study-material/${item.id}`} className="group bg-white p-7 transition hover:bg-[#f7f3ea]">
                  <div className="flex items-start justify-between gap-5">
                    <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#8b6b42]">{categoryFor(item.title)}</span>
                    <span className="shrink-0 text-sm font-bold text-[#17352d]">{item.is_free ? "Free" : `₹${item.price}`}</span>
                  </div>
                  <h2 className="mt-12 text-2xl font-semibold tracking-[-0.025em] text-[#17352d] group-hover:underline">{item.title}</h2>
                  <p className="mt-3 min-h-6 text-sm text-stone-600">{[item.subject, item.class, item.year].filter(Boolean).join(" · ") || "Digital study PDF"}</p>
                  <p className="mt-8 text-sm font-semibold text-[#17352d]">View details {item.is_free ? "and access" : "and buy"} →</p>
                </Link>
              ))}
            </div>
          ) : (
            <div className="mx-auto max-w-2xl border-y border-stone-300 py-12 text-center">
              <h2 className="font-serif text-3xl font-semibold text-[#17352d]">New study material is being prepared.</h2>
              <p className="mt-3 text-stone-600">Ask us on WhatsApp if you are looking for a specific AMU, JMI, entrance or board preparation PDF.</p>
              <a href={whatsappLink("Hello ALIG MINDS, I am looking for specific notes, books, PYQs or practice material. Please help me find the right PDF.")} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex rounded-full bg-[#17352d] px-6 py-3 text-sm font-semibold text-white">Ask about study material</a>
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
