"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

const rates = [
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

export function LoanRates() {
  const [activeItem, setActiveItem] = useState(rates[0]);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"));
            setActiveItem(rates[index]);
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );
    itemRefs.current.forEach((ref) => { if (ref) observer.observe(ref); });
    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-zinc-50 py-16 dark:bg-[#050505] md:py-32 font-sans selection:bg-blue-500/30" aria-label="Loan interest rates">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-2 text-xs font-bold uppercase tracking-widest text-zinc-900 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 dark:text-white">
              <Sparkles className="h-4 w-4 text-blue-500" />
              Live Market Rates
            </div>
            <h2 className="text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white sm:text-5xl md:text-6xl leading-[1.1]">
              Unbeatable figures. <br />
              <span className="italic font-serif text-blue-600 dark:text-blue-500">Zero compromises.</span>
            </h2>
          </div>
          <p className="max-w-sm text-base text-zinc-600 dark:text-zinc-400">
            Scroll through our offerings to explore starting rates secured from over 64 top-tier banking partners.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-12 md:gap-16 relative">
          <div className="lg:col-span-5 relative hidden md:block">
            <div className="sticky top-32 flex h-[70vh] flex-col justify-center rounded-3xl bg-zinc-100 p-10 dark:bg-zinc-900/50 border border-transparent dark:border-zinc-800/50 transition-colors duration-500">
              <p className="mb-4 text-sm font-bold uppercase tracking-widest text-zinc-900 dark:text-white">Starting At</p>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeItem.name}
                  initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -30, filter: "blur(8px)" }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <h3 className="mb-6 text-[5rem] lg:text-[7rem] xl:text-[8rem] font-black leading-none tracking-tighter text-blue-600 dark:text-blue-400">
                    {activeItem.rate}
                  </h3>
                  <h4 className="mb-4 text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">{activeItem.name}</h4>
                  <p className="text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">{activeItem.desc}</p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="flex flex-col border-t border-zinc-200 dark:border-zinc-800/80">
              {rates.map((item, index) => (
                <div
                  key={item.name}
                  data-index={index}
                  ref={(el) => { itemRefs.current[index] = el; }}
                  className={`group flex flex-col justify-center border-b border-zinc-200 py-8 transition-all duration-500 dark:border-zinc-800/80 sm:py-12 md:py-32 ${
                    activeItem.name === item.name
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
                      <div className={`hidden h-14 w-14 shrink-0 items-center justify-center rounded-full border transition-all duration-500 md:flex ${activeItem.name === item.name ? "border-blue-600 bg-blue-600 text-white scale-110 shadow-lg shadow-blue-500/20" : "border-zinc-300 dark:border-zinc-700 scale-100"}`}>
                        <ArrowRight className={`h-6 w-6 transition-transform duration-500 ${activeItem.name === item.name ? "-rotate-45" : "rotate-0"}`} />
                      </div>
                    </div>
                  </div>
                  <div className={`overflow-hidden transition-all duration-500 ease-in-out md:hidden ${activeItem.name === item.name ? "max-h-40 mt-3 opacity-100 translate-x-2" : "max-h-0 mt-0 opacity-0 translate-x-0"}`}>
                    <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400 pr-4">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
