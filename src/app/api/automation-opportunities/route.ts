import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { customerContext?: string };
    const customerContext = body.customerContext?.trim();

    if (!customerContext) {
      return NextResponse.json({ error: "customerContext is required" }, { status: 400 });
    }

    // Placeholder response until LLM integration is connected.
    const suggestion =
      "Bazuar në përshkrimin tuaj, mundësi konkrete automatizimi janë: klasifikimi automatik i kërkesave hyrëse, mbledhja e të dhënave paraprake nga klientët dhe drejtimi automatik i rasteve te procesi i duhur i brendshëm. Kjo ndihmon në uljen e kohës së trajtimit dhe standardizimin e operacioneve.";

    return NextResponse.json({ suggestion }, { status: 200 });
  } catch (error) {
    console.error("Automation opportunities API error", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
