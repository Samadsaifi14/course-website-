import type { Metadata } from "next";
import { adminData } from "@/lib/admin-data";
import { SimpleTable, EmptyState } from "@/components/admin/SimpleTable";

export const metadata: Metadata = {
  title: "Admin — Courses",
};

export default async function AdminCoursesPage() {
  const data = await adminData();

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Courses</h1>
          <p className="mt-1 text-sm text-slate-500">
            Course add/remove/edit ke liye Supabase Table Editor use karein.
          </p>
        </div>
      </div>
      <div className="mt-6">
        {data.courses.length > 0 ? (
          <SimpleTable
            headers={["Title", "Subject", "Class", "Price", "Published"]}
            rows={data.courses.map((c) => [
              c.title,
              c.subject || "-",
              c.class || "-",
              c.is_free ? "FREE" : `₹${c.price}`,
              c.is_published ? "Yes" : "No",
            ])}
          />
        ) : (
          <EmptyState>Abhi tak koi course nahi banaya gaya.</EmptyState>
        )}
      </div>
    </div>
  );
}
