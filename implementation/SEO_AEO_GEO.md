# SEO, AEO & GEO Implementation Plan

**Repository:** `jkgss/54`  
**Canonical domain:** `https://www.jkgresults.com`  
**Brand:** jkgresults (see `BRANDING_GUIDES.md`)

This is the source of truth for search (SEO), answer engines (AEO), and generative engines (GEO).

---

## Best approach (order of operations)

1. **Canonical domain** — Use `https://www.jkgresults.com` everywhere (sitemap, robots, schema, OG, canonicals). Point Vercel custom domain / redirects at it.
2. **On-page content & freshness** — Expand FAQs + articles with clear Q→A and takeaways. Only bump dates when content actually changes.
3. **In-code metadata & JSON-LD** — Per-route `<title>`, description, canonical, absolute OG/Twitter image (`https://www.jkgresults.com/og-image.png`), and structured data.
4. **Sitemap** — Map every *indexable* public page; exclude noindex utility pages.
5. **robots.txt** — Allow public site, disallow private/auth ghosts if any, link Sitemap.
6. **Verify** — Search Console / Bing, Rich Results test, submit sitemap.

Do **not** invent thin pages just to fill the sitemap. Depth beats volume.

---

## Page inventory

| Path | Index? | Notes |
|------|--------|-------|
| `/` | Yes | Landing + FAQ + Organization schema |
| `/articles` | Yes | Blog / insights index |
| `/articles/what-is-an-automation-audit` | Yes | Article |
| `/articles/how-to-calculate-roi-of-automation` | Yes | Article |
| `/articles/building-resilient-data-pipelines-with-modern-webhooks` | Yes | Article |
| `/unsubscribed` | **No** | `noindex` confirmation page — omit from sitemap |
| `/unsubscribe` | **No** | Redirects to `/unsubscribed` |

---

## 1. On-page: FAQs, articles, freshness

### FAQs (landing)
- Keep FAQ visible on `/` and mirrored in `FAQPage` JSON-LD (only questions that appear on-page).
- Prefer buyer-intent questions with short, quotable answers (AEO/GEO).

### Articles (3 existing — expand, don’t replace with fluff)
1. What is an Automation Audit?
2. How to Calculate the ROI of Automation?
3. Building Resilient Data Pipelines with Modern Webhooks

Each article should include:
- Clear H1 + sections
- Practical steps / formula / architecture notes
- Visible published + last-updated dates
- CTA to free audit (`/#contact`)

### Freshness
- Footer / article `dateModified` must match real edits.
- Sitemap `<lastmod>` updated when content ships.

---

## 2. In-code: metadata & JSON-LD

### Static fallback (`index.html`)
- Default title, description, OG/Twitter tags.
- **Absolute** image URLs: `https://www.jkgresults.com/og-image.png` (file lives in `/public/og-image.png`).

### Per-route via `react-helmet-async`
Every indexable page sets:
- `<title>`
- `<meta name="description">`
- `<link rel="canonical" href="https://www.jkgresults.com/...">`
- `og:url`, `og:title`, `og:description`, `og:image` (absolute)
- Matching Twitter tags

### JSON-LD targets
| Page | Schema |
|------|--------|
| `/` | `Organization` (+ existing `FAQPage` from FAQ section) |
| `/articles` | `Blog` with `BlogPosting` entries |
| `/articles/:slug` | `BlogPosting` / `Article` with dates, author org, `mainEntityOfPage` |
| `/unsubscribed` | none + `noindex` |

### SPA note
Google generally executes JS. Many social/AI crawlers prefer static tags — hence solid `index.html` fallbacks + Helmet. Prerender is optional later if citation coverage matters.

---

## 3. Mapping: `public/sitemap.xml`

Include all indexable URLs above with:
- `<loc>` on canonical host
- `<lastmod>` ISO date
- Sensible `<changefreq>` / `<priority>`

Exclude `/unsubscribed` and `/unsubscribe`.

---

## 4. Gatekeeping: `public/robots.txt`

```txt
User-agent: *
Allow: /

Disallow: /unsubscribed
Disallow: /unsubscribe

Sitemap: https://www.jkgresults.com/sitemap.xml
```

Drop stale Disallows for removed auth/dashboard routes unless those paths return.

---

## Definition of Done

- [x] `implementation/SEO_AEO_GEO.md` exists (this file)
- [x] All 3 articles expanded with updated dates and CTAs
- [x] Landing, articles index, article detail: canonical + absolute OG metadata
- [x] `index.html` OG/Twitter images use absolute `/og-image.png` URL
- [x] `sitemap.xml` lists all indexable pages including all article slugs
- [x] `robots.txt` points at sitemap; utility unsubscribe paths disallowed
- [x] `/unsubscribed` remains `noindex`
- [ ] Confirm `/public/og-image.png` file is present in the repo / deploy

---

## Assets

- **OG image path:** `/public/og-image.png` → served as `https://www.jkgresults.com/og-image.png`
- If the file is missing locally, add a 1200×630 (or similar) brand image at that path before launch; metadata already references it.

- Prerender / SSR migration
- Mass new article generation
- Fake review/product schema without real data
- Keyword-stuffed meta keywords
