"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import DemoRequestButton from "@/components/DemoRequestButton";
import CostEstimateButton from "@/components/CostEstimateButton";
import VoicebotCostButton from "@/components/VoicebotCostButton";
import ModalPortal from "@/components/ModalPortal";
import AutomationDiscoveryButton from "@/components/AutomationDiscoveryButton";

function IconMessage({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M7 9h10M7 13h6M8 21l-2-3H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2h-5l-3 3z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconFlow({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 7h4l2-3h4l2 3h4M9 17h6M12 14v6M7 21h10"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconDocs({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M9 3h7l3 3v13a2 2 0 01-2 2H9a2 2 0 01-2-2V5a2 2 0 012-2z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      <path d="M9 3v4h5" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round" />
    </svg>
  );
}

function IconPhone({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6.5 3h4l1.5 4.5-2 1.2c.8 1.6 2.2 3 3.8 3.8l1.2-2L21 9.5V14a3 3 0 01-3 3 9 9 0 01-9-9V6a3 3 0 013-3z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconWave({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 12c2-3 4-3 6 0s4 3 6 0 4-3 6 0M4 16c2-3 4-3 6 0s4 3 6 0 4-3 6 0"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconChannels({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 6h16M4 12h10M4 18h16"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

type Language = "al" | "en";
type HowPopupType = "analysis" | "build" | "implement" | "post";

const content = {
  al: {
    offerLabel: "Oferta Jonë",
    contact: "Kontakt",
    albotsHome: "ALBotics Home",
    badge: "Zgjidhje për Kosovë dhe tregun shqipfolës",
    heroTitle: "Zgjidhje AI që e bëjnë shërbimin ndaj klientit më të shpejtë, më të mençur dhe më të lehtë",
    heroSubtitle:
      "Ne ndërtojmë chatbot inteligjentë, voicebot dhe sisteme automatizimi për biznese që duan të kursejnë kohë, të përmirësojnë përvojën e klientit dhe të mbështesin ekipet e tyre në mënyrë më efikase.",
    heroCta: "Na Kontaktoni",
    introTitle: "Çfarë ofrojmë",
    introText:
      "Oferta jonë përfshin zgjidhje inteligjente për klientët dhe ekipet e brendshme, të implementueshme në shumë kanale si website, telefon, WhatsApp, Instagram dhe më shumë.",
    howTitle: "Si funksionon",
    howDetailsButton: "Shiko analizën e procesit",
    howDetailsTitle: "Analiza e rastit të përdorimit dhe proceseve",
    howDetailsText:
      "Një implementim i suksesshëm fillon me një kuptim të plotë të rastit të përdorimit dhe proceseve të kompanisë. Kjo fazë përfshin:",
    howDetailsPoints: [
      "Identifikimin e pikave të kontaktit me klientin",
      "Përcaktimin e kanaleve të komunikimit (website, telefon, WhatsApp, etj.)",
      "Analizimin e proceseve që inicjohen nga këto ndërveprime",
      "Vlerësimin e burimeve të të dhënave dhe njohurive (databaza, dokumente, sisteme ekzistuese)",
      "Identifikimin e pengesave kryesore (bottlenecks) dhe sfidave operative",
      "Zbulimin e mundësive për automatizim dhe optimizim"
    ],
    howDetailsEnding:
      "Pas kësaj analize të detajuar, krijohet një pasqyrë e qartë e proceseve, e cila shërben si bazë për projektimin dhe implementimin e zgjidhjes më të përshtatshme.",
    buildDetailsButton: "Shiko ndërtimin e zgjidhjes",
    buildDetailsTitle: "Ndërtimi dhe personalizimi i zgjidhjes",
    buildDetailsText:
      "Pas analizës dhe krijimit të planit, fillon faza e ndërtimit dhe personalizimit të zgjidhjes. Kjo fazë përfshin:",
    buildDetailsPoints: [
      "Përshtatjen e zgjidhjes sipas nevojave specifike të klientit, jo me qasje të njëjtë për të gjithë",
      "Konfigurimin e asistentëve (chatbot/voicebot) bazuar në përmbajtjen, proceset dhe brendin e kompanisë",
      "Trajnimin e AI aty ku është e nevojshme, në varësi të kompleksitetit dhe volumit të të dhënave",
      "Integrimin me API, databaza dhe sisteme ekzistuese, sipas kërkesave të biznesit",
      "Përcaktimin e kanaleve të përdorimit (website, telefon, WhatsApp, etj.) dhe shkallës së implementimit",
      "Zgjedhjen e teknologjisë së duhur, jo çdo zgjidhje kërkon AI, dhe jo çdo problem duhet zgjidhur me modele probabilistike",
      "Optimizimin e balancës mes automatizimit dhe thjeshtësisë, për të shmangur kompleksitetin e panevojshëm"
    ],
    buildDetailsEnding:
      "Në ALBotics, qasja është gjithmonë e njëjtë: zgjidhja i përshtatet klientit dhe nevojave të tij reale, jo trendit apo teknologjisë në treg.",
    implementDetailsButton: "Shiko fazën e implementimit",
    implementDetailsTitle: "Implementimi në kanalet tuaja",
    implementDetailsText:
      "Pas përfundimit të analizës dhe personalizimit, faza e implementimit zakonisht bëhet më e drejtpërdrejtë dhe efikase. Kjo fazë përfshin:",
    implementDetailsPoints: [
      "Fillimin e implementimit teknologjik bazuar në planin e dakorduar",
      "Përdorimin e teknologjive të përzgjedhura në bashkëpunim me klientin",
      "Integrimin e zgjidhjes në kanalet përkatëse (website, telefon, WhatsApp, etj.)",
      "Testimin e vazhdueshëm të çdo komponenti për të siguruar funksionim të saktë dhe stabil",
      "Validimin e ndërveprimeve reale me klientin për të garantuar përvojë të mirë përdorimi",
      "Bashkëpunim të ngushtë me ekipin e klientit gjatë gjithë procesit të implementimit"
    ],
    implementDetailsEnding:
      "Pas vendosjes në përdorim, zgjidhja monitorohet dhe përmirësohet vazhdimisht për të optimizuar performancën dhe për t'iu përshtatur nevojave në zhvillim të biznesit.",
    postDetailsButton: "Shiko fazën post-implementim",
    postDetailsTitle: "Post-Implementim dhe Përmirësim i Vazhdueshëm",
    postDetailsText:
      "Puna nuk përfundon me implementimin, në fakt, aty fillon faza më e rëndësishme për suksesin afatgjatë. Kjo fazë përfshin:",
    postDetailsPoints: [
      "Monitorimin e vazhdueshëm të performancës së zgjidhjes në përdorim real",
      "Kontrollin e cilësisë (quality control) për të siguruar përgjigje të sakta dhe eksperiencë të mirë për përdoruesit",
      "Identifikimin e mundësive për përmirësim bazuar në përdorim, komente dhe të dhëna reale",
      "Përditësimin dhe optimizimin e asistentëve, proceseve dhe integrimeve",
      "Përshtatjen e zgjidhjes me ndryshimet në nevojat e klientëve dhe biznesit"
    ],
    postDetailsEnding:
      "Në ALBotics, besojmë që implementimi është vetëm hapi i parë, përmirësimi i vazhdueshëm është çelësi i vërtetë i suksesit. Nevojat e konsumatorëve ndryshojnë vazhdimisht, dhe për këtë arsye edhe zgjidhjet duhet të evoluojnë në mënyrë të vazhdueshme.",
    closeLabel: "Mbyll",
    howItems: [
      {
        step: "1",
        title: "Kuptojmë rastin tuaj të përdorimit",
        text: "Analizojmë objektivat, kanalet dhe proceset për të ndërtuar zgjidhje që përshtatet me biznesin tuaj."
      },
      {
        step: "2",
        title: "Ndërtojmë dhe personalizojmë zgjidhjen",
        text: "Trajnojmë dhe konfigurojmë asistentët, proceset dhe integrimet sipas përmbajtjes dhe brendit tuaj."
      },
      {
        step: "3",
        title: "E implementojmë në kanalet tuaja",
        text: "E vendosim në website, telefon ose kanale mesazhesh dhe e përmirësojmë vazhdimisht me ekipin tuaj."
      },
      {
        step: "4",
        title: "Post-Implementim dhe Përmirësim i Vazhdueshëm",
        text: "Monitorojmë, përmirësojmë dhe e përshtatim zgjidhjen vazhdimisht bazuar në përdorim real dhe nevoja të reja."
      }
    ],
    servicesTitle: "Shërbimet kryesore",
    servicesSubtitle: "Zgjidhje praktike me AI, me përdorim real dhe vlerë të matshme për biznesin.",
    channelsBadge: "Omnichannel",
    channelsTitle: "Një strategji, shumë kanale",
    channelsText:
      "Të gjitha zgjidhjet tona mund të implementohen në kanalet që përdorin klientët tuaj, për një përvojë të unifikuar dhe efikase.",
    channels: ["Website", "Telefon", "WhatsApp", "Instagram", "Messenger", "Kanale të tjera biznesi"],
    whyTitle: "Pse ka rëndësi kjo",
    whyText: "Rezultate të qarta për klientët dhe stafin, pa premtime të ekzagjeruara.",
    whyItems: [
      "Shërbim më i shpejtë ndaj klientit",
      "Disponueshmëri 24/7",
      "Më pak ngarkesë në punë repetetive",
      "Përvojë më e mirë për klientin",
      "Mbështetje për punonjësit",
      "Automatizim i shkallëzueshëm",
      "Zgjidhje të lokalizuara në gjuhën shqipe"
    ],
    finalTitle: "Doni të shihni si funksionon për biznesin tuaj?",
    finalText:
      "Na kontaktoni për të diskutuar rastin tuaj dhe për të zgjedhur chatbot-in, voicebot-in ose zgjidhjen e duhur të automatizimit për kompaninë tuaj.",
    finalCta: "Na Kontaktoni për Më Shumë",
    footerText: "Automatizim AI për shërbim modern ndaj klientit.",
    serviceA: {
      title: "Chatbot Inteligjent për Klientë",
      desc: "Një chatbot i trajnuar me të dhënat e kompanisë që ofron përgjigje të shpejta 24/7, relevante dhe me pasaktësi minimale. Interface personalizohet sipas brendit tuaj.",
      ctas: ["Kërko demo të personalizuar", "Kalkulo koston"],
      points: [
        "Përgjigjet pyetjeve të klientëve",
        "Jep informacion nga të dhënat e kompanisë",
        "Ofron mbështetje 24/7",
        "Përshtatet me UI dhe branding-un tuaj",
        "Ulet ngarkesa repetetive e suportit"
      ]
    },
    serviceB: {
      title: "Automatizim Procesesh",
      desc: "Një Interface interaktive që nis dhe mbështet procese kyçe në uebsajt. Nuk është vetëm chatbot pyetje-përgjigje, por një mjet që ndihmon klientin të kryejë veprime reale.",
      ctas: ["Hulumto mundësi automatizimi"],
      points: [
        "Verifikim përdoruesi",
        "Menaxhim porosish",
        "Mbledhje të dhënash",
        "Rezervim takimesh",
        "Kërkesa shërbimesh",
        "Kualifikim kërkesash"
      ]
    },
    serviceC: {
      title: "Asistent i Brendshëm për Punonjës",
      desc: "Chatbot i brendshëm i trajnuar mbi dokumentet dhe njohuritë e kompanisë, i dobishëm sidomos për organizata me shumë procedura dhe burime të shpërndara.",
      points: [
        "Gjetje e shpejtë e informacionit",
        "Kuptim më i lehtë i dokumentacionit të brendshëm",
        "Mbështetje në punën e përditshme",
        "Më pak kohë duke kërkuar në dokumente"
      ],
      security:
        "Kjo zgjidhje mund të implementohet në mjedis LLM të izoluar, pa qasje të jashtme, në serverë lokalë ose privatë për siguri dhe kontroll maksimal."
    },
    serviceD: {
      title: "Voicebot Inteligjent",
      desc: "Voicebot i ndërtuar për thirrje hyrëse dhe skenarë repetetivë të shërbimit. Shërben si mjet mbështetës për stafin, jo zëvendësim i tij.",
      points: [
        "Përgjigjet thirrjeve repetetive hyrëse",
        "Mbështet ekipet e customer service",
        "Ul presionin mbi stafin",
        "Lejon stafin të fokusohet në punë me vlerë më të lartë",
        "Integrohet në rrjedhën e punës së biznesit"
      ]
    },
    serviceE: {
      title: "Voicebot në Gjuhën Shqipe",
      desc: "Voicebot me cilësi të lartë në shqip, zë natyral dhe vonesë minimale, i dizajnuar për biznese që ofrojnë suport telefonik në tregun shqiptar.",
      ctas: ["Kërko demo të personalizuar", "Kalkulo koston"],
      points: [
        "Përvojë cilësore zanore në shqip",
        "Latencë e ulët për biseda natyrale",
        "I dobishëm për suport dhe pyetje telefonike repetetive",
        "Vlerë e lartë për Kosovë dhe tregun shqipfolës"
      ]
    }
  },
  en: {
    offerLabel: "Our Offer",
    contact: "Contact",
    albotsHome: "ALBotics Home",
    badge: "Solutions for Kosovo and Albanian-speaking markets",
    heroTitle: "AI Solutions That Make Customer Service Faster, Smarter, and Easier",
    heroSubtitle:
      "We build intelligent chatbots, voicebots, and automation systems for businesses that want to save time, improve customer experience, and support their teams more efficiently.",
    heroCta: "Contact Us",
    introTitle: "What we deliver",
    introText:
      "Our offer includes intelligent customer-facing and internal AI solutions that can be implemented across multiple channels, including website, phone, WhatsApp, Instagram, and more.",
    howTitle: "How it works",
    howDetailsButton: "View process analysis",
    howDetailsTitle: "Use case and process analysis",
    howDetailsText:
      "A successful implementation starts with a complete understanding of the use case and company processes. This phase includes:",
    howDetailsPoints: [
      "Identifying customer contact points",
      "Defining communication channels (website, phone, WhatsApp, etc.)",
      "Analyzing which processes are triggered by these interactions",
      "Evaluating data and knowledge sources (databases, documents, existing systems)",
      "Identifying key bottlenecks and operational challenges",
      "Discovering automation and optimization opportunities"
    ],
    howDetailsEnding:
      "After this detailed analysis, a clear process view is created, which becomes the foundation for designing and implementing the most suitable solution.",
    buildDetailsButton: "View build details",
    buildDetailsTitle: "Building and solution customization",
    buildDetailsText:
      "After the analysis and planning stage, the build and customization phase begins. This phase includes:",
    buildDetailsPoints: [
      "Tailoring the solution to the client's specific needs, not a one-size-fits-all approach",
      "Configuring assistants (chatbot/voicebot) based on company content, processes, and brand",
      "Training AI where needed, depending on complexity and data volume",
      "Integrating with APIs, databases, and existing systems based on business requirements",
      "Defining usage channels (website, phone, WhatsApp, etc.) and implementation scope",
      "Choosing the right technology — not every solution needs AI, and not every problem should be solved with probabilistic models",
      "Optimizing the balance between automation and simplicity to avoid unnecessary complexity"
    ],
    buildDetailsEnding:
      "At ALBotics, the approach is always the same: the solution adapts to the client and real business needs — not market trends or hype.",
    implementDetailsButton: "View implementation phase",
    implementDetailsTitle: "Implementation in your channels",
    implementDetailsText:
      "After analysis and customization are completed, the implementation phase is typically more direct and efficient. This phase includes:",
    implementDetailsPoints: [
      "Starting technical implementation based on the agreed plan",
      "Using the selected tech stack in collaboration with the client",
      "Integrating the solution into relevant channels (website, phone, WhatsApp, etc.)",
      "Continuously testing each component to ensure stable and accurate operation",
      "Validating real customer interactions to ensure a strong user experience",
      "Working closely with the client team throughout implementation"
    ],
    implementDetailsEnding:
      "After go-live, the solution is monitored and continuously improved to optimize performance and adapt to evolving business needs.",
    postDetailsButton: "View post-implementation phase",
    postDetailsTitle: "Post-Implementation and Continuous Improvement",
    postDetailsText:
      "Work does not end with implementation — that is where the most important phase for long-term success begins. This phase includes:",
    postDetailsPoints: [
      "Continuous monitoring of solution performance in real usage",
      "Quality control to ensure accurate responses and a strong user experience",
      "Identifying improvement opportunities based on usage, feedback, and real data",
      "Updating and optimizing assistants, processes, and integrations",
      "Adapting the solution to changing customer and business needs"
    ],
    postDetailsEnding:
      "At ALBotics, we believe implementation is only the first step — continuous improvement is the real key to success. Customer needs evolve constantly, and solutions must evolve with them.",
    closeLabel: "Close",
    howItems: [
      {
        step: "1",
        title: "We understand your use case",
        text: "We map your goals, channels, and constraints to design a solution that fits your business."
      },
      {
        step: "2",
        title: "We build and customize the solution",
        text: "We train and configure assistants, flows, and integrations around your content and branding."
      },
      {
        step: "3",
        title: "We implement it into your channels",
        text: "We launch on web, phone, and messaging channels, then optimize together with your team."
      },
      {
        step: "4",
        title: "Post-Implementation and Continuous Improvement",
        text: "We continuously monitor, improve, and adapt the solution based on real usage and evolving needs."
      }
    ],
    servicesTitle: "Main services",
    servicesSubtitle: "Practical AI solutions with clear business scope and measurable outcomes.",
    channelsBadge: "Omnichannel",
    channelsTitle: "One strategy, many channels",
    channelsText:
      "All solutions can be implemented across the communication channels your customers already use.",
    channels: [
      "Website",
      "Phone",
      "WhatsApp",
      "Instagram",
      "Messenger",
      "Other business communication channels"
    ],
    whyTitle: "Why this matters",
    whyText: "Clear value for customers and teams, without exaggerated promises.",
    whyItems: [
      "Faster customer service",
      "24/7 availability",
      "Lower repetitive workload",
      "Better customer experience",
      "Support for employees",
      "Scalable automation",
      "Localized Albanian-language solutions"
    ],
    finalTitle: "Want to see how this could work for your business?",
    finalText:
      "Contact us to discuss your use case and explore the right chatbot, voicebot, or automation solution for your company.",
    finalCta: "Contact Us for More",
    footerText: "AI automation for modern customer service.",
    serviceA: {
      title: "Intelligent Customer Chatbot",
      desc: "An intelligent chatbot trained on company data and business information, delivering fast 24/7 support, relevant answers, and minimal hallucinations. The interface is customizable to your brand identity.",
      ctas: ["Request a custom demo", "Calculate cost"],
      points: [
        "Answers customer questions",
        "Provides information based on company data",
        "Offers 24/7 support",
        "Can be customized to your UI and branding",
        "Reduces repetitive support workload"
      ]
    },
    serviceB: {
      title: "Process Automation",
      desc: "An interactive chatbot interface that supports key website processes. It is more than a simple bot; it helps customers complete actions directly on your website.",
      ctas: ["Explore automation opportunities"],
      points: [
        "User verification",
        "Order handling",
        "Data collection",
        "Booking appointments",
        "Service requests",
        "Request qualification"
      ]
    },
    serviceC: {
      title: "Internal Employee Assistant",
      desc: "An internal chatbot trained on company documents and internal knowledge, especially useful in businesses with large volumes of procedures and resources.",
      points: [
        "Find information quickly",
        "Understand internal documentation",
        "Get support in daily work",
        "Reduce time spent searching through documents"
      ],
      security:
        "This solution can be implemented in an isolated LLM environment with no outside access, on local or private servers for maximum security and control."
    },
    serviceD: {
      title: "Intelligent Voicebot",
      desc: "An intelligent voicebot designed for repetitive inbound calls and repeated service scenarios. It is a support tool for employees, not a replacement for staff.",
      points: [
        "Answers repetitive inbound calls",
        "Supports customer service teams",
        "Reduces pressure on staff",
        "Helps employees focus on higher-value tasks",
        "Integrates into business workflows"
      ]
    },
    serviceE: {
      title: "Albanian Voicebot",
      desc: "A high-quality Albanian-language voicebot with natural speech and low latency, designed for businesses that need voice-based support in Albanian.",
      ctas: ["Request a custom demo", "Calculate cost"],
      points: [
        "High-quality Albanian voice experience",
        "Low latency for natural conversations",
        "Useful for support and repeated phone inquiries",
        "Especially valuable in Kosovo and Albanian-speaking markets"
      ]
    }
  }
} as const;

export default function OurOfferPage() {
  const [lang, setLang] = useState<Language>("al");
  const [howPopupType, setHowPopupType] = useState<HowPopupType | null>(null);
  const t = useMemo(() => content[lang], [lang]);

  const activePopup =
    howPopupType === "build"
      ? {
          title: t.buildDetailsTitle,
          text: t.buildDetailsText,
          points: t.buildDetailsPoints,
          ending: t.buildDetailsEnding
        }
      : howPopupType === "implement"
        ? {
            title: t.implementDetailsTitle,
            text: t.implementDetailsText,
            points: t.implementDetailsPoints,
            ending: t.implementDetailsEnding
          }
        : howPopupType === "post"
          ? {
              title: t.postDetailsTitle,
              text: t.postDetailsText,
              points: t.postDetailsPoints,
              ending: t.postDetailsEnding
            }
      : {
          title: t.howDetailsTitle,
          text: t.howDetailsText,
          points: t.howDetailsPoints,
          ending: t.howDetailsEnding
        };

  const serviceCards = [
    { icon: IconMessage, data: t.serviceA },
    { icon: IconFlow, data: t.serviceB },
    { icon: IconDocs, data: t.serviceC },
    { icon: IconWave, data: t.serviceE }
  ];

  return (
    <main className="relative overflow-hidden">
      <div className="pointer-events-none absolute -left-16 top-20 h-60 w-60 rounded-full bg-kosovo-sky/25 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-0 h-80 w-80 rounded-full bg-kosovo-gold/30 blur-3xl" />

      <header className="section-shell border-b border-white/60 pb-6 pt-8 md:pt-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="rounded-full border border-kosovo-deep/25 bg-white px-4 py-2 text-sm font-semibold tracking-tight text-kosovo-deep shadow-sm transition hover:border-kosovo-deep/40 hover:bg-kosovo-pale"
            >
              ALBotics Home
            </Link>
            <Link
              href="/our-offer"
              className="rounded-full border border-kosovo-deep/25 bg-white px-4 py-2 text-sm font-semibold tracking-tight text-kosovo-deep shadow-sm transition hover:border-kosovo-deep/40 hover:bg-kosovo-pale"
            >
              Oferta Jonë
            </Link>
          </div>
          <nav className="flex flex-wrap items-center gap-4 text-sm text-slate-600">
            <button
              onClick={() => setLang("al")}
              className={`rounded-full px-3 py-1 transition ${
                lang === "al" ? "bg-kosovo-deep text-white" : "hover:text-slate-900"
              }`}
              type="button"
            >
              Shq
            </button>
            <button
              onClick={() => setLang("en")}
              className={`rounded-full px-3 py-1 transition ${
                lang === "en" ? "bg-kosovo-deep text-white" : "hover:text-slate-900"
              }`}
              type="button"
            >
              EN
            </button>
            <Link href="/#contact" className="transition hover:text-slate-900">
              {t.contact}
            </Link>
            <a href="mailto:service@albotics.com" className="transition hover:text-slate-900">
              service@albotics.com
            </a>
          </nav>
        </div>
      </header>

      {/* 1. Hero */}
      <section
        id="offer-hero"
        className="section-shell animate-fade-in-up pb-16 pt-4 motion-reduce:animate-none md:pb-20 md:pt-6"
      >
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex rounded-full border border-kosovo-sky/35 bg-kosovo-pale px-4 py-1 text-sm text-kosovo-deep">
            {t.badge}
          </span>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight text-slate-900 md:text-5xl">
            {t.heroTitle}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-slate-700 md:text-xl">
            {t.heroSubtitle}
          </p>
          <div className="mt-10">
            <a
              href="#offer-contact"
              className="inline-flex rounded-xl bg-kosovo-deep px-8 py-3.5 text-sm font-medium text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-sky-700 hover:shadow-md motion-reduce:transform-none"
            >
              {t.heroCta}
            </a>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="section-shell border-t border-slate-200/80 py-16 md:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">{t.introTitle}</h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">
            {t.introText}
          </p>
        </div>
      </section>

      {/* Optional: How it works */}
      <section className="section-shell bg-white/40 py-12 md:py-16">
        <h2 className="text-center text-2xl font-semibold tracking-tight md:text-3xl">
          {t.howTitle}
        </h2>
        <div className="mx-auto mt-10 grid max-w-5xl gap-6 md:grid-cols-2 xl:grid-cols-4">
          {t.howItems.map((item) => (
            <div
              key={item.step}
              className="card flex flex-col items-center text-center motion-reduce:transform-none"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-kosovo-deep text-sm font-semibold text-white">
                {item.step}
              </span>
              <h3 className="mt-4 text-lg font-semibold text-slate-900">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.text}</p>
              {item.step === "1" || item.step === "2" || item.step === "3" || item.step === "4" ? (
                <button
                  type="button"
                  onClick={() =>
                    setHowPopupType(
                      item.step === "1"
                        ? "analysis"
                        : item.step === "2"
                          ? "build"
                          : item.step === "3"
                            ? "implement"
                            : "post"
                    )
                  }
                  className="mt-4 rounded-lg border border-kosovo-deep/20 bg-white px-4 py-2 text-sm font-medium text-kosovo-deep transition hover:border-kosovo-deep/40 hover:bg-kosovo-pale"
                >
                  {item.step === "1"
                    ? t.howDetailsButton
                    : item.step === "2"
                      ? t.buildDetailsButton
                      : item.step === "3"
                        ? t.implementDetailsButton
                        : t.postDetailsButton}
                </button>
              ) : null}
            </div>
          ))}
        </div>
      </section>

      {/* 3. Service cards */}
      <section id="services-detail" className="section-shell py-16 md:py-24">
        <h2 className="text-center text-3xl font-semibold tracking-tight md:text-4xl">
          {t.servicesTitle}
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-slate-600">
          {t.servicesSubtitle}
        </p>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {serviceCards.map((card) => {
            const Icon = card.icon;
            return (
              <article className="card group" key={card.data.title}>
                <div className="flex items-start gap-4">
                  <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-kosovo-pale text-kosovo-deep ring-1 ring-kosovo-sky/30 transition group-hover:bg-white">
                    <Icon className="h-6 w-6" />
                  </span>
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900">{card.data.title}</h3>
                    <p className="mt-3 leading-relaxed text-slate-600">{card.data.desc}</p>
                    <ul className="mt-4 space-y-2 text-sm text-slate-700">
                      {card.data.points.map((li) => (
                        <li key={li} className="flex gap-2">
                          <span className="mt-0.5 text-kosovo-deep">✓</span>
                          <span>{li}</span>
                        </li>
                      ))}
                    </ul>
                    {"ctas" in card.data ? (
                      <div className="mt-5 flex flex-wrap gap-2.5">
                        {card.data.ctas.map((cta, index) =>
                          card.data.title === t.serviceB.title && index === 0 ? (
                            <AutomationDiscoveryButton key={cta} label={cta} />
                          ) : index === 0 ? (
                            <DemoRequestButton
                              key={cta}
                              label={cta}
                              language={lang}
                              demoType={card.data.title === t.serviceE.title ? "voicebot" : "chatbot"}
                            />
                          ) : card.data.title === t.serviceA.title && index === 1 ? (
                            <CostEstimateButton key={cta} label={cta} />
                          ) : card.data.title === t.serviceE.title && index === 1 ? (
                            <VoicebotCostButton key={cta} label={cta} />
                          ) : (
                            <button
                              key={cta}
                              type="button"
                              className="rounded-lg border border-kosovo-deep/20 bg-white px-4 py-2 text-sm font-medium text-kosovo-deep transition hover:border-kosovo-deep/40 hover:bg-kosovo-pale"
                            >
                              {cta}
                            </button>
                          )
                        )}
                      </div>
                    ) : null}
                    {"security" in card.data ? (
                      <p className="mt-4 rounded-xl border border-kosovo-sky/25 bg-kosovo-pale/80 px-4 py-3 text-sm leading-relaxed text-slate-800">
                        <strong className="font-semibold text-kosovo-deep">Security:</strong>{" "}
                        {card.data.security}
                      </p>
                    ) : null}
                  </div>
                </div>
              </article>
            );
          })}

        </div>
      </section>

      {/* 4. Multichannel */}
      <section className="section-shell border-t border-slate-200/80 py-16 md:py-20">
        <div className="grid items-start gap-10 lg:grid-cols-2">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-kosovo-sky/30 bg-white px-3 py-1 text-xs font-medium uppercase tracking-wide text-kosovo-deep">
              <IconChannels className="h-4 w-4" />
              {t.channelsBadge}
            </span>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">
              {t.channelsTitle}
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              {t.channelsText}
            </p>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {t.channels.map((ch) => (
              <li
                key={ch}
                className="flex items-center gap-3 rounded-2xl border border-white/80 bg-white/90 px-4 py-3 text-sm font-medium text-slate-800 shadow-sm transition hover:border-kosovo-sky/40 hover:shadow-md motion-reduce:transform-none"
              >
                <span className="h-2 w-2 shrink-0 rounded-full bg-kosovo-deep" />
                {ch}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 5. Why this matters */}
      <section className="section-shell bg-white/35 py-16 md:py-20">
        <h2 className="text-center text-3xl font-semibold tracking-tight md:text-4xl">
          {t.whyTitle}
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-slate-600">
          {t.whyText}
        </p>
        <div className="mx-auto mt-12 grid max-w-3xl gap-3 sm:grid-cols-2">
          {t.whyItems.map((item) => (
            <div
              key={item}
              className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-white px-4 py-3.5 text-slate-800 shadow-sm"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-kosovo-pale text-kosovo-deep">
                ✓
              </span>
              <span className="font-medium">{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Final CTA */}
      <section id="offer-contact" className="section-shell pb-24 pt-8 md:pb-32">
        <div className="relative overflow-hidden rounded-3xl border border-kosovo-deep/15 bg-gradient-to-br from-kosovo-deep via-sky-700 to-kosovo-deep px-8 py-14 text-center text-white shadow-xl md:px-16 md:py-16">
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-kosovo-gold/20 blur-3xl" />
          <div className="relative mx-auto max-w-2xl">
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
              {t.finalTitle}
            </h2>
            <p className="mt-5 text-lg text-sky-100">
              {t.finalText}
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/#contact"
                className="inline-flex rounded-xl bg-white px-8 py-3.5 text-sm font-semibold text-kosovo-deep shadow-sm transition hover:-translate-y-0.5 hover:bg-sky-50 motion-reduce:transform-none"
              >
                {t.finalCta}
              </Link>
              <a
                href="mailto:service@albotics.com"
                className="inline-flex rounded-xl border border-white/40 px-6 py-3.5 text-sm font-medium text-white transition hover:bg-white/10"
              >
                service@albotics.com
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200 py-10">
        <div className="section-shell flex flex-col gap-2 py-0 text-sm text-slate-600 md:flex-row md:items-center md:justify-between">
          <p>
            <Link href="/" className="font-semibold text-slate-900 hover:underline">
              ALBotics
            </Link>{" "}
            — {t.footerText}
          </p>
          <a className="transition hover:text-slate-900" href="mailto:service@albotics.com">
            service@albotics.com
          </a>
        </div>
      </footer>

      <ModalPortal>
        {howPopupType ? (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 px-5 backdrop-blur-md"
            onClick={(event) => {
              if (event.target === event.currentTarget) setHowPopupType(null);
            }}
          >
            <div className="max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-slate-200 bg-white p-4 shadow-xl md:p-5">
            <div className="flex items-start justify-between gap-4">
              <h3 className="text-lg font-semibold text-slate-900 md:text-xl">{activePopup.title}</h3>
              <button
                type="button"
                onClick={() => setHowPopupType(null)}
                className="rounded-md border border-slate-200 px-2 py-0.5 text-sm text-slate-600 transition hover:border-slate-300 hover:text-slate-900"
                aria-label={t.closeLabel}
              >
                x
              </button>
            </div>
            <p className="mt-3 text-base leading-relaxed text-slate-700">{activePopup.text}</p>
            <ul className="mt-3 space-y-1.5 rounded-xl border border-kosovo-sky/20 bg-kosovo-pale/60 p-3 text-sm text-slate-800">
              {activePopup.points.map((point) => (
                <li key={point} className="flex gap-2">
                  <span className="mt-0.5 text-kosovo-deep">•</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-base leading-relaxed text-slate-700">{activePopup.ending}</p>
            <button
              type="button"
              onClick={() => setHowPopupType(null)}
              className="mt-4 rounded-xl bg-kosovo-deep px-5 py-2 text-sm font-medium text-white transition hover:bg-sky-700"
            >
              {t.closeLabel}
            </button>
            </div>
          </div>
        ) : null}
      </ModalPortal>
    </main>
  );
}
