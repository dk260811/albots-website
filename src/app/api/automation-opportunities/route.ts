import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { customerContext?: string; language?: "al" | "en" };
    const customerContext = body.customerContext?.trim();
    const language = body.language === "en" ? "en" : "al";

    if (!customerContext) {
      return NextResponse.json({ error: "customerContext is required" }, { status: 400 });
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "OPENAI_API_KEY is not configured" }, { status: 500 });
    }

    const model = process.env.OPENAI_MODEL ?? "gpt-4o-mini";
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model,
        temperature: 0.6,
        messages: [
          {
            role: "system",
            content:
              language === "en"
                ? "You are an automation consultant for businesses. Provide concrete, practical recommendations only in English."
                : "Ti je konsulent automatizimi për biznese. Jep rekomandime konkrete dhe praktike vetëm në gjuhën shqipe."
          },
          {
            role: "user",
            content:
              language === "en"
                ? `The user has this business and these automation needs:\n\n${customerContext}\n\nWhat automation opportunities would you recommend? Respond briefly and concretely in English.`
                : `Përdoruesi ka këtë biznes dhe këto nevoja për automatizim:\n\n${customerContext}\n\nÇfarë automatizimesh do t'i rekomandoje? Jep një përgjigje të shkurtër dhe konkrete në shqip.`
          }
        ]
      })
    });

    const data = (await response.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
      error?: { message?: string };
    };

    if (!response.ok) {
      const providerError = data.error?.message ?? "OpenAI request failed";
      console.error("OpenAI API error", providerError);
      return NextResponse.json({ error: providerError }, { status: 502 });
    }

    const suggestion = data.choices?.[0]?.message?.content?.trim();
    if (!suggestion) {
      return NextResponse.json({ error: "No suggestion returned from model" }, { status: 502 });
    }

    return NextResponse.json({ suggestion }, { status: 200 });
  } catch (error) {
    console.error("Automation opportunities API error", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
