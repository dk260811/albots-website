"use client";

import { FormEvent, useState } from "react";
import ModalPortal from "@/components/ModalPortal";

type AutomationDiscoveryButtonProps = {
  label: string;
  language?: "al" | "en";
};

type ParsedSuggestion = {
  intro: string;
  items: Array<{ title: string; description: string }>;
  outro: string;
};

function parseSuggestion(text: string): ParsedSuggestion {
  const normalizedText = text.replace(/\s+/g, " ").trim();
  const itemRegex = /(\d+)\.\s+\*\*(.*?)\*\*:\s*([\s\S]*?)(?=\s+\d+\.\s+\*\*|$)/g;
  const items: Array<{ title: string; description: string }> = [];
  let match: RegExpExecArray | null;
  let firstItemIndex = -1;
  let lastItemEnd = -1;

  while ((match = itemRegex.exec(normalizedText)) !== null) {
    if (firstItemIndex === -1) {
      firstItemIndex = match.index;
    }
    lastItemEnd = itemRegex.lastIndex;
    items.push({
      title: match[2].trim(),
      description: match[3].trim()
    });
  }

  if (!items.length) {
    return {
      intro: normalizedText,
      items: [],
      outro: ""
    };
  }

  return {
    intro: firstItemIndex > 0 ? normalizedText.slice(0, firstItemIndex).trim() : "",
    items,
    outro: lastItemEnd > -1 ? normalizedText.slice(lastItemEnd).trim() : ""
  };
}

const modalContent = {
  al: {
    title: "Hulumto mundësi automatizimi",
    closeAria: "Mbyll",
    description:
      "Na tregoni shkurt çfarë lloji biznesi keni dhe cilat janë kërkesat më të shpeshta të klientëve tuaj, në mënyrë që AI ynë inteligjent të identifikojë mundësi automatizimi për ju.",
    placeholder: "Shkruani rastin tuaj...",
    emptyInputError: "Ju lutem shkruani përshkrimin e biznesit tuaj.",
    genericError: "Ndodhi një gabim. Ju lutem provoni përsëri.",
    loading: "Duke përpunuar...",
    submit: "Dërgo"
  },
  en: {
    title: "Explore automation opportunities",
    closeAria: "Close",
    description:
      "Briefly describe your business type and your customers' most common requests so our intelligent AI can identify automation opportunities for you.",
    placeholder: "Describe your use case...",
    emptyInputError: "Please describe your business context.",
    genericError: "Something went wrong. Please try again.",
    loading: "Processing...",
    submit: "Send"
  }
} as const;

export default function AutomationDiscoveryButton({ label, language = "al" }: AutomationDiscoveryButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [responseText, setResponseText] = useState("");
  const [errorText, setErrorText] = useState("");
  const parsedSuggestion = parseSuggestion(responseText);
  const t = modalContent[language];

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!inputText.trim()) {
      setErrorText(t.emptyInputError);
      return;
    }

    setErrorText("");
    setIsLoading(true);
    setResponseText("");

    try {
      const res = await fetch("/api/automation-opportunities", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ customerContext: inputText.trim(), language })
      });

      const data = (await res.json()) as { suggestion?: string; error?: string };
      if (!res.ok || !data.suggestion) {
        throw new Error(data.error ?? "Kërkesa dështoi.");
      }

      setResponseText(data.suggestion);
    } catch (error) {
      console.error("Automation discovery error", error);
      setErrorText(t.genericError);
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
                  {t.title}
                </h3>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="rounded-md border border-slate-200 px-2.5 py-1 text-slate-600 transition hover:border-slate-300 hover:text-slate-900"
                  aria-label={t.closeAria}
                >
                  x
                </button>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-slate-700">
                {t.description}
              </p>

              <form onSubmit={handleSubmit} className="mt-5 space-y-4">
                <textarea
                  value={inputText}
                  onChange={(event) => setInputText(event.target.value)}
                  placeholder={t.placeholder}
                  className="min-h-[140px] w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-kosovo-deep"
                />

                {errorText ? <p className="text-sm text-rose-600">{errorText}</p> : null}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="inline-flex w-full items-center justify-center rounded-xl bg-kosovo-deep px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isLoading ? t.loading : t.submit}
                </button>
              </form>

              {responseText ? (
                <div className="mt-5 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900">
                  {parsedSuggestion.intro ? (
                    <p className="mb-3 leading-relaxed">{parsedSuggestion.intro}</p>
                  ) : null}

                  {parsedSuggestion.items.length ? (
                    <ol className="list-decimal space-y-3 pl-5">
                      {parsedSuggestion.items.map((item) => (
                        <li key={`${item.title}-${item.description.slice(0, 20)}`} className="leading-relaxed">
                          <span className="font-semibold">{item.title}: </span>
                          <span>{item.description}</span>
                        </li>
                      ))}
                    </ol>
                  ) : (
                    <p className="leading-relaxed">{responseText}</p>
                  )}

                  {parsedSuggestion.outro ? (
                    <p className="mt-3 leading-relaxed">{parsedSuggestion.outro}</p>
                  ) : null}
                </div>
              ) : null}
            </div>
          </div>
        ) : null}
      </ModalPortal>
    </>
  );
}
