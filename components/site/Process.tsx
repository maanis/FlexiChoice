"use client";

import { MousePointer2, MessageSquareText, FileCheck2, BadgeCheck } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  { icon: MousePointer2, title: "Choose Service", desc: "Pick a loan or insurance product that fits your goal.", pill: "30s" },
  { icon: MessageSquareText, title: "Talk to Expert", desc: "A senior advisor reviews your profile — free, no obligation.", pill: "Same day" },
  { icon: FileCheck2, title: "Get Best Quote", desc: "Receive a curated offer from 30+ trusted partners.", pill: "< 24 hrs" },
  { icon: BadgeCheck, title: "Fast Approval", desc: "Disbursal or policy issuance with end-to-end support.", pill: "48 hrs" },
];

export function Process() {
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
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/80 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-secondary shadow-soft backdrop-blur">
            How it works
          </div>
          <h2 className="mt-6 text-balance text-3xl font-semibold tracking-tight md:text-5xl leading-[1.1]">
            From question to approval{" "}
            <br className="hidden md:block" />
            <span className="italic font-serif text-blue-600 dark:text-blue-500">in four calm steps.</span>
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
                <stop offset="50%" stopColor="var(--color-secondary)" />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>
            </defs>
          </svg>
          <style>{`@keyframes dash { to { stroke-dashoffset: -600; } }`}</style>

          <ol className="relative grid grid-cols-4 gap-8">
            {steps.map((s, i) => (
              <motion.li
                key={s.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="group relative"
              >
                <div className="relative mx-auto flex h-16 w-16 items-center justify-center transition-transform duration-500 group-hover:-translate-y-2">
                  <div className="absolute inset-0 rounded-full bg-secondary/10 blur-md transition-all duration-500 group-hover:bg-secondary/30 group-hover:blur-xl" />
                  <span className="absolute inset-0 rounded-full bg-background ring-1 ring-border" />
                  <span className="absolute inset-1.5 rounded-full bg-surface shadow-soft border border-hairline" />
                  <s.icon className="relative h-6 w-6 text-foreground transition-transform duration-500 group-hover:scale-110 group-hover:text-secondary" />
                  <span className="absolute -right-2 -top-1 grid h-6 w-6 place-items-center rounded-full bg-foreground text-[11px] font-bold text-background shadow-soft transition-transform duration-300 group-hover:scale-110">
                    {i + 1}
                  </span>
                </div>
                <div className="mt-8 rounded-2xl border border-border bg-surface/80 p-6 text-center shadow-soft backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-secondary/30 hover:bg-surface hover:shadow-float relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-secondary/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="relative z-10">
                    <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-muted/60 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground border border-hairline">
                      Step 0{i + 1} <span className="w-1 h-1 rounded-full bg-secondary/50 mx-0.5" /> {s.pill}
                    </div>
                    <h3 className="text-[17px] font-semibold tracking-tight group-hover:text-secondary transition-colors duration-300">{s.title}</h3>
                    <p className="mt-2 text-[14px] text-muted-foreground leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>

        {/* Mobile */}
        <ol className="relative mt-16 md:hidden">
          <span className="absolute left-[31px] top-4 bottom-4 w-[2px] bg-gradient-to-b from-secondary/0 via-secondary/20 to-secondary/0" aria-hidden />
          {steps.map((s, i) => (
            <motion.li
              key={s.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="relative flex gap-5 pb-8 last:pb-0 group"
            >
              <div className="relative z-10 grid h-16 w-16 shrink-0 place-items-center rounded-full border border-border bg-surface shadow-soft transition-transform group-hover:scale-105">
                <div className="absolute inset-0 rounded-full bg-secondary/5 blur-md group-hover:bg-secondary/20 transition-all" />
                <s.icon className="relative h-6 w-6 group-hover:text-secondary transition-colors" />
                <span className="absolute -right-1 -top-1 grid h-6 w-6 place-items-center rounded-full bg-foreground text-[11px] font-bold text-background shadow-soft">
                  {i + 1}
                </span>
              </div>
              <div className="flex-1 rounded-2xl border border-border bg-surface/90 p-5 shadow-soft backdrop-blur-sm transition-all hover:border-secondary/30 hover:shadow-float relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-secondary/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="relative z-10">
                  <div className="mb-2.5 inline-flex items-center gap-1.5 rounded-full bg-muted/60 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground border border-hairline">
                    Step 0{i + 1} <span className="w-1 h-1 rounded-full bg-secondary/50 mx-0.5" /> {s.pill}
                  </div>
                  <h3 className="text-[16px] font-semibold tracking-tight">{s.title}</h3>
                  <p className="mt-1.5 text-[14px] text-muted-foreground leading-relaxed">{s.desc}</p>
                </div>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
