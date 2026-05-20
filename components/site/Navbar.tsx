"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { BrandImage } from "./BrandImage";
import { ThemeToggle } from "./ThemeToggle";

const links = [
  { href: "#services", label: "Services" },
  { href: "#why", label: "Why us" },
  { href: "#quote", label: "Get a Quote" },
  { href: "#faq", label: "FAQ" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[100] transition-all duration-300 ${scrolled ? "py-2" : "py-4"}`}
    >
      <div className="mx-auto max-w-6xl px-4">
        <nav
          className={`relative z-50 flex items-center justify-between rounded-2xl px-4 py-2.5 transition-all duration-300 ${scrolled ? "glass shadow-soft" : "bg-transparent"}`}
        >
          <a href="#" className="flex items-center" aria-label="FlexiChoice home">
            <BrandImage
              variant="header"
              alt="FlexiChoice"
              priority
              sizes="(min-width: 768px) 186px, 160px"
              className="h-12 w-auto max-w-40 shrink-0 md:max-w-[186px]"
            />
          </a>

          <div className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="relative rounded-lg px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {l.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <a
              href="#quote"
              className="hidden h-9 items-center rounded-full bg-foreground px-4 text-sm font-medium text-background transition-all hover:opacity-90 active:scale-[0.98] sm:inline-flex"
            >
              Get Quote
            </a>
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label="Menu"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface md:hidden"
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </nav>
      </div>

      <div
        className={`fixed inset-0 z-40 flex flex-col items-center justify-center bg-background/90 backdrop-blur-xl transition-all duration-500 md:hidden transform-gpu ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col items-center gap-8 text-center">
          <a
            href="#"
            onClick={() => setOpen(false)}
            aria-label="FlexiChoice home"
            className={`transition-all duration-500 transform-gpu ${open ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
          >
            <BrandImage
              variant="logo"
              alt="FlexiChoice"
              priority
              sizes="48px"
              className="size-12"
            />
          </a>
          {links.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`text-3xl font-black tracking-tighter text-foreground transition-all duration-500 transform-gpu ${open ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
              style={{ transitionDelay: `${i * 50}ms` }}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#quote"
            onClick={() => setOpen(false)}
            className={`mt-4 rounded-full bg-blue-600 px-8 py-4 text-lg font-bold text-white shadow-lg transition-all duration-500 transform-gpu hover:scale-105 active:scale-95 ${open ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
            style={{ transitionDelay: `${links.length * 50}ms` }}
          >
            Get a Free Quote
          </a>
        </div>
      </div>
    </header>
  );
}
