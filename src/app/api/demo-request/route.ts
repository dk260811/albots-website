import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const botName = String(formData.get("botName") ?? "").trim();
    const description = String(formData.get("description") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const demoType = String(formData.get("demoType") ?? "chatbot").trim();

    if (!botName || !description || !email) {
      return NextResponse.json(
        { ok: false, error: "botName, description, and email are required." },
        { status: 400 }
      );
    }

    const host = process.env.SMTP_HOST;
    const port = Number(process.env.SMTP_PORT ?? 587);
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const from = process.env.SMTP_FROM ?? user;

    if (!host || !user || !pass || !from) {
      return NextResponse.json(
        { ok: false, error: "Email service is not configured. Set SMTP env variables." },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
      tls: {
        // Dev workaround for environments with self-signed cert interception.
        rejectUnauthorized: false
      }
    });

    await transporter.sendMail({
      from,
      to: "dkokaj.26@gmail.com",
      replyTo: email,
      subject: `New ${demoType} demo request from ${botName}`,
      text: `Demo Type: ${demoType}\nBot Name: ${botName}\nEmail: ${email}\n\nDescription:\n${description}`,
      html: `
        <h2>New Demo Request</h2>
        <p><strong>Demo Type:</strong> ${demoType}</p>
        <p><strong>Bot Name:</strong> ${botName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Description:</strong></p>
        <p>${description.replace(/\n/g, "<br />")}</p>
      `
    });

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    console.error("Demo request API error", error);
    return NextResponse.json({ ok: false, error: "Internal server error" }, { status: 500 });
  }
}
