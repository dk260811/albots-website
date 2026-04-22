import { NextResponse } from "next/server";
import twilio from "twilio";

function randomIdentity() {
  return `web-user-${Math.random().toString(36).slice(2, 10)}`;
}

export async function GET(request: Request) {
  try {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const apiKeySid = process.env.TWILIO_API_KEY_SID;
    const apiKeySecret = process.env.TWILIO_API_KEY_SECRET;
    const twimlAppSid = process.env.TWILIO_TWIML_APP_SID;
    const ttl = Number(process.env.WEB_VOICE_TOKEN_TTL_SECONDS ?? 3600);

    if (!accountSid || !apiKeySid || !apiKeySecret || !twimlAppSid) {
      console.error("Voice token endpoint not configured", {
        hasAccountSid: Boolean(accountSid),
        hasApiKeySid: Boolean(apiKeySid),
        hasApiKeySecret: Boolean(apiKeySecret),
        hasTwimlAppSid: Boolean(twimlAppSid)
      });
      return NextResponse.json(
        { error: "Voice token service is not configured." },
        { status: 500 }
      );
    }

    const url = new URL(request.url);
    const identity = url.searchParams.get("identity")?.trim() || randomIdentity();

    const AccessToken = twilio.jwt.AccessToken;
    const VoiceGrant = AccessToken.VoiceGrant;

    const accessToken = new AccessToken(accountSid, apiKeySid, apiKeySecret, {
      identity,
      ttl
    });

    accessToken.addGrant(
      new VoiceGrant({
        outgoingApplicationSid: twimlAppSid,
        incomingAllow: false
      })
    );

    return NextResponse.json({
      token: accessToken.toJwt(),
      identity,
      ttl
    });
  } catch (error) {
    console.error("Voice token generation failed", error);
    return NextResponse.json({ error: "Failed to generate voice token." }, { status: 500 });
  }
}
