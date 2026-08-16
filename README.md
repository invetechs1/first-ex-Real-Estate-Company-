# First Ex — Real Estate Investment & Development

The corporate website for **First Ex** (مؤسسة ذا فيرست إكس للتطوير والاستثمار العقاري), a Saudi
real estate investment and development company operating in Riyadh, Jeddah and Dammam.

> نبني القيمة ونصنع المستقبل — *Building Value. Creating Future.*

## What's here

A static, dependency-free website that runs anywhere a folder of files can be served —
no build step, no framework, no npm install.

| Section | Content |
| --- | --- |
| Hero + stats | Positioning, 21-year record, 6 concepts, 3 cities, 395,000 m² total development area |
| About | Company overview, vision, mission, values |
| What We Do | Investment, development management, asset management, partnerships |
| Portfolio | The 6 concepts, filterable by asset class, each with a detail dialog |
| Investment | Investment strengths and the four-stage delivery process |
| Credentials | Commercial Registration details reproduced from the official certificate |
| Contact | Phone, email, working hours and an enquiry form |

### Features

- **Fully bilingual (English / العربية)** with a real RTL layout — direction, typography and
  numeral formatting all switch. The choice persists in `localStorage` and can be forced
  with `?lang=ar`.
- **Responsive** from 360 px phones to wide desktop.
- **Accessible**: skip link, focus states, keyboard-dismissible dialog, `prefers-reduced-motion`
  support, semantic landmarks.
- **Fast**: ~3 files, no dependencies, artwork drawn as inline SVG.

## Running it

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

Any static host works: GitHub Pages, Netlify, Vercel, S3, Nginx, or a shared host.
A GitHub Pages workflow is included at `.github/workflows/pages.yml` — enable Pages
(Settings → Pages → Source: GitHub Actions) and every push to the default branch publishes.

## Editing content

All copy — both languages — lives in **`assets/js/data.js`**. Nothing else needs to be touched
for routine updates.

- `COMPANY` — phone, email and Commercial Registration details.
- `PROJECTS` — the portfolio. Each entry carries `en` and `ar` blocks with name, location,
  summary, detail, area, scope, type and highlights, plus a `category` used by the filters
  (`commercial`, `residential`, `mixed`, `retail`).
- `I18N` — every interface string, keyed. Markup in the page is bound with `data-i18n="key"`
  and `data-i18n-placeholder="key"`.

### Adding a project

Append an object to `PROJECTS` following the existing shape, then bump the "Portfolio Concepts"
counter in `index.html` (`data-count`) and the total area if you want the stats to stay accurate.

### Replacing the artwork

Each concept currently uses generated SVG architectural line art (`projectArt()` in
`assets/js/main.js`) so the site ships without stock photography. When renders or photographs
are available, replace the `.project-art` contents with an `<img>` — the aspect ratio (16:10 in
cards, 16:8 in the dialog) and cropping behaviour are already set in CSS.

### Contact form

The form validates client-side and then opens the visitor's mail client addressed to
`Info@firstex.estate`. To route enquiries into a CRM or an inbox service instead, replace the
`mailto:` block at the end of `initForm()` in `assets/js/main.js` with a `fetch()` POST to your
endpoint (Formspree, Netlify Forms, or your own API).

## Structure

```
index.html                 Page markup, bound to translation keys
assets/css/styles.css      Design system + all page styles (RTL-aware)
assets/js/data.js          Bilingual content: company, projects, UI strings
assets/js/main.js          Language switching, portfolio, dialog, form, motion
assets/img/                Favicon and social share image
.github/workflows/pages.yml  Deploy to GitHub Pages
```

## Company details

| | |
| --- | --- |
| Registered name | مؤسسة ذا فيرست إكس للتطوير والاستثمار العقاري |
| Unified National Number | 7011647117 |
| Registration issued | 03/11/2001 |
| Entity type | Establishment (مؤسسة) |
| Status | Active (نشط) |
| Phone | 011 488 0122 |
| Email | Info@firstex.estate |

## Content provenance

Copy, statistics and the six portfolio concepts are taken from the company profile deck;
registration details are taken from the Commercial Registration certificate. The "What We Do"
and "How We Work" sections were written for the website and are not in the source deck — review
them before publishing so they match how the business actually operates.
