import type { Metadata } from "next";
import { adminData } from "@/lib/admin-data";
import { EmptyState, SimpleTable } from "@/components/admin/SimpleTable";

export const metadata: Metadata = { title: "Admin — Customers" };

export default async function AdminStudentsPage() {
  const data = await adminData();
  return (
    <div>
      <h1 className="text-2xl font-extrabold text-stone-900">Customers</h1>
      <p className="mt-1 text-sm text-stone-500">Student accounts used for paid PDF purchases and library access.</p>
      <div className="mt-6">
        {data.students.length > 0 ? <SimpleTable headers={["Name", "Email", "Mobile", "Joined"]} rows={data.students.map((student) => [student.name || "—", student.email || "—", student.mobile || "—", new Date(student.created_at).toLocaleDateString("en-IN")])} /> : <EmptyState>No student accounts have been created yet.</EmptyState>}
      </div>
    </div>
  );
}
