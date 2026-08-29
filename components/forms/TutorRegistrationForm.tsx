"use client";

import { createClient } from "@/lib/supabase/client";
import { whatsappLink } from "@/lib/site";
import { useState } from "react";
import type { FormEvent } from "react";

const inputBase =
  "w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200";

const subjectOptions = [
  "Mathematics", "Physics", "Chemistry", "Biology", "Science",
  "English", "Hindi", "Social Studies", "Computer Science", "Other",
];
const classOptions = [
  "Class 1-5", "Class 6-8", "Class 9-10", "Class 11-12", "Competitive Exams",
];

export function TutorRegistrationForm() {
  const supabase = createClient();
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [subjects, setSubjects] = useState<string[]>([]);
  const [classes, setClasses] = useState<string[]>([]);

  function toggle(list: string[], setList: (v: string[]) => void, value: string) {
    setList(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    const form = new FormData(e.currentTarget);

    const payload: Record<string, unknown> = {
      name: String(form.get("name") || ""),
      mobile: String(form.get("mobile") || ""),
      qualification: String(form.get("qualification") || ""),
      subjects,
      classes,
      experience: parseFloat(String(form.get("experience") || "0")) || 0,
      location: String(form.get("location") || ""),
    };

    // Best-effort certificate upload (optional). Requires a "tutor-certificates" bucket.
    const file = form.get("id_certificate") as File | null;
    if (file && file.size > 0) {
      const path = `uploads/${Date.now()}_${file.name.replace(/\s+/g, "_")}`;
      const { error: upErr } = await supabase.storage
        .from("tutor-certificates")
        .upload(path, file);
      if (!upErr) {
        const { data } = supabase.storage.from("tutor-certificates").getPublicUrl(path);
        payload.id_certificate_url = data.publicUrl;
      }
    }

    const { error } = await supabase.from("tutor_registrations").insert([payload]);

    if (error) {
      setError(error.message);
      setSubmitting(false);
      return;
    }
    setSubmitting(false);
    setDone(true);
  }

  if (done) {
    return (
      <div className="rounded-2xl border border-green-200 bg-green-50 p-8 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-2xl text-white">✓</div>
        <h3 className="mt-4 text-xl font-bold text-slate-900">Registration received!</h3>
        <p className="mt-2 text-slate-700">
          Dhanyavaad! Aapka registration review mein hai. Hamari team verification ke baad aapko contact karegi.
        </p>
        <a
          href={whatsappLink("Namaste! Maine Become a Tutor form bhara hai.")}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-2 rounded-full bg-green-600 px-6 py-3 text-sm font-semibold text-white hover:bg-green-700"
        >
          WhatsApp par baat karein
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="rounded-lg bg-red-50 px-4 py-2 text-sm text-red-700">{error}</p>}

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Full Name *</label>
          <input name="name" required className={inputBase} placeholder="Aapka pura naam" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Mobile Number *</label>
          <input
            name="mobile"
            required
            inputMode="numeric"
            pattern="[0-9]{10}"
            maxLength={10}
            className={inputBase}
            placeholder="10-digit mobile number"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Qualification *</label>
          <input name="qualification" required className={inputBase} placeholder="e.g. M.Sc Physics, B.Ed" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Experience (years)</label>
          <input name="experience" type="number" min="0" className={inputBase} placeholder="e.g. 3" />
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">Subjects (select all that apply)</label>
        <div className="flex flex-wrap gap-2">
          {subjectOptions.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => toggle(subjects, setSubjects, s)}
              className={`rounded-full border px-3 py-1.5 text-sm transition ${
                subjects.includes(s)
                  ? "border-brand-600 bg-brand-600 text-white"
                  : "border-slate-300 text-slate-700 hover:border-brand-400"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">Classes (select all that apply)</label>
        <div className="flex flex-wrap gap-2">
          {classOptions.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => toggle(classes, setClasses, c)}
              className={`rounded-full border px-3 py-1.5 text-sm transition ${
                classes.includes(c)
                  ? "border-brand-600 bg-brand-600 text-white"
                  : "border-slate-300 text-slate-700 hover:border-brand-400"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Location / City</label>
          <input name="location" className={inputBase} placeholder="e.g. Patna" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">
            ID / Certificate (optional but recommended)
          </label>
          <input
            name="id_certificate"
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            className="block w-full text-sm text-slate-500 file:mr-3 file:rounded-lg file:border-0 file:bg-brand-50 file:px-3 file:py-2 file:text-sm file:font-semibold file:text-brand-700"
          />
          <p className="mt-1 text-xs text-slate-500">Verification ke liye helpful.</p>
        </div>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700 disabled:opacity-60"
      >
        {submitting ? "Submitting..." : "Register as Tutor"}
      </button>
    </form>
  );
}
