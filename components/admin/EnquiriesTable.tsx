"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { whatsappLink } from "@/lib/site";
import type { TutorEnquiry } from "@/lib/types";

type Status = TutorEnquiry["status"];
const statusFlow: { value: Status; label: string; className: string }[] = [
  { value: "new", label: "New", className: "bg-blue-50 text-blue-700 border-blue-200" },
  { value: "contacted", label: "Contacted", className: "bg-amber-50 text-amber-700 border-amber-200" },
  { value: "handled", label: "Handled", className: "bg-green-50 text-green-700 border-green-200" },
  { value: "closed", label: "Closed", className: "bg-slate-100 text-slate-600 border-slate-200" },
];

export function EnquiriesTable() {
  const supabase = createClient();
  const [rows, setRows] = useState<TutorEnquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<Status | "all">("all");

  useEffect(() => {
    let mounted = true;
    async function load() {
      let query = supabase.from("tutor_enquiries").select("*").order("created_at", { ascending: false });
      if (filter !== "all") query = query.eq("status", filter);
      const { data, error } = await query;
      if (mounted && !error) setRows((data as TutorEnquiry[]) ?? []);
      if (mounted) setLoading(false);
    }
    load();
    return () => {
      mounted = false;
    };
  }, [filter, supabase]);

  async function setStatus(id: string, status: Status) {
    const { error } = await supabase.from("tutor_enquiries").update({ status }).eq("id", id);
    if (!error) {
      setRows((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
    }
  }

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setFilter("all")}
          className={`rounded-full border px-3 py-1.5 text-sm ${filter === "all" ? "border-brand-600 bg-brand-600 text-white" : "border-slate-300 text-slate-600"}`}
        >
          All
        </button>
        {statusFlow.map((s) => (
          <button
            key={s.value}
            onClick={() => setFilter(s.value)}
            className={`rounded-full border px-3 py-1.5 text-sm ${filter === s.value ? "border-brand-600 bg-brand-600 text-white" : "border-slate-300 text-slate-600"}`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="mt-6 text-slate-500">Loading...</p>
      ) : rows.length === 0 ? (
        <p className="mt-6 text-slate-500">Koi enquiry nahi hai.</p>
      ) : (
        <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-200 bg-white">
          <table className="min-w-full divide-y divide-slate-200 text-sm">
            <thead className="bg-slate-50">
              <tr>
                {["Name", "Mobile", "Class", "Subject", "Location", "Time", "Status", "Actions"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left font-semibold text-slate-600">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {rows.map((r) => (
                <tr key={r.id}>
                  <td className="px-4 py-3 font-medium text-slate-900">{r.name}</td>
                  <td className="px-4 py-3 text-slate-600">{r.mobile}</td>
                  <td className="px-4 py-3 text-slate-600">{r.class || "-"}</td>
                  <td className="px-4 py-3 text-slate-600">{r.subject || "-"}</td>
                  <td className="px-4 py-3 text-slate-600">{r.location || "-"}</td>
                  <td className="px-4 py-3 text-slate-600">{r.preferred_time || "-"}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full border px-2 py-1 text-xs font-medium ${statusFlow.find((s) => s.value === r.status)?.className}`}>
                      {r.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      {statusFlow.map((s) => (
                        <button
                          key={s.value}
                          onClick={() => setStatus(r.id, s.value)}
                          disabled={r.status === s.value}
                          className="rounded-full border border-slate-200 px-2 py-0.5 text-xs text-slate-600 hover:bg-slate-100 disabled:opacity-40"
                        >
                          {s.label}
                        </button>
                      ))}
                      <a
                        href={whatsappLink(`Namaste ${r.name}! ALIG MINDS ki taraf se — aapki tutor enquiry mil gayi hai.`)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700 hover:bg-green-200"
                      >
                        WhatsApp
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
