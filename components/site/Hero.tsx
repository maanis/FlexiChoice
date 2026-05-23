"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  ShieldCheck,
  TrendingUp,
  CheckCircle2,
  Sparkles,
  BadgeCheck,
  BarChart3,
  PieChart,
  IndianRupee,
  Activity,
  HeartPulse,
  Users,
  ShieldPlus
} from "lucide-react";
import { motion, animate, AnimatePresence } from "framer-motion";
import { MacWindow } from "./MacWindow";
import { useStore } from "@nanostores/react";
import { activeTabStore } from "@/store/activeTab";
import { cn } from "@/lib/utils";

const formatIN = (num: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Math.max(0, num));

const formatCompact = (num: number) => {
  if (num >= 10000000) return `₹${(num / 10000000).toFixed(1)} Cr`;
  if (num >= 100000) return `₹${(num / 100000).toFixed(1)}L`;
  if (num >= 1000) return `₹${(num / 1000).toFixed(1)}k`;
  return `₹${Math.round(num)}`;
};

function AnimatedNumber({
  value,
  formatter,
}: {
  value: number;
  formatter: (v: number) => string;
}) {
  const nodeRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = nodeRef.current;
    if (!node) return;
    const controls = animate(0, value, {
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate(v) {
        node.textContent = formatter(v);
      },
    });
    return () => controls.stop();
  }, [value, formatter]);

  return <span ref={nodeRef} />;
}

const bars = [38, 56, 44, 72, 60, 84, 70, 92, 65, 78, 88];

const floatAnimation = {
  initial: { y: 20, opacity: 0 },
  animate: { y: 0, opacity: 1 },
};

const floatingHover = {
  y: [-5, 5, -5],
  transition: { duration: 6, repeat: Infinity, ease: "easeInOut" as const },
};

