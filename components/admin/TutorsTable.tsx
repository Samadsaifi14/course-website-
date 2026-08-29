"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { whatsappLink } from "@/lib/site";
import type { TutorRegistration } from "@/lib/types";

type Status = TutorRegistration["status"];

export function TutorsTable() {
  const supabase = createClient();
  const [rows, setRows] = useState<TutorRegistration[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<Status | "all">("all");

  useEffect(() => {
    let mounted = true;
    async function load() {
      let query = supabase.from("tutor_registrations").select("*").order("created_at", { ascending: false });
      if (filter !== "all") query = query.eq("status", filter);
      const { data, error } = await query;
      if (mounted && !error) setRows((data as TutorRegistration[]) ?? []);
      if (mounted) setLoading(false);
    }
    load();
    return () => {
      mounted = false;
    };
  }, [filter, supabase]);

  async function setStatus(id: string, status: Status) {
    const { error } = await supabase.from("tutor_registrations").update({ status }).eq("id", id);
    if (!error) setRows((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
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
        {(["pending", "approved", "rejected"] as Status[]).map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`rounded-full border px-3 py-1.5 text-sm capitalize ${filter === s ? "border-brand-600 bg-brand-600 text-white" : "border-slate-300 text-slate-600"}`}
          >
            {s}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="mt-6 text-slate-500">Loading...</p>
      ) : rows.length === 0 ? (
        <p className="mt-6 text-slate-500">Koi registration nahi hai.</p>
      ) : (
        <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-200 bg-white">
          <table className="min-w-full divide-y divide-slate-200 text-sm">
            <thead className="bg-slate-50">
              <tr>
                {["Name", "Mobile", "Qualification", "Subjects", "Experience", "Cert", "Status", "Actions"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left font-semibold text-slate-600">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {rows.map((r) => (
                <tr key={r.id}>
                  <td className="px-4 py-3 font-medium text-slate-900">{r.name}</td>
                  <td className="px-4 py-3 text-slate-600">{r.mobile}</td>
                  <td className="px-4 py-3 text-slate-600">{r.qualification}</td>
                  <td className="px-4 py-3 text-slate-600">{r.subjects.join(", ") || "-"}</td>
                  <td className="px-4 py-3 text-slate-600">{r.experience ?? 0} yrs</td>
                  <td className="px-4 py-3">
                    {r.id_certificate_url ? (
                      <a
                        href={r.id_certificate_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-brand-600 underline"
                      >
                        View
                      </a>
                    ) : (
                      <span className="text-slate-400">none</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full border px-2 py-1 text-xs font-medium capitalize ${
                        r.status === "approved"
                          ? "border-green-200 bg-green-50 text-green-700"
                          : r.status === "rejected"
                          ? "border-red-200 bg-red-50 text-red-700"
                          : "border-amber-200 bg-amber-50 text-amber-700"
                      }`}
                    >
                      {r.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {r.status !== "approved" && (
                        <button
                          onClick={() => setStatus(r.id, "approved")}
                          className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700 hover:bg-green-200"
                        >
                          Approve
                        </button>
                      )}
                      {r.status !== "rejected" && (
                        <button
                          onClick={() => setStatus(r.id, "rejected")}
                          className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-700 hover:bg-red-200"
                        >
                          Reject
                        </button>
                      )}
                      <a
                        href={whatsappLink(`Namaste ${r.name}! ALIG MINDS tutor registration received — verification ho rahi hai.`)}
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
