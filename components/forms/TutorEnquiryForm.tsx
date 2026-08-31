"use client";

import { createClient } from "@/lib/supabase/client";
import { whatsappLink } from "@/lib/site";
import { useState } from "react";
import type { FormEvent } from "react";

const inputBase = "w-full rounded-lg border border-stone-300 bg-white px-4 py-3 text-sm text-stone-900 placeholder-stone-400 outline-none transition focus:border-[#397662] focus:ring-2 focus:ring-[#bad4c8]";

export function TutorEnquiryForm() {
  const [supabase] = useState(() => createClient());
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const classes = ["Class 1", "Class 2", "Class 3", "Class 4", "Class 5", "Class 6", "Class 7", "Class 8", "Class 9", "Class 10", "Class 11", "Class 12", "Other"];
  const subjects = ["Mathematics", "Science", "Physics", "Chemistry", "Biology", "English", "Hindi", "Social Studies", "Computer Science", "Other"];
  const times = ["Morning", "Afternoon", "Evening", "Weekend", "Flexible"];

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    const form = new FormData(e.currentTarget);
    const payload = {
      name: String(form.get("name") || "").trim(),
      mobile: String(form.get("mobile") || "").trim(),
      class: String(form.get("class") || ""),
      subject: String(form.get("subject") || ""),
      location: String(form.get("location") || "").trim(),
      preferred_time: String(form.get("preferred_time") || ""),
    };
    const { error: insertError } = await supabase.from("tutor_enquiries").insert([payload]);
    if (insertError) {
      setError("We could not submit your request. Please try again or contact us on WhatsApp.");
      setSubmitting(false);
      return;
    }
    setSubmitting(false);
    setDone(true);
  }

  if (done) {
    return (
      <div className="border border-[#bad4c8] bg-[#edf4f0] p-8 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#17352d] text-lg text-white">✓</div>
        <h3 className="mt-4 text-xl font-semibold text-[#17352d]">Your tutor request has been received.</h3>
        <p className="mt-2 text-sm leading-6 text-stone-600">Our team will review your requirement and contact you shortly. You can also continue the conversation on WhatsApp.</p>
        <a href={whatsappLink("Hello ALIG MINDS, I submitted the Find a Tutor form and would like to discuss my requirement.")} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex rounded-full bg-[#1f6f55] px-6 py-3 text-sm font-semibold text-white hover:bg-[#185b46]">Continue on WhatsApp</a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}
      <div className="grid gap-4 sm:grid-cols-2">
        <div><label className="mb-1.5 block text-sm font-medium text-stone-700">Full Name *</label><input name="name" required className={inputBase} placeholder="Parent or student name" /></div>
        <div><label className="mb-1.5 block text-sm font-medium text-stone-700">Mobile Number *</label><input name="mobile" required inputMode="numeric" pattern="[0-9]{10}" maxLength={10} className={inputBase} placeholder="10-digit mobile number" /></div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div><label className="mb-1.5 block text-sm font-medium text-stone-700">Class / Standard</label><select name="class" className={inputBase}><option value="">Select class</option>{classes.map((item) => <option key={item} value={item}>{item}</option>)}</select></div>
        <div><label className="mb-1.5 block text-sm font-medium text-stone-700">Subject</label><select name="subject" className={inputBase}><option value="">Select subject</option>{subjects.map((item) => <option key={item} value={item}>{item}</option>)}</select></div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div><label className="mb-1.5 block text-sm font-medium text-stone-700">Location / Area</label><input name="location" className={inputBase} placeholder="Your locality or city" /></div>
        <div><label className="mb-1.5 block text-sm font-medium text-stone-700">Preferred Time</label><select name="preferred_time" className={inputBase}><option value="">Select time</option>{times.map((item) => <option key={item} value={item}>{item}</option>)}</select></div>
      </div>
      <button type="submit" disabled={submitting} className="w-full rounded-full bg-[#17352d] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#24493f] disabled:opacity-60">{submitting ? "Submitting request..." : "Submit Tutor Requirement"}</button>
      <p className="text-center text-xs leading-5 text-stone-500">There is no enquiry fee. By submitting, you are asking the ALIG MINDS team to contact you about this tutor requirement.</p>
    </form>
  );
}
