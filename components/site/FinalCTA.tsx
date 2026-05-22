"use client";

import { ArrowRight } from "lucide-react";
import { useStore } from "@nanostores/react";
import { activeTabStore } from "@/store/activeTab";

export function FinalCTA() {
  const activeTab = useStore(activeTabStore);
  
  return (
    <section className="py-20 md:py-28" aria-label="Call to action">
      <div className="mx-auto max-w-5xl px-4">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-surface p-10 text-center shadow-float md:p-16">
          <div
            className="pointer-events-none absolute inset-0 opacity-60"
            style={{ background: "radial-gradient(60% 50% at 50% 0%, color-mix(in oklab, var(--primary) 12%, transparent), transparent 70%)" }}
            aria-hidden
          />
          <div className="relative">
            <h2 className="text-balance text-3xl font-semibold tracking-tight md:text-5xl leading-[1.1]">
              Make your next {activeTab === "loans" ? "financial" : "protection"} decision <br className="hidden md:block" />
              <span className={`italic font-serif ${activeTab === "loans" ? "text-blue-600 dark:text-blue-500" : "text-emerald-600 dark:text-emerald-500"}`}>the easiest one.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-balance text-muted-foreground">
              Talk to an advisor today — free, no commitment, and tailored entirely to you.
            </p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <a
                href="#quote"
                className="group inline-flex h-11 items-center gap-2 rounded-full bg-foreground px-5 text-sm font-medium text-background transition-all hover:opacity-90 active:scale-[0.98]"
              >
                Get Free Quote
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              <a
                href="#services"
                className="inline-flex h-11 items-center rounded-full border border-border bg-background px-5 text-sm font-medium transition-all hover:shadow-soft"
              >
                Browse Services
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
