"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "@nanostores/react";
import { activeTabStore } from "@/store/activeTab";
import { CheckCircle2, Landmark, Shield, Search, Activity, ArrowRight, X } from "lucide-react";
import { cn } from "@/lib/utils";

// --- Dummy Data ---
const bankRates = [
    { name: "HDFC Bank", min: "8.35%", max: "9.50%" },
    { name: "State Bank of India", min: "8.40%", max: "10.05%" },
    { name: "ICICI Bank", min: "8.45%", max: "9.90%" },
    { name: "Axis Bank", min: "8.45%", max: "10.25%" },
    { name: "Kotak Mahindra", min: "8.50%", max: "10.50%" },
    { name: "Bank of Baroda", min: "8.40%", max: "10.10%" },
    { name: "Punjab National", min: "8.45%", max: "10.25%" },
    { name: "Federal Bank", min: "8.50%", max: "9.85%" },
];

const insuranceRates = [
    { name: "Star Health", min: "₹450/m", max: "₹1,200/m" },
    { name: "HDFC Ergo", min: "₹480/m", max: "₹1,500/m" },
    { name: "ICICI Lombard", min: "₹500/m", max: "₹1,800/m" },
    { name: "Care Health", min: "₹420/m", max: "₹1,100/m" },
    { name: "Niva Bupa", min: "₹490/m", max: "₹1,400/m" },
    { name: "SBI General", min: "₹460/m", max: "₹1,300/m" },
    { name: "Aditya Birla", min: "₹440/m", max: "₹1,250/m" },
    { name: "Bajaj Allianz", min: "₹470/m", max: "₹1,450/m" },
];

// --- Sub-component for the Marquee Row ---
function InfiniteSliderRow({
    items,
    direction = -1,
    speed = 40,
    isLoans
}: {
    items: any[],
    direction?: number,
    speed?: number,
    isLoans: boolean
}) {
    const duplicatedItems = [...items, ...items, ...items];

    return (
        <div className="flex w-full overflow-hidden">
            <motion.div
                animate={{ x: direction === -1 ? ["0%", "-33.33%"] : ["-33.33%", "0%"] }}
                transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
                className="flex w-max gap-4 px-2 md:gap-6 md:px-3"
            >
                {duplicatedItems.map((item, idx) => (
                    <ProviderCard key={`${item.name}-${idx}`} item={item} isLoans={isLoans} className="w-[280px] shrink-0 md:w-[320px]" />
                ))}
            </motion.div>
        </div>
    );
}

// --- Sub-component for individual Provider Card ---
function ProviderCard({ item, isLoans, className }: { item: any, isLoans: boolean, className?: string }) {
    return (
        <div className={cn(
            "group relative flex flex-col justify-between rounded-2xl border border-zinc-200 bg-white/60 p-5 shadow-sm backdrop-blur-xl transition-all hover:-translate-y-1 hover:shadow-md dark:border-zinc-800/60 dark:bg-zinc-900/40 md:p-6",
            className
        )}>
            <div className="mb-6 flex items-center gap-3">
                <div className={cn(
                    "grid h-10 w-10 shrink-0 place-items-center rounded-full border transition-colors",
                    isLoans
                        ? "border-blue-100 bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white dark:border-blue-500/20 dark:bg-blue-500/10 dark:text-blue-400 dark:group-hover:bg-blue-500"
                        : "border-emerald-100 bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-400 dark:group-hover:bg-emerald-500"
                )}>
                    {isLoans ? <Landmark className="h-5 w-5" /> : <Shield className="h-5 w-5" />}
                </div>
                <h4 className="text-base font-bold text-zinc-900 dark:text-white truncate">
                    {item.name}
                </h4>
            </div>

            <div className="flex items-end justify-between">
                <div>
                    <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-zinc-500">Min Rate</p>
                    <p className={cn(
                        "text-xl font-black tracking-tight",
                        isLoans ? "text-blue-600 dark:text-blue-400" : "text-emerald-600 dark:text-emerald-400"
                    )}>
                        {item.min}
                    </p>
                </div>
                <div className="text-right">
                    <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-zinc-500">Max</p>
                    <p className="text-lg font-bold text-zinc-900 dark:text-white">
                        {item.max}
                    </p>
                </div>
            </div>
        </div>
    );
}

