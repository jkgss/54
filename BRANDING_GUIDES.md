# Brand Style Guide: JKG.RESULTS

This document outlines the exact brand style references extracted from the current codebase. Use this guide to ensure all external communications (e.g., HTML emails via n8n) perfectly match the "high-performance, terminal/system" aesthetic of the web application.

## 1. Typography

*   **Font Family:** `'IBM Plex Mono', monospace`
    *   **Google Fonts Import:** `<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@300;400;500;600;700&display=swap" rel="stylesheet">`
    *   **Email Fallback:** `Courier New, Courier, monospace`
*   **Styling Rules:**
    *   Heavy use of **UPPERCASE** text.
    *   Wide letter spacing (tracking). Use `letter-spacing: 2px;` to `letter-spacing: 4px;` for headings, small labels, and buttons.
    *   Thin font weights (`font-weight: 300` or `400`) for regular text and headers.

## 2. Color Palette (Monochromatic)

*   **Backgrounds:** Solid Black (`#000000`)
*   **Primary Text:** Solid White (`#FFFFFF`)
*   **Secondary Text (Subtitles/Labels):** Light Grays
    *   High opacity equivalent (`white/70`): `#B3B3B3`
    *   Medium opacity equivalent (`white/50`): `#808080`
    *   Low opacity equivalent (`white/40`): `#666666`
*   **Borders / Dividers:** Dark Gray (`#1A1A1A` or `#333333`)
    *   *Tip: Use solid hex codes instead of `rgba` in emails to ensure compatibility across all email clients.*

## 3. Visual Aesthetic & Effects

*   **Minimalist & Border-Driven:** Use thin 1px borders (`border: 1px solid #333333;`) to create structure, instead of large solid-colored blocks.
*   **Glow Effects:** While complex CSS shadows don't render perfectly in all email clients (like Outlook), you can simulate the glow on modern clients (Apple Mail, Gmail) using text shadows:
    *   `text-shadow: 0 0 15px rgba(255, 255, 255, 0.4);`
*   **Terminal Vibe:** Use bracket enclosures or pseudo-code labels for layout elements (e.g., `[SUCCESS]`, `// System_Response`, `Step-01 / 04`).

## 4. Button Styling

HTML emails require specific structural considerations for buttons. Use this brand-aligned approach:

*   **Background:** White (`#FFFFFF`)
*   **Text Color:** Black (`#000000`)
*   **Font Styling:** Bold (`font-weight: 700`), Uppercase, `letter-spacing: 4px;`
*   **Padding:** Generous (e.g., `padding: 20px 40px;`)
*   *Alternative (Ghost Button):* Background Black (`#000000`), Border White (`border: 1px solid #FFFFFF`), Text White (`#FFFFFF`).

---

## 5. HTML Email Boilerplate Template

If you are generating an email via n8n or another automation platform, use this foundational structure as your starting point:

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@300;400;700&display=swap" rel="stylesheet">
</head>
<body style="margin: 0; padding: 0; background-color: #000000;">
  <div style="background-color: #000000; color: #FFFFFF; font-family: 'IBM Plex Mono', Courier, monospace; padding: 40px; text-align: left; max-width: 600px; margin: 0 auto; border: 1px solid #333333;">
    
    <!-- System Label -->
    <div style="margin-bottom: 30px; font-size: 10px; letter-spacing: 4px; color: #808080; text-transform: uppercase;">
      // System_Response
    </div>

    <!-- Main Heading -->
    <h2 style="font-weight: 300; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 20px; color: #FFFFFF;">
      [SUCCESS]: AUDIT_DATA_STREAM_CAPTURED
    </h2>

    <!-- Body Copy -->
    <p style="color: #B3B3B3; font-size: 14px; line-height: 1.6; letter-spacing: 1px;">
      STATUS: ANALYZING_OPERATIONAL_VULNERABILITIES...
      <br><br>
      Your diagnostic input has been received. The system is currently compiling your custom audit roadmap.
    </p>

    <!-- Call To Action -->
    <div style="margin-top: 40px; border-top: 1px solid #333333; padding-top: 30px;">
      <a href="#" style="display: inline-block; background-color: #FFFFFF; color: #000000; padding: 15px 30px; text-decoration: none; font-size: 12px; font-weight: bold; letter-spacing: 4px; text-transform: uppercase;">
        View Full Roadmap
      </a>
    </div>

  </div>
</body>
</html>
```
