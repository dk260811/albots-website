"use client";

import { FormEvent, useMemo, useState } from "react";

type Language = "en" | "al";

const content = {
  en: {
    nav: {
      services: "Services",
      capabilities: "AI Readiness",
      useCases: "Use Cases",
      whyUs: "Why Us",
      contact: "Contact"
    },
    hero: {
      badge: "Built for Albanian businesses",
      title: "AI Customer Service Automation for Albanian Businesses",
      subtitle: "Chatbots, Voicebots, and AI Agents that work 24/7 in Albanian.",
      cta: "Book a Demo"
    },
    services: {
      title: "Services",
      subtitle: "Practical AI products and automations for modern customer operations.",
      items: [
        {
          title: "Chatbots",
          description: "Website and messaging assistants that answer customers instantly."
        },
        {
          title: "Voicebots",
          description: "Natural voice calls that handle requests and route customers."
        },
        {
          title: "Automation",
          description: "Process automation for support flows, internal ops, and repetitive tasks."
        }
      ]
    },
    capabilities: {
      title: "Make Your Team AI-Era Ready",
      items: [
        "End-to-end process automation for customer service workflows",
        "Knowledge base maintenance and AI-ready content structuring",
        "Automated email responses and follow-up sequences",
        "Agent AI assist for your human support team",
        "In-house secure LLM deployments for sensitive business data"
      ]
    },
    useCases: {
      title: "Use Cases",
      items: [
        "Booking appointments",
        "Answering FAQs",
        "Handling calls automatically",
        "Lead generation",
        "Email triage and automated replies"
      ]
    },
    whyUs: {
      title: "Why Choose Us",
      items: [
        "Albanian language specialization",
        "Lower operational costs",
        "24/7 customer availability",
        "Easy integration with your tools"
      ]
    },
    contact: {
      title: "Ready to automate your support?",
      subtitle: "Send us a message and we will help you get started.",
      name: "Name",
      email: "Email",
      message: "Message",
      cta: "Get Started"
    },
    footer: {
      brand: "Albots",
      text: "AI automation for modern customer service.",
      email: "hello@albots.ai"
    }
  },
  al: {
    nav: {
      services: "Shërbime",
      capabilities: "Gatishmëri AI",
      useCases: "Përdorime",
      whyUs: "Pse Ne",
      contact: "Kontakt"
    },
    hero: {
      badge: "Ndërtuar për bizneset shqiptare",
      title: "Automatizimi i Shërbimit ndaj Klientit me AI për Bizneset Shqiptare",
      subtitle: "Chatbot, Voicebot dhe AI që punojnë 24/7 në gjuhën shqipe.",
      cta: "Rezervo një Demo"
    },
    services: {
      title: "Shërbimet",
      subtitle: "Produkte dhe automatizime praktike AI për operacione moderne me klientët.",
      items: [
        {
          title: "Chatbots",
          description: "Asistentë për web dhe mesazhe që përgjigjen menjëherë."
        },
        {
          title: "Voicebots",
          description: "Thirrje zanore natyrale që trajtojnë kërkesat e klientëve."
        },
        {
          title: "Automatizim",
          description: "Automatizim procesesh për suport, operacione të brendshme dhe detyra të përsëritura."
        }
      ]
    },
    capabilities: {
      title: "Bëjeni Ekipin tuaj gati për Erën AI",
      items: [
        "Automatizim i plotë i proceseve të shërbimit ndaj klientit",
        "Mirëmbajtje e knowledge base dhe strukturim i përmbajtjes për AI",
        "Automatizim i email-eve dhe sekuencave të ndjekjes",
        "AI assist për agjentët njerëzorë të suportit",
        "LLM i sigurt in-house për të dhëna sensitive të biznesit"
      ]
    },
    useCases: {
      title: "Rastet e Përdorimit",
      items: [
        "Rezervim takimesh",
        "Përgjigje për pyetjet e shpeshta",
        "Menaxhim automatik i thirrjeve",
        "Gjenerim leads",
        "Klasifikim email-esh dhe përgjigje automatike"
      ]
    },
    whyUs: {
      title: "Pse të na zgjidhni",
      items: [
        "Specializim në gjuhën shqipe",
        "Ulje e kostove operative",
        "Disponueshmëri 24/7",
        "Integrim i thjeshtë me mjetet tuaja"
      ]
    },
    contact: {
      title: "Gati të automatizoni suportin tuaj?",
      subtitle: "Na dërgoni një mesazh dhe ju ndihmojmë të filloni.",
      name: "Emri",
      email: "Email",
      message: "Mesazhi",
      cta: "Fillo Tani"
    },
    footer: {
      brand: "Albots",
      text: "Automatizim AI për shërbim modern ndaj klientit.",
      email: "hello@albots.ai"
    }
  }
};

