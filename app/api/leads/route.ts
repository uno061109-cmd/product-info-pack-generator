import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const lead = await request.json();
  const webhookUrl = process.env.LEAD_WEBHOOK_URL;

  if (!webhookUrl) {
    return NextResponse.json(
      {
        ok: false,
        message: "LEAD_WEBHOOK_URL is not configured. Store lead locally or configure a webhook for production."
      },
      { status: 501 }
    );
  }

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      source: "liucai-product-pack",
      lead
    })
  });

  if (!response.ok) {
    return NextResponse.json({ ok: false, message: "Webhook delivery failed." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
