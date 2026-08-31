"use client";

import { createClient } from "@/lib/supabase/client";
import { whatsappLink } from "@/lib/site";
import { useState } from "react";
import type { FormEvent } from "react";

const inputBase = "w-full rounded-lg border border-stone-300 bg-white px-4 py-3 text-sm text-stone-900 placeholder-stone-400 outline-none transition focus:border-[#397662] focus:ring-2 focus:ring-[#bad4c8]";
const subjectOptions = ["Mathematics", "Physics", "Chemistry", "Biology", "Science", "English", "Hindi", "Social Studies", "Computer Science", "Other"];
const classOptions = ["Class 1-5", "Class 6-8", "Class 9-10", "Class 11-12", "Competitive & Entrance Exams"];

type RazorpaySuccess = { razorpay_payment_id: string; razorpay_order_id: string; razorpay_signature: string };
type RazorpayOptions = { key: string; amount: number; currency: string; name: string; description: string; order_id: string; handler: (response: RazorpaySuccess) => void | Promise<void>; theme?: { color?: string }; modal?: { ondismiss?: () => void } };
declare global { interface Window { Razorpay: new (options: RazorpayOptions) => { open: () => void } } }

async function loadRazorpay() {
  if (window.Razorpay) return true;
  return new Promise<boolean>((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export function TutorRegistrationForm() {
  const [supabase] = useState(() => createClient());
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [subjects, setSubjects] = useState<string[]>([]);
  const [classes, setClasses] = useState<string[]>([]);

  function toggle(list: string[], setList: (value: string[]) => void, value: string) {
    setList(list.includes(value) ? list.filter((item) => item !== value) : [...list, value]);
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    if (subjects.length === 0 || classes.length === 0) {
      setError("Please select at least one subject and one class level.");
      return;
    }
    setSubmitting(true);
    const form = new FormData(e.currentTarget);
    const registration: Record<string, unknown> = {
      name: String(form.get("name") || "").trim(),
      mobile: String(form.get("mobile") || "").trim(),
      qualification: String(form.get("qualification") || "").trim(),
      subjects,
      classes,
      experience: Number(form.get("experience") || 0),
      location: String(form.get("location") || "").trim(),
    };

    const file = form.get("id_certificate") as File | null;
    if (file && file.size > 0) {
      const safeName = file.name.replace(/[^a-zA-Z0-9._-]+/g, "_");
      const path = `uploads/${Date.now()}_${safeName}`;
      const { error: uploadError } = await supabase.storage.from("tutor-certificates").upload(path, file, { contentType: file.type || undefined });
      if (uploadError) {
        setError("Your certificate could not be uploaded. Please retry or submit without the file.");
        setSubmitting(false);
        return;
      }
      const { data } = supabase.storage.from("tutor-certificates").getPublicUrl(path);
      registration.id_certificate_url = data.publicUrl;
    }

    const loaded = await loadRazorpay();
    if (!loaded) {
      setError("Secure checkout could not load. Please check your connection and try again.");
      setSubmitting(false);
      return;
    }

    const orderResponse = await fetch("/api/payments/order", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ type: "tutor_registration" }) });
    const orderData = await orderResponse.json();
    if (!orderResponse.ok) {
      setError(orderData.error || "Registration payment could not be started.");
      setSubmitting(false);
      return;
    }

    const checkout = new window.Razorpay({
      key: orderData.keyId,
      amount: orderData.order.amount,
      currency: orderData.order.currency,
      name: "ALIG MINDS",
      description: "Tutor registration fee",
      order_id: orderData.order.id,
      theme: { color: "#17352d" },
      modal: { ondismiss: () => setSubmitting(false) },
      handler: async (response) => {
        const verifyResponse = await fetch("/api/payments/verify", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ type: "tutor_registration", registration, ...response }) });
        const verifyData = await verifyResponse.json();
        if (!verifyResponse.ok) {
          setError(verifyData.error || "Payment verification failed. If money was deducted, please contact us with your payment ID.");
          setSubmitting(false);
          return;
        }
        setDone(true);
        setSubmitting(false);
      },
    });
    checkout.open();
  }

  if (done) {
    return (
      <div className="border border-[#bad4c8] bg-[#edf4f0] p-8 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#17352d] text-white">✓</div>
        <h3 className="mt-4 text-xl font-semibold text-[#17352d]">Registration and payment received.</h3>
        <p className="mt-2 text-sm leading-6 text-stone-600">Your tutor profile is now pending verification. Our team will contact you after review.</p>
        <a href={whatsappLink("Hello ALIG MINDS, I completed my tutor registration and ₹100 payment.")} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex rounded-full bg-[#1f6f55] px-6 py-3 text-sm font-semibold text-white">Continue on WhatsApp</a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && <p className="rounded-lg bg-red-50 px-4 py-3 text-sm leading-6 text-red-700">{error}</p>}
      <div className="grid gap-4 sm:grid-cols-2">
        <div><label className="mb-1.5 block text-sm font-medium text-stone-700">Full Name *</label><input name="name" required className={inputBase} placeholder="Your full name" /></div>
        <div><label className="mb-1.5 block text-sm font-medium text-stone-700">Mobile Number *</label><input name="mobile" required inputMode="numeric" pattern="[0-9]{10}" maxLength={10} className={inputBase} placeholder="10-digit mobile number" /></div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div><label className="mb-1.5 block text-sm font-medium text-stone-700">Qualification *</label><input name="qualification" required className={inputBase} placeholder="e.g. M.Sc. Physics, B.Ed." /></div>
        <div><label className="mb-1.5 block text-sm font-medium text-stone-700">Teaching Experience</label><input name="experience" type="number" min="0" step="0.5" className={inputBase} placeholder="Years of experience" /></div>
      </div>
      <div><label className="mb-2 block text-sm font-medium text-stone-700">Subjects *</label><div className="flex flex-wrap gap-2">{subjectOptions.map((item) => <button key={item} type="button" onClick={() => toggle(subjects, setSubjects, item)} className={`rounded-full border px-3 py-1.5 text-sm transition ${subjects.includes(item) ? "border-[#17352d] bg-[#17352d] text-white" : "border-stone-300 text-stone-700 hover:border-[#397662]"}`}>{item}</button>)}</div></div>
      <div><label className="mb-2 block text-sm font-medium text-stone-700">Class Levels *</label><div className="flex flex-wrap gap-2">{classOptions.map((item) => <button key={item} type="button" onClick={() => toggle(classes, setClasses, item)} className={`rounded-full border px-3 py-1.5 text-sm transition ${classes.includes(item) ? "border-[#17352d] bg-[#17352d] text-white" : "border-stone-300 text-stone-700 hover:border-[#397662]"}`}>{item}</button>)}</div></div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div><label className="mb-1.5 block text-sm font-medium text-stone-700">Location / City</label><input name="location" className={inputBase} placeholder="Your city or locality" /></div>
        <div><label className="mb-1.5 block text-sm font-medium text-stone-700">ID / Qualification Certificate</label><input name="id_certificate" type="file" accept=".pdf,.jpg,.jpeg,.png" className="block w-full text-sm text-stone-500 file:mr-3 file:rounded-lg file:border-0 file:bg-[#edf4f0] file:px-3 file:py-2 file:text-sm file:font-semibold file:text-[#17352d]" /><p className="mt-1 text-xs text-stone-500">Optional, but recommended for verification.</p></div>
      </div>
      <button type="submit" disabled={submitting} className="w-full rounded-full bg-[#17352d] px-6 py-3.5 text-sm font-semibold text-white hover:bg-[#24493f] disabled:opacity-60">{submitting ? "Preparing secure payment..." : "Pay ₹100 & Submit Registration"}</button>
      <p className="text-center text-xs leading-5 text-stone-500">Your registration is submitted only after the ₹100 payment is successfully verified.</p>
    </form>
  );
}
