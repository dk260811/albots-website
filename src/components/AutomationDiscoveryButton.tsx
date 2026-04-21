"use client";

import { FormEvent, useState } from "react";
import ModalPortal from "@/components/ModalPortal";

type AutomationDiscoveryButtonProps = {
  label: string;
};

export default function AutomationDiscoveryButton({ label }: AutomationDiscoveryButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [responseText, setResponseText] = useState("");
  const [errorText, setErrorText] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!inputText.trim()) {
      setErrorText("Ju lutem shkruani përshkrimin e biznesit tuaj.");
      return;
    }

    setErrorText("");
    setIsLoading(true);
    setResponseText("");

    try {
      const res = await fetch("/api/automation-opportunities", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ customerContext: inputText.trim() })
      });

      const data = (await res.json()) as { suggestion?: string; error?: string };
      if (!res.ok || !data.suggestion) {
        throw new Error(data.error ?? "Kërkesa dështoi.");
      }

      setResponseText(data.suggestion);
    } catch (error) {
      console.error("Automation discovery error", error);
      setErrorText("Ndodhi një gabim. Ju lutem provoni përsëri.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="rounded-lg border border-kosovo-deep/20 bg-white px-4 py-2 text-sm font-medium text-kosovo-deep transition hover:border-kosovo-deep/40 hover:bg-kosovo-pale"
      >
        {label}
      </button>

      <ModalPortal>
        {isOpen ? (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-slate-900/40 px-4 py-4 backdrop-blur-md"
            onClick={(event) => {
              if (event.target === event.currentTarget) setIsOpen(false);
            }}
          >
            <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl md:p-7">
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-2xl font-semibold tracking-tight text-slate-900">
                  Hulumto mundësi automatizimi
                </h3>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="rounded-md border border-slate-200 px-2.5 py-1 text-slate-600 transition hover:border-slate-300 hover:text-slate-900"
                  aria-label="Mbyll"
                >
                  x
                </button>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-slate-700">
                Na spjego shkurt qfare lloji te biznesit keni dhe qfare kerkesa kan klientet tu.
              </p>

              <form onSubmit={handleSubmit} className="mt-5 space-y-4">
                <textarea
                  value={inputText}
                  onChange={(event) => setInputText(event.target.value)}
                  placeholder="Shkruani rastin tuaj..."
                  className="min-h-[140px] w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-kosovo-deep"
                />

                {errorText ? <p className="text-sm text-rose-600">{errorText}</p> : null}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="inline-flex w-full items-center justify-center rounded-xl bg-kosovo-deep px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isLoading ? "Duke përpunuar..." : "Dërgo"}
                </button>
              </form>

              {responseText ? (
                <div className="mt-5 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900">
                  <p className="font-medium">{responseText}</p>
                </div>
              ) : null}
            </div>
          </div>
        ) : null}
      </ModalPortal>
    </>
  );
}
