# Shaxon V2

Static rebrand preview containing all 25 captured page routes. This folder is the deployable site root; HTML, CSS, JavaScript, images, fonts, Spline scenes and 3D models are included. No npm build is required.

## Local preview

From this folder in PowerShell:

```powershell
python -m http.server 8898 --bind 127.0.0.1
```

Open `http://127.0.0.1:8898/`.

## Vercel

Use the **Other** framework preset with this repository root as the project root. Leave the build command empty and use `.` as the output directory. The existing `vercel.json` supplies trailing slashes, preview indexing restrictions and asset cache headers.

This is a review preview. The October 1 export is prepared for the connected Vercel Git deployment. See [DEPLOY.md](DEPLOY.md) for the captured forms and external-service limitations.

## October 1 review

- Original header destinations preserved. California and Bulk Cable landing pages are present at their existing routes. No menu links were added.
- Custom Cables has one live RFQ form in the hero, with the existing copy and manufacturing imagery retained.
- Shared body typography and section spacing adjusted across the site; GSAP reveals respect reduced motion.
- Homepage preloader waits for the Spline scene to load and complete four GPU warm-up frames, with a bounded failure fallback.
- Açık and Mikrolink logos enlarged in a dedicated footer band, including the homepage.
- California restores the centered staging composition with the corrected surfer. Its two body buttons reveal on scroll; the next section fills its original introduction heading with cyan/blue as scrolling advances.

Validation and remaining limits are recorded in [review/REVIEW.md](review/REVIEW.md).

## Editing

This repository contains the editable, generated static export. Page content lives in each route's `index.html`; shared polish lives in `assets/css/sx-v2.css` and `assets/js/sx-v2-motion.js`. Existing interactions also use assets in `wp-content/plugins/shaxon-rebrand-system/assets/`.

The capture-and-patch build workspace remains at `C:\Users\Kenneth Rodas\Downloads\Scraping2\shaxon-rebrandv2`. If rebuilding from there, preserve or port any later direct edits made to this export before replacing it. Do not run the separate V1 homepage sync build for this project.
