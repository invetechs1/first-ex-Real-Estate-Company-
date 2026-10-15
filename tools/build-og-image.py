#!/usr/bin/env python3
"""
Render the social share image (Open Graph / Twitter card).

Chat apps and social networks will not render an SVG share image, so the card
has to be a PNG. It is composed here as HTML — using the site's own brand
fonts and colour tokens — and rasterised with Chromium, so the preview people
see in WhatsApp or LinkedIn matches the site itself.

Requires Playwright (pip install playwright). Chromium's command-line
--screenshot flag scales the page rather than honouring the window size, which
silently crops the card; Playwright gives an exact 1200x630 viewport.

Usage:
    python3 tools/build-og-image.py

Output:
    assets/img/og-cover.jpg   1200x630, the size both networks expect.

JPEG rather than PNG: the card is mostly smooth gradient, which PNG stores
badly (~370 KB against ~70 KB), and some chat clients skip previews over a
few hundred KB.
"""

import pathlib
import sys

sys.path.insert(0, str(pathlib.Path(__file__).resolve().parent))
from importlib import import_module

build_standalone = import_module('build-standalone')

ROOT = pathlib.Path(__file__).resolve().parent.parent
OUT = ROOT / 'assets/img/og-cover.jpg'

CHROMIUM_CANDIDATES = [
    '/opt/pw-browsers/chromium',
    '/usr/bin/chromium',
    '/usr/bin/chromium-browser',
    '/usr/bin/google-chrome',
]

CARD = """<!DOCTYPE html>
<html><head><meta charset="utf-8"><style>
%(fonts)s
html, body { margin: 0; padding: 0; }
body {
  width: 1200px; height: 630px; overflow: hidden;
  background: linear-gradient(145deg, #071523 0%%, #0F2437 58%%, #16324a 100%%);
  color: #fff; position: relative;
  font-family: 'Inter', system-ui, sans-serif;
}
.glow {
  position: absolute; top: -220px; right: -160px; width: 760px; height: 760px;
  background: radial-gradient(circle, rgba(200,164,77,.30) 0%%, rgba(200,164,77,0) 62%%);
}
.grid {
  position: absolute; inset: 0;
  background-image:
    linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px);
  background-size: 72px 72px;
  -webkit-mask-image: radial-gradient(ellipse 85%% 70%% at 45%% 25%%, #000 35%%, transparent 80%%);
}
.skyline { position: absolute; left: 0; bottom: 0; width: 1200px; height: 168px;
           opacity: .75; }
.inner { position: relative; padding: 76px 88px; height: 630px; box-sizing: border-box;
         display: flex; flex-direction: column; }
.lockup { display: flex; align-items: center; gap: 20px; }
.lockup svg { width: 56px; height: 56px; color: #C8A44D; }
.wordmark { font-size: 40px; font-weight: 700; letter-spacing: .20em; line-height: 1; }
.descriptor { font-size: 15px; letter-spacing: .26em; color: #D9BB74; margin-top: 10px; }
.headline { margin-top: auto; font-family: 'Fraunces', Georgia, serif; font-size: 76px;
            line-height: 1.04; letter-spacing: -.02em; font-weight: 600; }
.headline em { display: block; color: #D9BB74; font-style: italic; }
.facts { display: flex; gap: 40px; margin-top: 40px; padding-top: 28px;
         border-top: 1px solid rgba(255,255,255,.16); font-size: 19px;
         color: rgba(255,255,255,.80); }
.facts b { color: #D9BB74; font-weight: 600; }
</style></head><body>
<div class="grid"></div><div class="glow"></div>
<svg class="skyline" viewBox="0 0 1200 168" preserveAspectRatio="none" fill="none"
     stroke="rgba(200,164,77,.26)" stroke-width="1.5">
  <path d="M0 168V104h58v-20h46v20h34v-42h48v42h38v-30h60v30h50v-56h54v56h44v-23h58v23h50v-72h60v72h48v-35h54v35h40v-50h54v50h44v-26h60v26h50v-41h48v41h58v-18h44v18V168H1200V168Z"/>
</svg>
<div class="inner">
  <div class="lockup">
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.2"
         stroke-linejoin="round">
      <path d="M6 42V10l18-6 18 6v32"/>
      <path d="M16 42V24h8v18M28 42V24h4v18"/>
      <path d="M16 18h10" stroke-linecap="round"/>
    </svg>
    <div>
      <div class="wordmark">FIRST EX</div>
      <div class="descriptor">REAL ESTATE INVESTMENT &amp; DEVELOPMENT</div>
    </div>
  </div>
  <div class="headline">Building Value.<em>Creating Future.</em></div>
  <div class="facts">
    <span><b>21+</b> years commercial record</span>
    <span><b>6</b> portfolio concepts</span>
    <span>Riyadh &middot; Jeddah &middot; Dammam</span>
  </div>
</div>
</body></html>
"""


def find_chromium() -> str | None:
    """Prefer a browser that is already on disk; otherwise let Playwright pick."""
    for path in CHROMIUM_CANDIDATES:
        if pathlib.Path(path).exists():
            return path
    return None


def main() -> None:
    try:
        from playwright.sync_api import sync_playwright
    except ImportError:
        raise SystemExit(
            'Playwright is required to render the share image:\n'
            '    pip install playwright && playwright install chromium'
        )

    work = ROOT / '.ogbuild'
    work.mkdir(exist_ok=True)
    card = work / 'card.html'
    card.write_text(CARD % {'fonts': build_standalone.build_font_css()},
                    encoding='utf-8')

    launch = {}
    executable = find_chromium()
    if executable:
        launch['executable_path'] = executable

    with sync_playwright() as play:
        browser = play.chromium.launch(**launch)
        page = browser.new_page(
            viewport={'width': 1200, 'height': 630},
        )
        page.goto(card.as_uri(), wait_until='load')
        page.wait_for_function('document.fonts.status === "loaded"')
        page.screenshot(path=str(OUT), type='jpeg', quality=88)
        browser.close()

    print('  %s  %.1f KB' % (OUT.relative_to(ROOT), OUT.stat().st_size / 1024),
          file=sys.stderr)


if __name__ == '__main__':
    main()
