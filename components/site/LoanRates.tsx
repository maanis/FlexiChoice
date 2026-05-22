"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { useStore } from "@nanostores/react";
import { activeTabStore } from "@/store/activeTab";

const loanRatesData = [
  { name: "Home Loan", rate: "7.15%", desc: "Turn your dream home into reality with our lowest market rates and flexible repayment tenures up to 30 years." },
  { name: "Balance Transfer", rate: "7.25%", desc: "Reduce your EMI burden instantly by shifting your existing high-interest loans to our partner network." },
  { name: "Education Loan", rate: "8.20%", desc: "Invest in your future with zero-margin financing for top-tier universities worldwide." },
  { name: "Loan Against Property", rate: "8.65%", desc: "Unlock the hidden value of your real estate for business expansion or personal milestones." },
  { name: "Commercial Loan", rate: "8.65%", desc: "Scale your enterprise with high-ticket financing tailored for commercial acquisitions." },
  { name: "Machinery Loan", rate: "9.01%", desc: "Upgrade your manufacturing unit with quick disbursements for heavy equipment and tech." },
  { name: "Personal Loan", rate: "9.99%", desc: "No collateral required. Get instant liquidity for medical emergencies, weddings, or travel." },
  { name: "Business Loan", rate: "9.99%", desc: "Fuel your startup or SME growth with collateral-free working capital solutions." },
  { name: "Old Car Loan", rate: "10.90%", desc: "Drive home your favorite pre-owned vehicle with up to 100% on-road funding." },
  { name: "Project Loan", rate: "11.05%", desc: "End-to-end financial structuring for large-scale infrastructure and real estate developments." },
];

const insuranceRatesData = [
  { name: "Term Life", rate: "₹490/m", desc: "Get maximum life cover at an incredibly low monthly premium to secure your family's future." },
  { name: "Health Cover", rate: "₹550/m", desc: "Comprehensive cashless hospitalization at 10,000+ top network hospitals." },
  { name: "Vehicle Policy", rate: "₹2,100/y", desc: "Zero-depreciation auto insurance with 24/7 roadside assistance." },
  { name: "Travel Plan", rate: "₹350/t", desc: "Global coverage including trip cancellations and emergency medical evacuation." },
  { name: "Critical Illness", rate: "₹890/m", desc: "Lump sum payout on diagnosis of major critical illnesses to cover heavy medical bills." },
  { name: "Personal Accident", rate: "₹150/m", desc: "Financial protection against accidental death or permanent disability." },
  { name: "Home Protection", rate: "₹300/m", desc: "Secure your home structure and contents against natural disasters, fire, and burglary." },
  { name: "Cyber Safety", rate: "₹100/m", desc: "Comprehensive protection against identity theft, cyberbullying, and unauthorized transactions." },
  { name: "Pet Insurance", rate: "₹250/m", desc: "Cover unexpected veterinary bills, surgeries, and routine care for your furry friends." },
  { name: "ULIP Plans", rate: "₹1,500/m", desc: "Dual benefit of life insurance coverage along with market-linked wealth creation." },
];

