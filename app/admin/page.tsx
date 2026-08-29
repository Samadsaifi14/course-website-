import { adminData } from "@/lib/admin-data";

function StatCard({ label, value, accent = "text-brand-600" }: { label: string; value: number; accent?: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6">
      <p className="text-sm font-medium text-slate-500">{label}</p>
      <p className={`mt-2 text-3xl font-extrabold ${accent}`}>{value}</p>
    </div>
  );
}

export default async function AdminOverviewPage() {
  const data = await adminData();
  const paidRevenue = data.payments
    .filter((p) => p.status === "paid")
    .reduce((sum, p) => sum + (p.amount ?? 0), 0);

  const pendingTutors = data.tutors.filter((t) => t.status === "pending").length;

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-slate-900">Overview</h1>
      <p className="text-sm text-slate-500">Aapka business ek nazar mein.</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="New Tutor Enquiries" value={data.enquiries.length} />
        <StatCard label="Tutor Registrations" value={data.tutors.length} accent="text-slate-900" />
        <StatCard label="Students" value={data.students.length} accent="text-slate-900" />
        <StatCard label="Paid Revenue (₹)" value={paidRevenue} accent="text-green-600" />
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <StatCard label="Pending Tutor Reviews" value={pendingTutors} accent="text-amber-600" />
        <StatCard label="Courses" value={data.courses.length} accent="text-slate-900" />
        <StatCard label="Mock Tests" value={data.tests.length} accent="text-slate-900" />
      </div>

      <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-bold text-slate-900">Quick actions</h2>
        <p className="mt-1 text-sm text-slate-500">
          For full table editing (add/remove rows), use the Supabase dashboard table editor. Ye panel mobile-friendly read/review ke liye hai.
        </p>
      </div>
    </div>
  );
}
