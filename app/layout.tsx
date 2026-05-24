import type { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Toaster } from "sonner";
import { AssistantWidget } from "@/components/ai/AssistantWidget";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://flexichoice.in"),
  title: {
    default: "FlexiChoice – Best Loans & Insurance Services in India",
    template: "%s | FlexiChoice",
  },
  description:
    "FlexiChoice offers the best home loans, personal loans, business loans, and insurance services across India. Compare 30+ top banks and insurers. Expert advisors. Fast approvals in 48 hours.",
  keywords: [
    "best loan services India",
    "home loan",
    "personal loan",
    "business loan",
    "insurance services",
    "term life insurance",
    "health insurance",
    "loan advisor India",
    "FlexiChoice",
    "loan comparison India",
    "best insurance plans",
    "mortgage loan",
    "gold loan",
    "lowest interest rate loan",
  ],
  authors: [{ name: "FlexiChoice", url: "https://flexichoice.in" }],
  creator: "FlexiChoice",
  publisher: "FlexiChoice",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://flexichoice.in",
    siteName: "FlexiChoice",
    title: "FlexiChoice – Best Loans & Insurance Services in India",
    description:
      "Compare home loans, personal loans, business loans, and insurance plans from 30+ top Indian banks and insurers. Free advisory. Fast approvals.",
    images: [
      {
        url: "/FC-Logo.png",
        width: 1200,
        height: 630,
        alt: "FlexiChoice – Loans & Insurance Services India",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FlexiChoice – Best Loans & Insurance Services in India",
    description:
      "Compare loans and insurance from 30+ top Indian banks. Free expert advisory. Fast approvals.",
    images: ["/FC-Logo.png"],
    site: "@flexichoice",
  },
  alternates: {
    canonical: "https://flexichoice.in",
  },
  icons: {
    icon: [{ url: "/FC-Logo.png", type: "image/png" }],
    shortcut: "/FC-Logo.png",
    apple: "/FC-Logo.png",
  },
  verification: {
    // Add your Google Search Console verification code here after verifying
    // google: "your-verification-code",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "FinancialService",
  name: "FlexiChoice",
  url: "https://flexichoice.in",
  logo: "https://flexichoice.in/FC-Logo.png",
  description:
    "FlexiChoice is India's trusted loan and insurance advisory platform. We help you compare and secure the best home loans, personal loans, business loans, and insurance plans from 30+ top banks and insurers.",
  serviceType: [
    "Home Loan",
    "Personal Loan",
    "Business Loan",
    "Mortgage Loan",
    "Gold Loan",
    "Term Life Insurance",
    "Health Insurance",
    "Vehicle Insurance",
    "Travel Insurance",
  ],
  areaServed: {
    "@type": "Country",
    name: "India",
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "Goregaon East, Mumbai",
    addressLocality: "Mumbai",
    addressRegion: "Maharashtra",
    postalCode: "400063",
    addressCountry: "IN",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+91-98928-70455",
    contactType: "customer service",
    email: "hello@flexichoice.in",
    availableLanguage: ["English", "Hindi"],
  },
  sameAs: [
    "https://www.facebook.com/flexichoice",
    "https://www.instagram.com/flexichoice",
    "https://www.linkedin.com/company/flexichoice",
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Does FlexiChoice charge for advisory?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Our consultation is completely free. We earn a referral fee from partner banks and insurers — never from you.",
      },
    },
    {
      "@type": "Question",
      name: "How long does loan approval usually take?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most personal and home loans are sanctioned within 48 hours once documents are submitted. Business loans typically take 5–7 days.",
      },
    },
    {
      "@type": "Question",
      name: "Are my documents and data safe with FlexiChoice?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. All data is encrypted in transit and at rest. We only share what's necessary with partners you choose to apply with.",
      },
    },
    {
      "@type": "Question",
      name: "Can I compare multiple loan and insurance plans before deciding?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Absolutely. Your advisor presents 3–5 best-fit options side-by-side, with transparent fees and terms.",
      },
    },
    {
      "@type": "Question",
      name: "Which cities does FlexiChoice operate in?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We serve customers across all major Indian cities, with on-ground advisors in Mumbai, Delhi, Bengaluru, Pune and Hyderabad.",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" href="/FC-Logo.png" />
        <link rel="shortcut icon" href="/FC-Logo.png" />
        <link rel="apple-touch-icon" href="/FC-Logo.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </head>
      <body>
        {children}
        <AssistantWidget />
        <Toaster />
        {/* Replace G-XXXXXXXXXX with your real GA4 Measurement ID */}
        <GoogleAnalytics gaId="G-1RPYQPJMVK" />
      </body>
    </html>
  );
}