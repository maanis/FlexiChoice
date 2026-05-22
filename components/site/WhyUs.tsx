"use client";

import Image from "next/image";
import { Zap, Building, Lock, Eye, ShieldCheck, Activity } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "@nanostores/react";
import { activeTabStore } from "@/store/activeTab";

const loanFeatures = [
  { icon: Zap, title: "Fast Approval", desc: "Most loans sanctioned within 48 hours. We cut the red tape." },
  { icon: Building, title: "30+ Partners", desc: "Top banks combined in one single platform for best rates." },
  { icon: Lock, title: "Bank-Grade Security", desc: "End-to-end encryption to keep your financial data safe." },
  { icon: Eye, title: "100% Transparent", desc: "No hidden fees. Complete clarity from application to disbursal." },
];

const insuranceFeatures = [
  { icon: Zap, title: "Instant Issuance", desc: "Most policies issued instantly. We cut the red tape." },
  { icon: Building, title: "Top Insurers", desc: "Leading insurance providers combined in one single platform." },
  { icon: Lock, title: "Bank-Grade Security", desc: "End-to-end encryption to keep your medical and financial data safe." },
  { icon: Eye, title: "100% Transparent", desc: "No hidden clauses. Complete clarity on what is covered." },
];

export function WhyUs() {
  const activeTab = useStore(activeTabStore);
  const features = activeTab === "loans" ? loanFeatures : insuranceFeatures;
  return (
    <section id="why" className="relative overflow-hidden py-24 md:py-32" aria-label="Why choose FlexiChoice">
      <div className="pointer-events-none absolute left-0 top-1/2 hidden h-[600px] w-[600px] -translate-y-1/2 rounded-full bg-primary/5 blur-[120px] md:block" aria-hidden />

      <div className="mx-auto max-w-7xl px-4 relative z-10">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-8 items-center">

          <div className="relative mx-auto w-full max-w-md lg:mx-0 lg:max-w-none">
            <div className="absolute inset-0 hidden rounded-full bg-gradient-to-tr from-secondary/10 to-primary/10 blur-3xl md:block" />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative z-10"
            >
              <Image
                src="/advisor.webp"
                alt="FlexiChoice financial advisor helping customers with loans and insurance"
                width={600}
                height={700}
                className="relative z-10 h-auto w-full object-contain drop-shadow-2xl filter contrast-125 brightness-110"
                style={{
                  maskImage: "linear-gradient(to bottom, black 80%, transparent 100%)",
                  WebkitMaskImage: "linear-gradient(to bottom, black 80%, transparent 100%)",
                }}
                priority={false}
              />

              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="absolute top-1/4 -left-8 z-20 flex items-center gap-3 rounded-2xl border border-white/10 bg-surface/90 px-4 py-3 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.3)] backdrop-blur-md md:-left-12 md:backdrop-blur-xl transform-gpu"
              >
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-secondary/15 text-secondary border border-secondary/20">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Security</p>
                  <p className="text-[14px] font-bold text-foreground/90">Bank-Grade</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="absolute bottom-1/4 -right-4 z-20 flex items-center gap-3 rounded-2xl border border-white/10 bg-surface/90 px-4 py-3 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.3)] backdrop-blur-md md:-right-8 md:backdrop-blur-xl transform-gpu"
              >
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/15 text-primary border border-primary/20">
                  <Activity className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Uptime</p>
                  <p className="text-[14px] font-bold text-foreground/90">99.99%</p>
                </div>
              </motion.div>
            </motion.div>
          </div>

          <div className="flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className={`inline-flex items-center gap-2 rounded-full border border-border bg-surface/80 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] shadow-soft backdrop-blur ${activeTab === "loans" ? "text-blue-500" : "text-emerald-500"}`}>
                Why Choose Us
              </div>
              <h2 className="mt-6 text-balance text-3xl font-semibold tracking-tight md:text-5xl leading-[1.1]">
                Built on trust. <br />
                <span className={`italic font-serif ${activeTab === "loans" ? "text-blue-600 dark:text-blue-500" : "text-emerald-600 dark:text-emerald-500"}`}>Powered by people.</span>
              </h2>
              <p className="mt-4 max-w-lg text-[16px] leading-relaxed text-muted-foreground">
                We combine cutting-edge fintech infrastructure with human expertise to make your financial decisions effortless and secure.
              </p>
            </motion.div>

            <div className="mt-12 grid gap-4 sm:grid-cols-2">
              <AnimatePresence mode="popLayout">
                {features.map((feature, idx) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4, delay: 0.1 + idx * 0.1 }}
                    className="group relative overflow-hidden rounded-[1.5rem] border border-hairline bg-surface/40 p-6 transition-all hover:bg-surface hover:shadow-soft backdrop-blur"
                  >
                    <span className={`absolute inset-x-4 top-0 h-[1px] bg-gradient-to-r from-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${activeTab === "loans" ? "via-blue-500/50" : "via-emerald-500/50"}`} />
                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-muted/50 border border-hairline text-foreground group-hover:bg-foreground group-hover:text-background transition-colors duration-300">
                      <feature.icon className="h-5 w-5" />
                    </div>
                    <h3 className="mb-2 text-[17px] font-semibold tracking-tight">{feature.title}</h3>
                    <p className="text-[14px] leading-relaxed text-muted-foreground">{feature.desc}</p>
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