export function LoanRates() {
  const activeTab = useStore(activeTabStore);
  const data = activeTab === "loans" ? loanRatesData : insuranceRatesData;
  const [activeItem, setActiveItem] = useState(data[0]);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Reset active item instantly when tab changes
  useEffect(() => {
    setActiveItem(data[0]);
  }, [activeTab, data]);

  // FIXED: Added `data` and `activeTab` to dependencies so observer reconnects to new DOM nodes
  useEffect(() => {
    // Reset refs array to match current data length to prevent stale memory
    itemRefs.current = itemRefs.current.slice(0, data.length);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"));
            if (data[index]) {
              setActiveItem(data[index]);
            }
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );

    // Small timeout ensures Framer Motion has finished injecting the new elements into the DOM
    const timeout = setTimeout(() => {
      itemRefs.current.forEach((ref) => {
        if (ref) observer.observe(ref);
      });
    }, 100);

    return () => {
      clearTimeout(timeout);
      observer.disconnect();
    };
  }, [data, activeTab]);

  return (
    <section className="bg-zinc-50 py-16 dark:bg-[#050505] md:py-32 font-sans selection:bg-blue-500/30" aria-label="Loan interest rates">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-8 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className={`mb-6 inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-2 text-xs font-bold uppercase tracking-widest text-zinc-900 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 dark:text-white`}>
              <Sparkles className={`h-4 w-4 ${activeTab === "loans" ? "text-blue-500" : "text-emerald-500"}`} />
              {activeTab === "loans" ? "Live Market Rates" : "Top Premiums"}
            </div>
            <h2 className="text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white sm:text-5xl md:text-6xl leading-[1.1]">
              Unbeatable figures. <br />
              <span className={`italic font-serif ${activeTab === "loans" ? "text-blue-600 dark:text-blue-500" : "text-emerald-600 dark:text-emerald-500"}`}>Zero compromises.</span>
            </h2>
          </div>
          <p className="max-w-sm text-base text-zinc-600 dark:text-zinc-400">
            {activeTab === "loans"
              ? "Scroll through our offerings to explore starting rates secured from over 64 top-tier banking partners."
              : "Scroll through to explore the most affordable premium structures from our top insurance partners."}
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-12 md:gap-16 relative">

          {/* LEFT: Sticky Showcase Panel */}
          <div className="lg:col-span-5 relative hidden md:block">
            <div className="sticky top-32 flex h-[70vh] flex-col justify-center rounded-3xl bg-zinc-100 p-8 xl:p-10 dark:bg-zinc-900/50 border border-transparent dark:border-zinc-800/50 transition-colors duration-500 overflow-hidden">
              <p className="mb-4 text-sm font-bold uppercase tracking-widest text-zinc-900 dark:text-white">Starting At</p>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeItem.name}
                  initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -30, filter: "blur(8px)" }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  {/* FIXED: Reduced font sizes and added break-words to handle wide text like "₹2,100/y" */}
                  <h3 className={`mb-6 text-[3.5rem] lg:text-[4.5rem] xl:text-[5.5rem] font-black leading-[1.1] tracking-tighter break-words ${activeTab === "loans" ? "text-blue-600 dark:text-blue-400" : "text-emerald-600 dark:text-emerald-400"}`}>
                    {activeItem.rate}
                  </h3>
                  <h4 className="mb-4 text-2xl xl:text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">{activeItem.name}</h4>
                  <p className="text-base xl:text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">{activeItem.desc}</p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* RIGHT: Scrollable List */}
          <div className="lg:col-span-7">
            <div className="flex flex-col border-t border-zinc-200 dark:border-zinc-800/80">
              <AnimatePresence mode="popLayout">
                {data.map((item, index) => (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                    key={item.name}
                    data-index={index}
                    // FIXED: Safer ref assignment
                    ref={(el) => { if (el) itemRefs.current[index] = el; }}
                    className={`group flex flex-col justify-center border-b border-zinc-200 py-8 transition-all duration-500 dark:border-zinc-800/80 sm:py-12 md:py-32 ${activeItem.name === item.name
                        ? "text-zinc-900 dark:text-white opacity-100"
                        : "text-zinc-300 dark:text-zinc-700 opacity-40 hover:opacity-100"
                      }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`text-xl font-bold tracking-tight transition-all duration-500 ease-out sm:text-2xl md:text-5xl ${activeItem.name === item.name ? "translate-x-2 md:translate-x-8" : "translate-x-0"}`}>
                        {item.name}
                      </span>
                      <div className="flex items-center gap-4 md:gap-6">
                        <span className="text-lg font-bold md:hidden text-zinc-900 dark:text-white sm:text-xl">{item.rate}</span>
                        <div className={`hidden h-14 w-14 shrink-0 items-center justify-center rounded-full border transition-all duration-500 md:flex ${activeItem.name === item.name ? (activeTab === "loans" ? "border-blue-600 bg-blue-600 shadow-blue-500/20 text-white scale-110 shadow-lg" : "border-emerald-600 bg-emerald-600 shadow-emerald-500/20 text-white scale-110 shadow-lg") : "border-zinc-300 dark:border-zinc-700 scale-100"}`}>
                          <ArrowRight className={`h-6 w-6 transition-transform duration-500 ${activeItem.name === item.name ? "-rotate-45" : "rotate-0"}`} />
                        </div>
                      </div>
                    </div>
                    <div className={`overflow-hidden transition-all duration-500 ease-in-out md:hidden ${activeItem.name === item.name ? "max-h-40 mt-3 opacity-100 translate-x-2" : "max-h-0 mt-0 opacity-0 translate-x-0"}`}>
                      <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400 pr-4">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}