"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ShieldCheck, Home, Briefcase, Car, HeartPulse, Stethoscope, FileText, PiggyBank, GraduationCap, Building2 } from "lucide-react";

type NotificationType = "loan" | "insurance";

interface ProofNotification {
  id: number;
  name: string;
  location: string;
  action: string;
  type: NotificationType;
  time: string;
}

const names = ["Rahul T.", "Priya S.", "Amit P.", "Sneha M.", "Vikram R.", "Anjali K.", "Rajesh M.", "Neha D.", "Suresh V.", "Kavita R.", "Ramesh B.", "Pooja N.", "Siddharth J.", "Deepa C.", "Ravi K.", "Meera V.", "Karan S.", "Swati Y.", "Manoj P.", "Divya L.", "Akash T.", "Nandini R.", "Sandeep H.", "Aarti K.", "Vishal D.", "Ritu M.", "Anand S.", "Kiran P.", "Ajay V.", "Sheetal C.", "Varun G.", "Preeti K.", "Gaurav R.", "Shruti N.", "Prakash T.", "Radhika J.", "Rohit M.", "Sonali P.", "Nitin K.", "Archana S.", "Tarun V.", "Monika D.", "Deepak R.", "Bhavna M.", "Yogesh K.", "Priyanka S.", "Harish P.", "Jyoti N.", "Mahesh C.", "Smriti T."];
const locations = ["Mumbai", "Bengaluru", "Pune", "Delhi", "Hyderabad", "Chennai", "Kolkata", "Ahmedabad", "Jaipur", "Surat", "Indore", "Lucknow", "Nagpur", "Patna", "Bhopal", "Thane", "Agra", "Nashik", "Faridabad", "Meerut"];
const loanActions = [
  "just got a Home Loan approved!",
  "saved ₹2.4L on Balance Transfer.",
  "got a Business Loan instantly.",
  "secured a Personal Loan of ₹5L.",
  "transferred Home Loan at 8.35%.",
  "got an instant Two-Wheeler Loan.",
  "approved for a ₹20L Education Loan.",
  "financed their new dream car.",
  "unlocked a pre-approved Personal Loan.",
  "availed a Loan Against Property."
];
const insuranceActions = [
  "secured Health Insurance for family.",
  "bought a Term Life Insurance cover.",
  "renewed their Car Insurance.",
  "purchased a ₹1 Crore Term Plan.",
  "upgraded to a top-tier Health Plan.",
  "secured comprehensive Bike Insurance.",
  "opted for Critical Illness cover.",
  "insured their new home and contents.",
  "bought Family Floater Health Insurance.",
  "invested in a ULIP Life Insurance plan."
];

// Generate 50 mock notifications
const notifications: ProofNotification[] = Array.from({ length: 50 }).map((_, i) => {
  const isLoan = Math.random() > 0.5;
  const timeNum = Math.floor(Math.random() * 59) + 1;
  return {
    id: i + 1,
    name: names[Math.floor(Math.random() * names.length)],
    location: locations[Math.floor(Math.random() * locations.length)],
    action: isLoan 
      ? loanActions[Math.floor(Math.random() * loanActions.length)] 
      : insuranceActions[Math.floor(Math.random() * insuranceActions.length)],
    type: isLoan ? "loan" : "insurance",
    time: `${timeNum} min${timeNum > 1 ? 's' : ''} ago`,
  };
});

export function SocialProof() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Start showing notifications a bit after page load
    const initialDelay = setTimeout(() => {
      // Pick a random index to start
      setCurrentIndex(Math.floor(Math.random() * notifications.length));
      setIsVisible(true);
    }, 8000);

    return () => clearTimeout(initialDelay);
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    // Show for 4 seconds, then hide
    const hideTimer = setTimeout(() => {
      setIsVisible(false);
      
      // Move to next random notification, and show again after a random interval (5 to 8 seconds)
      const nextDelay = Math.floor(Math.random() * 3000) + 5000;
      setTimeout(() => {
        let nextIndex;
        do {
          nextIndex = Math.floor(Math.random() * notifications.length);
        } while (nextIndex === currentIndex); // avoid showing the same twice in a row
        
        setCurrentIndex(nextIndex);
        setIsVisible(true);
      }, nextDelay);
      
    }, 4000);

    return () => clearTimeout(hideTimer);
  }, [isVisible, currentIndex]);

  const currentNotification = notifications[currentIndex];
  
  if (!currentNotification) return null;

  return (
    <div className="pointer-events-none fixed bottom-24 left-4 z-[9990] md:bottom-6 md:left-6 lg:bottom-8 lg:left-8">
      <AnimatePresence mode="wait">
        {isVisible && (
          <motion.div
            key={currentNotification.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95, transition: { duration: 0.3 } }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="pointer-events-auto flex max-w-[320px] items-center gap-3 rounded-2xl border border-gray-100 bg-white/90 p-3 shadow-xl shadow-black/5 backdrop-blur-md dark:border-gray-800 dark:bg-gray-900/90 md:p-4"
          >
            <div
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                currentNotification.type === "loan"
                  ? "bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400"
                  : "bg-green-100 text-green-600 dark:bg-green-900/40 dark:text-green-400"
              }`}
            >
              {currentNotification.type === "loan" ? (
                <Home size={18} />
              ) : (
                <ShieldCheck size={18} />
              )}
            </div>
            <div className="flex flex-col">
              <p className="text-sm text-gray-900 dark:text-gray-100">
                <span className="font-semibold">{currentNotification.name}</span>{" "}
                from {currentNotification.location}
              </p>
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400 leading-tight mt-0.5">
                {currentNotification.action}
              </p>
              <span className="mt-1 text-[10px] font-medium text-gray-400/80 dark:text-gray-500">
                {currentNotification.time}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
