"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, ChevronRight, ShieldCheck, Home } from "lucide-react";
import { useStore } from "@nanostores/react";
import { activeTabStore } from "@/store/activeTab";

export function LeadPopup() {
  const activeTab = useStore(activeTabStore);
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [hasClosed, setHasClosed] = useState(false);

  useEffect(() => {
    // Show after 5-6 seconds, even after refresh (no persistent storage)
    if (hasClosed) return;

    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 5500); // 5.5 seconds

    return () => clearTimeout(timer);
  }, [hasClosed]);

  useEffect(() => {
    if (isVisible && window.innerWidth < 768) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isVisible]);

  const handleClose = () => {
    setIsVisible(false);
    setHasClosed(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());
    
    data._subject = isLoans ? "New Loan Lead (Popup)" : "New Insurance Lead (Popup)";
    data.quote_type = isLoans ? "Loan Request" : "Insurance Request";
    data._captcha = "false";
    
    try {
      await fetch("https://formsubmit.co/ajax/flexichoicein@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(data)
      });
    } catch (err) {
      console.error("Failed to submit form", err);
    }

    setIsSubmitted(true);
    // Hide popup entirely after a few seconds of showing success
    setTimeout(() => {
      handleClose();
    }, 4000);
  };

  const isLoans = activeTab === "loans";

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Subtle Mobile Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 z-[9990] bg-black/20 backdrop-blur-sm md:hidden"
          />

          {/* Slide up from bottom Modal */}
          <motion.div
            initial={{ opacity: 0, y: "100%", scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: "100%", scale: 0.95, transition: { duration: 0.3 } }}
            transition={{ type: "spring", damping: 28, stiffness: 250 }}
            className="fixed bottom-0 left-0 right-0 z-[9999] max-h-[90vh] overflow-y-auto rounded-t-3xl bg-white p-6 shadow-[0_-8px_30px_rgba(0,0,0,0.12)] dark:bg-gray-950 dark:shadow-[0_-8px_30px_rgba(0,0,0,0.5)] md:bottom-6 md:left-auto md:right-6 md:w-[400px] md:rounded-3xl border border-gray-100 dark:border-gray-800"
          >
            <button
              onClick={handleClose}
              className="absolute right-5 top-5 rounded-full p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-100"
            >
              <X size={20} />
            </button>

            {!isSubmitted ? (
              <div className="flex flex-col">
                <div className="mb-6 mt-2 flex items-center gap-4">
                  <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${isLoans ? "bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400" : "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400"}`}>
                    {isLoans ? <Home size={24} /> : <ShieldCheck size={24} />}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white leading-tight">
                      {isLoans ? "Need a Home Loan?" : "Secure Your Family"}
                    </h3>
                    <p className="mt-1 text-sm font-medium text-gray-500 dark:text-gray-400">
                      {isLoans ? "Unlock the lowest interest rates." : "Get a free insurance quote today."}
                    </p>
                  </div>
                </div>

                <div className={`mb-6 rounded-xl border p-4 ${isLoans ? "border-blue-100 bg-blue-50/50 dark:border-blue-900/30 dark:bg-blue-900/10" : "border-emerald-100 bg-emerald-50/50 dark:border-emerald-900/30 dark:bg-emerald-900/10"}`}>
                  <ul className="flex flex-col gap-2.5 text-sm font-medium text-gray-700 dark:text-gray-300">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 size={16} className={isLoans ? "text-blue-500" : "text-emerald-500"} />
                      {isLoans ? "Instant Pre-approval in 2 Mins" : "Coverage up to ₹1 Crore"}
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 size={16} className={isLoans ? "text-blue-500" : "text-emerald-500"} />
                      {isLoans ? "Compare 30+ Top Banks" : "Cashless Network of 10,000+ Hospitals"}
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 size={16} className={isLoans ? "text-blue-500" : "text-emerald-500"} />
                      {isLoans ? "Zero Hidden Processing Fees" : "100% Free Expert Advisory"}
                    </li>
                  </ul>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                  <div className="relative">
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="Your Full Name"
                      className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-sm font-medium outline-none transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-gray-800 dark:bg-gray-900 dark:text-white dark:focus:border-blue-500/50"
                    />
                  </div>
                  <div className="relative">
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="Phone Number (10 Digits)"
                      pattern="[0-9]{10}"
                      className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-sm font-medium outline-none transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-gray-800 dark:bg-gray-900 dark:text-white dark:focus:border-blue-500/50"
                    />
                  </div>
                  <button
                    type="submit"
                    className={`group mt-2 flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-bold text-white shadow-lg transition-all active:scale-[0.98] ${
                      isLoans 
                        ? "bg-blue-600 shadow-blue-600/25 hover:bg-blue-700" 
                        : "bg-emerald-600 shadow-emerald-600/25 hover:bg-emerald-700"
                    }`}
                  >
                    {isLoans ? "Get the Best Rate" : "Get Free Quote"}
                    <ChevronRight size={16} className="transition-transform group-hover:translate-x-1" />
                  </button>
                  <p className="mt-2 text-center text-[11px] font-medium text-gray-400 dark:text-gray-500">
                    By submitting, you agree to our Terms & Privacy Policy.
                  </p>
                </form>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center gap-4 py-10 text-center"
              >
                <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-500">
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: 0.1, damping: 15 }}
                  >
                    <CheckCircle2 size={40} />
                  </motion.div>
                  <div className="absolute inset-0 animate-ping rounded-full border-2 border-green-500 opacity-20"></div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    You're All Set!
                  </h3>
                  <p className="mt-3 text-sm font-medium leading-relaxed text-gray-500 dark:text-gray-400">
                    Thank you for choosing FlexiChoice.<br />
                    One of our expert advisors will contact you shortly with the best {isLoans ? "loan offers" : "insurance plans"}.
                  </p>
                </div>
              </motion.div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
