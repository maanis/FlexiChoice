export const FAQ_KNOWLEDGE = [
  {
    keywords: ["what is flexichoice", "who are you", "about flexichoice", "what do you do"],
    response: "We're India's premier loan and insurance advisory platform! We help you compare and secure the best loans and insurance plans from 30+ top banks, completely free of charge."
  },
  {
    keywords: ["cost", "charge", "fees", "how much", "free", "advisory fee", "pricing"],
    response: "Our advisory service is **100% free** for you! We earn a direct referral fee from the partner banks only when your loan or insurance is successfully approved."
  },
  {
    keywords: ["how long", "time", "approval", "fast", "duration", "days"],
    response: "For Personal and Home Loans, approvals usually take about **48 hours**. Business Loans typically take **5–7 days**. We'll push for the fastest approval possible!"
  },
  {
    keywords: ["safe", "security", "data", "privacy", "documents"],
    response: "Your privacy is our top priority. All documents are fully encrypted and only shared with the specific banks or insurers you explicitly choose."
  },
  {
    keywords: ["compare", "multiple", "options", "banks", "best plan"],
    response: "Yes! Your advisor will present 3–5 of the best-fit options side-by-side, comparing interest rates and transparent fees so you can make the smartest choice."
  },
  {
    keywords: ["cities", "where", "location", "operate", "mumbai", "delhi", "bangalore", "available"],
    response: "We serve customers across all major Indian cities, with on-ground advisors available in Mumbai, Delhi, Bengaluru, Pune, and Hyderabad!"
  },
  {
    keywords: ["apply", "how to apply", "get started", "onboard", "process"],
    response: "It's easy! Just fill out a quick inquiry form on our website, and one of our expert advisors will call you right back to guide you through everything."
  },
  {
    keywords: ["contact", "support", "help", "customer care", "email", "phone"],
    response: "You can reach us anytime at **+91-98928-70455** or email us at **hello@flexichoice.in**. We're here to help!"
  },
  {
    keywords: ["owner", "founder", "raj mishra", "who owns", "who founded"],
    response: "FlexiChoice was founded by Raj Mishra, an expert financial advisor with over 17 years of industry experience."
  }
];

export const SUGGESTED_QUESTIONS = [
  "How much does FlexiChoice charge?",
  "How long does loan approval take?",
  "Which cities do you operate in?",
  "Is my data safe with you?",
  "What types of loans do you offer?",
  "Do you provide health insurance?",
  "How do I apply for a business loan?",
  "Who are your partner banks?",
  "Can I compare multiple options?",
  "Who is the founder of FlexiChoice?"
];

export const SYSTEM_PROMPT = `You are the official AI Business Assistant for FlexiChoice, a premium loan and insurance advisory platform in India. 
Your goal is to assist users, answer their queries, guide them to the right financial products, and help convert them into leads.

BUSINESS CONTEXT:
- FlexiChoice helps users compare and secure home loans, personal loans, business loans, and insurance (term life, health, vehicle, travel) from 30+ top banks and insurers.
- FlexiChoice is owned and founded by Raj Mishra, who has 17 years of experience in finance advisory.
- Advisory is 100% FREE for users.
- Fast approvals (48 hours for most loans, 5-7 days for business loans).
- On-ground advisors in Mumbai, Delhi, Bengaluru, Pune, and Hyderabad, but serving all major Indian cities.
- Contact: +91-98928-70455, hello@flexichoice.in

TONE & STYLE:
- Professional, premium, confident, yet highly conversational and friendly.
- Keep responses concise, beautifully formatted (use markdown lists and bold text appropriately), and easy to read.
- DO NOT sound like a generic chatbot. Sound like a knowledgeable, human-like financial advisor.
- Do NOT hallucinate services we don't offer (e.g., we don't offer direct stock trading or crypto).
- Always encourage users to connect with an advisor if their query is complex.`;
