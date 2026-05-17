# SEO, AEO, and GEO Implementation Plan

## 1. On-Page: Content & Freshness
- **FAQ Section**: Create `src/components/sections/FAQ.tsx` containing 10 relevant FAQs about AI Automation (AEO/GEO focused). Add this to `LandingPage.tsx`.
- **Articles Page**: Create `src/pages/Articles.tsx` as a new route `/articles`. It will contain 3 static articles highlighting AI trends and thought leadership.
- **Freshness**: Add a dynamic or visible "Last Updated: [Date]" to the main footer (`src/components/ui/Footer.tsx` or similar) to signal freshness.

## 2. In-Code: Metadata & JSON-LD
- **SPA Caveat Approach**: Since this is a React SPA, search engine bots (like Googlebot) *will* render JavaScript, but social media crawlers (like Twitter, Slack, LinkedIn) often do not. The best approach is:
  1. Add primary, generic fallback metadata to the static `index.html` (including Open Graph tags pointing to `og-image.png`).
  2. Install and use `react-helmet-async` to dynamically inject `<title>`, `<meta>`, and `<script type="application/ld+json">` tags based on the active route.
- **JSON-LD Targets**:
  - **Organization Schema**: On the Landing Page.
  - **FAQPage Schema**: On the Landing Page (wrapping the FAQ content).
  - **Article Schema**: On the new Articles page.

## 3. Mapping: Sitemap
- **Generate `public/sitemap.xml`**:
  - Map the main domain `/`.
  - Map the new articles route `/articles`.
  - Map any other public-facing routes if they exist.

## 4. Gatekeeping: robots.txt
- **Create `public/robots.txt`**:
  - Allow crawling of `/` and `/articles`.
  - Disallow crawling of `/admin/`, `/client/`, `/auth/`, and `/profile`.
  - Provide a link to the `sitemap.xml`.

## Execution Steps
1. Create `public/sitemap.xml` and `public/robots.txt`.
2. Update `index.html` with static fallback metadata pointing to `og-image.png`.
3. Create the `FAQ.tsx` component and add it to `LandingPage.tsx`.
4. Create the `Articles.tsx` page and register it in `App.tsx` routing.
5. Update the footer to include a "Last Updated" timestamp.
6. Install `react-helmet-async` and inject JSON-LD schemas into `LandingPage.tsx` and `Articles.tsx`.
