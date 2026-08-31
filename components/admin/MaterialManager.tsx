"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { createClient } from "@/lib/supabase/client";
import type { StudyMaterial } from "@/lib/types";

const input = "w-full rounded-lg border border-stone-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#397662] focus:ring-2 focus:ring-[#bad4c8]";

export function MaterialManager() {
  const [supabase] = useState(() => createClient());
  const [rows, setRows] = useState<StudyMaterial[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const load = useCallback(async () => {
    const { data, error: loadError } = await supabase.from("study_material").select("*").order("created_at", { ascending: false });
    if (loadError) setError(loadError.message);
    else setRows((data as StudyMaterial[]) ?? []);
    setLoading(false);
  }, [supabase]);

  useEffect(() => { void load(); }, [load]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    setSaving(true); setError(null); setMessage(null);
    const file = formData.get("pdf") as File | null;
    const isFree = formData.get("is_free") === "on";
    const price = isFree ? 0 : Number(formData.get("price") || 0);
    if (!file || file.size === 0 || (file.type && file.type !== "application/pdf")) { setError("Please upload a PDF file."); setSaving(false); return; }
    if (!isFree && (!Number.isFinite(price) || price < 1)) { setError("Set a valid price for paid material."); setSaving(false); return; }

    const safeName = file.name.replace(/[^a-zA-Z0-9._-]+/g, "_");
    const path = `pdfs/${Date.now()}_${safeName}`;
    const { error: uploadError } = await supabase.storage.from("study-materials").upload(path, file, { contentType: "application/pdf" });
    if (uploadError) { setError(`PDF upload failed: ${uploadError.message}`); setSaving(false); return; }

    const { error: insertError } = await supabase.from("study_material").insert({
      title: String(formData.get("title") || "").trim(),
      class: String(formData.get("class") || "").trim() || null,
      subject: String(formData.get("subject") || "").trim() || null,
      year: String(formData.get("year") || "").trim() || null,
      file_url: path,
      is_free: isFree,
      price,
      is_published: formData.get("is_published") === "on",
    });
    if (insertError) {
      await supabase.storage.from("study-materials").remove([path]);
      setError(insertError.message); setSaving(false); return;
    }
    formRef.current?.reset();
    setMessage("Study material published successfully.");
    setSaving(false);
    await load();
  }

  async function togglePublished(item: StudyMaterial) {
    setError(null);
    const { error: updateError } = await supabase.from("study_material").update({ is_published: !item.is_published }).eq("id", item.id);
    if (updateError) setError(updateError.message); else setRows((current) => current.map((row) => row.id === item.id ? { ...row, is_published: !row.is_published } : row));
  }

  async function remove(item: StudyMaterial) {
    if (!window.confirm(`Delete “${item.title}”? This cannot be undone.`)) return;
    setError(null);
    const { error: deleteError } = await supabase.from("study_material").delete().eq("id", item.id);
    if (deleteError) { setError(deleteError.message); return; }
    if (item.file_url && !/^https?:\/\//i.test(item.file_url)) await supabase.storage.from("study-materials").remove([item.file_url]);
    setRows((current) => current.filter((row) => row.id !== item.id));
  }

  return (
    <div className="space-y-8">
      <form ref={formRef} onSubmit={handleSubmit} className="rounded-2xl border border-stone-200 bg-white p-6">
        <div><h2 className="text-lg font-bold text-stone-900">Publish a PDF</h2><p className="mt-1 text-sm text-stone-500">Upload the file and create its storefront listing in one step.</p></div>
        {error && <p className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}
        {message && <p className="mt-4 rounded-lg bg-green-50 px-4 py-3 text-sm text-green-700">{message}</p>}
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <div><label className="mb-1 block text-sm font-medium">Title *</label><input name="title" required className={input} placeholder="AMU Class 9 Entrance Practice Set" /></div>
          <div><label className="mb-1 block text-sm font-medium">PDF File *</label><input name="pdf" required type="file" accept="application/pdf,.pdf" className="block w-full text-sm text-stone-600" /></div>
          <div><label className="mb-1 block text-sm font-medium">Subject</label><input name="subject" className={input} placeholder="Mathematics" /></div>
          <div><label className="mb-1 block text-sm font-medium">Class / Exam</label><input name="class" className={input} placeholder="Class 9 / AMU Entrance" /></div>
          <div><label className="mb-1 block text-sm font-medium">Year</label><input name="year" className={input} placeholder="2026" /></div>
          <div><label className="mb-1 block text-sm font-medium">Price (₹)</label><input name="price" type="number" min="0" step="1" className={input} placeholder="99" /></div>
        </div>
        <div className="mt-5 flex flex-wrap gap-6 text-sm"><label className="flex items-center gap-2"><input name="is_free" type="checkbox" /> Free PDF</label><label className="flex items-center gap-2"><input name="is_published" type="checkbox" defaultChecked /> Published</label></div>
        <button type="submit" disabled={saving} className="mt-6 rounded-full bg-[#17352d] px-6 py-3 text-sm font-semibold text-white disabled:opacity-60">{saving ? "Publishing..." : "Upload & Publish PDF"}</button>
      </form>

      <div>
        <h2 className="text-lg font-bold text-stone-900">Published Library</h2>
        {loading ? <p className="mt-4 text-sm text-stone-500">Loading material...</p> : rows.length === 0 ? <p className="mt-4 text-sm text-stone-500">No study material has been published yet.</p> : (
          <div className="mt-4 overflow-x-auto rounded-2xl border border-stone-200 bg-white"><table className="min-w-full divide-y divide-stone-200 text-sm"><thead className="bg-stone-50"><tr>{["Title", "Subject", "Price", "Status", "Actions"].map((h) => <th key={h} className="px-4 py-3 text-left font-semibold text-stone-600">{h}</th>)}</tr></thead><tbody className="divide-y divide-stone-100">{rows.map((item) => <tr key={item.id}><td className="px-4 py-3 font-medium text-stone-900">{item.title}</td><td className="px-4 py-3 text-stone-600">{item.subject || "—"}</td><td className="px-4 py-3">{item.is_free ? "Free" : `₹${item.price}`}</td><td className="px-4 py-3">{item.is_published ? "Published" : "Hidden"}</td><td className="px-4 py-3"><div className="flex gap-2"><button type="button" onClick={() => togglePublished(item)} className="rounded-full border border-stone-300 px-3 py-1 text-xs">{item.is_published ? "Hide" : "Publish"}</button><button type="button" onClick={() => remove(item)} className="rounded-full border border-red-200 px-3 py-1 text-xs text-red-600">Delete</button></div></td></tr>)}</tbody></table></div>
        )}
      </div>
    </div>
  );
}
