import type { Metadata } from "next";
import { adminData } from "@/lib/admin-data";
import { SimpleTable, EmptyState } from "@/components/admin/SimpleTable";

export const metadata: Metadata = {
  title: "Admin — Mock Tests",
};

export default async function AdminTestsPage() {
  const data = await adminData();

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-slate-900">Mock Tests</h1>
      <p className="mt-1 text-sm text-slate-500">
        Tests aur questions create karne ke liye Supabase Table Editor use karein (mock_tests + mock_test_questions).
      </p>
      <div className="mt-6">
        {data.tests.length > 0 ? (
          <SimpleTable
            headers={["Title", "Subject", "Class", "Duration", "Published"]}
            rows={data.tests.map((t) => [
              t.title,
              t.subject || "-",
              t.class || "-",
              `${t.duration_minutes} min`,
              t.is_published ? "Yes" : "No",
            ])}
          />
        ) : (
          <EmptyState>Abhi tak koi mock test nahi banaya gaya.</EmptyState>
        )}
      </div>
    </div>
  );
}
