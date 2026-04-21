"use client";

import { FormEvent, useMemo, useState } from "react";
import ModalPortal from "@/components/ModalPortal";

type VoicebotCostButtonProps = {
  label: string;
};

type CalculatorResult = {
  weeklyCallHours: number;
  requiredAgents: number;
  monthlyHumanCost: number;
  monthlyVoicebotMinutes: number;
  monthlyVoicebotCost: number;
  monthlySavings: number;
};

export default function VoicebotCostButton({ label }: VoicebotCostButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showCalculator, setShowCalculator] = useState(false);
  const [callsPerDay, setCallsPerDay] = useState("");
  const [monthlyDays, setMonthlyDays] = useState("30");
  const [avgDuration, setAvgDuration] = useState("");
  const [salaryPerAgent, setSalaryPerAgent] = useState("");
  const [costPerMinute, setCostPerMinute] = useState("1");
  const [result, setResult] = useState<CalculatorResult | null>(null);
  const parsedCallsPerDay = Number(callsPerDay) || 0;
  const parsedMonthlyDays = Number(monthlyDays) || 0;
  const parsedAvgDuration = Number(avgDuration) || 0;
  const parsedSalaryPerAgent = Number(salaryPerAgent) || 0;
  const parsedCostPerMinute = Number(costPerMinute) || 0;

  const hasValidInputs = useMemo(() => {
    const minuteCost = Number(costPerMinute);
    return (
      Number(callsPerDay) > 0 &&
      Number(monthlyDays) >= 1 &&
      Number(monthlyDays) <= 31 &&
      Number(avgDuration) > 0 &&
      Number(salaryPerAgent) > 0 &&
      minuteCost >= 0.05 &&
      minuteCost <= 1
    );
  }, [callsPerDay, monthlyDays, avgDuration, salaryPerAgent, costPerMinute]);

  const onCalculate = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!hasValidInputs) return;

    const calls = Number(callsPerDay);
    const monthDays = Number(monthlyDays);
    const durationMinutes = Number(avgDuration);
    const monthlySalary = Number(salaryPerAgent);
    const minuteCost = Number(costPerMinute);

    // Assumptions based on requested calculation model.
    const productiveMinutesPerAgentPerWeek = 25 * 60;
    const weeksPerMonth = 4.33;

    const weeklyCallMinutes = (calls * durationMinutes * monthDays) / weeksPerMonth;
    const weeklyCallHours = weeklyCallMinutes / 60;
    const requiredAgents = Math.max(1, Math.ceil(weeklyCallMinutes / productiveMinutesPerAgentPerWeek));
    const monthlyHumanCost = requiredAgents * monthlySalary;
    const monthlyVoicebotMinutes = calls * durationMinutes * monthDays;
    const monthlyVoicebotCost = monthlyVoicebotMinutes * minuteCost;
    const monthlySavings = monthlyHumanCost - monthlyVoicebotCost;

    setResult({
      weeklyCallHours,
      requiredAgents,
      monthlyHumanCost,
      monthlyVoicebotMinutes,
      monthlyVoicebotCost,
      monthlySavings
    });
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
                Kosto për voicebot në gjuhën shqipe
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

            <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200">
              <div
                className={`flex w-[200%] transition-transform duration-500 ease-out ${
                  showCalculator ? "-translate-x-1/2" : "translate-x-0"
                }`}
              >
                <section className="w-1/2 p-4 md:p-5">
                  <p className="text-sm leading-relaxed text-slate-700">
                    Ky vlerësim ju ndihmon të krahasoni koston e trajtimit të thirrjeve nga stafi me
                    koston e voicebot-it. Llogaritja bazohet në modelin: 1 agjent ka 40 orë/javë, por
                    vetëm 25 orë produktive për thirrje.
                  </p>

                  <ul className="mt-4 space-y-2 rounded-xl border border-kosovo-sky/20 bg-kosovo-pale/60 p-4 text-sm text-slate-800">
                    <li className="flex gap-2">
                      <span className="mt-0.5 text-kosovo-deep">•</span>
                      <span>
                        Kostoja për minutë e voicebot-it mund të variojë nga <strong>0.05 EUR</strong>{" "}
                        deri në <strong>1.00 EUR</strong>.
                      </span>
                    </li>
                    <li className="flex gap-2">
                      <span className="mt-0.5 text-kosovo-deep">•</span>
                      <span>Llogaritja e stafit bëhet mbi 25 orë produktive/javë për person.</span>
                    </li>
                  </ul>

                  <button
                    type="button"
                    onClick={() => setShowCalculator(true)}
                    className="mt-4 rounded-xl bg-kosovo-deep px-5 py-2.5 text-sm font-medium text-white transition hover:bg-sky-700"
                  >
                    Hap kalkulatorin
                  </button>
                </section>

                <section className="w-1/2 border-l border-slate-200 p-4 md:p-5">
                  <div className="mb-3 flex items-center justify-between">
                    <h4 className="text-sm font-semibold text-slate-900">Kalkulatori i kostos</h4>
                    <button
                      type="button"
                      onClick={() => setShowCalculator(false)}
                      className="text-xs font-medium text-kosovo-deep hover:underline"
                    >
                      Kthehu
                    </button>
                  </div>

                  <form onSubmit={onCalculate} className="space-y-4">
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-slate-800">Thirrje në ditë</label>
                      <input
                        type="number"
                        min={1}
                        value={callsPerDay}
                        onChange={(event) => setCallsPerDay(event.target.value)}
                        className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none transition focus:border-kosovo-deep"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-slate-800">
                        Ditë në muaj
                      </label>
                      <input
                        type="number"
                        min={1}
                        max={31}
                        value={monthlyDays}
                        onChange={(event) => setMonthlyDays(event.target.value)}
                        className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none transition focus:border-kosovo-deep"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-slate-800">
                        Kohëzgjatja mesatare e thirrjes (minuta)
                      </label>
                      <input
                        type="number"
                        min={1}
                        value={avgDuration}
                        onChange={(event) => setAvgDuration(event.target.value)}
                        className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none transition focus:border-kosovo-deep"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-slate-800">
                        Rroga mujore e një personi (EUR)
                      </label>
                      <input
                        type="number"
                        min={1}
                        value={salaryPerAgent}
                        onChange={(event) => setSalaryPerAgent(event.target.value)}
                        className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none transition focus:border-kosovo-deep"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-slate-800">
                        Kosto për minutë e voicebot-it (EUR)
                      </label>
                      <input
                        type="number"
                        min={0.05}
                        max={1}
                        step={0.01}
                        value={costPerMinute}
                        onChange={(event) => setCostPerMinute(event.target.value)}
                        className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none transition focus:border-kosovo-deep"
                      />
                      <p className="mt-1 text-xs text-slate-500">Vlerë e lejuar: 0.05 - 1.00 EUR</p>
                    </div>

                    <button
                      type="submit"
                      disabled={!hasValidInputs}
                      className="inline-flex w-full items-center justify-center rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      Kalkulo
                    </button>
                  </form>

                  <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs text-slate-700">
                    <p className="font-semibold text-slate-800">Llogaritja</p>
                    <p className="mt-2 font-mono">
                      Minuta mujore = Thirrje/ditë * Ditë/muaj * Minuta/thirrje
                    </p>
                    <p className="mt-1 font-mono">
                      = {parsedCallsPerDay || "X"} * {parsedMonthlyDays || "Y"} *{" "}
                      {parsedAvgDuration || "Z"} ={" "}
                      {(parsedCallsPerDay * parsedMonthlyDays * parsedAvgDuration).toFixed(2)} min
                    </p>
                    <p className="mt-2 font-mono">
                      Kosto voicebot/muaj = Minuta mujore * Kosto/minutë
                    </p>
                    <p className="mt-1 font-mono">
                      ={" "}
                      {(parsedCallsPerDay * parsedMonthlyDays * parsedAvgDuration).toFixed(2)} *{" "}
                      {parsedCostPerMinute || "P"} ={" "}
                      {(
                        parsedCallsPerDay *
                        parsedMonthlyDays *
                        parsedAvgDuration *
                        parsedCostPerMinute
                      ).toFixed(2)}{" "}
                      EUR
                    </p>
                    <p className="mt-2 font-mono">
                      Persona të nevojshëm = Orë thirrjesh/javë / 25 (25 orë, sepse më shumë se
                      25 orë në javë një person nuk mund të jetë produktiv)
                    </p>
                    <p className="mt-1 font-mono">
                      Kosto staf/muaj = Persona * Rroga/person
                    </p>
                    <p className="mt-1 font-mono">
                      = {result ? result.requiredAgents : "N"} * {parsedSalaryPerAgent || "R"} ={" "}
                      {result ? result.monthlyHumanCost.toFixed(2) : "?"} EUR
                    </p>
                  </div>
                </section>
              </div>
            </div>

            {result ? (
              <div className="mt-5 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900">
                <p>
                  <strong>Orë thirrjesh në javë:</strong> {result.weeklyCallHours.toFixed(2)} orë
                </p>
                <p className="mt-1">
                  <strong>Persona të nevojshëm:</strong> {result.requiredAgents}
                </p>
                <p className="mt-1">
                  <strong>Kosto mujore me staf:</strong> {result.monthlyHumanCost.toFixed(2)} EUR
                </p>
                <p className="mt-1">
                  <strong>Minuta mujore voicebot:</strong> {result.monthlyVoicebotMinutes.toFixed(0)} min
                </p>
                <p className="mt-1">
                  <strong>Kosto mujore voicebot:</strong> {result.monthlyVoicebotCost.toFixed(2)} EUR
                </p>
                <p className="mt-2 font-semibold">
                  <strong>Kursimi i vlerësuar:</strong> {result.monthlySavings.toFixed(2)} EUR / muaj
                </p>
              </div>
            ) : null}

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
