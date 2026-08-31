import Link from "next/link";
import { adminData } from "@/lib/admin-data";

export default async function AdminPage() {
  const data = await adminData();
  const paid = data.payments.filter((item) => item.status === "paid");
  const revenue = paid.reduce((sum, item) => sum + Number(item.amount || 0), 0);
  const stats = [
    ["Tutor Enquiries", data.enquiries.length, "/admin/enquiries"],
    ["Tutor Registrations", data.tutors.length, "/admin/tutors"],
    ["Customers", data.students.length, "/admin/students"],
    ["Payments", paid.length, "/admin/payments"],
    ["Published PDFs", data.material.filter((item) => item.is_published).length, "/admin/material"],
    ["Recorded Revenue", `₹${revenue.toLocaleString("en-IN")}`, "/admin/payments"],
  ];

  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#8b6b42]">ALIG MINDS Operations</p>
      <h1 className="mt-2 text-3xl font-extrabold text-stone-900">Admin Overview</h1>
      <p className="mt-2 text-sm text-stone-500">Tutor leads, tutor verification, PDF publishing and customer payments in one place.</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {stats.map(([label, value, href]) => (
          <Link key={String(label)} href={String(href)} className="rounded-2xl border border-stone-200 bg-white p-6 transition hover:border-[#397662]">
            <p className="text-xs font-semibold uppercase tracking-wide text-stone-500">{label}</p>
            <p className="mt-3 text-3xl font-bold text-[#17352d]">{value}</p>
            <p className="mt-4 text-sm font-semibold text-[#17352d]">Open →</p>
          </Link>
        ))}
      </div>
      <div className="mt-8 rounded-2xl border border-stone-200 bg-white p-6">
        <h2 className="text-lg font-bold text-stone-900">Priority Actions</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          <Link href="/admin/enquiries" className="rounded-xl bg-[#edf4f0] p-4 text-sm font-semibold text-[#17352d]">Review new tutor requirements</Link>
          <Link href="/admin/tutors" className="rounded-xl bg-[#edf4f0] p-4 text-sm font-semibold text-[#17352d]">Verify tutor registrations</Link>
          <Link href="/admin/material" className="rounded-xl bg-[#edf4f0] p-4 text-sm font-semibold text-[#17352d]">Publish study PDFs</Link>
        </div>
      </div>
    </div>
  );
}
