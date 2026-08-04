# jkgresults Branding Guides

Style references for on-brand HTML email (and other brand surfaces), taken from the live site.

## Brand

- **Name:** `jkgresults` (lowercase)
- **Tone:** Premium dark tech — clean, calm, sentence case (not ALL_CAPS mono)
- **Status mark:** small emerald dot `●` before brand/status lines

## Colors

| Role | Hex / rgba | Use in email |
| --- | --- | --- |
| Page background | `#060709` | Outer email background |
| Card / panel | `#0d1117` (solid stand-in for `rgba(13,17,23,0.75)`) | Content card |
| Border | `rgba(255,255,255,0.08)` → `#1f242b` approx | Card + divider borders |
| Title text | `#f3f4f6` | H1 / H2 |
| Body text | `#9ca3af` | Paragraphs, labels |
| Primary text | `#ffffff` | Emphasized words |
| Accent | `#10b981` | Links, badges, underlines, bullets |
| Accent soft fill | `rgba(16,185,129,0.15)` → `#0f2a22` | Soft highlight boxes |
| Ambient glow | `rgba(16,185,129,0.12)` | Optional top-left vignette (image or nested tables) |
| CTA | `#ffffff` bg / `#000000` text | Primary button |

## Typography

- **Font stack:** `'Inter', -apple-system, 'Segoe UI', Helvetica, Arial, sans-serif`
- **Titles:** light/medium weight (`300–500`), white/`#f3f4f6`, tight tracking
- **Body:** regular `400`, `#9ca3af`, comfortable line-height `~1.6`
- **Eyebrow / step labels:** `12px`, **bold**, `letter-spacing: 0.1em`, **uppercase**, color `#10b981`
- **Brand lockup:** `14px`, semibold, white

## Layout (email-safe)

- Max content width: **480–600px** centered
- Card radius: **12px**
- Inner padding: **32px** (24px on mobile)
- Section gaps: **24–32px**
- Borders: `1px solid #1f242b` (or `rgba(255,255,255,0.08)` where supported)
- Prefer **tables + inline CSS** — no `backdrop-filter`, no Tailwind utilities

## Components to mirror

1. **Header:** emerald status dot + `jkgresults`
2. **Eyebrow:** emerald uppercase label (e.g. `AUDIT RESULTS`)
3. **Headline:** large light `#f3f4f6`
4. **Body:** muted `#9ca3af`
5. **Accent rule:** short bar `3px` tall × `56px` wide, `#10b981`
6. **Primary CTA:** solid white pill/rect, black bold text, e.g. `Request an Automation Audit →`
7. **Secondary link:** `#10b981` or `#9ca3af`
8. **Footer:** small muted copyright `© jkgresults`

## CTA button example

```html
<a href="..." style="display:inline-block;background:#ffffff;color:#000000;font-family:Inter,-apple-system,Segoe UI,Helvetica,Arial,sans-serif;font-size:14px;font-weight:600;text-decoration:none;padding:12px 20px;border-radius:8px;">
  Request an Automation Audit →
</a>
```

## Email caveats vs the site

- Don’t rely on real glass blur — use solid `#0d1117` + thin border
- Don’t rely on box-shadow glows in Outlook — optional; Gmail/Apple Mail will show soft emerald shadows if you want them
- Host any logo as a PNG/SVG URL; don’t expect web fonts everywhere (Inter loads where supported; Arial fallback is fine)

Use this palette + Inter + white CTA + emerald accents and the email will read as the same brand as the landing page.
