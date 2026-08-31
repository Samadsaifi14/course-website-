"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { whatsappLink } from "@/lib/site";
import type { TutorRegistration } from "@/lib/types";

type Status = TutorRegistration["status"];

export function TutorsTable() {
  const [supabase] = useState(() => createClient());
  const [rows, setRows] = useState<TutorRegistration[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<Status | "all">("all");

  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      let query = supabase.from("tutor_registrations").select("*").order("created_at", { ascending: false });
      if (filter !== "all") query = query.eq("status", filter);
      const { data, error } = await query;
      if (mounted && !error) setRows((data as TutorRegistration[]) ?? []);
      if (mounted) setLoading(false);
    }
    void load();
    return () => { mounted = false; };
  }, [filter, supabase]);

  async function setStatus(id: string, status: Status) {
    const { error } = await supabase.from("tutor_registrations").update({ status }).eq("id", id);
    if (!error) setRows((prev) => prev.map((row) => row.id === id ? { ...row, status } : row));
  }

  return (
    <div>
      <div className="flex flex-wrap gap-2"><button onClick={() => setFilter("all")} className={`rounded-full border px-3 py-1.5 text-sm ${filter === "all" ? "border-brand-600 bg-brand-600 text-white" : "border-stone-300 text-stone-600"}`}>All</button>{(["pending", "approved", "rejected"] as Status[]).map((status) => <button key={status} onClick={() => setFilter(status)} className={`rounded-full border px-3 py-1.5 text-sm capitalize ${filter === status ? "border-brand-600 bg-brand-600 text-white" : "border-stone-300 text-stone-600"}`}>{status}</button>)}</div>
      {loading ? <p className="mt-6 text-stone-500">Loading registrations...</p> : rows.length === 0 ? <p className="mt-6 text-stone-500">No tutor registrations found.</p> : (
        <div className="mt-6 overflow-x-auto rounded-2xl border border-stone-200 bg-white"><table className="min-w-full divide-y divide-stone-200 text-sm"><thead className="bg-stone-50"><tr>{["Name", "Mobile", "Qualification", "Subjects", "Experience", "Certificate", "Status", "Actions"].map((heading) => <th key={heading} className="px-4 py-3 text-left font-semibold text-stone-600">{heading}</th>)}</tr></thead><tbody className="divide-y divide-stone-100">{rows.map((row) => <tr key={row.id}>
          <td className="px-4 py-3 font-medium text-stone-900">{row.name}</td><td className="px-4 py-3 text-stone-600">{row.mobile}</td><td className="px-4 py-3 text-stone-600">{row.qualification}</td><td className="px-4 py-3 text-stone-600">{row.subjects.join(", ") || "—"}</td><td className="px-4 py-3 text-stone-600">{row.experience ?? 0} years</td><td className="px-4 py-3">{row.id_certificate_url ? <a href={row.id_certificate_url} target="_blank" rel="noopener noreferrer" className="text-brand-600 underline">View</a> : <span className="text-stone-400">None</span>}</td>
          <td className="px-4 py-3"><span className={`rounded-full border px-2 py-1 text-xs font-medium capitalize ${row.status === "approved" ? "border-green-200 bg-green-50 text-green-700" : row.status === "rejected" ? "border-red-200 bg-red-50 text-red-700" : "border-amber-200 bg-amber-50 text-amber-700"}`}>{row.status}</span></td>
          <td className="px-4 py-3"><div className="flex flex-wrap gap-1">{row.status !== "approved" && <button onClick={() => setStatus(row.id, "approved")} className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">Approve</button>}{row.status !== "rejected" && <button onClick={() => setStatus(row.id, "rejected")} className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-700">Reject</button>}<a href={whatsappLink(`Hello ${row.name}, this is ALIG MINDS. We received your tutor registration and it is being reviewed.`)} target="_blank" rel="noopener noreferrer" className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">WhatsApp</a></div></td>
        </tr>)}</tbody></table></div>
      )}
    </div>
  );
}
