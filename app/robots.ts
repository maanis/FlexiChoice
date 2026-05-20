import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: "https://flexichoice.in/sitemap.xml",
    host: "https://flexichoice.in",
  };
}
