"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const banners = [
    "/image_349d28.png",
    "/image_349d62.png",
    "/image_349d87.png",
    "/image_34a048.png",
];

export function MarketingSlider() {
    const [index, setIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    // Auto-play loop
    useEffect(() => {
        if (isHovered) return;
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % banners.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [isHovered]);

    const nextSlide = () => setIndex((prev) => (prev + 1) % banners.length);
    const prevSlide = () => setIndex((prev) => (prev - 1 + banners.length) % banners.length);

    return (
        <section className="bg-zinc-50 py-12 dark:bg-[#050505] md:py-24 font-sans selection:bg-blue-500/30">
            <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-8">

                {/* Cinematic Billboard Container */}
                <div
                    className="group relative w-full overflow-hidden rounded-2xl md:rounded-[2rem] bg-zinc-200 dark:bg-zinc-900 shadow-2xl shadow-zinc-200/50 dark:shadow-black/50"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    {/* Responsive aspect ratio ensures wide text banners NEVER get cropped */}
                    <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] md:aspect-[3/1] lg:aspect-[4/1]">
                        <AnimatePresence mode="popLayout">
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 1.05 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                className="absolute inset-0"
                            >
                                <Image
                                    src={banners[index]}
                                    alt={`Marketing Campaign ${index + 1}`}
                                    fill
                                    priority={index === 0}
                                    // Using contain on mobile to guarantee text reading, cover on ultra-wide
                                    className="object-contain md:object-cover"
                                    sizes="(max-width: 1600px) 100vw, 1600px"
                                    draggable={false}
                                />
                            </motion.div>
                        </AnimatePresence>

                        {/* Subtle Gradient Overlays for Depth */}
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />

                        {/* Floating Navigation Pill */}
                        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/10 bg-black/40 p-1.5 backdrop-blur-xl md:bottom-8 md:gap-4 md:p-2 transition-transform duration-500 group-hover:translate-y-0 translate-y-2 opacity-0 group-hover:opacity-100">

                            <button
                                onClick={prevSlide}
                                className="grid h-8 w-8 md:h-10 md:w-10 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/30"
                            >
                                <ChevronLeft className="h-4 w-4 md:h-5 md:w-5" />
                            </button>

                            <div className="flex items-center gap-2 px-2 md:px-4">
                                {banners.map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setIndex(i)}
                                        className="group relative flex h-4 items-center justify-center"
                                    >
                                        <span
                                            className={`block h-1 rounded-full transition-all duration-500 ease-out ${i === index ? "w-8 bg-white" : "w-2 bg-white/30 group-hover:bg-white/60"
                                                }`}
                                        />
                                    </button>
                                ))}
                            </div>

                            <button
                                onClick={nextSlide}
                                className="grid h-8 w-8 md:h-10 md:w-10 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/30"
                            >
                                <ChevronRight className="h-4 w-4 md:h-5 md:w-5" />
                            </button>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}