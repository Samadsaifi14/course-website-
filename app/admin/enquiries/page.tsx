import type { Metadata } from "next";
import { EnquiriesTable } from "@/components/admin/EnquiriesTable";

export const metadata: Metadata = {
  title: "Admin — Tutor Enquiries",
};

export default function AdminEnquiriesPage() {
  return (
    <div>
      <h1 className="text-2xl font-extrabold text-slate-900">Tutor Enquiries</h1>
      <p className="mt-1 text-sm text-slate-500">
        &quot;Need a Tutor&quot; form se aaye requests. Status update karke track karein.
      </p>
      <div className="mt-6">
        <EnquiriesTable />
      </div>
    </div>
  );
}
