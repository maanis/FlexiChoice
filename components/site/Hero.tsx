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
} from "lucide-react";
import { motion, animate } from "framer-motion";
import { MacWindow } from "./MacWindow";

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
  const [inputValue, setInputValue] = useState("");
  const [calcKey, setCalcKey] = useState(0);
  const [metrics, setMetrics] = useState({
    sanctioned: 4200000,
    emi: 36248,
    cover: 20000000,
    preApproved: 500000,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\D/g, "");
    if (!rawValue) {
      setInputValue("");
      return;
    }
    setInputValue(Number(rawValue).toLocaleString("en-IN"));
  };

  const handleCalculate = () => {
    const principal = Number(inputValue.replace(/\D/g, ""));
    if (!principal || principal <= 0) return;
    const ratePerYear = 8.4;
    const r = ratePerYear / 12 / 100;
    const n = 240;
    const calculatedEmi =
      (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    setMetrics({
      sanctioned: principal,
      emi: calculatedEmi,
      cover: principal * 5,
      preApproved: principal * 0.15,
    });
    setCalcKey((prev) => prev + 1);
  };

  return (
    <section
      className="relative overflow-hidden bg-zinc-50 pt-28 pb-20 dark:bg-[#050505] md:pt-36 md:pb-32 font-sans selection:bg-blue-500/30"
      aria-label="Hero section"
    >
      <div
        className="pointer-events-none absolute inset-x-0 -top-24 mx-auto hidden h-[600px] max-w-5xl bg-gradient-to-b from-blue-500/10 to-transparent blur-[100px] dark:from-blue-600/15 md:block"
        aria-hidden
      />
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -left-32 top-40 hidden h-[400px] w-[400px] rounded-full bg-cyan-500/20 blur-[120px] dark:bg-cyan-500/10 md:block"
        aria-hidden
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-4 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20 sm:px-6 lg:px-8">
        {/* LEFT COLUMN */}
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
              <Image
                src="https://randomuser.me/api/portraits/women/44.jpg"
                alt="Happy FlexiChoice customer"
                width={32}
                height={32}
                className="h-8 w-8 rounded-full border-2 border-zinc-50 object-cover dark:border-[#050505]"
              />
              <Image
                src="https://randomuser.me/api/portraits/men/32.jpg"
                alt="Happy FlexiChoice customer"
                width={32}
                height={32}
                className="h-8 w-8 rounded-full border-2 border-zinc-50 object-cover dark:border-[#050505]"
              />
              <Image
                src="https://randomuser.me/api/portraits/women/68.jpg"
                alt="Happy FlexiChoice customer"
                width={32}
                height={32}
                className="h-8 w-8 rounded-full border-2 border-zinc-50 object-cover dark:border-[#050505]"
              />
            </div>
            <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
              Joined by{" "}
              <span className="font-bold text-zinc-900 dark:text-white">
                25,000+
              </span>{" "}
              happy customers
            </p>
          </motion.div>

          {/* ✅ SINGLE H1 TAG — Critical SEO requirement */}
          <motion.h1
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            className="text-[3.5rem] font-black leading-[0.9] tracking-tighter text-zinc-900 dark:text-white md:text-[5rem] lg:text-[5.1rem]"
          >
            Flexi Choice —{" "}
            <br />
            <span className="bg-gradient-to-r from-blue-600 font-serif to-cyan-500 bg-clip-text text-transparent">
              choice is yours.
            </span>
            {/* Hidden SEO text — visible to Google, not visually intrusive */}
            <span className="sr-only"> Best loans and insurance services in India.</span>
          </motion.h1>

          <motion.p
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            className="mt-6 max-w-md text-lg font-medium leading-relaxed text-zinc-600 dark:text-zinc-400"
          >
            Bypass the bureaucratic maze. Access premium loans, tailor-made
            insurance, and expert advisory — sanctioned at lightning speed from
            30+ top Indian banks.
          </motion.p>

          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            className="mt-10 max-w-md"
          >
            <div className="group flex h-16 items-center justify-between rounded-2xl border border-zinc-200 bg-white p-2 shadow-sm transition-all focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10 dark:border-zinc-800 dark:bg-zinc-900/50 dark:focus-within:border-blue-500">
              <div className="flex items-center gap-3 pl-4 w-full">
                <IndianRupee className="h-5 w-5 text-zinc-400" />
                <input
                  type="text"
                  value={inputValue}
                  onChange={handleInputChange}
                  onKeyDown={(e) => e.key === "Enter" && handleCalculate()}
                  placeholder="Enter loan amount (e.g. 50,00,000)"
                  aria-label="Enter loan amount to calculate EMI"
                  className="w-full bg-transparent text-base font-semibold text-zinc-900 outline-none placeholder:font-medium placeholder:text-zinc-400 dark:text-white"
                />
              </div>
              <button
                onClick={handleCalculate}
                className="flex h-full items-center justify-center rounded-xl bg-blue-600 px-6 font-bold text-white transition-transform hover:scale-[0.98] active:scale-95 shrink-0"
              >
                Calculate EMI
              </button>
            </div>
            <p className="mt-3 text-xs font-medium text-zinc-500 dark:text-zinc-500">
              No credit score impact • Results instantly updated
            </p>
          </motion.div>

          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            className="mt-12 flex items-center gap-8 border-l-2 border-blue-500 pl-6 dark:border-blue-500/50"
          >
            <div>
              <p className="text-3xl font-black tracking-tight text-zinc-900 dark:text-white">
                ₹500Cr+
              </p>
              <p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                Disbursed
              </p>
            </div>
            <div>
              <p className="text-3xl font-black tracking-tight text-zinc-900 dark:text-white">
                98%
              </p>
              <p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                Approval Rate
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* RIGHT COLUMN — floating cards */}
        <div className="relative h-[560px] w-full perspective-1000 md:h-[640px]">
          <motion.div
            variants={floatAnimation}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="absolute left-4 top-12 z-20 w-[85%] max-w-[340px]"
          >
            <motion.div animate={floatingHover}>
              <MacWindow
                title="Overview · Portfolio"
                className="border-zinc-200 bg-white/95 shadow-2xl backdrop-blur-md md:backdrop-blur-xl dark:border-zinc-800/80 dark:bg-zinc-900/90 dark:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] transform-gpu"
              >
                <div className="space-y-4 p-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                        Home Loan Approval
                      </p>
                      <p
                        className="mt-1 text-[26px] font-black tracking-tight text-zinc-900 dark:text-white"
                        key={calcKey}
                      >
                        <AnimatedNumber
                          value={metrics.sanctioned}
                          formatter={formatIN}
                        />
                      </p>
                    </div>
                    <span className="rounded-full border border-blue-500/20 bg-blue-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                      Sanctioned
                    </span>
                  </div>

                  <div
                    key={calcKey}
                    className="flex h-24 items-end gap-1.5 rounded-xl border border-zinc-100 bg-zinc-50 p-3 dark:border-zinc-800/50 dark:bg-zinc-800/30"
                  >
                    {bars.map((h, i) => (
                      <motion.div
                        key={i}
                        initial={{ height: 0 }}
                        animate={{ height: `${h}%` }}
                        transition={{
                          duration: 1,
                          delay: 0.2 + i * 0.05,
                          type: "spring",
                        }}
                        className="flex-1 rounded-[2px] bg-gradient-to-t from-zinc-300 to-zinc-400 dark:from-zinc-600 dark:to-zinc-500"
                      />
                    ))}
                  </div>

                  <div className="grid grid-cols-3 gap-2.5">
                    {[
                      { label: "EMI", value: metrics.emi, fmt: formatCompact },
                      null,
                      null,
                    ].map((item, idx) =>
                      idx === 0 && item ? (
                        <div
                          key="emi"
                          className="rounded-xl border border-zinc-100 bg-zinc-50 px-3 py-2.5 dark:border-zinc-800/50 dark:bg-zinc-800/50"
                        >
                          <p className="text-[9px] font-bold uppercase tracking-wider text-zinc-500">
                            EMI
                          </p>
                          <p
                            className="mt-1 text-[13px] font-bold text-zinc-900 dark:text-white"
                            key={calcKey}
                          >
                            <AnimatedNumber
                              value={metrics.emi}
                              formatter={formatCompact}
                            />
                          </p>
                        </div>
                      ) : idx === 1 ? (
                        <div
                          key="tenure"
                          className="rounded-xl border border-zinc-100 bg-zinc-50 px-3 py-2.5 dark:border-zinc-800/50 dark:bg-zinc-800/50"
                        >
                          <p className="text-[9px] font-bold uppercase tracking-wider text-zinc-500">
                            Tenure
                          </p>
                          <p className="mt-1 text-[13px] font-bold text-zinc-900 dark:text-white">
                            20 Yrs
                          </p>
                        </div>
                      ) : (
                        <div
                          key="rate"
                          className="rounded-xl border border-zinc-100 bg-zinc-50 px-3 py-2.5 dark:border-zinc-800/50 dark:bg-zinc-800/50"
                        >
                          <p className="text-[9px] font-bold uppercase tracking-wider text-zinc-500">
                            Rate
                          </p>
                          <p className="mt-1 text-[13px] font-bold text-zinc-900 dark:text-white">
                            8.4%
                          </p>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </MacWindow>
            </motion.div>
          </motion.div>

          <motion.div
            variants={floatAnimation}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="absolute right-0 top-32 z-30 w-[65%] max-w-[260px]"
          >
            <motion.div
              animate={{ y: [-3, 3, -3] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="rounded-2xl border border-zinc-200 bg-white/90 p-5 shadow-xl backdrop-blur-md md:backdrop-blur-xl dark:border-zinc-800/80 dark:bg-zinc-900/90 transform-gpu will-change-transform"
            >
              <div className="flex items-start gap-4">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-cyan-500/20 bg-cyan-50 text-cyan-600 dark:bg-cyan-500/10 dark:text-cyan-400">
                  <ShieldCheck className="h-6 w-6" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[14px] font-bold text-zinc-900 dark:text-white">
                    Term Life Cover
                  </p>
                  <p
                    className="mt-0.5 text-[11px] font-medium text-zinc-500 whitespace-nowrap"
                    key={calcKey}
                  >
                    <AnimatedNumber
                      value={metrics.cover}
                      formatter={formatCompact}
                    />{" "}
                    · Active
                  </p>
                  <div className="mt-3.5 flex items-center justify-between">
                    <div
                      className="h-1.5 flex-1 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800"
                      key={calcKey}
                    >
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="h-full rounded-full bg-cyan-500"
                      />
                    </div>
                    <span className="ml-3 text-[10px] font-bold uppercase tracking-wider text-cyan-500">
                      Secured
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            variants={floatAnimation}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="absolute bottom-24 right-4 z-20 w-[70%] max-w-[280px]"
          >
            <motion.div
              animate={{ y: [-4, 4, -4] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="rounded-2xl border border-zinc-200 bg-white/90 p-5 shadow-xl backdrop-blur-md md:backdrop-blur-xl dark:border-zinc-800/80 dark:bg-zinc-900/90 transform-gpu will-change-transform"
            >
              <div className="mb-4 flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl border border-blue-500/20 bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                  <BadgeCheck className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                    HDFC Bank
                  </p>
                  <p className="text-[14px] font-bold text-zinc-900 dark:text-white">
                    Pre-approved Limit
                  </p>
                </div>
              </div>
              <div className="rounded-xl border border-zinc-100 bg-zinc-50 p-3 dark:border-zinc-800/50 dark:bg-zinc-800/50">
                <div className="flex items-end justify-between">
                  <div>
                    <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                      Available Credit
                    </p>
                    <p
                      className="text-[18px] font-black text-zinc-900 dark:text-white"
                      key={calcKey}
                    >
                      <AnimatedNumber
                        value={metrics.preApproved}
                        formatter={formatIN}
                      />
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                      Interest
                    </p>
                    <p className="text-[13px] font-bold text-blue-600 dark:text-blue-400">
                      10.5% p.a.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            variants={floatAnimation}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            className="absolute bottom-12 left-2 z-30"
          >
            <motion.div
              animate={{ y: [4, -4, 4] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              className="flex items-center gap-3.5 rounded-2xl border border-zinc-200 bg-white/95 px-5 py-4 shadow-xl backdrop-blur-md md:backdrop-blur-xl dark:border-zinc-800/80 dark:bg-zinc-900/90 transform-gpu will-change-transform"
            >
              <div
                className="relative grid h-12 w-12 place-items-center rounded-full border-2 border-zinc-100 bg-white shadow-inner dark:border-zinc-800 dark:bg-zinc-900"
                key={calcKey}
              >
                <svg
                  className="absolute inset-0 h-full w-full -rotate-90"
                  viewBox="0 0 36 36"
                >
                  <motion.path
                    initial={{ strokeDasharray: "0, 100" }}
                    animate={{ strokeDasharray: "85, 100" }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="text-blue-500"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                </svg>
                <TrendingUp className="h-5 w-5 text-zinc-900 dark:text-white" />
              </div>
              <div className="leading-tight">
                <p className="mb-0.5 text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                  CIBIL Score
                </p>
                <p className="text-[18px] font-black text-zinc-900 dark:text-white">
                  782{" "}
                  <span className="ml-1.5 rounded-full border border-blue-500/20 bg-blue-50 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
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
