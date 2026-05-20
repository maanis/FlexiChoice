# FlexiChoice Landing — Next.js 15

## Setup

```bash
pnpm install
pnpm dev
```

## Before deploying

1. **Google Analytics**: Replace `G-XXXXXXXXXX` in `app/layout.tsx` with your real GA4 Measurement ID
2. **Search Console**: Uncomment and add your verification code in `app/layout.tsx` under `verification.google`
3. **OG Image**: Add a `public/og-image.png` (1200×630px) for social sharing previews
4. **Favicon**: Add `public/favicon.ico` and `public/apple-touch-icon.png`

## Deploy to Vercel

```bash
git init
git add .
git commit -m "initial commit"
# Push to GitHub, then connect repo in Vercel dashboard
# Add custom domain: flexichoice.in in Vercel → Settings → Domains
```

## After deploying

1. Go to https://search.google.com/search-console
2. Add property → `https://flexichoice.in`
3. Verify via HTML tag method → paste code in `app/layout.tsx`
4. Submit sitemap: `https://flexichoice.in/sitemap.xml`
5. Request indexing on homepage

## SEO Features included

- ✅ Single H1 tag (Hero component)
- ✅ Full metadata API (title, description, OG, Twitter cards)
- ✅ Auto-generated sitemap.xml
- ✅ Auto-generated robots.txt
- ✅ JSON-LD Schema: FinancialService + FAQPage
- ✅ Google Analytics 4 via @next/third-parties
- ✅ Canonical URLs
- ✅ next/image optimization (WebP, lazy loading)
- ✅ Security headers via vercel.json
- ✅ Semantic HTML (article, section, footer, address, blockquote)
- ✅ aria-label on all sections
- ✅ SSG (Static Site Generation) — fastest possible load
