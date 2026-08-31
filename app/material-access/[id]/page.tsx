import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { Container } from "@/components/ui";
import { getMaterialById } from "@/lib/queries";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { whatsappLink } from "@/lib/site";

async function resolvePdfUrl(fileUrl: string) {
  if (/^https?:\/\//i.test(fileUrl)) return fileUrl;
  try {
    const admin = createAdminClient();
    const { data, error } = await admin.storage.from("study-materials").createSignedUrl(fileUrl, 300);
    if (error) return null;
    return data.signedUrl;
  } catch {
    return null;
  }
}

export default async function MaterialAccessPage({ params }: { params: { id: string } }) {
  const material = await getMaterialById(params.id);
  if (!material) notFound();

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!material.is_free) {
    if (!user) redirect(`/login?next=${encodeURIComponent(`/material-access/${material.id}`)}`);
    const { data: purchase } = await supabase.from("purchases").select("id").eq("user_id", user.id).eq("item_type", "material").eq("item_id", material.id).eq("status", "paid").maybeSingle();
    if (!purchase) redirect(`/study-material/${material.id}`);
  }

  const pdfUrl = material.file_url ? await resolvePdfUrl(material.file_url) : null;

  return (
    <section className="bg-[#f7f3ea] py-16 sm:py-24">
      <Container className="max-w-3xl">
        <div className="border border-stone-300 bg-white p-8 text-center sm:p-12">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#8b6b42]">Your PDF Access</p>
          <h1 className="mt-4 font-serif text-4xl font-semibold tracking-[-0.035em] text-[#17352d]">{material.title}</h1>
          {pdfUrl ? (
            <>
              <p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-stone-600">Your access is ready. For protected files, the download link is temporary and can be generated again from your library.</p>
              <a href={pdfUrl} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex rounded-full bg-[#17352d] px-8 py-3.5 text-sm font-semibold text-white hover:bg-[#24493f]">Open / Download PDF</a>
            </>
          ) : (
            <>
              <p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-stone-600">This PDF file is not available for download yet. If you purchased it, your purchase remains recorded. Please contact the ALIG MINDS team and share the material title.</p>
              <a href={whatsappLink(`Hello ALIG MINDS, I need help accessing the PDF: ${material.title}`)} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex rounded-full bg-[#1f6f55] px-8 py-3.5 text-sm font-semibold text-white">Get access help on WhatsApp</a>
            </>
          )}
          <div className="mt-8 border-t border-stone-200 pt-6"><Link href="/dashboard" className="text-sm font-semibold text-[#17352d] hover:underline">Go to My Study Library →</Link></div>
        </div>
      </Container>
    </section>
  );
}
