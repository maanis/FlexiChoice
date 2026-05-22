"use client";

import { useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { useStore } from "@nanostores/react";
import { activeTabStore, setActiveTab } from "@/store/activeTab";
import { Wallet, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

export function BottomNav() {
  const activeTab = useStore(activeTabStore);
  const [isVisible, setIsVisible] = useState(true);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    if (latest < 100) {
      setIsVisible(true);
    } else if (latest > previous && latest > 100) {
      setIsVisible(false);
    } else if (latest < previous) {
      setIsVisible(true);
    }
  });

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-6 left-1/2 z-[9900] -translate-x-1/2 transform-gpu will-change-transform md:bottom-8"
        >
          <div className="flex items-center gap-1 rounded-full border border-zinc-200/50 bg-white/70 p-1.5 shadow-[0_8px_30px_rgb(0,0,0,0.12)] backdrop-blur-xl dark:border-zinc-800/50 dark:bg-zinc-900/70 dark:shadow-[0_8px_30px_rgb(0,0,0,0.4)]">
            <button
              onClick={() => setActiveTab("loans")}
              className={cn(
                "relative flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300",
                activeTab === "loans"
                  ? "text-blue-600 dark:text-blue-400"
                  : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
              )}
            >
              {activeTab === "loans" && (
                <motion.div
                  layoutId="bottom-nav-active"
                  className="absolute inset-0 rounded-full bg-white shadow-sm dark:bg-zinc-800"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                <Wallet className="h-4 w-4" />
                Loans
              </span>
            </button>

            <button
              onClick={() => setActiveTab("insurance")}
              className={cn(
                "relative flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300",
                activeTab === "insurance"
                  ? "text-emerald-600 dark:text-emerald-400"
                  : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
              )}
            >
              {activeTab === "insurance" && (
                <motion.div
                  layoutId="bottom-nav-active"
                  className="absolute inset-0 rounded-full bg-white shadow-sm dark:bg-zinc-800"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                <ShieldCheck className="h-4 w-4" />
                Insurance
              </span>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
