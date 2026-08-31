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
  { value: "closed", label: "Closed", className: "bg-stone-100 text-stone-600 border-stone-200" },
];

export function EnquiriesTable() {
  const [supabase] = useState(() => createClient());
  const [rows, setRows] = useState<TutorEnquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<Status | "all">("all");

  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      let query = supabase.from("tutor_enquiries").select("*").order("created_at", { ascending: false });
      if (filter !== "all") query = query.eq("status", filter);
      const { data, error } = await query;
      if (mounted && !error) setRows((data as TutorEnquiry[]) ?? []);
      if (mounted) setLoading(false);
    }
    void load();
    return () => { mounted = false; };
  }, [filter, supabase]);

  async function setStatus(id: string, status: Status) {
    const { error } = await supabase.from("tutor_enquiries").update({ status }).eq("id", id);
    if (!error) setRows((prev) => prev.map((row) => row.id === id ? { ...row, status } : row));
  }

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        <button onClick={() => setFilter("all")} className={`rounded-full border px-3 py-1.5 text-sm ${filter === "all" ? "border-brand-600 bg-brand-600 text-white" : "border-stone-300 text-stone-600"}`}>All</button>
        {statusFlow.map((status) => <button key={status.value} onClick={() => setFilter(status.value)} className={`rounded-full border px-3 py-1.5 text-sm ${filter === status.value ? "border-brand-600 bg-brand-600 text-white" : "border-stone-300 text-stone-600"}`}>{status.label}</button>)}
      </div>
      {loading ? <p className="mt-6 text-stone-500">Loading enquiries...</p> : rows.length === 0 ? <p className="mt-6 text-stone-500">No tutor enquiries found.</p> : (
        <div className="mt-6 overflow-x-auto rounded-2xl border border-stone-200 bg-white">
          <table className="min-w-full divide-y divide-stone-200 text-sm">
            <thead className="bg-stone-50"><tr>{["Name", "Mobile", "Class", "Subject", "Location", "Time", "Status", "Actions"].map((heading) => <th key={heading} className="px-4 py-3 text-left font-semibold text-stone-600">{heading}</th>)}</tr></thead>
            <tbody className="divide-y divide-stone-100">{rows.map((row) => <tr key={row.id}>
              <td className="px-4 py-3 font-medium text-stone-900">{row.name}</td><td className="px-4 py-3 text-stone-600">{row.mobile}</td><td className="px-4 py-3 text-stone-600">{row.class || "—"}</td><td className="px-4 py-3 text-stone-600">{row.subject || "—"}</td><td className="px-4 py-3 text-stone-600">{row.location || "—"}</td><td className="px-4 py-3 text-stone-600">{row.preferred_time || "—"}</td>
              <td className="px-4 py-3"><span className={`rounded-full border px-2 py-1 text-xs font-medium ${statusFlow.find((item) => item.value === row.status)?.className}`}>{row.status}</span></td>
              <td className="px-4 py-3"><div className="flex flex-wrap gap-1">{statusFlow.map((status) => <button key={status.value} onClick={() => setStatus(row.id, status.value)} disabled={row.status === status.value} className="rounded-full border border-stone-200 px-2 py-0.5 text-xs text-stone-600 disabled:opacity-40">{status.label}</button>)}<a href={whatsappLink(`Hello ${row.name}, this is ALIG MINDS. We received your tutor requirement and are following up with you.`)} target="_blank" rel="noopener noreferrer" className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">WhatsApp</a></div></td>
            </tr>)}</tbody>
          </table>
        </div>
      )}
    </div>
  );
}
