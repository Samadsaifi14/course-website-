import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

function authHeader(keyId: string, secret: string) {
  return `Basic ${Buffer.from(`${keyId}:${secret}`).toString("base64")}`;
}

export async function POST(request: Request) {
  try {
    const keyId = process.env.RAZORPAY_KEY_ID;
    const secret = process.env.RAZORPAY_KEY_SECRET;
    if (!keyId || !secret) {
      return NextResponse.json({ error: "Online payment is not configured yet." }, { status: 503 });
    }

    const body = await request.json() as { type?: string; materialId?: string };
    let amount = 0;
    let notes: Record<string, string> = {};

    if (body.type === "tutor_registration") {
      amount = 10000;
      notes = { type: "tutor_registration" };
    } else if (body.type === "material" && body.materialId) {
      const supabase = await createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return NextResponse.json({ error: "Please sign in before purchasing a PDF." }, { status: 401 });

      const { data: material } = await supabase
        .from("study_material")
        .select("id, price, is_free, is_published")
        .eq("id", body.materialId)
        .eq("is_published", true)
        .maybeSingle();
      if (!material) return NextResponse.json({ error: "Study material was not found." }, { status: 404 });
      if (material.is_free) return NextResponse.json({ error: "This PDF is free and does not require payment." }, { status: 400 });

      amount = Math.round(Number(material.price) * 100);
      if (!Number.isFinite(amount) || amount < 100) return NextResponse.json({ error: "Invalid material price." }, { status: 400 });
      notes = { type: "material", materialId: material.id, userId: user.id };
    } else {
      return NextResponse.json({ error: "Invalid payment request." }, { status: 400 });
    }

    const response = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        Authorization: authHeader(keyId, secret),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount,
        currency: "INR",
        receipt: `am_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`,
        notes,
      }),
      cache: "no-store",
    });

    const order = await response.json();
    if (!response.ok) {
      return NextResponse.json({ error: "Payment could not be started. Please try again." }, { status: 502 });
    }

    return NextResponse.json({ order, keyId });
  } catch {
    return NextResponse.json({ error: "Payment could not be started. Please try again." }, { status: 500 });
  }
}
