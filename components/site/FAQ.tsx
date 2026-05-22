"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { useStore } from "@nanostores/react";
import { activeTabStore } from "@/store/activeTab";

const loanFaqs = [
  { q: "Does FlexiChoice charge for loan advisory?", a: "No. Our consultation is completely free. We earn a referral fee from partner banks — never from you." },
  { q: "How long does loan approval usually take?", a: "Most personal and home loans are sanctioned within 48 hours once documents are submitted. Business loans typically take 5–7 days." },
  { q: "Are my documents and data safe?", a: "Yes. All data is encrypted in transit and at rest. We only share what's necessary with partners you choose to apply with." },
  { q: "Can I compare multiple plans before deciding?", a: "Absolutely. Your advisor presents 3–5 best-fit options side-by-side, with transparent fees and terms." },
  { q: "Which cities do you operate in?", a: "We serve customers across all major Indian cities, with on-ground advisors in Mumbai, Delhi, Bengaluru, Pune and Hyderabad." },
];

const insuranceFaqs = [
  { q: "Does FlexiChoice charge for insurance advisory?", a: "No. Our consultation is free. We earn a commission directly from the insurance provider." },
  { q: "How quickly is a policy issued?", a: "Most health and vehicle policies are issued instantly online. Term life may require medical tests and take 2-4 days." },
  { q: "Do you assist with claims?", a: "Yes! We have a dedicated claims assistance team that works directly with the hospital and insurer to ensure fast settlement." },
  { q: "Can I compare different insurers?", a: "Absolutely. We compare premiums, coverage, and claim settlement ratios across 15+ top insurers for you." },
  { q: "Are my medical records safe?", a: "Yes. We maintain strict confidentiality and use bank-grade encryption for all your health data." },
];

export function FAQ() {
  const [open, setOpen] = useState(0);
  const activeTab = useStore(activeTabStore);
  
  const faqs = activeTab === "loans" ? loanFaqs : insuranceFaqs;

  return (
    <section id="faq" className="py-20 md:py-28" aria-label="Frequently asked questions">
      <div className="mx-auto max-w-3xl px-4">
        <div className="text-center">
          <p className={`text-xs font-medium uppercase tracking-wider ${activeTab === "loans" ? "text-blue-500" : "text-emerald-500"}`}>FAQ</p>
          <h2 className="mt-2 text-balance text-3xl font-semibold tracking-tight md:text-4xl leading-[1.1]">
            Questions, <br className="hidden md:block" />
            <span className={`italic font-serif ${activeTab === "loans" ? "text-blue-600 dark:text-blue-500" : "text-emerald-600 dark:text-emerald-500"}`}>answered.</span>
          </h2>
        </div>

        <div className="mt-10 overflow-hidden rounded-2xl border border-border bg-surface shadow-soft">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q} className={i > 0 ? "border-t border-hairline" : ""}>
                <button
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left text-[15px] font-medium"
                >
                  <span>{f.q}</span>
                  <Plus className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`} />
                </button>
                <div className={`grid transition-all duration-300 ease-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
