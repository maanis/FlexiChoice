"use client";

import { Lock, Send } from "lucide-react";
import { useStore } from "@nanostores/react";
import { activeTabStore } from "@/store/activeTab";
import { MacWindow } from "./MacWindow";
import { toast } from "sonner";

const loanTypes = ["Home Loan", "Mortgage", "Personal", "Business", "Gold", "Private Funding"];
const insuranceTypes = ["Life", "Term Life", "Health", "Vehicle", "Travel", "Overseas"];

export function QuoteForm() {
  const activeTab = useStore(activeTabStore);
  const options = activeTab === "loans" ? loanTypes : insuranceTypes;

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Quote request received", {
      description: "An advisor will reach out within 24 hours.",
    });
    (e.target as HTMLFormElement).reset();
  };

  return (
    <section id="quote" className="py-20 md:py-28" aria-label="Get a free quote">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 lg:grid-cols-[1fr_1.1fr] lg:items-center">
        <div>
          <p className={`text-xs font-medium uppercase tracking-wider ${activeTab === "loans" ? "text-blue-500" : "text-emerald-500"}`}>Get Started</p>
          <h2 className="mt-2 text-balance text-3xl font-semibold tracking-tight md:text-4xl leading-[1.1]">
            Get a personalized quote <br className="hidden md:block" />
            <span className={`italic font-serif ${activeTab === "loans" ? "text-blue-600 dark:text-blue-500" : "text-emerald-600 dark:text-emerald-500"}`}>in under a minute.</span>
          </h2>
          <p className="mt-3 max-w-md text-muted-foreground">
            Tell us a little about what you need. A senior advisor will compare options across our partner network and reach out with the best fit.
          </p>
          <div className="mt-6 flex items-center gap-2 text-xs text-muted-foreground">
            <Lock className="h-4 w-4 text-secondary" />
            Your information stays secure and confidential.
          </div>
        </div>

        <MacWindow title="get-quote.flexichoice.in">
          <div className="p-5 sm:p-7">
            <div className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground border-b border-hairline pb-4">
              {activeTab === "loans" ? "Loan Application" : "Insurance Quote"}
            </div>
            <form onSubmit={onSubmit} className="mt-2 grid gap-4 sm:grid-cols-2">
              <Field label="Full Name" name="name" placeholder="Aarav Mehta" required />
              <Field label="Phone Number" name="phone" type="tel" placeholder="+91 98765 43210" required pattern="[0-9+\s\-]{7,15}" />
              <Field label="City" name="city" placeholder="Mumbai" required />
              <SelectField label="Service Type" name="serviceType" options={options} />
              <SelectField label="Income Range" name="income" options={["< ₹5L", "₹5L – ₹10L", "₹10L – ₹25L", "₹25L – ₹50L", "₹50L+"]} />
              <Field label="Message" name="message" placeholder="Anything we should know?" full />
              <button
                type="submit"
                className="group sm:col-span-2 mt-1 inline-flex h-11 items-center justify-center gap-2 rounded-full bg-foreground px-5 text-sm font-medium text-background transition-all hover:opacity-90 active:scale-[0.98]"
              >
                Request Quote
                <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </button>
            </form>
          </div>
        </MacWindow>
      </div>
    </section>
  );
}

function Field({ label, name, type = "text", placeholder, required, pattern, full }: {
  label: string; name: string; type?: string; placeholder?: string;
  required?: boolean; pattern?: string; full?: boolean;
}) {
  return (
    <label className={`block ${full ? "sm:col-span-2" : ""}`}>
      <span className="mb-1.5 block text-xs font-medium text-muted-foreground">{label}</span>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        required={required}
        pattern={pattern}
        maxLength={200}
        className="block h-11 w-full rounded-xl border border-border bg-background px-3.5 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground/60 focus:border-foreground focus:ring-2 focus:ring-foreground/10"
      />
    </label>
  );
}

function SelectField({ label, name, options }: { label: string; name: string; options: string[] }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium text-muted-foreground">{label}</span>
      <select
        name={name}
        className="block h-11 w-full rounded-xl border border-border bg-background px-3 text-sm text-foreground outline-none transition-all focus:border-foreground focus:ring-2 focus:ring-foreground/10"
      >
        {options.map((o) => <option key={o}>{o}</option>)}
      </select>
    </label>
  );
}
