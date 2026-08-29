import type { Metadata } from "next";
import { adminData } from "@/lib/admin-data";
import { SimpleTable, EmptyState } from "@/components/admin/SimpleTable";

export const metadata: Metadata = {
  title: "Admin — Students",
};

export default async function AdminStudentsPage() {
  const data = await adminData();

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-slate-900">Students</h1>
      <p className="mt-1 text-sm text-slate-500">Registered student accounts.</p>
      <div className="mt-6">
        {data.students.length > 0 ? (
          <SimpleTable
            headers={["Name", "Email", "Mobile", "Joined"]}
            rows={data.students.map((s) => [
              s.name || "-",
              s.email ? String(s.email) : "-",
              s.mobile || "-",
              new Date(s.created_at).toLocaleDateString(),
            ])}
          />
        ) : (
          <EmptyState>Abhi tak koi student sign up nahi kiya.</EmptyState>
        )}
      </div>
    </div>
  );
}
