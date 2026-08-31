"use client";

import { useState } from "react";

type RazorpaySuccess = {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
};

type RazorpayOptions = {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: RazorpaySuccess) => void | Promise<void>;
  theme?: { color?: string };
  modal?: { ondismiss?: () => void };
};

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => { open: () => void };
  }
}

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

export function MaterialPurchaseButton({ materialId, title, price }: { materialId: string; title: string; price: number }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function buy() {
    setBusy(true);
    setError(null);
    const loaded = await loadRazorpay();
    if (!loaded) {
      setError("Secure checkout could not load. Please check your connection and try again.");
      setBusy(false);
      return;
    }

    const orderResponse = await fetch("/api/payments/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "material", materialId }),
    });
    const orderData = await orderResponse.json();
    if (!orderResponse.ok) {
      if (orderResponse.status === 401) window.location.href = `/login?next=${encodeURIComponent(`/study-material/${materialId}`)}`;
      else setError(orderData.error || "Payment could not be started.");
      setBusy(false);
      return;
    }

    const checkout = new window.Razorpay({
      key: orderData.keyId,
      amount: orderData.order.amount,
      currency: orderData.order.currency,
      name: "ALIG MINDS",
      description: title,
      order_id: orderData.order.id,
      theme: { color: "#17352d" },
      modal: { ondismiss: () => setBusy(false) },
      handler: async (response) => {
        const verifyResponse = await fetch("/api/payments/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ type: "material", materialId, ...response }),
        });
        const verifyData = await verifyResponse.json();
        if (!verifyResponse.ok) {
          setError(verifyData.error || "Payment verification failed. Please contact support if money was deducted.");
          setBusy(false);
          return;
        }
        window.location.href = verifyData.accessUrl || `/material-access/${materialId}`;
      },
    });
    checkout.open();
  }

  return (
    <div>
      <button onClick={buy} disabled={busy} className="w-full rounded-full bg-[#17352d] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[#24493f] disabled:opacity-60">
        {busy ? "Opening secure checkout..." : `Buy PDF for ₹${price}`}
      </button>
      {error && <p className="mt-3 rounded-lg bg-red-50 px-4 py-3 text-sm leading-6 text-red-700">{error}</p>}
    </div>
  );
}
