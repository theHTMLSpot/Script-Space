// app/api/send-email/route.ts

import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const { sender, subject, body } = await req.json();

  try {
    const data = await resend.emails.send({
      from: process.env.RESEND_FROM!,
      to: [process.env.RESEND_FROM!],
      subject: `[Contact] ${subject}`,
      replyTo: sender,
      text: body,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to send email", detail: error },
      { status: 500 }
    );
  }
}
