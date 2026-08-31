import type { Metadata } from "next";
import { MaterialManager } from "@/components/admin/MaterialManager";

export const metadata: Metadata = { title: "Admin — Study Material" };

export default function AdminMaterialPage() {
  return (
    <div>
      <h1 className="text-2xl font-extrabold text-stone-900">Study Material</h1>
      <p className="mt-1 text-sm text-stone-500">Upload PDFs, set free or paid access, choose the price and control whether a listing is public.</p>
      <div className="mt-6"><MaterialManager /></div>
    </div>
  );
}
