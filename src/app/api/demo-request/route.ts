import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const botName = String(formData.get("botName") ?? "").trim();
    const description = String(formData.get("description") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const file = formData.get("file");

    if (!botName || !description || !email) {
      return NextResponse.json(
        { ok: false, error: "botName, description, and email are required." },
        { status: 400 }
      );
    }

    // Placeholder: replace with your database/email workflow.
    console.log("Demo request received", {
      botName,
      description,
      email,
      fileName: file instanceof File ? file.name : null
    });

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    console.error("Demo request API error", error);
    return NextResponse.json({ ok: false, error: "Internal server error" }, { status: 500 });
  }
}
