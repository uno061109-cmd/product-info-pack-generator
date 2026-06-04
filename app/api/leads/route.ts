import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const lead = await request.json();
  const leadDestinationUrl = process.env.LEAD_DESTINATION_URL;

  if (!leadDestinationUrl) {
    return NextResponse.json(
      {
        ok: false,
        message: "Lead delivery destination is not configured."
      },
      { status: 501 }
    );
  }

  const response = await fetch(leadDestinationUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      source: "liucai-product-pack",
      lead
    })
  });

  if (!response.ok) {
    return NextResponse.json({ ok: false, message: "Lead delivery failed." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
