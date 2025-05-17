import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const { sender, subject, body, captchaToken } = await req.json();

  const secretKey = process.env.GOOGLE_RECAPTCHA_SECRET_KEY;

  if (!secretKey) {
    return NextResponse.json(
      { error: "reCAPTCHA secret key is not configured" },
      { status: 500 }
    );
  }

  if (!captchaToken) {
    return NextResponse.json(
      { error: "No reCAPTCHA token provided" },
      { status: 400 }
    );
  }

  const verifyUrl = `https://www.google.com/recaptcha/api/siteverify`;

  const captchaRes = await fetch(verifyUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `secret=${secretKey}&response=${captchaToken}`,
  });

  const captchaData = await captchaRes.json();

  if (!captchaData.success) {
    console.error("Captcha verification failed:", captchaData);
    return NextResponse.json(
      { error: "Captcha verification failed" },
      { status: 400 }
    );
  }

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
