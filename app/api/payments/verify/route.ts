import { createHmac, timingSafeEqual } from "crypto";
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export const runtime = "nodejs";

type RegistrationPayload = {
  name?: string;
  mobile?: string;
  qualification?: string;
  subjects?: string[];
  classes?: string[];
  experience?: number;
  location?: string;
  id_certificate_url?: string;
};

type VerifyBody = {
  type?: "material" | "tutor_registration";
  materialId?: string;
  razorpay_order_id?: string;
  razorpay_payment_id?: string;
  razorpay_signature?: string;
  registration?: RegistrationPayload;
};

function authHeader(keyId: string, secret: string) {
  return `Basic ${Buffer.from(`${keyId}:${secret}`).toString("base64")}`;
}

function signatureMatches(orderId: string, paymentId: string, signature: string, secret: string) {
  const expected = createHmac("sha256", secret).update(`${orderId}|${paymentId}`).digest("hex");
  const expectedBuffer = Buffer.from(expected);
  const suppliedBuffer = Buffer.from(signature);
  return expectedBuffer.length === suppliedBuffer.length && timingSafeEqual(expectedBuffer, suppliedBuffer);
}

function clean(value: unknown, max = 200) {
  return String(value ?? "").trim().slice(0, max);
}

export async function POST(request: Request) {
  try {
    const keyId = process.env.RAZORPAY_KEY_ID;
    const secret = process.env.RAZORPAY_KEY_SECRET;
    if (!keyId || !secret) return NextResponse.json({ error: "Online payment is not configured yet." }, { status: 503 });

    const body = await request.json() as VerifyBody;
    const orderId = clean(body.razorpay_order_id, 100);
    const paymentId = clean(body.razorpay_payment_id, 100);
    const signature = clean(body.razorpay_signature, 200);
    if (!body.type || !orderId || !paymentId || !signature) return NextResponse.json({ error: "Incomplete payment verification data." }, { status: 400 });
    if (!signatureMatches(orderId, paymentId, signature, secret)) return NextResponse.json({ error: "Payment verification failed." }, { status: 400 });

    const paymentResponse = await fetch(`https://api.razorpay.com/v1/payments/${encodeURIComponent(paymentId)}`, {
      headers: { Authorization: authHeader(keyId, secret) },
      cache: "no-store",
    });
    const payment = await paymentResponse.json();
    if (!paymentResponse.ok || payment.order_id !== orderId || payment.status !== "captured") {
      return NextResponse.json({ error: "Payment has not been captured." }, { status: 400 });
    }

    const orderResponse = await fetch(`https://api.razorpay.com/v1/orders/${encodeURIComponent(orderId)}`, {
      headers: { Authorization: authHeader(keyId, secret) },
      cache: "no-store",
    });
    const order = await orderResponse.json();
    if (!orderResponse.ok || order.status !== "paid") return NextResponse.json({ error: "Payment order is not complete." }, { status: 400 });

    const admin = createAdminClient();

    if (body.type === "material") {
      const supabase = await createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return NextResponse.json({ error: "Please sign in again to complete this purchase." }, { status: 401 });
      const materialId = clean(body.materialId, 80);
      if (!materialId || order.notes?.type !== "material" || order.notes?.materialId !== materialId || order.notes?.userId !== user.id) {
        return NextResponse.json({ error: "Payment does not match this PDF." }, { status: 400 });
      }

      const { data: material } = await admin.from("study_material").select("id, price, is_free, is_published").eq("id", materialId).eq("is_published", true).maybeSingle();
      if (!material || material.is_free) return NextResponse.json({ error: "This PDF is not available for a paid purchase." }, { status: 400 });
      const expectedAmount = Math.round(Number(material.price) * 100);
      if (Number(payment.amount) !== expectedAmount) return NextResponse.json({ error: "Payment amount does not match this PDF." }, { status: 400 });

      const { data: existing } = await admin.from("purchases").select("id").eq("user_id", user.id).eq("item_type", "material").eq("item_id", materialId).eq("status", "paid").maybeSingle();
      if (!existing) {
        const { error: insertError } = await admin.from("purchases").insert({
          user_id: user.id,
          item_type: "material",
          item_id: materialId,
          amount: Number(material.price),
          razorpay_payment_id: paymentId,
          razorpay_order_id: orderId,
          status: "paid",
        });
        if (insertError) return NextResponse.json({ error: "Payment succeeded, but access could not be recorded. Please contact support with your payment ID." }, { status: 500 });
      }
      return NextResponse.json({ ok: true, accessUrl: `/material-access/${materialId}` });
    }

    if (body.type === "tutor_registration") {
      if (order.notes?.type !== "tutor_registration" || Number(payment.amount) !== 10000) return NextResponse.json({ error: "Payment does not match tutor registration." }, { status: 400 });
      const registration = body.registration ?? {};
      const name = clean(registration.name, 120);
      const mobile = clean(registration.mobile, 20);
      const qualification = clean(registration.qualification, 160);
      const subjects = Array.isArray(registration.subjects) ? registration.subjects.map((item) => clean(item, 80)).filter(Boolean).slice(0, 20) : [];
      const classes = Array.isArray(registration.classes) ? registration.classes.map((item) => clean(item, 80)).filter(Boolean).slice(0, 20) : [];
      if (!name || !/^\d{10}$/.test(mobile) || !qualification || subjects.length === 0 || classes.length === 0) return NextResponse.json({ error: "Tutor registration details are incomplete." }, { status: 400 });

      const { error: insertError } = await admin.from("tutor_registrations").insert({
        name,
        mobile,
        qualification,
        subjects,
        classes,
        experience: Number(registration.experience) || 0,
        location: clean(registration.location, 160),
        id_certificate_url: clean(registration.id_certificate_url, 1000) || null,
        status: "pending",
        notes: `₹100 registration fee paid via Razorpay. Payment ID: ${paymentId}`,
      });
      if (insertError) return NextResponse.json({ error: "Payment succeeded, but registration could not be saved. Please contact support with your payment ID." }, { status: 500 });
      return NextResponse.json({ ok: true });
    }

    return NextResponse.json({ error: "Invalid payment type." }, { status: 400 });
  } catch {
    return NextResponse.json({ error: "Payment verification could not be completed." }, { status: 500 });
  }
}
