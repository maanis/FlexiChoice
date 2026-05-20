"use client";

import { useEffect, useState } from "react";
import Image, { type ImageProps } from "next/image";
import logo from "@/public/FC-Logo.png";
import headerDark from "@/public/FC-Header-Dark.png";
import headerLight from "@/public/FC-Header-Light.png";

type BrandImageProps = Omit<ImageProps, "src"> & {
  variant?: "logo" | "header";
};

function getIsDarkMode() {
  if (typeof window === "undefined") {
    return false;
  }

  const storedTheme = window.localStorage.getItem("theme");

  if (storedTheme === "dark") {
    return true;
  }

  if (storedTheme === "light") {
    return false;
  }

  return (
    document.documentElement.classList.contains("dark") ||
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );
}

export function BrandImage({
  variant = "header",
  alt,
  ...props
}: BrandImageProps) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const syncTheme = () => setIsDarkMode(getIsDarkMode());

    syncTheme();

    const observer = new MutationObserver(syncTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      if (!window.localStorage.getItem("theme")) {
        syncTheme();
      }
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      observer.disconnect();
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  const src =
    variant === "logo" ? logo : isDarkMode ? headerDark : headerLight;

  return <Image src={src} alt={alt} {...props} />;
}
