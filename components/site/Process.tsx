"use client";

import { MousePointer2, MessageSquareText, FileCheck2, BadgeCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "@nanostores/react";
import { activeTabStore } from "@/store/activeTab";

const loanSteps = [
  { icon: MousePointer2, title: "Choose Loan", desc: "Pick a loan product that fits your financial goal.", pill: "30s" },
  { icon: MessageSquareText, title: "Talk to Expert", desc: "A senior advisor reviews your credit profile — free, no obligation.", pill: "Same day" },
  { icon: FileCheck2, title: "Get Best Quote", desc: "Receive a curated loan offer from 30+ trusted banking partners.", pill: "< 24 hrs" },
  { icon: BadgeCheck, title: "Fast Approval", desc: "Instant disbursal with end-to-end documentation support.", pill: "48 hrs" },
];

const insuranceSteps = [
  { icon: MousePointer2, title: "Choose Cover", desc: "Pick an insurance product to protect what matters most.", pill: "30s" },
  { icon: MessageSquareText, title: "Talk to Expert", desc: "A senior advisor assesses your risk profile — free, no obligation.", pill: "Same day" },
  { icon: FileCheck2, title: "Compare Plans", desc: "Receive transparent quotes from top-tier insurance providers.", pill: "< 24 hrs" },
  { icon: BadgeCheck, title: "Instant Issuance", desc: "Policy issued instantly with end-to-end claims support.", pill: "Instant" },
];

export function Process() {
  const activeTab = useStore(activeTabStore);
  const steps = activeTab === "loans" ? loanSteps : insuranceSteps;
  return (
    <section className="relative py-28 md:py-36 overflow-hidden" aria-label="How it works">
      <div className="pointer-events-none absolute inset-x-0 top-1/2 mx-auto h-[500px] w-full max-w-5xl -translate-y-1/2 spotlight opacity-40 mix-blend-screen" aria-hidden />

      <div className="mx-auto max-w-6xl px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <div className={`inline-flex items-center gap-2 rounded-full border border-border bg-surface/80 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] shadow-soft backdrop-blur ${activeTab === "loans" ? "text-blue-500" : "text-emerald-500"}`}>
            How it works
          </div>
          <h2 className="mt-6 text-balance text-3xl font-semibold tracking-tight md:text-5xl leading-[1.1]">
            From question to approval{" "}
            <br className="hidden md:block" />
            <span className={`italic font-serif ${activeTab === "loans" ? "text-blue-600 dark:text-blue-500" : "text-emerald-600 dark:text-emerald-500"}`}>in four calm steps.</span>
          </h2>
        </motion.div>

        {/* Desktop */}
        <div className="relative mt-24 hidden md:block">
          <svg className="pointer-events-none absolute inset-x-0 top-12 mx-auto h-32 w-full drop-shadow-[0_0_15px_rgba(20,184,166,0.2)]" viewBox="0 0 1200 120" fill="none" preserveAspectRatio="none" aria-hidden>
            <path d="M 100 60 C 300 0, 400 120, 600 60 S 900 0, 1100 60" stroke="var(--color-border)" strokeWidth="2" strokeDasharray="8 8" className="opacity-50" />
            <path d="M 100 60 C 300 0, 400 120, 600 60 S 900 0, 1100 60" stroke="url(#flowGradient)" strokeWidth="2.5" strokeLinecap="round" className="animate-[dash_10s_linear_infinite]" strokeDasharray="20 40" />
            <defs>
              <linearGradient id="flowGradient" x1="0" x2="1" y1="0" y2="0">
                <stop offset="0%" stopColor="transparent" />
                <stop offset="50%" stopColor={activeTab === "loans" ? "#3b82f6" : "#10b981"} />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>
            </defs>
          </svg>
          <style>{`@keyframes dash { to { stroke-dashoffset: -600; } }`}</style>

          <ol className="relative grid grid-cols-4 gap-8">
            <AnimatePresence mode="popLayout">
              {steps.map((s, i) => (
                <motion.li
                  key={s.title}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="group relative"
                >
                <div className="relative mx-auto flex h-16 w-16 items-center justify-center transition-transform duration-500 group-hover:-translate-y-2">
                  <div className={`absolute inset-0 rounded-full blur-md transition-all duration-500 group-hover:blur-xl ${activeTab === "loans" ? "bg-blue-500/10 group-hover:bg-blue-500/30" : "bg-emerald-500/10 group-hover:bg-emerald-500/30"}`} />
                  <span className="absolute inset-0 rounded-full bg-background ring-1 ring-border" />
                  <span className="absolute inset-1.5 rounded-full bg-surface shadow-soft border border-hairline" />
                  <s.icon className={`relative h-6 w-6 text-foreground transition-transform duration-500 group-hover:scale-110 ${activeTab === "loans" ? "group-hover:text-blue-500" : "group-hover:text-emerald-500"}`} />
                  <span className="absolute -right-2 -top-1 grid h-6 w-6 place-items-center rounded-full bg-foreground text-[11px] font-bold text-background shadow-soft transition-transform duration-300 group-hover:scale-110">
                    {i + 1}
                  </span>
                </div>
                <div className={`mt-8 rounded-2xl border border-border bg-surface/80 p-6 text-center shadow-soft backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:bg-surface hover:shadow-float relative overflow-hidden ${activeTab === "loans" ? "hover:border-blue-500/30" : "hover:border-emerald-500/30"}`}>
                  <div className={`absolute inset-0 bg-gradient-to-b to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${activeTab === "loans" ? "from-blue-500/5" : "from-emerald-500/5"}`} />
                  <div className="relative z-10">
                    <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-muted/60 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground border border-hairline">
                      Step 0{i + 1} <span className={`w-1 h-1 rounded-full mx-0.5 ${activeTab === "loans" ? "bg-blue-500/50" : "bg-emerald-500/50"}`} /> {s.pill}
                    </div>
                    <h3 className={`text-[17px] font-semibold tracking-tight transition-colors duration-300 ${activeTab === "loans" ? "group-hover:text-blue-500" : "group-hover:text-emerald-500"}`}>{s.title}</h3>
                    <p className="mt-2 text-[14px] text-muted-foreground leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              </motion.li>
              ))}
            </AnimatePresence>
          </ol>
        </div>

        {/* Mobile */}
        <ol className="relative mt-16 md:hidden">
          <span className={`absolute left-[31px] top-4 bottom-4 w-[2px] bg-gradient-to-b to-transparent ${activeTab === "loans" ? "from-transparent via-blue-500/20" : "from-transparent via-emerald-500/20"}`} aria-hidden />
          <AnimatePresence mode="popLayout">
            {steps.map((s, i) => (
              <motion.li
                key={s.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
              className="relative flex gap-5 pb-8 last:pb-0 group"
            >
              <div className="relative z-10 grid h-16 w-16 shrink-0 place-items-center rounded-full border border-border bg-surface shadow-soft transition-transform group-hover:scale-105">
                <div className={`absolute inset-0 rounded-full blur-md transition-all ${activeTab === "loans" ? "bg-blue-500/5 group-hover:bg-blue-500/20" : "bg-emerald-500/5 group-hover:bg-emerald-500/20"}`} />
                <s.icon className={`relative h-6 w-6 transition-colors ${activeTab === "loans" ? "group-hover:text-blue-500" : "group-hover:text-emerald-500"}`} />
                <span className="absolute -right-1 -top-1 grid h-6 w-6 place-items-center rounded-full bg-foreground text-[11px] font-bold text-background shadow-soft">
                  {i + 1}
                </span>
              </div>
              <div className={`flex-1 rounded-2xl border border-border bg-surface/90 p-5 shadow-soft backdrop-blur-sm transition-all hover:shadow-float relative overflow-hidden ${activeTab === "loans" ? "hover:border-blue-500/30" : "hover:border-emerald-500/30"}`}>
                <div className={`absolute inset-0 bg-gradient-to-b to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${activeTab === "loans" ? "from-blue-500/5" : "from-emerald-500/5"}`} />
                <div className="relative z-10">
                  <div className="mb-2.5 inline-flex items-center gap-1.5 rounded-full bg-muted/60 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground border border-hairline">
                    Step 0{i + 1} <span className={`w-1 h-1 rounded-full mx-0.5 ${activeTab === "loans" ? "bg-blue-500/50" : "bg-emerald-500/50"}`} /> {s.pill}
                  </div>
                  <h3 className="text-[16px] font-semibold tracking-tight">{s.title}</h3>
                  <p className="mt-1.5 text-[14px] text-muted-foreground leading-relaxed">{s.desc}</p>
                </div>
              </div>
            </motion.li>
            ))}
          </AnimatePresence>
        </ol>
      </div>
    </section>
  );
}