export default function LandingPage() {
  const [lang, setLang] = useState<Language>("al");
  const t = useMemo(() => content[lang], [lang]);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    console.log("Contact form submit", {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
      language: lang
    });

    event.currentTarget.reset();
  };

  return (
    <main className="relative overflow-hidden">
      <div className="pointer-events-none absolute -left-16 top-20 h-60 w-60 rounded-full bg-kosovo-sky/25 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-0 h-80 w-80 rounded-full bg-kosovo-gold/30 blur-3xl" />

      <section className="section-shell pt-10 md:pt-14">
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold tracking-tight text-kosovo-deep">Albots</p>
          <div className="rounded-full border border-white/80 bg-white/90 p-1 shadow-sm backdrop-blur">
            <button
              onClick={() => setLang("en")}
              className={`rounded-full px-3 py-1 text-sm transition ${
                lang === "en" ? "bg-kosovo-deep text-white" : "text-slate-600 hover:text-slate-900"
              }`}
              type="button"
            >
              EN
            </button>
            <button
              onClick={() => setLang("al")}
              className={`rounded-full px-3 py-1 text-sm transition ${
                lang === "al" ? "bg-kosovo-deep text-white" : "text-slate-600 hover:text-slate-900"
              }`}
              type="button"
            >
              Shq
            </button>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-5 text-sm text-slate-600">
          <a href="#services" className="transition hover:text-slate-900">
            {t.nav.services}
          </a>
          <a href="#capabilities" className="transition hover:text-slate-900">
            {t.nav.capabilities}
          </a>
          <a href="#use-cases" className="transition hover:text-slate-900">
            {t.nav.useCases}
          </a>
          <a href="#why-us" className="transition hover:text-slate-900">
            {t.nav.whyUs}
          </a>
          <a href="#contact" className="transition hover:text-slate-900">
            {t.nav.contact}
          </a>
        </div>

        <div className="mt-20 grid items-center gap-10 md:grid-cols-2">
          <div className="max-w-3xl">
            <span className="inline-flex rounded-full border border-kosovo-sky/35 bg-kosovo-pale px-4 py-1 text-sm text-kosovo-deep">
              {t.hero.badge}
            </span>
            <h1 className="mt-5 text-4xl font-semibold tracking-tight md:text-6xl">{t.hero.title}</h1>
            <p className="mt-6 max-w-2xl text-lg text-slate-700 md:text-xl">{t.hero.subtitle}</p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a
                href="#contact"
                className="inline-flex rounded-xl bg-kosovo-deep px-6 py-3 text-sm font-medium text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-sky-700 hover:shadow-md"
              >
                {t.hero.cta}
              </a>
              <p className="inline-flex rounded-xl border border-kosovo-deep/20 bg-white px-4 py-3 text-sm text-kosovo-deep">
                {lang === "al"
                  ? "Telefono 01234567 për të testuar demon tonë."
                  : "Call 01234567 to test our demo."}
              </p>
            </div>
          </div>

          <div className="rounded-3xl border border-white/70 bg-gradient-to-br from-kosovo-sky to-kosovo-deep p-6 text-white shadow-lg">
            <p className="text-sm font-medium text-sky-100">{lang === "al" ? "Demo Live" : "Live Demo"}</p>
            <h3 className="mt-2 text-2xl font-semibold">
              {lang === "al" ? "Asistenti juaj AI, çdo minutë." : "Your AI assistant, every minute."}
            </h3>
            <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-2xl bg-white/15 p-4 backdrop-blur">
                <p className="text-sky-100">{lang === "al" ? "Përgjigje" : "Response Time"}</p>
                <p className="mt-1 text-xl font-semibold">&lt; 2s</p>
              </div>
              <div className="rounded-2xl bg-white/15 p-4 backdrop-blur">
                <p className="text-sky-100">{lang === "al" ? "Disponueshmëri" : "Availability"}</p>
                <p className="mt-1 text-xl font-semibold">24/7</p>
              </div>
              <div className="rounded-2xl bg-white/15 p-4 backdrop-blur">
                <p className="text-sky-100">{lang === "al" ? "Gjuhë" : "Languages"}</p>
                <p className="mt-1 text-xl font-semibold">Shq / EN / DEU / SRB / ...</p>
              </div>
              <div className="rounded-2xl bg-kosovo-gold p-4 text-slate-900">
                <p>{lang === "al" ? "Kursim Kostosh" : "Cost Saving"}</p>
                <p className="mt-1 text-xl font-semibold">-40%</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="section-shell">
        <h2 className="section-title">{t.services.title}</h2>
        <p className="section-subtitle">{t.services.subtitle}</p>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {t.services.items.map((item) => (
            <article className="card" key={item.title}>
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="mt-3 text-slate-600">{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="capabilities" className="section-shell">
        <h2 className="section-title">{t.capabilities.title}</h2>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {t.capabilities.items.map((item) => (
            <div key={item} className="card flex items-start gap-3 p-5">
              <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-kosovo-gold text-slate-900">
                AI
              </span>
              <p className="font-medium text-slate-800">{item}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="use-cases" className="section-shell">
        <h2 className="section-title">{t.useCases.title}</h2>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {t.useCases.items.map((item) => (
            <div key={item} className="card flex items-center gap-3 p-5">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-kosovo-pale text-kosovo-deep">
                ✓
              </span>
              <p className="font-medium text-slate-800">{item}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="why-us" className="section-shell">
        <h2 className="section-title">{t.whyUs.title}</h2>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {t.whyUs.items.map((item) => (
            <div key={item} className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
              <p className="font-medium text-slate-800">{item}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="contact" className="section-shell">
        <div className="rounded-3xl border border-slate-100 bg-white p-7 shadow-sm md:p-10">
          <h2 className="section-title">{t.contact.title}</h2>
          <p className="section-subtitle">{t.contact.subtitle}</p>
          <form className="mt-8 grid gap-4" onSubmit={onSubmit}>
            <input
              className="rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-kosovo-deep"
              type="text"
              name="name"
              placeholder={t.contact.name}
              required
            />
            <input
              className="rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-kosovo-deep"
              type="email"
              name="email"
              placeholder={t.contact.email}
              required
            />
            <textarea
              className="min-h-[130px] rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-kosovo-deep"
              name="message"
              placeholder={t.contact.message}
              required
            />
            <button
              className="mt-2 w-fit rounded-xl bg-kosovo-deep px-6 py-3 text-sm font-medium text-white transition hover:bg-sky-700"
              type="submit"
            >
              {t.contact.cta}
            </button>
          </form>
        </div>
      </section>

      <footer className="border-t border-slate-200 py-10">
        <div className="section-shell flex flex-col gap-2 py-0 text-sm text-slate-600 md:flex-row md:items-center md:justify-between">
          <p>
            <span className="font-semibold text-slate-900">{t.footer.brand}</span> - {t.footer.text}
          </p>
          <a className="transition hover:text-slate-900" href={`mailto:${t.footer.email}`}>
            {t.footer.email}
          </a>
        </div>
      </footer>
    </main>
  );
}
