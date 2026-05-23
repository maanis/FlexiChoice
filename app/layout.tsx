import type { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Toaster } from "sonner";
import { AssistantWidget } from "@/components/ai/AssistantWidget";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://flexichoice.in"),

  title: {
    default: "Flexi Choice - Choice is yours",
    template: "%s | Flexi Choice",
  },

  description:
    "Flexi Choice provides trusted loan and insurance services across Mumbai including Goregaon, Borivali, Kandivali, and Malad. Get home loans, personal loans, business loans, and insurance plans with expert advisors and fast approvals.",

  keywords: [
    "Flexi Choice",

    "best loan services",
    "best loan services in Mumbai",
    "best loan services in Goregaon",
    "best loan services in Borivali",
    "best loan services in Kandivali",
    "best loan services in Malad",

    "insurance services",
    "insurance services near me",
    "insurance services in Goregaon",
    "insurance services in Borivali",
    "insurance services in Kandivali",
    "insurance services in Malad",

    "home loan",
    "personal loan",
    "business loan",
    "mortgage loan",
    "gold loan",

    "health insurance",
    "term insurance",
    "vehicle insurance",
    "travel insurance",

    "loan advisor Mumbai",
    "loan consultant Goregaon",
    "loan consultant Borivali",
    "loan consultant Kandivali",
    "loan consultant Malad",

    "best insurance advisor Mumbai",
    "best financial services Mumbai",

    "low interest home loan",
    "fast loan approval",
    "loan services near Goregaon",

    "Flexi Choice loans",
    "Flexi Choice insurance",
  ],

  authors: [
    {
      name: "Flexi Choice",
      url: "https://flexichoice.in",
    },
  ],

  creator: "Flexi Choice",
  publisher: "Flexi Choice",

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

    siteName: "Flexi Choice",

    title: "Flexi Choice - Choice is yours",

    description:
      "Trusted loan and insurance services across Mumbai including Goregaon, Borivali, Kandivali, and Malad.",

    images: [
      {
        url: "/FC-Logo.png",
        width: 1200,
        height: 630,
        alt: "Flexi Choice - Loans & Insurance Services",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: "Flexi Choice - Choice is yours",

    description:
      "Trusted loan and insurance services across Mumbai.",

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
    // google: "your-google-verification-code",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",

  "@type": "FinancialService",

  name: "Flexi Choice",

  url: "https://flexichoice.in",

  logo: "https://flexichoice.in/FC-Logo.png",

  description:
    "Flexi Choice is a trusted loan and insurance advisory platform serving customers across Mumbai.",

  slogan: "Choice is yours",

  serviceType: [
    "Home Loan",
    "Personal Loan",
    "Business Loan",
    "Mortgage Loan",
    "Gold Loan",
    "Health Insurance",
    "Term Insurance",
    "Vehicle Insurance",
    "Travel Insurance",
  ],

  areaServed: [
    {
      "@type": "City",
      name: "Mumbai",
    },
    {
      "@type": "City",
      name: "Goregaon",
    },
    {
      "@type": "City",
      name: "Borivali",
    },
    {
      "@type": "City",
      name: "Kandivali",
    },
    {
      "@type": "City",
      name: "Malad",
    },
  ],

  address: {
    "@type": "PostalAddress",
    streetAddress: "Goregaon East",
    addressLocality: "Mumbai",
    addressRegion: "Maharashtra",
    postalCode: "400063",
    addressCountry: "IN",
  },

  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+91-9892870455",
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

      name: "Does Flexi Choice charge for advisory?",

      acceptedAnswer: {
        "@type": "Answer",

        text: "No. Our consultation is completely free for customers.",
      },
    },

    {
      "@type": "Question",

      name: "How long does loan approval take?",

      acceptedAnswer: {
        "@type": "Answer",

        text: "Most loans are processed within 48 hours after document submission.",
      },
    },

    {
      "@type": "Question",

      name: "Can I compare multiple loan options?",

      acceptedAnswer: {
        "@type": "Answer",

        text: "Yes. Flexi Choice helps you compare multiple banks and insurance providers before making a decision.",
      },
    },

    {
      "@type": "Question",

      name: "Which areas does Flexi Choice serve?",

      acceptedAnswer: {
        "@type": "Answer",

        text: "We provide loan and insurance services across Mumbai including Goregaon, Borivali, Kandivali, Malad, Andheri, and nearby areas.",
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
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqSchema),
          }}
        />
      </head>

      <body>
        {children}

        <AssistantWidget />

        <Toaster />

        <GoogleAnalytics gaId="G-1RPYQPJMVK" />
      </body>
    </html>
  );
}