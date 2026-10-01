# Shaxon V2 review — October 1, 2026

## Scope and status

All 25 local V2 routes reviewed at desktop and phone widths. The deployable export has been copied to this repository. This record describes local checks before the user-authorized commit/push. Main is the deployment input for the connected Vercel project. Original WordPress production and Flywheel staging were read as references and were not modified.

## Changes

Custom Cables now presents its existing headline, pitch and RFQ form together in the hero. There is a single provider form; its services, urgency, due date, project description, name, email, phone, quantity and CAPTCHA controls remain owned by ActiveCampaign.

Shared body text uses a readable 17–19px scale, while labels and captions remain smaller. Ordinary section padding was tightened. Homepage Products and Connections sections no longer force an unnecessary full-screen minimum height. Native pinned stories retain the scroll space needed by their interactions. Shared GSAP reveals exclude those native stories and forms, and respect reduced-motion preferences.

The homepage preloader now starts scene progress at zero for scenes actually present, rather than at 100. In the browser, the Spline canvas reported ready, four warm-up frames, 36 objects and its initial scroll progress of zero before the preloader released. The timeout and no-JavaScript fallbacks remain available.

Açık and Mikrolink logos were enlarged and moved into a prominent band beneath the footer CTA. Both now also appear in the homepage footer.

California now uses the centered staging composition: oversized California word behind the corrected surfer, with Made in and Fiber by Shaxon grouped with that headline. The two existing body destinations (capabilities and RFQ) reveal after 20% of the hero's scroll range. They use original-page labels, GET CALIFORNIA FIBER and QUOTE REQUEST. Both anchors were clicked successfully. No header links changed.

The following section restores the cyan-to-blue scroll fill using the original introduction verbatim: its first six words form the two-weight heading; its remaining words form the body paragraph. Browser checks recorded fill progress changing from 0.2003 to about 0.9 on desktop and 0.7009 on phone. The effect also works on normal laptop-height screens; reduced-motion visitors receive fully visible controls and text. The corrected surfer's three visible fins and original ocean imagery remain.

## Navigation

The header's existing destinations and labels are unchanged on all 25 routes. Actual click-through checks passed for all 20 header destinations, including Bulk Cables and California. Phone checks confirmed California navigation and Bulk Cables' inherited first-tap dropdown / second-tap page behavior.

The legacy `/news/` archive is still a valid direct route. The existing News & Events navigation points to `/news-and-events/`; no additional menu item was introduced.

## Verification

- All 25 strict page builds: zero patch errors or copy violations.
- All 25 content audits: 100% captured-copy coverage under the existing coverage exclusions, zero unauthorized copy, image or link findings.
- Desktop 1440×900 and phone 390×844 inspection of all 25 pages: one H1 per route, no horizontal overflow, no clipped headings, no broken visible images and no long body paragraph below 16px.
- Original-header comparison on all 25 routes: zero added or removed links.
- Custom Cables form: real provider mounted, one form only; empty-submit validation checked without sending an inquiry.
- Homepage GPU readiness and four-frame warm-up checked again from the final Git repository's browser preview; no browser console errors were recorded in the final checks.
- Final Git repository: all 25 routes returned HTTP 200 with one H1; all exported files were compared with the pack, and missing-reference checks also passed against the repository.
- Final export: zero referenced-but-missing local files; unused source videos and photographs pruned. Approximately 81MB folder / 60MB ZIP.
- Legacy font dependencies copied where available; retired IE-only EOT references and unused original-header background rules removed from generated HTML.

The revised California page passed 100% captured-copy coverage, zero copy/image/link findings, all 25 strict builds, JavaScript syntax checks, and focused desktop/laptop/phone browser checks. Hidden buttons were inert, revealed buttons became accessible, both anchors worked, phone overflow was zero, and the final browser checks recorded no console errors.

Machine-readable records are in this folder. Full-page desktop/phone screenshots and focused final views remain in `C:\Users\Kenneth Rodas\Downloads\Scraping2\shaxon-rebrandv2\reports\visual-20261001`.

## Form limitations

Custom Cables, Bulk Cables and California load the existing real ActiveCampaign form. Delivery was not tested by sending an inquiry or completing CAPTCHA. Hostname-dependent CAPTCHA behavior and recipient delivery require a real authorized test on the eventual deployed hostname.

The captured Contact, Careers, login/register and header-search UI retain the static-preview behavior documented in DEPLOY.md. The underlying WooCommerce store and cart remain on the original site through their existing links.
