import type { Metadata } from "next";
import { Container, PageHeader } from "@/components/ui";
import { getPublishedMaterial } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Study Material & PYQs",
  description: "Free and paid study material, notes, and previous years' question papers (PYQs).",
};

export default async function StudyMaterialPage() {
  const material = await getPublishedMaterial();

  return (
    <>
      <PageHeader
        eyebrow="Study Material"
        title="Study Material & PYQs"
        subtitle="Class aur subject ke hisaab se curated notes aur previous years' question papers."
      />
      <Container className="py-12 sm:py-16">
        {material.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {material.map((m) => (
              <div key={m.id} className="rounded-2xl border border-slate-200 p-6">
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
                    {m.subject || "Material"}
                  </span>
                  <span className={`text-sm font-bold ${m.is_free ? "text-green-600" : "text-slate-900"}`}>
                    {m.is_free ? "FREE" : `₹${m.price}`}
                  </span>
                </div>
                <h3 className="mt-4 text-lg font-bold text-slate-900">{m.title}</h3>
                <p className="mt-1 text-sm text-slate-500">
                  {m.class || ""} {m.year ? `· ${m.year}` : ""}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-slate-500">Study material jald aa raha hai.</p>
        )}
      </Container>
    </>
  );
}
