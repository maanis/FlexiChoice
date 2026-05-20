import { BrandImage } from "./BrandImage";
import { Twitter, Linkedin, Instagram, Mail, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-6xl px-4 py-14">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <a href="#" className="inline-flex items-center" aria-label="FlexiChoice home">
              <BrandImage
                variant="header"
                alt="FlexiChoice"
                sizes="186px"
                className="h-12 w-auto max-w-[186px]"
              />
            </a>
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              Honest, modern financial advisory. Loans and insurance — without the friction.
            </p>
            <div className="mt-5 flex items-center gap-2">
              {[
                { Icon: Twitter, label: "Twitter" },
                { Icon: Linkedin, label: "LinkedIn" },
                { Icon: Instagram, label: "Instagram" },
              ].map(({ Icon, label }) => (
                <a key={label} href="#" aria-label={`FlexiChoice on ${label}`} className="grid h-9 w-9 place-items-center rounded-full border border-border text-muted-foreground transition-all hover:text-foreground">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <FooterCol title="Loans" items={["Home Loan", "Mortgage", "Personal Loan", "Business Loan", "Gold Loan", "Private Funding"]} />
          <FooterCol title="Insurance" items={["Life Insurance", "Term Life", "Health Insurance", "Vehicle Insurance", "Travel Insurance", "Overseas Insurance"]} />

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-foreground">Contact</p>
            <address className="mt-4 space-y-3 text-sm text-muted-foreground not-italic">
              <p className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0" />
                <a href="mailto:hello@flexichoice.in" className="hover:text-foreground transition-colors">hello@flexichoice.in</a>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0" />
                <a href="tel:+919876543210" className="hover:text-foreground transition-colors">+91 98765 43210</a>
              </p>
              <p className="text-xs leading-relaxed">Bandra Kurla Complex, Mumbai 400051</p>
            </address>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-hairline pt-6 text-xs text-muted-foreground md:flex-row">
          <p>© {new Date().getFullYear()} FlexiChoice. All rights reserved.</p>
          <nav className="flex items-center gap-5" aria-label="Legal links">
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms</a>
            <a href="#" className="hover:text-foreground transition-colors">Disclosures</a>
          </nav>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wider text-foreground">{title}</p>
      <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
        {items.map((item) => (
          <li key={item}>
            <a href="#services" className="transition-colors hover:text-foreground">{item}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
