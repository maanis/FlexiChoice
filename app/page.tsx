import type { Metadata } from "next";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { LoanRates } from "@/components/site/LoanRates";
import { Services } from "@/components/site/Services";
import { Process } from "@/components/site/Process";
import { Calculator } from "@/components/site/Calculator";
import { WhyUs } from "@/components/site/WhyUs";
import { QuoteForm } from "@/components/site/QuoteForm";
import { Testimonials } from "@/components/site/Testimonials";
import { FAQ } from "@/components/site/FAQ";
import { FinalCTA } from "@/components/site/FinalCTA";
import { Footer } from "@/components/site/Footer";
import { MarketingSlider } from "@/components/site/MarketingSlider";
import { BottomNav } from "@/components/site/BottomNav";
import { LiveRates } from "@/components/site/LiveRates";

export const metadata: Metadata = {
  title: "FlexiChoice – Best Loans & Insurance Services in India",
  description:
    "FlexiChoice offers the best home loans, personal loans, business loans, and insurance services across India. Compare 30+ top banks and insurers. Expert advisors. Fast approvals in 48 hours.",
  alternates: {
    canonical: "https://flexichoice.in",
  },
};

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <Hero />
        <LiveRates />
        {/* <MarketingSlider /> */}
        <LoanRates />
        <Services />
        <Process />
        <Calculator />
        <WhyUs />
        <QuoteForm />
        <Testimonials />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
      <BottomNav />
    </div>
  );
}
