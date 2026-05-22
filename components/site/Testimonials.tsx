"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useStore } from "@nanostores/react";
import { activeTabStore } from "@/store/activeTab";

const loanItems = [
  {
    quote: "The home-loan process was the smoothest I've experienced. My advisor compared 7 banks and locked the lowest rate within two days.",
    name: "Priya Nair",
    role: "Bengaluru · Home Loan",
  },
  {
    quote: "Got working capital for my bakery in under a week. Paperwork was minimal and the team handled the back-and-forth with the bank.",
    name: "Anita Rao",
    role: "Pune · Business Loan",
  },
  {
    quote: "Secured a personal loan instantly for medical emergencies. The team at FlexiChoice genuinely cared and expedited the entire process.",
    name: "Rohan Sethi",
    role: "Delhi · Personal Loan",
  },
];

const insuranceItems = [
  {
    quote: "Honest advice without the sales push. They helped me pick a term-life cover that actually matched my family's needs perfectly.",
    name: "Vikram Sharma",
    role: "Mumbai · Term Insurance",
  },
  {
    quote: "When my father was hospitalized, their claims assistance team was a godsend. Cashless claim approved in 2 hours.",
    name: "Meera Reddy",
    role: "Hyderabad · Health Insurance",
  },
  {
    quote: "I saved almost 40% on my car insurance renewal compared to what my dealer quoted. Fast, transparent, and totally seamless.",
    name: "Arjun Patel",
    role: "Ahmedabad · Vehicle Insurance",
  },
];

export function Testimonials() {
  const [i, setI] = useState(0);
  const activeTab = useStore(activeTabStore);
  
  const items = activeTab === "loans" ? loanItems : insuranceItems;
  const next = () => setI((v) => (v + 1) % items.length);
  const prev = () => setI((v) => (v - 1 + items.length) % items.length);
  const t = items[i];

  return (
    <section className="py-20 md:py-28" aria-label="Customer testimonials">
      <div className="mx-auto max-w-4xl px-4">
        <div className="rounded-3xl border border-border bg-surface p-8 shadow-soft md:p-12">
          <Quote className={`h-7 w-7 ${activeTab === "loans" ? "text-blue-500" : "text-emerald-500"}`} aria-hidden />
          <blockquote>
            <p key={i} className="fade-up mt-5 text-balance text-xl font-medium leading-relaxed tracking-tight md:text-2xl">
              &ldquo;{t.quote}&rdquo;
            </p>
            <div className="mt-7 flex items-center justify-between">
              <footer>
                <p className="text-sm font-semibold">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.role}</p>
              </footer>
              <div className="flex items-center gap-2">
                <button onClick={prev} aria-label="Previous testimonial" className="grid h-9 w-9 place-items-center rounded-full border border-border bg-background transition-all hover:shadow-soft active:scale-95">
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button onClick={next} aria-label="Next testimonial" className="grid h-9 w-9 place-items-center rounded-full border border-border bg-background transition-all hover:shadow-soft active:scale-95">
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </blockquote>
        </div>
      </div>
    </section>
  );
}
