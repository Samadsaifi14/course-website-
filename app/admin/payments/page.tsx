import type { Metadata } from "next";
import { adminData } from "@/lib/admin-data";
import { SimpleTable, EmptyState } from "@/components/admin/SimpleTable";

export const metadata: Metadata = {
  title: "Admin — Payments",
};

export default async function AdminPaymentsPage() {
  const data = await adminData();
  const paid = data.payments.filter((p) => p.status === "paid");
  const revenue = paid.reduce((sum, p) => sum + (p.amount ?? 0), 0);

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-slate-900">Payments</h1>
      <p className="mt-1 text-sm text-slate-500">Razorpay transactions aur revenue reconciliation.</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <p className="text-sm text-slate-500">Total Transactions</p>
          <p className="mt-2 text-3xl font-extrabold text-slate-900">{data.payments.length}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <p className="text-sm text-slate-500">Paid</p>
          <p className="mt-2 text-3xl font-extrabold text-green-600">{paid.length}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <p className="text-sm text-slate-500">Revenue (₹)</p>
          <p className="mt-2 text-3xl font-extrabold text-brand-600">{revenue}</p>
        </div>
      </div>

      <div className="mt-6">
        {data.payments.length > 0 ? (
          <SimpleTable
            headers={["Item", "Type", "Amount", "Razorpay ID", "Status", "Date"]}
            rows={data.payments.map((p) => [
              String(p.item_id).slice(0, 8),
              p.item_type,
              `₹${p.amount}`,
              p.razorpay_payment_id ? p.razorpay_payment_id.slice(0, 12) : "-",
              p.status,
              new Date(p.created_at).toLocaleDateString(),
            ])}
          />
        ) : (
          <EmptyState>Abhi tak koi payment nahi hui.</EmptyState>
        )}
      </div>
    </div>
  );
}
