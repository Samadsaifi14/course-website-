import type { Metadata } from "next";
import { adminData } from "@/lib/admin-data";
import { SimpleTable, EmptyState } from "@/components/admin/SimpleTable";

export const metadata: Metadata = {
  title: "Admin — Study Material",
};

export default async function AdminMaterialPage() {
  const data = await adminData();

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-slate-900">Study Material</h1>
      <p className="mt-1 text-sm text-slate-500">
        PDFs free/paid toggle aur upload Supabase dashboard (Storage + Table Editor) se karein.
      </p>
      <div className="mt-6">
        {data.material.length > 0 ? (
          <SimpleTable
            headers={["Title", "Subject", "Year", "Type", "Published"]}
            rows={data.material.map((m) => [
              m.title,
              m.subject || "-",
              m.year || "-",
              m.is_free ? "FREE" : `₹${m.price}`,
              m.is_published ? "Yes" : "No",
            ])}
          />
        ) : (
          <EmptyState>Abhi tak koi study material upload nahi hua.</EmptyState>
        )}
      </div>
    </div>
  );
}
