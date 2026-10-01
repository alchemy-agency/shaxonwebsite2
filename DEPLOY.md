# Shaxon rebrand v2 — deploy to Vercel

This folder is a finished **static site**: plain HTML, CSS, JS and images. There is no build step, no npm install and no server code.
The 25 rebranded pages are already in place. An automated audit confirmed that every visible string, image alt text and label on every page exists on the corresponding live shaxon.com page, and that every live text block is present (no invented copy, nothing dropped).

## Deploy (pick one)

**A. Vercel CLI (fastest, ~1 minute)**
```
cd vercel-pack
npx vercel            # log in, accept the defaults: framework "Other", no build command, output directory "."
npx vercel --prod     # promote the preview to the production URL
```

**B. Git**
Push the *contents* of this folder to a GitHub repo, then in Vercel: *Add New → Project → import the repo*.
Framework Preset **Other**, leave Build Command and Output Directory empty, Deploy.

(The Vercel dashboard cannot take a plain folder or zip upload, so use A or B. `shaxon-vercel-pack.zip` next to this folder is the same content for sharing.)

## What is in the pack
| page | URL |
|---|---|
| `home` | `/` |
| `about-us` | `/about-us/` |
| `news-and-events` | `/news-and-events/` |
| `news` | `/news/` |
| `contact-us` | `/contact-us/` |
| `representatives` | `/representatives/` |
| `shop` | `/shop/` |
| `oem-catalog` | `/product-category/oem-catalog/` |
| `wireways-catalog` | `/product-category/wireways/` |
| `wireways` | `/wireways/` |
| `copper-and-fiber-bulk-cable` | `/copper-and-fiber-bulk-cable/` |
| `custom-cables` | `/custom-cables/` |
| `fiber-made-in-california` | `/fiber-made-in-california/` |
| `premise` | `/product-category/oem-catalog/premise/` |
| `enhanced-cabinets` | `/product-category/oem-catalog/premise/enhanced-cabinets/` |
| `fiber-optics` | `/product-category/oem-catalog/fiber-optics/` |
| `fiber-duct` | `/product-category/oem-catalog/fiber-optics/fiber-duct/` |
| `computer-peripherals` | `/product-category/oem-catalog/computer-peripherals/` |
| `electrical` | `/product-category/oem-catalog/electrical/` |
| `maintenance` | `/product-category/oem-catalog/maintenance/` |
| `sfp-dac` | `/product-category/oem-catalog/10gsfpcu/` |
| `compliance` | `/compliance/` |
| `careers` | `/careers/` |
| `locations` | `/locations/` |
| `my-account` | `/my-account/` |


* `vercel.json` — trailing-slash URLs, long cache on `/assets` and `/wp-content`, `noindex` header.
* `robots.txt` — disallows all crawling (see below).
* `404.html` — minimal not-found page.
* `/wp-content/…` and `/assets/…` — images, fonts, CSS/JS and the 3D wireway models. The plugin folder names are kept on purpose because the design's CSS and scripts point to them; do not rename them.

## Before you point the real domain at it
* **The pack is set to `noindex` on purpose.** It is a rebrand preview of a live business site, and indexing a copy would compete with www.shaxon.com.
  When it is approved to go live: delete the `X-Robots-Tag` block in `vercel.json` and empty `robots.txt` (or replace it with a normal one plus your sitemap).
* **Custom Cables, Bulk Cable and California Fiber use Shaxon's existing ActiveCampaign RFQ form (ID 1)**, including the provider's required quantity field and CAPTCHA. The provider owns validation, delivery and success/error messages. A blocked embed falls back to the source site's RFQ page. No test enquiry was submitted; delivery and CAPTCHA acceptance on the final hostname require a real client check.
* **Other forms remain inert preview copies:** Contact, careers, login/register and header search need their original services connected before launch.
* **Links to pages that are not part of these 25** (individual products, cart, checkout, policies, …) open the live site at https://www.shaxon.com/….
* **Third-party embeds** load from their own servers: ActiveCampaign and its CAPTCHA on the three cable RFQ pages, Google Maps (contact, locations), the YouTube brand film on the home page (`youtube-nocookie.com`), Google Fonts. No separate analytics scripts are included. ActiveCampaign controls its own provider behavior.
* Images come from the live site's own media library, the partner/certification logos the live pages already use, and the Drive photographs approved for the rebrand. The California hero additionally uses its restored staging ocean layers and the corrected transparent surfer explicitly requested by Kenneth on October 1, 2026.

## Re-building the pack
```
python tools/make_pack.py          # rebuild pages, audit, prune, zip, then crawl-check every page
python tools/make_pack.py --no-build --no-crawl   # just re-pack what is in site/
```
