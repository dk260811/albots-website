"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Device } from "@twilio/voice-sdk";

type CallStatus = "idle" | "connecting" | "registered" | "connected" | "ended" | "error";

type TokenResponse = {
  token: string;
  identity: string;
  ttl: number;
};

type Language = "al" | "en";

const content = {
  al: {
    title: "Web Voice Demo",
    heading: "Telefono voicebot-in nga browser-i",
    intro: "Klikoni Call bot për të folur me voicebot-in direkt nga browser-i.",
    note:
      "Ju lutemi, sigurohuni që t'i jepni qasje mikrofonit në browser dhe injorojeni mesazhin hyrës që dëgjohet kur e telefononi këtë demo. Cilësia e transkriptimit varet edhe nga mikrofoni juaj.",
    callButton: "Call bot",
    hangupButton: "Hang up",
    status: "Status",
    identity: "Identity",
    error: "Gabim",
    back: "Kthehu në faqen kryesore",
    callError: "Nuk u lidh dot thirrja nga browser-i."
  },
  en: {
    title: "Web Voice Demo",
    heading: "Call the voicebot from your browser",
    intro: "Click Call bot to speak with the voicebot directly from your browser.",
    note:
      "Please make sure to allow microphone access in your browser and ignore the startup message you hear when calling this demo. Transcription quality also depends on your microphone.",
    callButton: "Call bot",
    hangupButton: "Hang up",
    status: "Status",
    identity: "Identity",
    error: "Error",
    back: "Back to homepage",
    callError: "Failed to connect the call from the browser."
  }
} as const;

export default function WebCallPage() {
  const [lang, setLang] = useState<Language>("al");
  const [status, setStatus] = useState<CallStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [identity, setIdentity] = useState("");
  const deviceRef = useRef<Device | null>(null);
  const activeCallRef = useRef<any>(null);
  const t = content[lang];

  const fetchToken = useCallback(async () => {
    const response = await fetch("/api/voice/token");
    if (!response.ok) {
      throw new Error("Token endpoint failed");
    }
    const data = (await response.json()) as TokenResponse;
    setIdentity(data.identity);
    return data.token;
  }, []);

  const setupDevice = useCallback(async () => {
    if (deviceRef.current) return deviceRef.current;

    const token = await fetchToken();
    const device = new Device(token, {
      edge: "ashburn"
    });

    device.on("registered", () => setStatus("registered"));
    device.on("error", (error) => {
      console.error("Twilio device error", error);
      setErrorMessage(error.message ?? "Twilio device error");
      setStatus("error");
    });
    device.on("tokenWillExpire", async () => {
      try {
        const refreshedToken = await fetchToken();
        device.updateToken(refreshedToken);
      } catch (error) {
        console.error("Token refresh failed", error);
      }
    });

    await device.register();
    deviceRef.current = device;
    return device;
  }, [fetchToken]);

  const handleCall = async () => {
    setErrorMessage("");
    setStatus("connecting");

    try {
      const device = await setupDevice();
      const call = await device.connect({
        params: { source: "web" }
      });

      activeCallRef.current = call;

      call.on("accept", () => setStatus("connected"));
      call.on("disconnect", () => {
        setStatus("ended");
        activeCallRef.current = null;
      });
      call.on("reject", () => {
        setStatus("ended");
        activeCallRef.current = null;
      });
      call.on("cancel", () => {
        setStatus("ended");
        activeCallRef.current = null;
      });
    } catch (error) {
      console.error("Call connect failed", error);
      setStatus("error");
      setErrorMessage(t.callError);
    }
  };

  const handleHangup = () => {
    if (activeCallRef.current) {
      activeCallRef.current.disconnect();
      activeCallRef.current = null;
    }
    setStatus("ended");
  };

  useEffect(() => {
    return () => {
      if (activeCallRef.current) {
        activeCallRef.current.disconnect();
      }
      if (deviceRef.current) {
        deviceRef.current.destroy();
      }
    };
  }, []);

  return (
    <main className="section-shell pt-12">
      <div className="mx-auto max-w-2xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm md:p-10">
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm font-medium text-kosovo-deep">{t.title}</p>
          <div className="rounded-full border border-white/80 bg-white/90 p-1 shadow-sm backdrop-blur">
            <button
              onClick={() => setLang("al")}
              className={`rounded-full px-3 py-1 text-sm transition ${
                lang === "al" ? "bg-kosovo-deep text-white" : "text-slate-600 hover:text-slate-900"
              }`}
              type="button"
            >
              Shq
            </button>
            <button
              onClick={() => setLang("en")}
              className={`rounded-full px-3 py-1 text-sm transition ${
                lang === "en" ? "bg-kosovo-deep text-white" : "text-slate-600 hover:text-slate-900"
              }`}
              type="button"
            >
              EN
            </button>
          </div>
        </div>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">{t.heading}</h1>
        <p className="mt-3 text-slate-600">
          {t.intro}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">{t.note}</p>

        <div className="mt-8 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={handleCall}
            className="rounded-xl bg-kosovo-deep px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-700"
          >
            {t.callButton}
          </button>
          <button
            type="button"
            onClick={handleHangup}
            className="rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            {t.hangupButton}
          </button>
        </div>

        <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm">
          <p>
            <strong>{t.status}:</strong> {status}
          </p>
          <p className="mt-1">
            <strong>{t.identity}:</strong> {identity || "-"}
          </p>
          {errorMessage ? (
            <p className="mt-2 text-rose-700">
              <strong>{t.error}:</strong> {errorMessage}
            </p>
          ) : null}
        </div>

        <Link href="/" className="mt-6 inline-block text-sm text-kosovo-deep underline">
          {t.back}
        </Link>
      </div>
    </main>
  );
}
