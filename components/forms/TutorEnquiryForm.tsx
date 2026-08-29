"use client";

import { createClient } from "@/lib/supabase/client";
import { whatsappLink } from "@/lib/site";
import { useState } from "react";
import type { FormEvent } from "react";

const inputBase =
  "w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200";

export function TutorEnquiryForm() {
  const supabase = createClient();
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const classes = [
    "Class 1", "Class 2", "Class 3", "Class 4", "Class 5",
    "Class 6", "Class 7", "Class 8", "Class 9", "Class 10",
    "Class 11", "Class 12", "Other",
  ];
  const subjects = [
    "Mathematics", "Science", "Physics", "Chemistry", "Biology",
    "English", "Hindi", "Social Studies", "Computer", "Other",
  ];
  const times = ["Morning", "Afternoon", "Evening", "Weekend", "Flexible"];

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    const form = new FormData(e.currentTarget);

    const payload = {
      name: String(form.get("name") || ""),
      mobile: String(form.get("mobile") || ""),
      class: String(form.get("class") || ""),
      subject: String(form.get("subject") || ""),
      location: String(form.get("location") || ""),
      preferred_time: String(form.get("preferred_time") || ""),
    };

    const { error } = await supabase.from("tutor_enquiries").insert([payload]);

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
        <h3 className="mt-4 text-xl font-bold text-slate-900">Request received!</h3>
        <p className="mt-2 text-slate-700">
          Dhanyavaad! Hamari team jald hi aapko contact karegi. Agar aap chahein to abhi directly baat karein —
        </p>
        <a
          href={whatsappLink("Namaste! Maine Need a Tutor form bhara hai.")}
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
          <input name="name" required className={inputBase} placeholder="Parent / Student ka naam" />
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
          <label className="mb-1 block text-sm font-medium text-slate-700">Class / Standard</label>
          <select name="class" className={inputBase}>
            <option value="">Select class</option>
            {classes.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Subject</label>
          <select name="subject" className={inputBase}>
            <option value="">Select subject</option>
            {subjects.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Location / Area</label>
          <input name="location" className={inputBase} placeholder="e.g. Indiranagar, Patna" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Preferred Time</label>
          <select name="preferred_time" className={inputBase}>
            <option value="">Select time</option>
            {times.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700 disabled:opacity-60"
      >
        {submitting ? "Submitting..." : "Request a Tutor"}
      </button>
      <p className="text-center text-xs text-slate-500">
        Submit karke aap hamari team se contact request bhejte hain. Koi payment nahi.
      </p>
    </form>
  );
}