export function LiveRates() {
    const activeTab = useStore(activeTabStore);
    const isLoans = activeTab === "loans";
    const data = isLoans ? bankRates : insuranceRates;

    const [searchQuery, setSearchQuery] = useState("");

    // Split data for the default infinite slider rows
    const row1Data = useMemo(() => data.slice(0, 4), [data]);
    const row2Data = useMemo(() => data.slice(4, 8), [data]);

    // Smart Search & Proximity Filtering Logic
    const searchResults = useMemo(() => {
        if (!searchQuery.trim()) return [];

        const query = searchQuery.toLowerCase().trim();
        // Extract numerical value from query if present (e.g. "8.5" or "500")
        const numQuery = parseFloat(query.replace(/[^\d.]/g, ''));

        return data.filter((item) => {
            // 1. Direct Name Match
            if (item.name.toLowerCase().includes(query)) return true;

            // 2. Direct String Match for rates
            if (item.min.toLowerCase().includes(query) || item.max.toLowerCase().includes(query)) return true;

            // 3. Proximity Match (Closest Options)
            if (!isNaN(numQuery)) {
                const minNum = parseFloat(item.min.replace(/[^\d.]/g, ''));
                const maxNum = parseFloat(item.max.replace(/[^\d.]/g, ''));

                if (isLoans) {
                    // For loans (e.g., 8.35%), find rates within a 0.5% delta
                    if (Math.abs(minNum - numQuery) <= 0.5 || Math.abs(maxNum - numQuery) <= 0.5) return true;
                    if (numQuery >= minNum && numQuery <= maxNum) return true;
                } else {
                    // For insurance (e.g., ₹450), find premiums within a 200 rupee delta
                    if (Math.abs(minNum - numQuery) <= 200 || Math.abs(maxNum - numQuery) <= 200) return true;
                    if (numQuery >= minNum && numQuery <= maxNum) return true;
                }
            }
            return false;
        });
    }, [searchQuery, data, isLoans]);

    return (
        <section className="relative overflow-hidden bg-zinc-50 py-24 dark:bg-[#050505] md:py-32 font-sans selection:bg-blue-500/30 min-h-[800px]">

            {/* Dynamic Ambient Background Glow */}
            <div className={cn(
                "pointer-events-none absolute left-1/2 top-0 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px] transition-colors duration-1000",
                isLoans ? "bg-blue-500/10 dark:bg-blue-600/10" : "bg-emerald-500/10 dark:bg-emerald-600/10"
            )} aria-hidden />

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">

                {/* Cinematic Header Section */}
                <div className="mb-12 flex flex-col items-center text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-6 flex items-center gap-4"
                    >
                        {/* Live Pulsing Badge */}
                        <div className={cn(
                            "flex items-center gap-2 rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-widest shadow-sm",
                            isLoans
                                ? "border-rose-200 bg-rose-50 text-rose-600 dark:border-rose-500/20 dark:bg-rose-500/10 dark:text-rose-400"
                                : "border-emerald-200 bg-emerald-50 text-emerald-600 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-400"
                        )}>
                            <span className="relative flex h-2 w-2">
                                <span className={cn(
                                    "absolute inline-flex h-full w-full animate-ping rounded-full opacity-75",
                                    isLoans ? "bg-rose-500" : "bg-emerald-500"
                                )} />
                                <span className={cn(
                                    "relative inline-flex h-2 w-2 rounded-full",
                                    isLoans ? "bg-rose-500" : "bg-emerald-500"
                                )} />
                            </span>
                            LIVE DATA
                        </div>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-balance text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white sm:text-5xl md:text-6xl"
                    >
                        {isLoans ? "Home Loans from " : "Comprehensive Cover from "}
                        <span className={cn(
                            "bg-gradient-to-r bg-clip-text text-transparent transition-colors duration-700",
                            isLoans ? "from-blue-600 to-cyan-500" : "from-emerald-500 to-teal-400"
                        )}>
                            {isLoans ? "8.35%*" : "₹450/mo*"}
                        </span>
                    </motion.h2>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm font-medium text-zinc-600 dark:text-zinc-400"
                    >
                        <span className="flex items-center gap-2">
                            <CheckCircle2 className={cn("h-5 w-5", isLoans ? "text-blue-500" : "text-emerald-500")} />
                            Deep partnerships with 70+ leading brands
                        </span>
                        <span className="hidden h-1.5 w-1.5 rounded-full bg-zinc-300 dark:bg-zinc-700 sm:block" />
                        <span className="flex items-center gap-2">
                            <Activity className={cn("h-5 w-5", isLoans ? "text-blue-500" : "text-emerald-500")} />
                            Experts who negotiate the best rates for you
                        </span>
                    </motion.div>
                </div>

                {/* Functional Smart Search Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className={cn(
                        "mx-auto mb-16 flex max-w-lg items-center justify-between rounded-full border bg-white p-2 pl-5 shadow-sm transition-all dark:bg-zinc-900/50",
                        searchQuery ? (isLoans ? "border-blue-500 ring-4 ring-blue-500/10" : "border-emerald-500 ring-4 ring-emerald-500/10") : "border-zinc-200 dark:border-zinc-800/80"
                    )}
                >
                    <div className="flex w-full items-center gap-3">
                        <Search className={cn("h-5 w-5 transition-colors", searchQuery ? (isLoans ? "text-blue-500" : "text-emerald-500") : "text-zinc-400")} />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search by provider or specific rate..."
                            className="w-full bg-transparent text-sm font-semibold text-zinc-900 outline-none placeholder:font-medium placeholder:text-zinc-400 dark:text-white"
                        />
                    </div>
                    {searchQuery ? (
                        <button
                            onClick={() => setSearchQuery("")}
                            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-zinc-500 hover:bg-zinc-200 hover:text-zinc-900 dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:hover:text-white transition-colors"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    ) : (
                        <button className={cn(
                            "flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white transition-transform hover:scale-105 active:scale-95",
                            isLoans ? "bg-blue-600 hover:bg-blue-700" : "bg-emerald-600 hover:bg-emerald-700"
                        )}>
                            <ArrowRight className="h-5 w-5" />
                        </button>
                    )}
                </motion.div>

                {/* =========================================
            DYNAMIC VIEW: GRID vs INFINITE MARQUEE
        ========================================= */}
                <AnimatePresence mode="wait">
                    {searchQuery ? (
                        <motion.div
                            key="search-results"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="w-full"
                        >
                            {searchResults.length > 0 ? (
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                                    {searchResults.map((item, idx) => (
                                        <motion.div
                                            key={item.name}
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: idx * 0.05 }}
                                        >
                                            <ProviderCard item={item} isLoans={isLoans} className="h-full w-full" />
                                        </motion.div>
                                    ))}
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center py-20 text-center">
                                    <div className="mb-4 grid h-16 w-16 place-items-center rounded-full bg-zinc-100 dark:bg-zinc-800">
                                        <Search className="h-8 w-8 text-zinc-400" />
                                    </div>
                                    <h3 className="text-xl font-bold text-zinc-900 dark:text-white">No exact matches found</h3>
                                    <p className="mt-2 text-sm text-zinc-500">Try adjusting your rate or searching for a different provider.</p>
                                </div>
                            )}
                        </motion.div>
                    ) : (
                        <motion.div
                            key="marquee-sliders"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            className="relative flex flex-col gap-4 md:gap-6"
                        >
                            {/* Gradient Masks for smooth fading edges */}
                            <div className="pointer-events-none absolute bottom-0 left-0 top-0 z-10 w-16 bg-gradient-to-r from-zinc-50 to-transparent dark:from-[#050505] sm:w-32 md:w-64" />
                            <div className="pointer-events-none absolute bottom-0 right-0 top-0 z-10 w-16 bg-gradient-to-l from-zinc-50 to-transparent dark:from-[#050505] sm:w-32 md:w-64" />

                            <InfiniteSliderRow items={row1Data} direction={-1} speed={45} isLoans={isLoans} />
                            <InfiniteSliderRow items={row2Data} direction={1} speed={55} isLoans={isLoans} />
                        </motion.div>
                    )}
                </AnimatePresence>

            </div>

            <div className="mt-16 flex justify-center relative z-10">
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={cn(
                        "rounded-xl px-8 py-4 font-bold text-white shadow-lg transition-all",
                        isLoans
                            ? "bg-blue-600 hover:bg-blue-700 hover:shadow-blue-500/25"
                            : "bg-emerald-600 hover:bg-emerald-700 hover:shadow-emerald-500/25"
                    )}
                >
                    Find the best rates for you!
                </motion.button>
            </div>

        </section>
    );
}