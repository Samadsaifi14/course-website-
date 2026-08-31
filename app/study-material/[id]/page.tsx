import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui";
import { MaterialPurchaseButton } from "@/components/MaterialPurchaseButton";
import { getMaterialById } from "@/lib/queries";
import { createClient } from "@/lib/supabase/server";
import { whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Study Material Details",
};

export default async function MaterialDetailPage({ params }: { params: { id: string } }) {
  const material = await getMaterialById(params.id);
  if (!material) notFound();

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const price = Number(material.price) || 0;

  return (
    <section className="bg-[#f7f3ea] py-14 sm:py-20">
      <Container className="max-w-5xl">
        <Link href="/study-material" className="text-sm font-semibold text-[#17352d] hover:underline">← Back to study material</Link>
        <div className="mt-6 grid border border-stone-300 bg-white lg:grid-cols-[1.1fr_0.9fr]">
          <div className="p-7 sm:p-10 lg:border-r lg:border-stone-300">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#8b6b42]">Digital PDF</p>
            <h1 className="mt-5 font-serif text-4xl font-semibold leading-tight tracking-[-0.04em] text-[#17352d] sm:text-5xl">{material.title}</h1>
            <p className="mt-6 text-base leading-7 text-stone-600">A focused ALIG MINDS study resource for independent preparation and revision.</p>
            <dl className="mt-10 grid gap-px bg-stone-200 sm:grid-cols-3">
              <div className="bg-white p-4"><dt className="text-xs uppercase tracking-wide text-stone-500">Subject</dt><dd className="mt-1 font-semibold text-[#17352d]">{material.subject || "General"}</dd></div>
              <div className="bg-white p-4"><dt className="text-xs uppercase tracking-wide text-stone-500">Class</dt><dd className="mt-1 font-semibold text-[#17352d]">{material.class || "All levels"}</dd></div>
              <div className="bg-white p-4"><dt className="text-xs uppercase tracking-wide text-stone-500">Year</dt><dd className="mt-1 font-semibold text-[#17352d]">{material.year || "Current"}</dd></div>
            </dl>
          </div>
          <aside className="p-7 sm:p-10">
            <p className="text-sm text-stone-500">Price</p>
            <p className="mt-1 text-4xl font-semibold text-[#17352d]">{material.is_free ? "Free" : `₹${price}`}</p>
            <div className="mt-6 border-y border-stone-200 py-5 text-sm leading-6 text-stone-600">
              {material.is_free ? "Access this PDF directly. No payment is required." : "Secure payment is handled by Razorpay. After payment is verified, the PDF is added to your student library and access is unlocked."}
            </div>
            <div className="mt-7">
              {material.is_free ? (
                <Link href={`/material-access/${material.id}`} className="flex w-full justify-center rounded-full bg-[#17352d] px-7 py-3.5 text-sm font-semibold text-white hover:bg-[#24493f]">Access PDF</Link>
              ) : user ? (
                <MaterialPurchaseButton materialId={material.id} title={material.title} price={price} />
              ) : (
                <Link href={`/login?next=${encodeURIComponent(`/study-material/${material.id}`)}`} className="flex w-full justify-center rounded-full bg-[#17352d] px-7 py-3.5 text-sm font-semibold text-white hover:bg-[#24493f]">Sign in to buy PDF</Link>
              )}
            </div>
            <p className="mt-5 text-xs leading-5 text-stone-500">Need help before buying? <a href={whatsappLink(`Hello ALIG MINDS, I have a question about the PDF: ${material.title}`)} target="_blank" rel="noopener noreferrer" className="font-semibold text-[#17352d] underline">Ask on WhatsApp</a>.</p>
          </aside>
        </div>
      </Container>
    </section>
  );
}
