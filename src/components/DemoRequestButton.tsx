"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import ModalPortal from "@/components/ModalPortal";

type Language = "al" | "en";

type DemoRequestButtonProps = {
  label: string;
  language: Language;
  demoType?: "chatbot" | "voicebot";
};

type FormState = {
  botName: string;
  description: string;
  email: string;
  file: File | null;
};

type FormErrors = {
  botName?: string;
  description?: string;
  email?: string;
};

const text = {
  al: {
    title: "Testoni chatbot-in tuaj të personalizuar",
    description:
      "Na dërgoni disa detaje rreth chatbot-it që dëshironi të ndërtoni dhe ne do të krijojmë një demo të personalizuar për ju. Brenda pak ditësh, do të merrni në email një link për ta testuar demo-n tuaj falas.",
    botName: "Emri i chatbot-it",
    botNamePlaceholder: "Vendosni një emër për chatbot-in tuaj",
    botDescription: "Përshkrimi",
    botDescriptionPlaceholder:
      "Përshkruani çfarë dëshironi të bëjë chatbot-i juaj (p.sh. suport klienti, rezervime, FAQ, etj.)",
    uploadLabel: "Ngarkoni dokumente (opsionale)",
    uploadHint: "Pranon PDF, DOCX, TXT",
    email: "Email",
    emailPlaceholder: "Adresa juaj e email-it",
    submit: "Kërko Demo",
    loading: "Duke u dërguar...",
    success:
      "Faleminderit! Kërkesa juaj për demo u dërgua me sukses. Linku i demo-s së personalizuar do t'ju vijë me email brenda pak ditësh.",
    warning:
      "Ju lutemi mos përfshini informacione sensitive ose personale që nuk dëshironi të ndahen.",
    close: "Mbyll",
    errors: {
      required: "Kjo fushë është e detyrueshme.",
      invalidEmail: "Ju lutemi vendosni një email të vlefshëm."
    }
  },
  en: {
    title: "Test Your Own Custom Chatbot",
    description:
      "Send us a few details about the chatbot you want to build, and we will create a personalized demo for you. Within a few days, you will receive an email with a link to test your custom demo - completely free.",
    botName: "Bot Name",
    botNamePlaceholder: "Enter a name for your chatbot",
    botDescription: "Description",
    botDescriptionPlaceholder:
      "Describe what you want your chatbot to do (e.g. customer support, booking, FAQ, etc.)",
    uploadLabel: "Upload documents (optional)",
    uploadHint: "Accepts PDF, DOCX, TXT",
    email: "Email",
    emailPlaceholder: "Your email address",
    submit: "Request Demo",
    loading: "Submitting...",
    success:
      "Thank you! Your demo request has been submitted. You will receive your custom demo link via email within a few days.",
    warning:
      "Please do not include sensitive or personal information that you do not want to be shared.",
    close: "Close",
    errors: {
      required: "This field is required.",
      invalidEmail: "Please enter a valid email address."
    }
  }
} as const;

const initialForm: FormState = {
  botName: "",
  description: "",
  email: "",
  file: null
};

