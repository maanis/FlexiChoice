"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, animate } from "framer-motion";
import { Calculator as CalcIcon, Activity, IndianRupee, PieChart, ShieldPlus, User, Users } from "lucide-react";
import { MacWindow } from "./MacWindow";

const formatIN = (num: number) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(Math.max(0, num));
const formatCompact = (num: number) => new Intl.NumberFormat("en-IN", { maximumFractionDigits: 1 }).format(num);

function AnimatedNumber({ value, formatter }: { value: number; formatter: (n: number) => string }) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const node = nodeRef.current;
    if (!node) return;
    const controls = animate(0, value, {
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate(v) { node.textContent = formatter(v); },
    });
    return () => controls.stop();
  }, [value, formatter]);
  return <span ref={nodeRef} />;
}

function RangeInput({ label, value, min, max, step, suffix = "", prefix = "", onChange, themeColor }: {
  label: string; value: number; min: number; max: number; step: number;
  suffix?: string; prefix?: string; onChange: (v: number) => void; themeColor: string;
}) {
  return (
    <div className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-zinc-200/50 bg-white p-6 shadow-sm transition-all hover:border-zinc-300 hover:shadow-md dark:border-zinc-800/50 dark:bg-zinc-900/40 dark:hover:border-zinc-700 dark:hover:bg-zinc-900/80">
      <div className="mb-6 flex items-start justify-between">
        <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">{label}</label>
        <div className="text-right">
          <span className="text-3xl font-black tracking-tighter text-zinc-900 dark:text-white">{prefix}{formatCompact(value)}</span>
          <span className="ml-1 text-sm font-bold text-zinc-400">{suffix}</span>
        </div>
      </div>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))} className={`h-2 w-full cursor-pointer appearance-none rounded-full bg-zinc-100 dark:bg-zinc-800 ${themeColor}`} />
    </div>
  );
}

