"use client";

import { useState } from "react";
import ModalPortal from "@/components/ModalPortal";

type CostEstimateButtonProps = {
  label: string;
};

export default function CostEstimateButton({ label }: CostEstimateButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

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
                Kosto për chatbot pa zë
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
              Kostoja për chatbot pa zë është më e lehtë për t&apos;u llogaritur. Kostot bazë
              përfshijnë implementimin dhe mirëmbajtjen mujore.
            </p>

            <ul className="mt-4 space-y-2 rounded-xl border border-kosovo-sky/20 bg-kosovo-pale/60 p-4 text-sm text-slate-800">
              <li className="flex gap-2">
                <span className="mt-0.5 text-kosovo-deep">•</span>
                <span>
                  <strong>Implementimi:</strong> mund të fillojë nga 500 EUR dhe të shkojë mbi
                  10,000 EUR, varësisht nga kompleksiteti.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="mt-0.5 text-kosovo-deep">•</span>
                <span>
                  <strong>Mirëmbajtja mujore:</strong> zakonisht nis nga 50 EUR dhe mund të shkojë
                  mbi 1,000 EUR.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="mt-0.5 text-kosovo-deep">•</span>
                <span>
                  Këto kosto varen nga volumi i kontakteve, kompleksiteti i implementimit, numri i
                  API-ve të përdorura, sasia e dokumenteve për trajnim dhe faktorë të tjerë.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="mt-0.5 text-kosovo-deep">•</span>
                <span>
                  Mirëmbajtja bazë përfshin mirëmbajtjen e përgjithshme të implementimit dhe
                  rreth 4 deri në 8 orë quality management në muaj.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="mt-0.5 text-kosovo-deep">•</span>
                <span>
                  Implementimet shtesë mund të realizohen falas ose me pagesë ekstra, varësisht nga
                  kompleksiteti.
                </span>
              </li>
            </ul>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="mt-5 rounded-xl bg-kosovo-deep px-5 py-2.5 text-sm font-medium text-white transition hover:bg-sky-700"
            >
              Mbyll
            </button>
            </div>
          </div>
        ) : null}
      </ModalPortal>
    </>
  );
}