export default function DemoRequestButton({
  label,
  language,
  demoType = "chatbot"
}: DemoRequestButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formState, setFormState] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const modalPanelRef = useRef<HTMLDivElement>(null);
  const t = useMemo(() => text[language], [language]);

  useEffect(() => {
    if (!isOpen) return;

    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    window.addEventListener("keydown", onEscape);
    return () => window.removeEventListener("keydown", onEscape);
  }, [isOpen]);

  const validate = () => {
    const nextErrors: FormErrors = {};

    if (!formState.botName.trim()) nextErrors.botName = t.errors.required;
    if (!formState.description.trim()) nextErrors.description = t.errors.required;

    const email = formState.email.trim();
    if (!email) {
      nextErrors.email = t.errors.required;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = t.errors.invalidEmail;
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const payload = new FormData();
      payload.append("botName", formState.botName.trim());
      payload.append("description", formState.description.trim());
      payload.append("email", formState.email.trim());
      if (formState.file) payload.append("file", formState.file);

      const response = await fetch("/api/demo-request", {
        method: "POST",
        body: payload
      });

      if (!response.ok) {
        throw new Error("Submission failed");
      }

      setIsSubmitted(true);
      setFormState(initialForm);
      setErrors({});
    } catch (error) {
      console.error("Demo request error", error);
      setErrors((prev) => ({
        ...prev,
        email: language === "al" ? "Dërgimi dështoi. Provoni përsëri." : "Submission failed. Please try again."
      }));
    } finally {
      setIsSubmitting(false);
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
            className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-slate-900/40 px-4 py-4 backdrop-blur-md animate-fade-in-up motion-reduce:animate-none"
            onClick={(event) => {
              if (event.target === event.currentTarget) setIsOpen(false);
            }}
          >
            <div
              ref={modalPanelRef}
              className="w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl md:p-7"
            >
            <div className="flex items-start justify-between gap-4">
              <h3 className="text-2xl font-semibold tracking-tight text-slate-900">
                {language === "al"
                  ? demoType === "voicebot"
                    ? "Testoni voicebot-in tuaj të personalizuar"
                    : t.title
                  : demoType === "voicebot"
                    ? "Test Your Own Custom Voicebot"
                    : t.title}
              </h3>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded-md border border-slate-200 px-2.5 py-1 text-slate-600 transition hover:border-slate-300 hover:text-slate-900"
                aria-label={t.close}
              >
                x
              </button>
            </div>

            {isSubmitted ? (
              <div className="mt-5 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-900">
                <p className="font-medium">{t.success}</p>
              </div>
            ) : (
              <>
                <p className="mt-4 text-sm leading-relaxed text-slate-600">{t.description}</p>
                <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-800">{t.botName}</label>
                    <input
                      type="text"
                      value={formState.botName}
                      onChange={(event) => setFormState((prev) => ({ ...prev, botName: event.target.value }))}
                      placeholder={t.botNamePlaceholder}
                      className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none transition focus:border-kosovo-deep"
                    />
                    {errors.botName ? <p className="mt-1 text-xs text-rose-600">{errors.botName}</p> : null}
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-800">{t.botDescription}</label>
                    <textarea
                      value={formState.description}
                      onChange={(event) => setFormState((prev) => ({ ...prev, description: event.target.value }))}
                      placeholder={t.botDescriptionPlaceholder}
                      className="min-h-[110px] w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none transition focus:border-kosovo-deep"
                    />
                    {errors.description ? (
                      <p className="mt-1 text-xs text-rose-600">{errors.description}</p>
                    ) : null}
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-800">{t.uploadLabel}</label>
                    <input
                      type="file"
                      accept=".pdf,.docx,.txt,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain"
                      onChange={(event) =>
                        setFormState((prev) => ({ ...prev, file: event.target.files?.[0] ?? null }))
                      }
                      className="w-full rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-2.5 text-sm text-slate-700 file:mr-3 file:rounded-md file:border-0 file:bg-kosovo-pale file:px-3 file:py-1.5 file:text-kosovo-deep"
                    />
                    <p className="mt-1 text-xs text-slate-500">{t.uploadHint}</p>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-800">{t.email}</label>
                    <input
                      type="email"
                      value={formState.email}
                      onChange={(event) => setFormState((prev) => ({ ...prev, email: event.target.value }))}
                      placeholder={t.emailPlaceholder}
                      className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none transition focus:border-kosovo-deep"
                    />
                    {errors.email ? <p className="mt-1 text-xs text-rose-600">{errors.email}</p> : null}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex w-full items-center justify-center rounded-xl bg-kosovo-deep px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {isSubmitting ? t.loading : t.submit}
                  </button>
                </form>
              </>
            )}

            <p className="mt-4 text-xs leading-relaxed text-slate-500">{t.warning}</p>
            </div>
          </div>
        ) : null}
      </ModalPortal>
    </>
  );
}
