/* Shaxon V2: additive motion. The original scroll stories keep their own runtime. */
(() => {
  "use strict";
  const boot = () => {
    const root = document.querySelector(".sxr-site, .sx-home");
    if (!root) return;
    const g = window.gsap, st = window.ScrollTrigger;
    if (g && st) {
      g.registerPlugin(st);
      root.dataset.sxV2Motion = "ready";
      g.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
        const candidates = Array.from(document.querySelectorAll(
          "main h2, main h3, .sxr-main section header > p, .sxr-editorial-heading > p, " +
          ".sx-live-lists__inner > div, .sxr-main ul.products > li, .sxr-custom-landing__options article"
        )).filter((el) => el.getClientRects().length && !el.closest(
          "form, .sxr-product-rfq, .connection-story, .sxr-custom-landing__process, " +
          ".sxr-bulk-run-story, .sxr-california-wipe-story, .sxr-california-proof__statement-stage, .sxr-category-explorer__panels, [hidden], .sxr-overlay"
        ));
        // Animate only the outermost candidate, avoiding nested double reveals.
        const targets = candidates.filter((el) => !candidates.some((other) => other !== el && other.contains(el)));
        st.batch(targets, {
          start: "top 94%", once: true, interval: .08, batchMax: 4,
          onEnter: (batch) => {
            batch.forEach((el) => { el.dataset.sxV2Reveal = "running"; });
            g.fromTo(batch, { y: 24, autoAlpha: 0 }, {
              y: 0, autoAlpha: 1, duration: .65, stagger: .075, ease: "power2.out",
              clearProps: "transform,opacity,visibility",
              onComplete: () => batch.forEach((el) => { el.dataset.sxV2Reveal = "complete"; }),
            });
          },
        });
        const pitch = document.querySelector(".sx-v2-custom-pitch");
        if (pitch) g.fromTo(pitch, { y: 28, autoAlpha: 0 }, {
          y: 0, autoAlpha: 1, duration: .9, ease: "power3.out", clearProps: "transform,opacity,visibility",
        });
        const headline = document.querySelector("main h1");
        if (headline && !pitch && !headline.closest(".sxr-bulk-run-story, .sxr-california-wipe-story")) {
          g.fromTo(headline, { y: 26, autoAlpha: 0 }, {
            y: 0, autoAlpha: 1, duration: .8, ease: "power3.out", clearProps: "transform,opacity,visibility",
            onComplete: () => { headline.dataset.sxV2Entrance = "complete"; },
          });
        }
        // A short image reveal enhances the existing category/editorial layout.
        document.querySelectorAll(".sxr-product-category-hero figure, .sxr-about-v3-hero figure").forEach((figure) => {
          g.fromTo(figure, { clipPath: "inset(0 0 12% 0)" }, {
            clipPath: "inset(0 0 0% 0)", duration: .9, ease: "power2.out", clearProps: "clipPath",
            scrollTrigger: { trigger: figure, start: "top 94%", once: true },
          });
        });
        return () => targets.forEach((el) => { el.dataset.sxV2Reveal = "complete"; });
      });
      document.fonts?.ready.then(() => st.refresh());
      window.addEventListener("load", () => st.refresh(), { once: true });
    }

    const mount = document.querySelector(".sx-v2-rfq-live");
    if (mount) {
      const fallback = document.querySelector(".sx-v2-rfq-fallback");
      const observer = new MutationObserver(() => {
        if (!mount.querySelector("form")) return;
        fallback?.remove();
        mount.dataset.providerReady = "true";
        st?.refresh();
        observer.disconnect();
      });
      observer.observe(mount, { childList: true });
      const script = document.createElement("script");
      script.src = "https://shaxon.activehosted.com/f/embed.php?id=1&nostyles=1";
      script.async = true;
      script.onerror = () => { mount.dataset.providerReady = "error"; observer.disconnect(); };
      document.head.append(script);
    }
  };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot, { once: true });
  else boot();
})();