export function Hero() {
  const activeTab = useStore(activeTabStore);
  const [inputValue, setInputValue] = useState("");
  const [calcKey, setCalcKey] = useState(0);

  // Combined metrics for both Loans and Insurance
  const [metrics, setMetrics] = useState({
    // Loan Metrics
    sanctioned: 4200000,
    emi: 36248,
    preApproved: 500000,
    // Insurance Metrics
    coverage: 10000000,
    premium: 850,
    hospitals: 10500,
    criticalIllness: 1000000,
  });

  // Clear input when switching tabs for a clean UX
  useEffect(() => {
    setInputValue("");
  }, [activeTab]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\D/g, "");
    if (!rawValue) {
      setInputValue("");
      return;
    }
    setInputValue(Number(rawValue).toLocaleString("en-IN"));
  };

  const handleCalculate = () => {
    const amount = Number(inputValue.replace(/\D/g, ""));
    if (!amount || amount <= 0) return;

    if (activeTab === "loans") {
      const ratePerYear = 8.4;
      const r = ratePerYear / 12 / 100;
      const n = 240;
      const calculatedEmi = (amount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);

      setMetrics(prev => ({
        ...prev,
        sanctioned: amount,
        emi: calculatedEmi,
        preApproved: amount * 0.15,
      }));
    } else {
      // Insurance Calculation Logic (Rough estimation)
      const calculatedPremium = (amount / 100000) * 8.5; // Roughly 850/mo per Cr

      setMetrics(prev => ({
        ...prev,
        coverage: amount,
        premium: calculatedPremium,
        criticalIllness: amount * 0.10, // 10% of base cover as rider
      }));
    }
    setCalcKey((prev) => prev + 1);
  };

  return (
    <section
      className="relative overflow-hidden bg-zinc-50 pt-28 pb-20 dark:bg-[#050505] md:pt-36 md:pb-32 font-sans selection:bg-blue-500/30"
      aria-label="Hero section"
    >
      <div
        className={cn(
          "pointer-events-none absolute inset-x-0 -top-24 mx-auto hidden h-[600px] max-w-5xl bg-gradient-to-b to-transparent blur-[100px] md:block transition-colors duration-700",
          activeTab === "loans" ? "from-blue-500/10 dark:from-blue-600/15" : "from-emerald-500/10 dark:from-emerald-600/15"
        )}
        aria-hidden
      />
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className={cn(
          "pointer-events-none absolute -left-32 top-40 hidden h-[400px] w-[400px] rounded-full blur-[120px] md:block transition-colors duration-700",
          activeTab === "loans" ? "bg-cyan-500/20 dark:bg-cyan-500/10" : "bg-teal-500/20 dark:bg-teal-500/10"
        )}
        aria-hidden
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-4 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20 sm:px-6 lg:px-8">

        {/* =========================================
            LEFT COLUMN 
        ========================================= */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
          }}
          className="relative z-10"
        >
          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            className="mb-8 flex items-center gap-4"
          >
            <div className="flex -space-x-2">
              <Image src="https://randomuser.me/api/portraits/women/44.jpg" alt="Customer" width={32} height={32} className="h-8 w-8 rounded-full border-2 border-zinc-50 object-cover dark:border-[#050505]" />
              <Image src="https://randomuser.me/api/portraits/men/32.jpg" alt="Customer" width={32} height={32} className="h-8 w-8 rounded-full border-2 border-zinc-50 object-cover dark:border-[#050505]" />
              <Image src="https://randomuser.me/api/portraits/women/68.jpg" alt="Customer" width={32} height={32} className="h-8 w-8 rounded-full border-2 border-zinc-50 object-cover dark:border-[#050505]" />
            </div>
            <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
              Joined by <span className="font-bold text-zinc-900 dark:text-white">25,000+</span> happy customers
            </p>
          </motion.div>

          <div className="h-[280px] md:h-[240px] relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0"
              >
                <h1 className="text-[3.5rem] font-black leading-[0.9] tracking-tighter text-zinc-900 dark:text-white md:text-[5rem] lg:text-[5.1rem]">
                  {activeTab === "loans" ? (
                    <>
                      Flexi Choice <br />
                      <span className="bg-gradient-to-r from-blue-600 font-serif to-cyan-500 bg-clip-text text-transparent">
                        choice is yours.
                      </span>
                    </>
                  ) : (
                    <>
                      Secure your <br />
                      <span className="bg-gradient-to-r from-emerald-500 font-serif to-teal-400 bg-clip-text text-transparent">
                        future today.
                      </span>
                    </>
                  )}
                  <span className="sr-only"> Best loans and insurance services in India.</span>
                </h1>

                <p className="mt-6 max-w-md text-lg font-medium leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {activeTab === "loans"
                    ? "Bypass the bureaucratic maze. Access premium loans, tailor-made solutions, and expert advisory — sanctioned at lightning speed from 30+ top Indian banks."
                    : "Protect what matters most. Get comprehensive life, health, and vehicle insurance plans with lightning-fast claim settlements and expert guidance."}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            className="mt-10 max-w-md"
          >
            <div className={cn(
              "group flex h-16 items-center justify-between rounded-2xl border bg-white p-2 shadow-sm transition-all dark:bg-zinc-900/50",
              activeTab === "loans" ? "border-zinc-200 focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10 dark:border-zinc-800 dark:focus-within:border-blue-500" : "border-zinc-200 focus-within:border-emerald-500 focus-within:ring-4 focus-within:ring-emerald-500/10 dark:border-zinc-800 dark:focus-within:border-emerald-500"
            )}>
              <div className="flex items-center gap-3 pl-4 w-full">
                <IndianRupee className="h-5 w-5 text-zinc-400" />
                <input
                  type="text"
                  value={inputValue}
                  onChange={handleInputChange}
                  onKeyDown={(e) => e.key === "Enter" && handleCalculate()}
                  placeholder={activeTab === "loans" ? "Enter loan amount (e.g. 50,00,000)" : "Enter coverage amount (e.g. 1,00,00,000)"}
                  aria-label="Enter amount to calculate"
                  className="w-full bg-transparent text-sm sm:text-base font-semibold text-zinc-900 outline-none placeholder:text-[11px] sm:placeholder:text-sm placeholder:font-medium placeholder:text-zinc-400 dark:text-white"
                />
              </div>
              <button
                onClick={handleCalculate}
                className={cn(
                  "flex h-full items-center justify-center rounded-xl px-6 font-bold text-white transition-transform hover:scale-[0.98] active:scale-95 shrink-0",
                  activeTab === "loans" ? "bg-blue-600" : "bg-emerald-600"
                )}
              >
                {activeTab === "loans" ? "Calculate EMI" : "Get Quotes"}
              </button>
            </div>
            <p className="mt-3 text-xs font-medium text-zinc-500 dark:text-zinc-500">
              No credit score impact • Results instantly updated
            </p>
          </motion.div>

          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            className={cn(
              "mt-12 flex items-center gap-8 border-l-2 pl-6 transition-colors",
              activeTab === "loans" ? "border-blue-500 dark:border-blue-500/50" : "border-emerald-500 dark:border-emerald-500/50"
            )}
          >
            <div>
              <p className="text-3xl font-black tracking-tight text-zinc-900 dark:text-white">
                {activeTab === "loans" ? "₹500Cr+" : "₹2000Cr+"}
              </p>
              <p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                {activeTab === "loans" ? "Disbursed" : "Coverage Provided"}
              </p>
            </div>
            <div>
              <p className="text-3xl font-black tracking-tight text-zinc-900 dark:text-white">
                {activeTab === "loans" ? "98%" : "99.2%"}
              </p>
              <p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                {activeTab === "loans" ? "Approval Rate" : "Claim Settlement"}
              </p>
            </div>
          </motion.div>
        </motion.div>


        {/* =========================================
            RIGHT COLUMN — DYNAMIC METRICS
        ========================================= */}
        <div className="relative h-[380px] w-full perspective-1000 md:h-[640px]">

          {/* Main MacWindow */}
          <motion.div
            variants={floatAnimation}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="absolute inset-x-0 top-4 mx-auto z-20 w-[95%] max-w-[400px] md:inset-x-auto md:left-4 md:top-12 md:w-[85%] md:max-w-[340px]"
          >
            <motion.div animate={floatingHover}>
              <MacWindow
                title={activeTab === "loans" ? "Overview · Portfolio" : "Coverage · Estimate"}
                className="border-zinc-200 bg-white/95 shadow-2xl backdrop-blur-md md:backdrop-blur-xl dark:border-zinc-800/80 dark:bg-zinc-900/90 dark:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] transform-gpu"
              >
                <div className="space-y-4 p-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                        {activeTab === "loans" ? "Home Loan Approval" : "Estimated Coverage"}
                      </p>
                      <p className="mt-1 text-[26px] font-black tracking-tight text-zinc-900 dark:text-white" key={calcKey}>
                        <AnimatedNumber
                          value={activeTab === "loans" ? metrics.sanctioned : metrics.coverage}
                          formatter={formatIN}
                        />
                      </p>
                    </div>
                    <span className={cn(
                      "rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-wide",
                      activeTab === "loans"
                        ? "border-blue-500/20 bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400"
                        : "border-emerald-500/20 bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400"
                    )}>
                      {activeTab === "loans" ? "Sanctioned" : "Active Quote"}
                    </span>
                  </div>

                  {/* Dynamic Visual Area */}
                  {activeTab === "loans" ? (
                    <div key={`loan-vis-${calcKey}`} className="flex h-24 items-end gap-1.5 rounded-xl border border-zinc-100 bg-zinc-50 p-3 dark:border-zinc-800/50 dark:bg-zinc-800/30">
                      {bars.map((h, i) => (
                        <motion.div
                          key={i}
                          initial={{ height: 0 }}
                          animate={{ height: `${h}%` }}
                          transition={{ duration: 1, delay: 0.2 + i * 0.05, type: "spring" }}
                          className="flex-1 rounded-[2px] bg-gradient-to-t from-zinc-300 to-zinc-400 dark:from-zinc-600 dark:to-zinc-500"
                        />
                      ))}
                    </div>
                  ) : (
                    <div key={`ins-vis-${calcKey}`} className="flex h-24 flex-col justify-end gap-2 rounded-xl border border-zinc-100 bg-zinc-50 p-3 dark:border-zinc-800/50 dark:bg-zinc-800/30">
                      <div className="flex justify-between text-xs font-bold text-zinc-500">
                        <span>Base Cover</span>
                        <span className="text-emerald-500">No Claim Bonus (+50%)</span>
                      </div>
                      <div className="h-4 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-700 flex">
                        <motion.div initial={{ width: 0 }} animate={{ width: "66%" }} transition={{ duration: 1 }} className="h-full bg-emerald-500" />
                        <motion.div initial={{ width: 0 }} animate={{ width: "34%" }} transition={{ duration: 1, delay: 0.5 }} className="h-full bg-teal-300 dark:bg-teal-400" />
                      </div>
                      <p className="text-[9px] text-zinc-400 uppercase tracking-widest mt-1">Bonus builds over claim-free years</p>
                    </div>
                  )}

                  {/* Dynamic Grid */}
                  {activeTab === "loans" ? (
                    <div className="grid grid-cols-3 gap-2.5">
                      <div className="rounded-xl border border-zinc-100 bg-zinc-50 px-3 py-2.5 dark:border-zinc-800/50 dark:bg-zinc-800/50">
                        <p className="text-[9px] font-bold uppercase tracking-wider text-zinc-500">EMI</p>
                        <p className="mt-1 text-[13px] font-bold text-zinc-900 dark:text-white" key={`emi-${calcKey}`}>
                          <AnimatedNumber value={metrics.emi} formatter={formatCompact} />
                        </p>
                      </div>
                      <div className="rounded-xl border border-zinc-100 bg-zinc-50 px-3 py-2.5 dark:border-zinc-800/50 dark:bg-zinc-800/50">
                        <p className="text-[9px] font-bold uppercase tracking-wider text-zinc-500">Tenure</p>
                        <p className="mt-1 text-[13px] font-bold text-zinc-900 dark:text-white">20 Yrs</p>
                      </div>
                      <div className="rounded-xl border border-zinc-100 bg-zinc-50 px-3 py-2.5 dark:border-zinc-800/50 dark:bg-zinc-800/50">
                        <p className="text-[9px] font-bold uppercase tracking-wider text-zinc-500">Rate</p>
                        <p className="mt-1 text-[13px] font-bold text-zinc-900 dark:text-white">8.4%</p>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-3 gap-2.5">
                      <div className="col-span-1 rounded-xl border border-zinc-100 bg-zinc-50 px-3 py-2.5 dark:border-zinc-800/50 dark:bg-zinc-800/50">
                        <p className="text-[9px] font-bold uppercase tracking-wider text-zinc-500">Premium</p>
                        <p className="mt-1 text-[13px] font-bold text-emerald-600 dark:text-emerald-400" key={`prem-${calcKey}`}>
                          <AnimatedNumber value={metrics.premium} formatter={formatCompact} /><span className="text-[9px] text-zinc-400">/mo</span>
                        </p>
                      </div>
                      <div className="col-span-2 rounded-xl border border-zinc-100 bg-zinc-50 px-3 py-2.5 dark:border-zinc-800/50 dark:bg-zinc-800/50 flex items-center justify-between">
                        <div>
                          <p className="text-[9px] font-bold uppercase tracking-wider text-zinc-500">Dependents</p>
                          <p className="mt-1 text-[13px] font-bold text-zinc-900 dark:text-white">4 Members</p>
                        </div>
                        <Users className="h-4 w-4 text-zinc-400" />
                      </div>
                    </div>
                  )}
                </div>
              </MacWindow>
            </motion.div>
          </motion.div>

          {/* Floating Card 1 (Top Right) */}
          <motion.div
            variants={floatAnimation}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="absolute right-0 top-32 z-30 hidden w-[65%] max-w-[260px] md:block"
          >
            <motion.div
              animate={{ y: [-3, 3, -3] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="rounded-2xl border border-zinc-200 bg-white/90 p-5 shadow-xl backdrop-blur-md md:backdrop-blur-xl dark:border-zinc-800/80 dark:bg-zinc-900/90 transform-gpu"
            >
              <div className="flex items-start gap-4">
                <span className={cn(
                  "grid h-12 w-12 shrink-0 place-items-center rounded-2xl border",
                  activeTab === "loans" ? "border-cyan-500/20 bg-cyan-50 text-cyan-600 dark:bg-cyan-500/10 dark:text-cyan-400" : "border-rose-500/20 bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400"
                )}>
                  {activeTab === "loans" ? <ShieldCheck className="h-6 w-6" /> : <HeartPulse className="h-6 w-6" />}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[14px] font-bold text-zinc-900 dark:text-white">
                    {activeTab === "loans" ? "Term Life Cover" : "Critical Illness"}
                  </p>
                  <p className="mt-0.5 text-[11px] font-medium text-zinc-500 whitespace-nowrap" key={`float1-${calcKey}`}>
                    {activeTab === "loans" ? (
                      <><AnimatedNumber value={20000000} formatter={formatCompact} /> · Active</>
                    ) : (
                      <><AnimatedNumber value={metrics.criticalIllness} formatter={formatCompact} /> · Rider</>
                    )}
                  </p>
                  <div className="mt-3.5 flex items-center justify-between">
                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
                      <motion.div
                        key={activeTab}
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className={cn("h-full rounded-full", activeTab === "loans" ? "bg-cyan-500" : "bg-rose-500")}
                      />
                    </div>
                    <span className={cn("ml-3 text-[10px] font-bold uppercase tracking-wider", activeTab === "loans" ? "text-cyan-500" : "text-rose-500")}>
                      Secured
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Floating Card 2 (Bottom Right) */}
          <motion.div
            variants={floatAnimation}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="absolute bottom-24 right-4 z-20 hidden w-[70%] max-w-[280px] md:block"
          >
            <motion.div
              animate={{ y: [-4, 4, -4] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="rounded-2xl border border-zinc-200 bg-white/90 p-5 shadow-xl backdrop-blur-md md:backdrop-blur-xl dark:border-zinc-800/80 dark:bg-zinc-900/90 transform-gpu"
            >
              <div className="mb-4 flex items-center gap-3">
                <span className={cn(
                  "grid h-10 w-10 place-items-center rounded-xl border",
                  activeTab === "loans" ? "border-blue-500/20 bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400" : "border-emerald-500/20 bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400"
                )}>
                  {activeTab === "loans" ? <BadgeCheck className="h-5 w-5" /> : <ShieldPlus className="h-5 w-5" />}
                </span>
                <div className="min-w-0">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                    {activeTab === "loans" ? "HDFC Bank" : "Claim Settlement"}
                  </p>
                  <p className="text-[14px] font-bold text-zinc-900 dark:text-white">
                    {activeTab === "loans" ? "Pre-approved Limit" : "Approved in < 2 hrs"}
                  </p>
                </div>
              </div>
              <div className="rounded-xl border border-zinc-100 bg-zinc-50 p-3 dark:border-zinc-800/50 dark:bg-zinc-800/50">
                <div className="flex items-end justify-between">
                  <div>
                    <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                      {activeTab === "loans" ? "Available Credit" : "Network Hospitals"}
                    </p>
                    <p className="text-[18px] font-black text-zinc-900 dark:text-white" key={`float2-${calcKey}`}>
                      {activeTab === "loans" ? (
                        <AnimatedNumber value={metrics.preApproved} formatter={formatIN} />
                      ) : (
                        <><AnimatedNumber value={metrics.hospitals} formatter={(v) => Math.round(v).toString()} />+</>
                      )}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                      {activeTab === "loans" ? "Interest" : "Ratio"}
                    </p>
                    <p className={cn("text-[13px] font-bold", activeTab === "loans" ? "text-blue-600 dark:text-blue-400" : "text-emerald-600 dark:text-emerald-400")}>
                      {activeTab === "loans" ? "10.5% p.a." : "99.2%"}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Floating Card 3 (Bottom Left) */}
          <motion.div
            variants={floatAnimation}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            className="absolute bottom-12 left-2 z-30 hidden md:block"
          >
            <motion.div
              animate={{ y: [4, -4, 4] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              className="flex items-center gap-3.5 rounded-2xl border border-zinc-200 bg-white/95 px-5 py-4 shadow-xl backdrop-blur-md md:backdrop-blur-xl dark:border-zinc-800/80 dark:bg-zinc-900/90 transform-gpu"
            >
              <div
                className="relative grid h-12 w-12 place-items-center rounded-full border-2 border-zinc-100 bg-white shadow-inner dark:border-zinc-800 dark:bg-zinc-900"
                key={`float3-${activeTab}`}
              >
                <svg className="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 36 36">
                  <motion.path
                    initial={{ strokeDasharray: "0, 100" }}
                    animate={{ strokeDasharray: "85, 100" }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className={activeTab === "loans" ? "text-blue-500" : "text-emerald-500"}
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                </svg>
                {activeTab === "loans" ? (
                  <TrendingUp className="h-5 w-5 text-zinc-900 dark:text-white" />
                ) : (
                  <Activity className="h-5 w-5 text-zinc-900 dark:text-white" />
                )}
              </div>
              <div className="leading-tight">
                <p className="mb-0.5 text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                  {activeTab === "loans" ? "CIBIL Score" : "Health Score"}
                </p>
                <p className="text-[18px] font-black text-zinc-900 dark:text-white">
                  {activeTab === "loans" ? "782" : "850"}{" "}
                  <span className={cn(
                    "ml-1.5 rounded-full border px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide",
                    activeTab === "loans" ? "border-blue-500/20 bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400" : "border-emerald-500/20 bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400"
                  )}>
                    Excellent
                  </span>
                </p>
              </div>
            </motion.div>
          </motion.div>

          <Sparkles className="absolute right-12 top-6 h-6 w-6 animate-pulse text-cyan-500/60" aria-hidden />
          <CheckCircle2 className="absolute bottom-8 left-1/2 h-6 w-6 text-blue-500/40" aria-hidden />
          <PieChart className="absolute right-1/4 top-1/4 h-7 w-7 text-zinc-400/30 dark:text-zinc-600/30" aria-hidden />
          <BarChart3 className="absolute left-12 top-1/3 h-6 w-6 text-zinc-300 dark:text-zinc-700" aria-hidden />
        </div>
      </div>
    </section>
  );
}