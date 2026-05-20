"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Home, Building2, Wallet, Briefcase, Coins, Landmark,
  HeartPulse, Heart, Stethoscope, Car, Plane, Globe2,
  ChevronRight, type LucideIcon,
} from "lucide-react";

type Service = {
  icon: LucideIcon;
  title: string;
  desc: string;
  bullets: string[];
  stat: string;
};

const loans: Service[] = [
  { icon: Home, title: "Home Loans", desc: "Own your home with the lowest rates from 30+ banks.", bullets: ["Up to ₹10Cr", "Rates from 8.4%", "Tenure up to 30 yrs"], stat: "Top Rated" },
  { icon: Building2, title: "Mortgage Loans", desc: "Unlock the value of your property with flexible terms.", bullets: ["LAP & balance transfer", "Quick valuation", "Custom EMI"], stat: "Fast Processing" },
  { icon: Wallet, title: "Personal Loans", desc: "Instant funds for life's important moments.", bullets: ["Up to ₹40L", "48-hr disbursal", "No collateral"], stat: "Most Popular" },
  { icon: Briefcase, title: "Business Loans", desc: "Fuel growth with working capital and term loans.", bullets: ["MSME & SME", "Minimal paperwork", "Flexible repayment"], stat: "Growth Focused" },
  { icon: Coins, title: "Gold Loans", desc: "Liquidity against your gold — safe and fast.", bullets: ["Same-day approval", "Up to 90% LTV", "Insured vault"], stat: "High LTV" },
  { icon: Landmark, title: "Private Funding", desc: "Bespoke funding solutions for unique situations.", bullets: ["Confidential", "Custom structures", "Expert advisory"], stat: "Bespoke" },
];

const insurance: Service[] = [
  { icon: Heart, title: "Life Insurance", desc: "Lifelong protection for what matters most.", bullets: ["Whole-life cover", "Wealth + protection", "Tax saving"], stat: "Essential Cover" },
  { icon: HeartPulse, title: "Term Life Insurance", desc: "Maximum cover at the lowest premiums.", bullets: ["Cover up to ₹2Cr", "Premiums from ₹490/mo", "Online process"], stat: "High Cover" },
  { icon: Stethoscope, title: "Health Insurance", desc: "Cashless treatment at 10,000+ hospitals.", bullets: ["Family floater", "No room-rent cap", "Day-1 cover"], stat: "Cashless Network" },
  { icon: Car, title: "Vehicle Insurance", desc: "Comprehensive cover for cars and two-wheelers.", bullets: ["Zero depreciation", "Roadside assistance", "Instant policy"], stat: "Instant Issuance" },
  { icon: Plane, title: "Travel Insurance", desc: "Travel confidently anywhere in the world.", bullets: ["Trip cancellation", "Medical evacuation", "Lost baggage"], stat: "Global Cover" },
  { icon: Globe2, title: "Overseas Insurance", desc: "Student and expat covers for overseas living.", bullets: ["Schengen approved", "Student plans", "Multi-trip"], stat: "Visa Compliant" },
];

export function Services() {
  const [tab, setTab] = useState<"loans" | "insurance">("loans");
  const data = tab === "loans" ? loans : insurance;

  return (
    <section id="services" className="py-24 md:py-32 relative overflow-hidden" aria-label="Our financial services">
      <div className="absolute right-0 top-0 hidden h-[500px] w-[500px] bg-secondary/5 blur-[100px] rounded-full pointer-events-none md:block" />
      <div className="absolute left-0 bottom-0 hidden h-[400px] w-[400px] bg-primary/5 blur-[100px] rounded-full pointer-events-none md:block" />

      <div className="mx-auto max-w-7xl px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end"
        >
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/80 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-secondary shadow-soft backdrop-blur">
              Our Services
            </div>
            <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight md:text-5xl leading-[1.1]">
              Every financial product,{" "}
              <br className="hidden md:block" />
              <span className="italic font-serif text-blue-600 dark:text-blue-500">thoughtfully curated.</span>
            </h2>
          </div>

          <div className="relative inline-flex rounded-full border border-border bg-surface/80 p-1.5 shadow-soft backdrop-blur shrink-0">
            <span
              className="absolute inset-y-1.5 w-[calc(50%-6px)] rounded-full bg-foreground transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] shadow-md"
              style={{ left: tab === "loans" ? "6px" : "calc(50% + 0px)" }}
            />
            {(["loans", "insurance"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                aria-pressed={tab === t}
                className={`relative z-10 h-10 min-w-[130px] rounded-full px-5 text-[15px] font-semibold capitalize transition-colors duration-300 ${tab === t ? "text-background" : "text-muted-foreground hover:text-foreground"}`}
              >
                {t}
              </button>
            ))}
          </div>
        </motion.div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data.map((s, i) => (
            <motion.article
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative overflow-hidden rounded-[2rem] border border-hairline bg-surface/60 p-7 transition-all duration-500 hover:-translate-y-2 hover:bg-surface hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] backdrop-blur"
            >
              <span
                className="pointer-events-none absolute -inset-px rounded-[2rem] opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                style={{ background: "radial-gradient(600px circle at 50% 0%, color-mix(in oklab, var(--primary) 8%, transparent), transparent 70%)" }}
                aria-hidden
              />
              <span className="absolute inset-x-6 top-0 h-[2px] bg-gradient-to-r from-transparent via-secondary to-transparent opacity-0 scale-x-0 transition-all duration-700 group-hover:opacity-100 group-hover:scale-x-100" aria-hidden />
              <s.icon className="absolute right-[-10%] top-[-10%] h-40 w-40 text-muted/10 transition-transform duration-700 group-hover:-rotate-12 group-hover:scale-110 pointer-events-none" aria-hidden />

              <div className="relative flex items-start justify-between">
                <span className="relative grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-surface to-muted border border-border text-foreground transition-all duration-500 group-hover:bg-foreground group-hover:text-background group-hover:shadow-soft">
                  <s.icon className="h-6 w-6" />
                </span>
                <span className="inline-flex items-center rounded-full border border-border bg-background/50 px-2.5 py-1 text-[10px] font-semibold tracking-wide text-muted-foreground uppercase">
                  {s.stat}
                </span>
              </div>

              <h3 className="relative mt-6 text-[19px] font-bold tracking-tight text-foreground/90 group-hover:text-foreground transition-colors">{s.title}</h3>
              <p className="relative mt-2 text-[15px] text-muted-foreground leading-relaxed">{s.desc}</p>

              <ul className="relative mt-6 space-y-2.5">
                {s.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2.5 text-[13px] font-medium text-muted-foreground/90">
                    <span className="mt-1.5 flex h-[5px] w-[5px] shrink-0 items-center justify-center rounded-full bg-secondary shadow-[0_0_8px_rgba(20,184,166,0.5)]" />
                    {b}
                  </li>
                ))}
              </ul>

              <div className="relative mt-8 pt-6 border-t border-hairline/60">
                <a href="#quote" className="group/btn inline-flex items-center gap-2 text-[14px] font-semibold text-foreground transition-colors hover:text-secondary">
                  Explore options
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-muted transition-all duration-300 group-hover/btn:bg-secondary group-hover/btn:text-secondary-foreground group-hover:-translate-y-0.5">
                    <ChevronRight className="h-3 w-3" />
                  </span>
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
