import type { Metadata } from "next";
import { TutorsTable } from "@/components/admin/TutorsTable";

export const metadata: Metadata = {
  title: "Admin — Tutor Registrations",
};

export default function AdminTutorsPage() {
  return (
    <div>
      <h1 className="text-2xl font-extrabold text-slate-900">Tutor Registrations</h1>
      <p className="mt-1 text-sm text-slate-500">
        Verification gate — tapk karne se pehle status approve/reject karein.
      </p>
      <div className="mt-6">
        <TutorsTable />
      </div>
    </div>
  );
}
