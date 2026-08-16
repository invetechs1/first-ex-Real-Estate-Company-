#!/usr/bin/env python3
"""
Build a single-file version of the First Ex site.

The site normally loads its CSS, JS and webfonts as separate requests. Some
targets — an email attachment, a USB stick, a sandboxed preview host with a
strict content-security-policy — need everything in one file with no external
requests at all. This script inlines the stylesheet, the scripts and the
webfonts (as base64 data URIs) into a single HTML document.

Usage:
    python3 tools/build-standalone.py [--out-dir dist]

Outputs:
    dist/first-ex-standalone.html   Complete document; open it directly.
    dist/first-ex-embed.html        Same page without the <html>/<head>/<body>
                                    wrapper, for hosts that supply their own.

Requires network access on the first run to fetch the fonts; they are cached
in .fontcache/ so later runs are offline.
"""

import argparse
import base64
import pathlib
import re
import subprocess
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
CACHE = ROOT / '.fontcache'

# Google Fonts CSS endpoints, and the subsets worth carrying. Latin covers the
# English site; arabic covers the Arabic one. Everything else (Cyrillic, Greek,
# Vietnamese) would only pad the file.
FONT_REQUESTS = [
    ('https://fonts.googleapis.com/css2'
     '?family=Inter:wght@300..700&display=swap', {'latin', 'latin-ext'}),
    ('https://fonts.googleapis.com/css2'
     '?family=Fraunces:ital,opsz,wght@0,9..144,400..700;1,9..144,400..700'
     '&display=swap', {'latin'}),
    ('https://fonts.googleapis.com/css2'
     '?family=IBM+Plex+Sans+Arabic:wght@400;500;600;700'
     '&display=swap', {'latin', 'arabic'}),
]

# A modern browser UA is required or Google serves legacy TTF instead of woff2.
UA = ('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 '
      '(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36')


def fetch(url: str) -> bytes:
    """Download a URL, caching the result on disk."""
    CACHE.mkdir(exist_ok=True)
    key = re.sub(r'[^A-Za-z0-9]+', '_', url)[-120:]
    cached = CACHE / key
    if cached.exists():
        return cached.read_bytes()

    result = subprocess.run(
        ['curl', '-sSfL', '-A', UA, url],
        capture_output=True, check=False,
    )
    if result.returncode != 0:
        raise SystemExit(
            'Could not fetch %s\n%s' % (url, result.stderr.decode().strip())
        )
    cached.write_bytes(result.stdout)
    return result.stdout


def build_font_css() -> str:
    """Return @font-face rules with every woff2 embedded as a data URI."""
    blocks = []
    for url, wanted_subsets in FONT_REQUESTS:
        css = fetch(url).decode('utf-8')

        # Google emits "/* subset */" immediately before each @font-face rule.
        for subset, rule in re.findall(
            r'/\*\s*([\w-]+)\s*\*/\s*(@font-face\s*\{[^}]*\})', css
        ):
            if subset not in wanted_subsets:
                continue
            match = re.search(r'url\((https://[^)]+\.woff2)\)', rule)
            if not match:
                continue
            data = base64.b64encode(fetch(match.group(1))).decode('ascii')
            blocks.append(rule.replace(
                match.group(1),
                'data:font/woff2;base64,' + data,
            ))

    if not blocks:
        raise SystemExit('No font faces were resolved — refusing to build.')

    print('  inlined %d font faces' % len(blocks), file=sys.stderr)
    return '\n'.join(blocks)


def build() -> tuple[str, str]:
    """Return (standalone document, wrapper-free embed fragment)."""
    html = (ROOT / 'index.html').read_text(encoding='utf-8')
    css = (ROOT / 'assets/css/styles.css').read_text(encoding='utf-8')
    data_js = (ROOT / 'assets/js/data.js').read_text(encoding='utf-8')
    main_js = (ROOT / 'assets/js/main.js').read_text(encoding='utf-8')

    body = re.search(r'<body[^>]*>(.*)</body>', html, re.S).group(1)

    # Swap the two <script src> tags for the code itself.
    body = re.sub(
        r'[ \t]*<script src="assets/js/[^"]+"></script>\n?', '', body
    )
    scripts = (
        '<script>\n' + data_js + '\n</script>\n'
        '<script>\n' + main_js + '\n</script>\n'
    )

    # The favicon and social image are the only remaining external files, and
    # both are small SVGs — inline the favicon, drop the social tag (a preview
    # host generates its own).
    favicon = (ROOT / 'assets/img/favicon.svg').read_text(encoding='utf-8')
    favicon_uri = 'data:image/svg+xml;base64,' + base64.b64encode(
        favicon.encode('utf-8')
    ).decode('ascii')

    style = '<style>\n' + build_font_css() + '\n\n' + css + '\n</style>'
    title = 'First Ex Real Estate'

    embed = '<title>%s</title>\n%s\n%s%s' % (title, style, body.strip(), scripts)

    standalone = (
        '<!DOCTYPE html>\n'
        '<html lang="en" dir="ltr">\n<head>\n'
        '<meta charset="utf-8">\n'
        '<meta name="viewport" content="width=device-width, initial-scale=1">\n'
        '<title>%s</title>\n'
        '<meta name="description" content="First Ex is a Saudi real estate '
        'investment and development company with a commercial registration '
        'history exceeding 21 years.">\n'
        '<meta name="theme-color" content="#0A1A2A">\n'
        '<link rel="icon" href="%s">\n'
        '%s\n</head>\n<body>\n%s%s</body>\n</html>\n'
        % (title, favicon_uri, style, body.strip(), scripts)
    )
    return standalone, embed


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--out-dir', default='dist')
    args = parser.parse_args()

    out = ROOT / args.out_dir
    out.mkdir(parents=True, exist_ok=True)

    standalone, embed = build()
    (out / 'first-ex-standalone.html').write_text(standalone, encoding='utf-8')
    (out / 'first-ex-embed.html').write_text(embed, encoding='utf-8')

    for name in ('first-ex-standalone.html', 'first-ex-embed.html'):
        size = (out / name).stat().st_size
        print('  %-28s %6.1f KB' % (name, size / 1024), file=sys.stderr)


if __name__ == '__main__':
    main()
