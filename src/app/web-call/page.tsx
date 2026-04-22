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

export default function WebCallPage() {
  const [status, setStatus] = useState<CallStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [identity, setIdentity] = useState("");
  const deviceRef = useRef<Device | null>(null);
  const activeCallRef = useRef<any>(null);

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
      setErrorMessage("Nuk u lidh dot thirrja nga browser-i.");
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
        <p className="text-sm font-medium text-kosovo-deep">Web Voice Demo</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">Call bot from browser</h1>
        <p className="mt-3 text-slate-600">
          Klikoni <strong>Call bot</strong> për të folur me voicebot-in direkt nga browser-i.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">
          Ju lutem kini parasysh t&apos;i jepni qasje mikrofonit tuaj ne browser dhe injoroni
          mesazhin startues qe ndegjohet kur thirrne kete demo. Kualiteti i transkribimit varet
          edhe nga mikrofoni juaj.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={handleCall}
            className="rounded-xl bg-kosovo-deep px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-700"
          >
            Call bot
          </button>
          <button
            type="button"
            onClick={handleHangup}
            className="rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Hang up
          </button>
        </div>

        <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm">
          <p>
            <strong>Status:</strong> {status}
          </p>
          <p className="mt-1">
            <strong>Identity:</strong> {identity || "-"}
          </p>
          {errorMessage ? (
            <p className="mt-2 text-rose-700">
              <strong>Error:</strong> {errorMessage}
            </p>
          ) : null}
        </div>

        <Link href="/" className="mt-6 inline-block text-sm text-kosovo-deep underline">
          Back to homepage
        </Link>
      </div>
    </main>
  );
}