export function Calculator() {
  const [activeTab, setActiveTab] = useState<"emi" | "eligibility" | "health">("emi");
  const [emiAmount, setEmiAmount] = useState(5000000);
  const [emiRate, setEmiRate] = useState(8.5);
  const [emiTenure, setEmiTenure] = useState(20);
  const [income, setIncome] = useState(100000);
  const [existingEmi, setExistingEmi] = useState(0);
  const [eligibilityRate, setEligibilityRate] = useState(8.5);
  const [eligibilityTenure, setEligibilityTenure] = useState(20);
  const [age, setAge] = useState(30);
  const [coverage, setCoverage] = useState(10000000);
  const [familySize, setFamilySize] = useState<"self" | "couple" | "family">("family");

  const calculateEMI = () => {
    const r = emiRate / 12 / 100;
    const n = emiTenure * 12;
    if (r === 0) return emiAmount / n;
    return (emiAmount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  };
  const calculateEligibility = () => {
    const maxEmi = income * 0.5 - existingEmi;
    if (maxEmi <= 0) return { maxLoan: 0, maxEmi: 0 };
    const r = eligibilityRate / 12 / 100;
    const n = eligibilityTenure * 12;
    const maxLoan = maxEmi / ((r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1));
    return { maxLoan, maxEmi };
  };
  const calculateHealth = () => {
    let base = 5000;
    if (age > 30) base += (age - 30) * 150;
    base += (coverage / 500000) * 1200;
    if (familySize === "couple") base *= 1.5;
    if (familySize === "family") base *= 2.2;
    return base;
  };

  const emiResult = calculateEMI();
  const totalPayment = emiResult * emiTenure * 12;
  const totalInterest = totalPayment - emiAmount;
  const eligResult = calculateEligibility();
  const healthPremium = calculateHealth();

  const themes = {
    emi: { glow: "from-blue-500/20 dark:from-blue-600/15", text: "text-blue-600 dark:text-blue-400", bg: "bg-blue-600", accent: "accent-blue-600", iconBg: "bg-blue-50 dark:bg-blue-500/10 border-blue-100 dark:border-blue-500/20", border: "border-blue-500" },
    eligibility: { glow: "from-emerald-500/20 dark:from-emerald-600/15", text: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-600", accent: "accent-emerald-600", iconBg: "bg-emerald-50 dark:bg-emerald-500/10 border-emerald-100 dark:border-emerald-500/20", border: "border-emerald-500" },
    health: { glow: "from-rose-500/20 dark:from-rose-600/15", text: "text-rose-600 dark:text-rose-400", bg: "bg-rose-600", accent: "accent-rose-600", iconBg: "bg-rose-50 dark:bg-rose-500/10 border-rose-100 dark:border-rose-500/20", border: "border-rose-500" },
  };
  const currentTheme = themes[activeTab];

  return (
    <section className="relative overflow-hidden bg-zinc-50 py-24 font-sans selection:bg-zinc-500/30 dark:bg-[#050505] md:py-32" aria-label="Financial calculators">
      <div className={`pointer-events-none absolute right-0 top-1/4 hidden h-[800px] w-[800px] -translate-y-1/2 translate-x-1/3 bg-gradient-to-l to-transparent blur-[120px] transition-colors duration-1000 md:block ${currentTheme.glow}`} aria-hidden />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white/50 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-zinc-900 shadow-sm backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-900/50 dark:text-white">
              <CalcIcon className={`h-4 w-4 transition-colors duration-500 ${currentTheme.text}`} />
              Smart Calculators
            </div>
            <h2 className="text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white sm:text-5xl md:text-6xl leading-[1.1]">
              Crunch the numbers. <br />
              <span className="italic font-serif text-blue-600 dark:text-blue-500">Plan with precision.</span>
            </h2>
          </div>
        </div>

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8 items-start">
          <div className="lg:col-span-7 xl:col-span-8">
            <div className="mb-12 flex space-x-1 rounded-2xl border border-zinc-200 bg-white p-1.5 shadow-sm dark:border-zinc-800/80 dark:bg-zinc-900/50">
              {(["emi", "eligibility", "health"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  aria-pressed={activeTab === tab}
                  className={`relative flex-1 py-3.5 text-sm font-bold uppercase tracking-wider transition-colors duration-300 ${activeTab === tab ? "text-zinc-900 dark:text-white" : "text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"}`}
                >
                  {activeTab === tab && (
                    <motion.div layoutId="calcTabBubble" className="absolute inset-0 rounded-xl bg-zinc-100 dark:bg-zinc-800" transition={{ type: "spring", bounce: 0.2, duration: 0.6 }} />
                  )}
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {tab === "emi" && "Loan EMI"}
                    {tab === "eligibility" && "Eligibility"}
                    {tab === "health" && "Health Cover"}
                  </span>
                </button>
              ))}
            </div>

            <div className="min-h-[400px]">
              <AnimatePresence mode="wait">
                {activeTab === "emi" && (
                  <motion.div key="emi" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="grid gap-4 sm:grid-cols-2">
                    <div className="sm:col-span-2"><RangeInput label="Loan Amount" value={emiAmount} min={100000} max={100000000} step={100000} prefix="₹" themeColor={currentTheme.accent} onChange={setEmiAmount} /></div>
                    <RangeInput label="Interest Rate" value={emiRate} min={5} max={20} step={0.1} suffix="%" themeColor={currentTheme.accent} onChange={setEmiRate} />
                    <RangeInput label="Tenure" value={emiTenure} min={1} max={30} step={1} suffix=" Yrs" themeColor={currentTheme.accent} onChange={setEmiTenure} />
                  </motion.div>
                )}
                {activeTab === "eligibility" && (
                  <motion.div key="eligibility" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="grid gap-4 sm:grid-cols-2">
                    <RangeInput label="Net Monthly Income" value={income} min={20000} max={1000000} step={5000} prefix="₹" themeColor={currentTheme.accent} onChange={setIncome} />
                    <RangeInput label="Existing EMIs" value={existingEmi} min={0} max={500000} step={1000} prefix="₹" themeColor={currentTheme.accent} onChange={setExistingEmi} />
                    <RangeInput label="Expected Rate" value={eligibilityRate} min={5} max={20} step={0.1} suffix="%" themeColor={currentTheme.accent} onChange={setEligibilityRate} />
                    <RangeInput label="Desired Tenure" value={eligibilityTenure} min={1} max={30} step={1} suffix=" Yrs" themeColor={currentTheme.accent} onChange={setEligibilityTenure} />
                  </motion.div>
                )}
                {activeTab === "health" && (
                  <motion.div key="health" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="grid gap-4 sm:grid-cols-2">
                    <div className="sm:col-span-2"><RangeInput label="Coverage Amount" value={coverage} min={500000} max={20000000} step={500000} prefix="₹" themeColor={currentTheme.accent} onChange={setCoverage} /></div>
                    <RangeInput label="Eldest Member Age" value={age} min={18} max={75} step={1} suffix=" Yrs" themeColor={currentTheme.accent} onChange={setAge} />
                    <div className="flex flex-col justify-between overflow-hidden rounded-3xl border border-zinc-200/50 bg-white p-6 shadow-sm dark:border-zinc-800/50 dark:bg-zinc-900/40">
                      <label className="mb-4 block text-xs font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">Family Size</label>
                      <div className="flex h-full gap-2">
                        {[{ id: "self", icon: User }, { id: "couple", icon: Users }, { id: "family", icon: ShieldPlus }].map((opt) => (
                          <button key={opt.id} onClick={() => setFamilySize(opt.id as "self" | "couple" | "family")} aria-pressed={familySize === opt.id} className={`flex flex-1 items-center justify-center rounded-2xl border transition-all duration-300 ${familySize === opt.id ? `${currentTheme.border} ${currentTheme.iconBg} ${currentTheme.text}` : "border-zinc-200 bg-zinc-50 text-zinc-400 hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-800/50 dark:hover:bg-zinc-800"}`}>
                            <opt.icon className="h-6 w-6" />
                          </button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-32">
            <MacWindow title="Live Simulation" className="border-zinc-200 bg-white/95 shadow-2xl backdrop-blur-xl dark:border-zinc-800/80 dark:bg-zinc-900/90 dark:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] min-h-[520px]">
              <div className="p-8 flex flex-col h-full justify-between">
                <AnimatePresence mode="wait">
                  {activeTab === "emi" && (
                    <motion.div key="emi-res" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="flex flex-col h-full">
                      <div className="mb-12">
                        <div className={`mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl border ${currentTheme.iconBg}`}><IndianRupee className={`h-6 w-6 ${currentTheme.text}`} /></div>
                        <p className="mb-2 text-xs font-bold uppercase tracking-widest text-zinc-500">Monthly EMI</p>
                        <h3 className={`text-[3.5rem] font-black leading-none tracking-tighter ${currentTheme.text}`}><AnimatedNumber value={emiResult} formatter={formatIN} /></h3>
                      </div>
                      <div className="mt-auto space-y-4 rounded-3xl border border-zinc-100 bg-zinc-50 p-6 dark:border-zinc-800/50 dark:bg-zinc-800/30">
                        <div className="flex justify-between items-end">
                          <div><p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Principal</p><p className="text-lg font-bold text-zinc-900 dark:text-white">{formatIN(emiAmount)}</p></div>
                          <div className="text-right"><p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Total Interest</p><p className="text-lg font-bold text-zinc-900 dark:text-white">{formatIN(totalInterest)}</p></div>
                        </div>
                        <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-700 flex">
                          <motion.div initial={{ width: 0 }} animate={{ width: `${(emiAmount / totalPayment) * 100}%` }} transition={{ duration: 1 }} className={`h-full ${currentTheme.bg}`} />
                          <motion.div initial={{ width: 0 }} animate={{ width: `${(totalInterest / totalPayment) * 100}%` }} transition={{ duration: 1 }} className="h-full bg-zinc-400 dark:bg-zinc-500" />
                        </div>
                      </div>
                    </motion.div>
                  )}
                  {activeTab === "eligibility" && (
                    <motion.div key="elig-res" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="flex flex-col h-full">
                      <div className="mb-12">
                        <div className={`mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl border ${currentTheme.iconBg}`}><Activity className={`h-6 w-6 ${currentTheme.text}`} /></div>
                        <p className="mb-2 text-xs font-bold uppercase tracking-widest text-zinc-500">Max Loan Amount</p>
                        <h3 className={`text-[3.5rem] font-black leading-none tracking-tighter ${currentTheme.text}`}><AnimatedNumber value={eligResult.maxLoan} formatter={formatIN} /></h3>
                      </div>
                      <div className="mt-auto rounded-3xl border border-zinc-100 bg-zinc-50 p-6 dark:border-zinc-800/50 dark:bg-zinc-800/30">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-2">Safe EMI Limit</p>
                        <p className="text-2xl font-black text-zinc-900 dark:text-white mb-3">{formatIN(eligResult.maxEmi)} <span className="text-sm font-medium text-zinc-400">/ mo</span></p>
                        <p className="text-xs font-medium text-zinc-500 leading-relaxed">Based on standard 50% FOIR (Fixed Obligation to Income Ratio).</p>
                      </div>
                    </motion.div>
                  )}
                  {activeTab === "health" && (
                    <motion.div key="health-res" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="flex flex-col h-full">
                      <div className="mb-12">
                        <div className={`mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl border ${currentTheme.iconBg}`}><ShieldPlus className={`h-6 w-6 ${currentTheme.text}`} /></div>
                        <p className="mb-2 text-xs font-bold uppercase tracking-widest text-zinc-500">Est. Annual Premium</p>
                        <h3 className={`text-[3.5rem] font-black leading-none tracking-tighter ${currentTheme.text}`}><AnimatedNumber value={healthPremium} formatter={formatIN} /></h3>
                      </div>
                      <div className="mt-auto rounded-3xl border border-zinc-100 bg-zinc-50 p-6 dark:border-zinc-800/50 dark:bg-zinc-800/30">
                        <div className="flex items-start gap-4">
                          <PieChart className={`h-6 w-6 mt-1 shrink-0 ${currentTheme.text}`} />
                          <div>
                            <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-1">Total Coverage</p>
                            <p className="text-xl font-black text-zinc-900 dark:text-white mb-2">{formatIN(coverage)}</p>
                            <p className="text-xs font-medium text-zinc-500 leading-relaxed">Comprehensive cashless treatment across 10,000+ network hospitals.</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </MacWindow>
          </div>
        </div>
      </div>
    </section>
  );
}
