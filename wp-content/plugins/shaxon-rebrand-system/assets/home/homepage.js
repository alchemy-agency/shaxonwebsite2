(() => {
  const SXR_HOME_CONFIG = window.SXRHomeConfig || {};
  const SXR_SITE_BASE = String(SXR_HOME_CONFIG.siteBase || "").replace(/\/$/, "");
  const SXR_ASSET_BASE = String(SXR_HOME_CONFIG.assetBase || "").replace(/\/$/, "");
  const SXR_ASSET_VERSION = encodeURIComponent(String(SXR_HOME_CONFIG.assetVersion || ""));
  const sxrAssetUrl = (file) => SXR_ASSET_BASE + "/" + file + (SXR_ASSET_VERSION ? "?ver=" + SXR_ASSET_VERSION : "");
  const PRODUCTS = [{"label":"Bulk Cables","href":"__SX_SITE_BASE__/copper-and-fiber-bulk-cable/","blurb":"Bulk copper and fiber cable for local projects and international supply.","items":[{"label":"Copper Bulk Cable","href":"__SX_SITE_BASE__/copper-bulk-cable/"},{"label":"Fiber Optic Bulk Cable","href":"__SX_SITE_BASE__/fiber-optic-bulk-cable/"}]},{"label":"Custom Cables","href":"__SX_SITE_BASE__/custom-cables/","blurb":"Custom cable assemblies, from design and tooling through production and testing.","items":[]},{"label":"Fiber Made in Orange, California","href":"__SX_SITE_BASE__/fiber-made-in-california/","blurb":"Standard and custom fiber-optic assemblies made in Orange, California.","items":[]},{"label":"Premise","href":"__SX_SITE_BASE__/product-category/oem-catalog/premise/","blurb":"Patch cables, panels, keystone jacks, outlets, racks, and cable management for building networks.","items":[{"label":"110 Patch Panels","href":"__SX_SITE_BASE__/product-category/oem-catalog/premise/110-patch-panels/"},{"label":"Patch Cables","href":"__SX_SITE_BASE__/product-category/oem-catalog/premise/patch-cables/","children":[{"label":"Category 5e","href":"__SX_SITE_BASE__/product-category/oem-catalog/premise/patch-cables/category-5e-patch-cables/"},{"label":"Category 5e CMP","href":"__SX_SITE_BASE__/product-category/oem-catalog/premise/patch-cables/category-5e-cmp/"},{"label":"Category 5e CMR","href":"__SX_SITE_BASE__/product-category/oem-catalog/premise/patch-cables/category-5e-cmr/"},{"label":"Category 6 Ultra Slim Jacket","href":"__SX_SITE_BASE__/product-category/oem-catalog/premise/patch-cables/category-6-ultra-slim-jacket/"},{"label":"Category 6 Slim Jacket","href":"__SX_SITE_BASE__/product-category/oem-catalog/premise/patch-cables/category-6-slim-jacket-patch-cables/"},{"label":"Category 6","href":"__SX_SITE_BASE__/product-category/oem-catalog/premise/patch-cables/category-6-patch-cables/"},{"label":"Category 6 CMP","href":"__SX_SITE_BASE__/product-category/oem-catalog/premise/patch-cables/category-6-cmp/"},{"label":"Category 6 CMR","href":"__SX_SITE_BASE__/product-category/oem-catalog/premise/patch-cables/category-6-cmr/"},{"label":"Category 6A Slim Jacket","href":"__SX_SITE_BASE__/product-category/oem-catalog/premise/patch-cables/category-6a-slim-jacket/"},{"label":"Category 6A Shielded Slim Jacket","href":"__SX_SITE_BASE__/product-category/oem-catalog/premise/patch-cables/category-6a-shielded-slim-jacket/"},{"label":"Category 6A","href":"__SX_SITE_BASE__/product-category/oem-catalog/premise/patch-cables/category-6a-patch-cables/"}]},{"label":"Feed Through Panels","href":"__SX_SITE_BASE__/product-category/oem-catalog/premise/feed-through-panels/"},{"label":"Keystone Patch Panels","href":"__SX_SITE_BASE__/product-category/oem-catalog/premise/keystone-patch-panels/"},{"label":"Racks & Wire Management","href":"__SX_SITE_BASE__/product-category/oem-catalog/premise/wire-management/"},{"label":"Keystone Jacks & Couplers","href":"__SX_SITE_BASE__/product-category/oem-catalog/premise/keystone-jacks-couplers/"},{"label":"Outlets","href":"__SX_SITE_BASE__/product-category/oem-catalog/premise/outlets/"},{"label":"Bulk Cable & Connectors","href":"__SX_SITE_BASE__/product-category/oem-catalog/premise/bulk-cable-connectors/"}]},{"label":"Enhanced Cabinets","href":"__SX_SITE_BASE__/product-category/oem-catalog/premise/enhanced-cabinets/","blurb":"Wall-mount and floor-standing cabinets, 2-post and 4-post racks, shelves, and accessories. Check each product for sizes and mounting options.","items":[]},{"label":"Fiber Duct","href":"__SX_SITE_BASE__/product-category/oem-catalog/fiber-optics/fiber-duct/","blurb":"Fiber duct channels, elbows, risers, drops, and connectors for routing and protecting fiber cable.","items":[]},{"label":"Fiber Optics","href":"__SX_SITE_BASE__/product-category/oem-catalog/fiber-optics/","blurb":"Single-mode and multimode cables, pigtails, connectors, adapters, and fiber patching products.","items":[{"label":"Fiber Optic Bulk Cable","href":"__SX_SITE_BASE__/fiber-optic-bulk-cable/"},{"label":"Fiber Optic Patch Cords","href":"__SX_SITE_BASE__/fiber-optic-patch-cords/","children":[{"label":"Multimode Cables","href":"__SX_SITE_BASE__/product-category/oem-catalog/fiber-optics/multimode-cables/"},{"label":"Single Mode Cables","href":"__SX_SITE_BASE__/product-category/oem-catalog/fiber-optics/single-mode-cables/"},{"label":"Pigtails","href":"__SX_SITE_BASE__/product-category/oem-catalog/fiber-optics/pigtails/"}]},{"label":"Adapters","href":"__SX_SITE_BASE__/product-category/oem-catalog/fiber-optics/adapters/"},{"label":"Boxes & Panels","href":"__SX_SITE_BASE__/product-category/oem-catalog/fiber-optics/boxes-panels/"},{"label":"MTP Multi-Strand & Bend-Insensitive","href":"__SX_SITE_BASE__/product-category/oem-catalog/fiber-optics/mtp-multi-strand-bend-insensitive/"},{"label":"Fiber Connectors","href":"__SX_SITE_BASE__/product-category/oem-catalog/fiber-optics/fiber-connectors/"}]},{"label":"Computer Peripherals","href":"__SX_SITE_BASE__/product-category/oem-catalog/computer-peripherals/","blurb":"USB, HDMI, DB, null-modem, and legacy cables for computers and connected equipment.","items":[{"label":"USB Cables","href":"__SX_SITE_BASE__/product-category/oem-catalog/computer-peripherals/usb-cables/"},{"label":"HDMI","href":"__SX_SITE_BASE__/product-category/oem-catalog/computer-peripherals/hdmi/"},{"label":"DB Cables","href":"__SX_SITE_BASE__/product-category/oem-catalog/computer-peripherals/dbcables/"},{"label":"Null Modem","href":"__SX_SITE_BASE__/product-category/oem-catalog/computer-peripherals/nullmodem/"},{"label":"Legacy Cables","href":"__SX_SITE_BASE__/product-category/oem-catalog/computer-peripherals/legacylcables/"}]},{"label":"Electrical","href":"__SX_SITE_BASE__/product-category/oem-catalog/electrical/","blurb":"Power extension cables, international extensions, and spooled wire. See individual products for ratings and connector details.","items":[{"label":"Extensions","href":"__SX_SITE_BASE__/product-category/oem-catalog/electrical/extensions/"},{"label":"International Extensions","href":"__SX_SITE_BASE__/product-category/oem-catalog/electrical/international-extensions/"},{"label":"Spooled Wire","href":"__SX_SITE_BASE__/product-category/oem-catalog/electrical/spooled-wire/"}]},{"label":"Maintenance","href":"__SX_SITE_BASE__/product-category/oem-catalog/maintenance/","blurb":"Anti-static supplies, cleaning products, and tools for installing and maintaining electronic equipment.","items":[{"label":"Anti-static","href":"__SX_SITE_BASE__/product-category/oem-catalog/maintenance/anti-static/"},{"label":"Cleaning","href":"__SX_SITE_BASE__/product-category/oem-catalog/maintenance/cleaning/"},{"label":"Tools","href":"__SX_SITE_BASE__/product-category/oem-catalog/maintenance/tools/"}]},{"label":"SFP+ DAC","href":"__SX_SITE_BASE__/product-category/oem-catalog/10gsfpcu/","blurb":"SFP+ direct-attach copper cables for 10 Gigabit Ethernet, with active and passive options in multiple lengths. Check compatibility on the product page.","items":[]},{"label":"Metal Wireways","href":"__SX_SITE_BASE__/wireways/","blurb":"Galvanized-steel troughs, covers, and fittings for routing and protecting electrical wiring.","items":[]}];
  const localizeInternalUrl = (value) => String(value || "").replace(/^__SX_SITE_BASE__/, SXR_SITE_BASE);
  const localizeProductBranch = (branch) => {
    if (branch.href) branch.href = localizeInternalUrl(branch.href);
    (branch.children || []).forEach(localizeProductBranch);
  };
  PRODUCTS.forEach((product,index) => {
    const source=SXR_HOME_CONFIG.products?.[index];
    if(source){product.label=source.name;product.blurb=source.description;product.href=source.url;}
    localizeProductBranch(product);
    (product.items || []).forEach(localizeProductBranch);
  });
  const roots = document.querySelectorAll("[data-sx-home]");
  const splineRegistry = window.__shaxonSplineRegistry || (window.__shaxonSplineRegistry = {
    applications: new Set(),
    preloaderLocks: 0,
    preloaderPreviousOverflow: "",
    overlayLocks: 0,
    overlayPreviousOverflow: "",
    pageLocks: 0,
    pagePreviousOverflow: "",
    roots: 0,
  });
  splineRegistry.overlayLocks ??= 0;
  splineRegistry.overlayPreviousOverflow ??= "";
  splineRegistry.pageLocks ??= 0;
  splineRegistry.pagePreviousOverflow ??= "";
  const acquirePageLock = () => {
    if (splineRegistry.pageLocks === 0) splineRegistry.pagePreviousOverflow = document.body.style.overflow;
    splineRegistry.pageLocks += 1;
    document.body.style.overflow = "hidden";
  };
  const releasePageLock = () => {
    splineRegistry.pageLocks = Math.max(0, splineRegistry.pageLocks - 1);
    if (splineRegistry.pageLocks === 0) document.body.style.overflow = splineRegistry.pagePreviousOverflow;
  };
  const disposeSplineRecord = (record) => {
    if (record.disposed) return;
    record.disposed = true;
    record.application.dispose();
    record.owner?.delete(record);
    splineRegistry.applications.delete(record);
  };

  roots.forEach((root) => {
    if (root.dataset.sxReady === "true") return;
    root.dataset.sxReady = "true";

    let destroyed = false;
    let scrollFrame = 0;
    const splineApplications = new Set();
    const splineAbortController = new AbortController();
    splineRegistry.roots += 1;

    const productModal = root.querySelector(".products-modal");
    const utilityMenu = root.querySelector(".utility-menu");
    const categoryButtons = Array.from(root.querySelectorAll(".mega-categories button"));
    const subcategoryPanel = root.querySelector(".mega-subcategories");
    const nestedPanel = root.querySelector(".mega-nested");
    const productOpeners = root.querySelectorAll("[data-sx-open-products], .mobile-products-button");
    const menuButton = root.querySelector(".menu-button");
    const splineCanvases = Array.from(root.querySelectorAll("canvas[data-spline-src]"));
    const preloader = root.querySelector(".site-preloader");
    const reducedMotionMedia = window.matchMedia("(prefers-reduced-motion: reduce)");
    // Keep the fixed header available on upward scroll, keyboard focus, and open menus.
    const siteHeader = root.querySelector(".site-header");
    let headerLastY = Math.max(0, window.scrollY);
    let headerTravel = 0;
    let headerDirection = 0;
    let headerFrame = 0;
    const showHeader = () => siteHeader?.classList.remove("is-scroll-hidden");
    const updateHeader = () => {
      headerFrame = 0;
      const y = Math.max(0, window.scrollY);
      const delta = y - headerLastY;
      headerLastY = y;
      if (!siteHeader) return;
      if (y < 160 || siteHeader.contains(document.activeElement) || root.querySelector('.products-modal.is-open, .utility-menu.is-open')) {
        showHeader(); headerTravel = 0; return;
      }
      const direction = Math.sign(delta);
      if (direction !== headerDirection) headerTravel = 0;
      headerDirection = direction;
      headerTravel += Math.abs(delta);
      if (direction < 0 && headerTravel >= 8) showHeader();
      if (direction > 0 && headerTravel >= 24) siteHeader.classList.add("is-scroll-hidden");
    };
    const scheduleHeader = () => { if (!headerFrame) headerFrame = requestAnimationFrame(updateHeader); };
    window.addEventListener("scroll", scheduleHeader, { passive: true, signal: splineAbortController.signal });
    siteHeader?.addEventListener("focusin", showHeader, { signal: splineAbortController.signal });
    document.addEventListener("keydown", (event) => { if (event.key === "Tab") showHeader(); }, { signal: splineAbortController.signal });
    splineAbortController.signal.addEventListener("abort", () => { cancelAnimationFrame(headerFrame); showHeader(); }, { once: true });

    const industryExplorer = root.querySelector(".industry-explorer");
    const industryTabs = Array.from(root.querySelectorAll('.industry-tabs [role="tab"]'));
    const industryPanels = Array.from(root.querySelectorAll('.industry-panels [role="tabpanel"]'));
    const activateIndustry = (nextIndex, { focus = false, scroll = false } = {}) => {
      if (!industryTabs.length || !industryPanels.length) return;
      const index = Math.min(industryTabs.length - 1, Math.max(0, nextIndex));
      industryTabs.forEach((tab, tabIndex) => {
        const active = tabIndex === index;
        tab.classList.toggle("is-active", active);
        tab.setAttribute("aria-selected", String(active));
        tab.tabIndex = active ? 0 : -1;
      });
      industryPanels.forEach((panel, panelIndex) => {
        const active = panelIndex === index;
        panel.hidden = !active;
        panel.classList.toggle("is-active", active);
      });
      if (industryExplorer) industryExplorer.dataset.activeIndustry = String(index);
      const activeTab = industryTabs[index];
      if (focus) activeTab.focus();
      if (scroll && window.matchMedia("(max-width: 980px)").matches) {
        activeTab.scrollIntoView({
          behavior: reducedMotionMedia.matches ? "auto" : "smooth",
          block: "nearest",
          inline: "center",
        });
      }
    };
    industryTabs.forEach((tab, index) => {
      tab.addEventListener("click", () => activateIndustry(index, { scroll: true }), { signal: splineAbortController.signal });
      tab.addEventListener("keydown", (event) => {
        if (event.altKey || event.ctrlKey || event.metaKey) return;
        if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
        event.preventDefault();
        const nextIndex = event.key === "Home"
          ? 0
          : event.key === "End"
            ? industryTabs.length - 1
            : (index + (event.key === "ArrowRight" ? 1 : -1) + industryTabs.length) % industryTabs.length;
        activateIndustry(nextIndex, { focus: true, scroll: true });
      }, { signal: splineAbortController.signal });
    });
    if (industryTabs.length) {
      const initialIndustry = Math.max(0, industryTabs.findIndex((tab) => tab.getAttribute("aria-selected") === "true"));
      activateIndustry(initialIndustry);
    }
    const sceneLoadProgress = { connector: splineCanvases.some(c => c.dataset.splineRole === "connector") ? 0 : 100, belt: splineCanvases.some(c => c.dataset.splineRole === "belt") ? 0 : 100 };
    let preloaderTimer = 0;
    let splineWatchdogTimer = 0;
    let splineLoadExpired = false;
    let preloaderUnlocked = false;
    let ownsPreloaderLock = false;
    const menuIconMarkup = menuButton.innerHTML;
    const closeIcon = root.querySelector(".utility-top .close-icon");
    const closeIconMarkup = closeIcon
      ? closeIcon.outerHTML.replace("close-icon", "menu-icon")
      : '<svg class="menu-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>';
    let ownsOverlayLock = false;
    let returnFocus = null;

    const statsPanel = root.querySelector(".stats-panel");
    const statCounters = statsPanel ? Array.from(statsPanel.querySelectorAll("[data-count-to]")) : [];
    let statsHasPlayed = false;
    let statsObservationStarted = false;
    let statsFrame = 0;
    let statsObserver = null;
    let statsFallbackListening = false;
    const writeStatValue = (counter, value) => {
      const padding = Number(counter.dataset.countPad || 0);
      counter.textContent = String(Math.round(value)).padStart(padding, "0");
    };
    const finishStats = () => {
      if (statsFrame) cancelAnimationFrame(statsFrame);
      statsFrame = 0;
      statCounters.forEach((counter) => writeStatValue(counter, Number(counter.dataset.countTo || 0)));
      statsPanel?.classList.remove("is-counting");
      statsPanel?.classList.add("has-counted");
    };
    const stopStatsFallback = () => {
      if (!statsFallbackListening) return;
      statsFallbackListening = false;
      window.removeEventListener("scroll", checkStatsFallback);
      window.removeEventListener("resize", checkStatsFallback);
    };
    const playStats = () => {
      if (statsHasPlayed || !statsPanel) return;
      statsHasPlayed = true;
      statsObserver?.disconnect();
      stopStatsFallback();
      if (reducedMotionMedia.matches) {
        finishStats();
        return;
      }
      statsPanel.classList.add("is-counting");
      statCounters.forEach((counter) => writeStatValue(counter, 0));
      const startedAt = performance.now();
      const duration = 1200;
      const stagger = 90;
      const tick = (now) => {
        if (destroyed) return;
        let complete = true;
        statCounters.forEach((counter, index) => {
          const elapsed = now - startedAt - index * stagger;
          const progress = Math.min(1, Math.max(0, elapsed / duration));
          const eased = 1 - Math.pow(1 - progress, 3);
          writeStatValue(counter, Number(counter.dataset.countTo || 0) * eased);
          if (progress < 1) complete = false;
        });
        if (complete) finishStats();
        else statsFrame = requestAnimationFrame(tick);
      };
      statsFrame = requestAnimationFrame(tick);
    };
    function checkStatsFallback() {
      if (!statsPanel) return;
      const rect = statsPanel.getBoundingClientRect();
      if (rect.top < innerHeight * 0.78 && rect.bottom > innerHeight * 0.22) playStats();
    }
    const startStatsObservation = () => {
      if (statsObservationStarted || !statsPanel || !statCounters.length) return;
      statsObservationStarted = true;
      if (reducedMotionMedia.matches) {
        playStats();
        return;
      }
      if ("IntersectionObserver" in window) {
        statsObserver = new IntersectionObserver((entries) => {
          if (entries.some((entry) => entry.isIntersecting)) playStats();
        }, { threshold: 0.28, rootMargin: "0px 0px -12%" });
        statsObserver.observe(statsPanel);
      } else {
        statsFallbackListening = true;
        window.addEventListener("scroll", checkStatsFallback, { passive: true });
        window.addEventListener("resize", checkStatsFallback);
        checkStatsFallback();
      }
    };

    const acquirePreloaderLock = () => {
      if (!preloader || ownsPreloaderLock || !splineCanvases.length) return;
      splineRegistry.preloaderLocks += 1;
      ownsPreloaderLock = true;
      root.classList.add("spline-preloading");
      acquirePageLock();
    };
    const releasePreloaderLock = () => {
      if (!ownsPreloaderLock) return;
      ownsPreloaderLock = false;
      splineRegistry.preloaderLocks = Math.max(0, splineRegistry.preloaderLocks - 1);
      root.classList.remove("spline-preloading");
      releasePageLock();
    };
    acquirePreloaderLock();

    const updatePreloader = (role, progress) => {
      if (!(role in sceneLoadProgress)) return;
      sceneLoadProgress[role] = Math.max(sceneLoadProgress[role], Math.min(100, Math.max(0, progress)));
      const overall = Math.round((sceneLoadProgress.connector + sceneLoadProgress.belt) / 2);
      if (preloader) {
        const readout = preloader.querySelector(".preloader-panel > strong");
        const meter = preloader.querySelector(".preloader-panel > i b");
        const sceneReadouts = preloader.querySelectorAll(".preloader-scenes span");
        if (readout) readout.textContent = String(overall).padStart(3, "0") + "%";
        if (meter) meter.style.width = overall + "%";
        if (sceneReadouts[0]) sceneReadouts[0].textContent = "FIBER FILM " + String(Math.round(sceneLoadProgress.connector)).padStart(3, "0");
        if (sceneReadouts[1]) sceneReadouts[1].textContent = "LOGISTICS " + String(Math.round(sceneLoadProgress.belt)).padStart(3, "0");
      }
      if (preloaderUnlocked || sceneLoadProgress.connector < 100 || sceneLoadProgress.belt < 100) return;
      if (splineWatchdogTimer) window.clearTimeout(splineWatchdogTimer);
      preloaderUnlocked = true;
      if (!preloader) {
        releasePreloaderLock();
        startStatsObservation();
        return;
      }
      preloaderTimer = window.setTimeout(() => {
        if (destroyed) return;
        preloader.classList.add("is-complete");
        preloaderTimer = window.setTimeout(() => {
          if (destroyed) return;
          preloader.remove();
          releasePreloaderLock();
          startStatsObservation();
        }, 560);
      }, 120);
    };

    const availableSplineRoles = new Set(splineCanvases.map((canvas) => canvas.dataset.splineRole));
    ["connector", "belt"].forEach((role) => {
      if (!availableSplineRoles.has(role)) updatePreloader(role, 100);
    });

    const waitForSplineRender = (canvas, application, applyPose) => new Promise((resolve) => {
      let settled = false;
      let timeoutId = 0;
      const finish = (result) => {
        if (settled) return;
        settled = true;
        if (timeoutId) window.clearTimeout(timeoutId);
        canvas.removeEventListener("rendered", onRendered);
        resolve(result);
      };
      const onRendered = () => finish("rendered");

      canvas.addEventListener("rendered", onRendered, { once: true });
      timeoutId = window.setTimeout(() => finish("timeout"), 900);
      applyPose();
      application.requestRender();
    });

    const syncConnectorSpline = (canvas, progress, forceProgress = false) => {
      const application = canvas && canvas.__sxSplineApplication;
      const timelines = canvas && canvas.__sxSplineTimelines;
      if (!application || !timelines || !timelines.length) return;
      const prefersReducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const clamped = !forceProgress && prefersReducedMotion ? 1 : Math.min(1, Math.max(0, progress));
      const connectorRig = canvas.__sxConnectorRig;
      if (connectorRig && canvas.__sxConnectorSeatOffset) connectorRig.position.z -= canvas.__sxConnectorSeatOffset;
      timelines[0].seek(clamped * 1000);
      const seatingProgress = Math.min(1, Math.max(0, (clamped - 0.84) / 0.16));
      const easedSeating = seatingProgress * seatingProgress * (3 - 2 * seatingProgress);
      const seatOffset = easedSeating * 36;
      if (connectorRig && seatOffset > 0) connectorRig.position.z += seatOffset;
      canvas.__sxConnectorSeatOffset = seatOffset;
      const reactionProgress = Math.min(1, Math.max(0, (clamped - 0.7) / 0.3));
      timelines.slice(1).forEach((timeline) => timeline.seek(reactionProgress * 1000));
      canvas.dataset.splineProgress = clamped.toFixed(4);
      canvas.dataset.splineReaction = reactionProgress.toFixed(4);
      canvas.dataset.splineSeated = easedSeating.toFixed(4);
      application.requestRender();
    };

    const syncBeltSpline = (canvas, progress, forceProgress = false) => {
      const application = canvas && canvas.__sxSplineApplication;
      const timelines = canvas && canvas.__sxSplineTimelines;
      if (!application || !timelines || !timelines.length) return;
      const prefersReducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const clamped = !forceProgress && prefersReducedMotion ? 0.35 : Math.min(1, Math.max(0, progress));
      const milliseconds = Math.min(9999.999, clamped * 10000);
      timelines.forEach((timeline) => timeline.seek(milliseconds));
      canvas.dataset.splineProgress = clamped.toFixed(4);
      application.requestRender();
    };

    if (splineCanvases.length) {
      splineCanvases.forEach((canvas) => {
        canvas.setAttribute("data-spline-status", "loading");
        updatePreloader(canvas.dataset.splineRole, 3);
      });
      splineWatchdogTimer = window.setTimeout(() => {
        if (destroyed || preloaderUnlocked) return;
        splineLoadExpired = true;
        splineAbortController.abort();
        splineApplications.forEach((record) => {
          if (record.starting) record.disposeWhenReady = true;
          else disposeSplineRecord(record);
        });
        splineCanvases.forEach((canvas) => {
          if (canvas.getAttribute("data-spline-status") === "ready") return;
          canvas.setAttribute("data-spline-status", "error");
          canvas.dataset.splineError = "Spline scene loading exceeded 15 seconds";
          canvas.dataset.splineWarmState = "fallback";
          canvas.dataset.splineWarmFrames ||= "0";
          updatePreloader(canvas.dataset.splineRole, 100);
        });
      }, 15000);
      import(sxrAssetUrl("spline-runtime.js"))
        .then(({ Application }) => {
          const loadSplineCanvas = async (canvas) => {
            if (destroyed || splineLoadExpired || canvas.__sxSplineLoadStarted) return;
            canvas.__sxSplineLoadStarted = true;
            const isBelt = canvas.dataset.splineRole === "belt";
            updatePreloader(canvas.dataset.splineRole, 12);
            const application = new Application(canvas, { renderMode: "manual" });
            const record = { application, starting: false, disposeWhenReady: false, disposed: false, owner: splineApplications };
            splineApplications.add(record);
            splineRegistry.applications.add(record);
            canvas.__sxSplineApplication = application;
            try {
              const response = await fetch(canvas.getAttribute("data-spline-src"), { signal: splineAbortController.signal });
              if (!response.ok) throw new Error("Unable to load Spline scene: " + response.status);
              const totalBytes = Number(response.headers.get("content-length")) || 0;
              let sceneBuffer;
              if (response.body && totalBytes > 0) {
                const reader = response.body.getReader();
                const chunks = [];
                let loadedBytes = 0;
                while (true) {
                  const { done, value } = await reader.read();
                  if (done) break;
                  chunks.push(value);
                  loadedBytes += value.byteLength;
                  updatePreloader(canvas.dataset.splineRole, 12 + Math.min(58, loadedBytes / totalBytes * 58));
                }
                const joined = new Uint8Array(loadedBytes);
                let offset = 0;
                chunks.forEach((chunk) => {
                  joined.set(chunk, offset);
                  offset += chunk.byteLength;
                });
                sceneBuffer = joined.buffer;
              } else {
                sceneBuffer = await response.arrayBuffer();
              }
              updatePreloader(canvas.dataset.splineRole, 72);
              if (destroyed || splineLoadExpired) return;
              record.starting = true;
              try {
                await application.start(sceneBuffer, { interactive: false });
              } finally {
                record.starting = false;
                if (record.disposeWhenReady) disposeSplineRecord(record);
              }
              if (destroyed || splineLoadExpired) return;
              const sceneObjects = application.getAllObjects();
              updatePreloader(canvas.dataset.splineRole, 90);
              canvas.dataset.splineObjectCount = String(sceneObjects.length);
              if (isBelt) {
                application.setBackgroundColor("#020307");
                let cubeIndex = 0;
                let pointIndex = 0;
                sceneObjects.forEach((object) => {
                  if (object.name === "Cube") {
                    object.color = cubeIndex % 2 === 0 ? "#3154c8" : "#ed1c2a";
                    cubeIndex += 1;
                  } else if (/^(SidePoint|TopPoint)$/.test(object.name)) {
                    object.color = Math.floor(pointIndex / 2) % 2 === 0 ? "#6683ff" : "#ff3947";
                    pointIndex += 1;
                  } else if (object.name === "Path 3") {
                    object.color = "#3154c8";
                  } else if (object.name === "Path 4") {
                    object.color = "#ed1c2a";
                  } else if (object.type === "SpotLight" && object.name === "Spot Light 4") {
                    object.color = "#3154c8";
                  }
                });
                canvas.dataset.splinePalette = "shaxon-red-blue";
                const beltObjectIds = [
                  "d88c181a-b0e4-485a-9f86-e50f9460cb1f",
                  "25fba249-fc93-4917-97c8-1575f2c46e1b",
                  "27354c9c-e49f-4e45-b854-fcc5f6b04bfb",
                  "08399936-15d6-4ff3-b7c6-67990a6b10ef",
                  "747128d6-308d-42f3-866f-8ca6b149628d",
                ];
                const beltTimelines = beltObjectIds.flatMap((uuid) => {
                  const object = application.findObjectById(uuid);
                  if (!object) return [];
                  object.state = undefined;
                  const timeline = object.transition({
                    from: "Base State", to: "State", duration: 10000, easing: 0, autoPlay: false,
                  });
                  timeline.pause();
                  return [timeline];
                });
                if (beltTimelines.length !== beltObjectIds.length) throw new Error("Logistics scrub tracks are missing from the supplied Spline scene");
                canvas.__sxSplineTimelines = beltTimelines;
                canvas.dataset.splinePlayback = "scroll-scrubbed-state-tracks";
                canvas.dataset.splinePath = "TopPanel";
                const beltProgress = Number(root.querySelector(".connection-story")?.style.getPropertyValue("--story-progress") || 0);
                syncBeltSpline(canvas, beltProgress);
              } else {
                const connector = application.findObjectById("a0577b66-6032-4885-8e6a-0ae45743c0cd") || application.findObjectByName("Group 3");
                if (!connector) throw new Error("Connector rig is missing from the supplied Spline scene");
                canvas.__sxConnectorRig = connector;
                canvas.__sxConnectorSeatOffset = 0;
                const connectorTimeline = connector.transition({
                  from: "Base State", to: "State", duration: 300, easing: 6, autoPlay: false,
                }).transition({
                  from: "State", to: "State 2", duration: 700, easing: 5,
                  control1: [0.42, 0], control2: [1, 0.533333],
                });
                connectorTimeline.pause();
                const reactionIds = [
                  "3e92504a-40bd-47e3-b4d2-c4f3bff8ae70",
                  "e78f2519-41e7-4a7b-a138-3532b9a00d15",
                  "d15a8376-df26-4e1c-be5d-e495cc3ae3ef",
                  "8564feb6-ef5b-42d8-b6ca-7655a733be59",
                  "1a6401f9-063d-439c-acc5-4cf319e05e62",
                ];
                const reactionTimelines = reactionIds.flatMap((uuid) => {
                  const object = application.findObjectById(uuid);
                  if (!object) return [];
                  object.state = undefined;
                  const timeline = object.transition({
                    from: "Base State", to: "State", duration: 1000, easing: 4, autoPlay: false,
                  });
                  timeline.pause();
                  return [timeline];
                });
                canvas.__sxSplineTimelines = [connectorTimeline, ...reactionTimelines];
                canvas.dataset.splineScrub = "group-3-state-chain";
                canvas.dataset.splineCamera = "authored-static";
                const connectorProgress = Number(root.querySelector(".connector-scroll")?.style.getPropertyValue("--connector-progress") || 0);
                syncConnectorSpline(canvas, connectorProgress);
              }

              const warmupSamples = [0, 0.5, 1];
              let renderedWarmFrames = 0;
              for (let index = 0; index < warmupSamples.length; index += 1) {
                if (destroyed || splineLoadExpired || record.disposed) return;
                updatePreloader(canvas.dataset.splineRole, 92 + ((index + 1) / (warmupSamples.length + 1)) * 7);
                const result = await waitForSplineRender(canvas, application, () => {
                  if (isBelt) syncBeltSpline(canvas, warmupSamples[index], true);
                  else syncConnectorSpline(canvas, warmupSamples[index], true);
                });
                if (result === "rendered") renderedWarmFrames += 1;
              }
              if (destroyed || splineLoadExpired || record.disposed) return;
              updatePreloader(canvas.dataset.splineRole, 99);
              const restoreResult = await waitForSplineRender(canvas, application, () => {
                const section = root.querySelector(isBelt ? ".connection-story" : ".connector-scroll");
                const property = isBelt ? "--story-progress" : "--connector-progress";
                const currentProgress = Number(section?.style.getPropertyValue(property) || 0);
                if (isBelt) syncBeltSpline(canvas, currentProgress);
                else syncConnectorSpline(canvas, currentProgress);
              });
              if (restoreResult === "rendered") renderedWarmFrames += 1;
              if (destroyed || splineLoadExpired || record.disposed) return;
              const context = canvas.getContext("webgl2") || canvas.getContext("webgl");
              context?.finish();
              canvas.dataset.splineWarmState = renderedWarmFrames === warmupSamples.length + 1
                ? "ready"
                : renderedWarmFrames > 0 ? "partial" : "timeout";
              canvas.dataset.splineWarmFrames = String(renderedWarmFrames);
              canvas.setAttribute("data-spline-status", "ready");
              updatePreloader(canvas.dataset.splineRole, 100);
            } catch (error) {
              if (!destroyed && error.name !== "AbortError") {
                canvas.setAttribute("data-spline-status", "error");
                canvas.dataset.splineError = error instanceof Error ? error.message : String(error);
              }
              updatePreloader(canvas.dataset.splineRole, 100);
            }
          };

          splineCanvases.forEach((canvas) => loadSplineCanvas(canvas));
        })
        .catch(() => {
          if (!destroyed) splineCanvases.forEach((canvas) => {
            canvas.setAttribute("data-spline-status", "error");
            updatePreloader(canvas.dataset.splineRole, 100);
          });
        });
    }

    const escapeHtml = (value) => String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;");
    const arrowIconMarkup = '<svg class="lucide lucide-arrow-up-right arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 7h10v10"></path><path d="M7 17 17 7"></path></svg>';

    const acquireOverlayLock = () => {
      if (ownsOverlayLock) return;
      splineRegistry.overlayLocks += 1;
      ownsOverlayLock = true;
      acquirePageLock();
    };
    const releaseOverlayLock = () => {
      if (!ownsOverlayLock) return;
      ownsOverlayLock = false;
      splineRegistry.overlayLocks = Math.max(0, splineRegistry.overlayLocks - 1);
      releasePageLock();
    };
    const syncPageLock = () => {
      const activeOverlay = productModal.classList.contains("open")
        ? productModal
        : utilityMenu.classList.contains("open") ? utilityMenu : null;
      root.classList.toggle("overlay-open", Boolean(activeOverlay));
      const shell = root.querySelector(".site-shell");
      if (shell) Array.from(shell.children).forEach((child) => {
        if ("inert" in child) child.inert = Boolean(activeOverlay && child !== activeOverlay);
      });
      if (activeOverlay) acquireOverlayLock();
      else releaseOverlayLock();
    };
    const focusableSelector = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
    const focusDialog = (overlay, preferredSelector) => {
      window.requestAnimationFrame(() => {
        const preferred = overlay.querySelector(preferredSelector);
        const fallback = overlay.querySelector('[role="dialog"]');
        (preferred || fallback)?.focus();
      });
    };
    const restoreFocus = () => {
      if (returnFocus && typeof returnFocus.focus === "function") returnFocus.focus();
      returnFocus = null;
    };

    const setUtilityOpen = (open, opener) => {
      const wasOpen = utilityMenu.classList.contains("open");
      utilityMenu.classList.toggle("open", open);
      utilityMenu.setAttribute("aria-hidden", String(!open));
      menuButton.setAttribute("aria-expanded", String(open));
      menuButton.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      menuButton.innerHTML = open ? closeIconMarkup : menuIconMarkup;
      if (open) {
        if (opener) returnFocus = opener;
        focusDialog(utilityMenu, ".utility-top button");
      }
      syncPageLock();
      if (!open && wasOpen && !productModal.classList.contains("open")) restoreFocus();
    };

    const renderNested = (item) => {
      const children = item && item.children ? item.children : [];
      nestedPanel.classList.toggle("has-items", Boolean(children.length));
      if (!children.length) {
        const selectedIndex = Array.from(categoryButtons).findIndex((button) => button.classList.contains("active"));
        const selected = window.SXRHomeConfig?.products?.[Math.max(0, selectedIndex)];
        const photo = selected?.image_url || sxrAssetUrl("shaxon-photos/fiber-bench.webp");
        const label = selected?.name || PRODUCTS[Math.max(0, selectedIndex)]?.label || "Shaxon products";
        nestedPanel.innerHTML = '<p class="mega-label">RANGE</p><div class="mega-visual"><img src="' + escapeHtml(photo) + '" alt=""><p>' + escapeHtml(label) + '</p></div>';
        if(selected?.editor_keys){const img=nestedPanel.querySelector('img');img.setAttribute('data-sxr-content-image',selected.editor_keys.image);img.alt=selected.image_alt||'';nestedPanel.querySelector('.mega-visual p')?.setAttribute('data-sxr-content-text',selected.editor_keys.name);}
        window.dispatchEvent(new Event('sxr:directory-render'));
        return;
      }
      const links = children.map((child) => '<a href="' + escapeHtml(child.href) + '">' + escapeHtml(child.label) + arrowIconMarkup + '</a>').join("");
      nestedPanel.innerHTML = '<p class="mega-label">RANGE</p><h3>' + escapeHtml(item.label) + '</h3><a class="nested-parent-link" href="' + escapeHtml(item.href) + '">View all ' + escapeHtml(item.label) + arrowIconMarkup + '</a><div class="nested-list">' + links + '</div>';
    };

    const bindSubcategoryFocus = (category) => {
      const links = subcategoryPanel.querySelectorAll(".subcategory-list a");
      links.forEach((link, index) => {
        const activate = () => {
          links.forEach((candidate) => candidate.classList.remove("active"));
          link.classList.add("active");
          links.forEach((candidate) => {
            if (candidate.hasAttribute("aria-expanded")) candidate.setAttribute("aria-expanded", String(candidate === link));
          });
          renderNested(category.items[index]);
        };
        link.addEventListener("pointerenter", activate);
        link.addEventListener("focus", activate);
        link.addEventListener("click", (event) => {
          const item = category.items[index];
          if (!item?.children?.length || !window.matchMedia("(max-width: 980px)").matches) return;
          event.preventDefault();
          activate();
          nestedPanel.scrollIntoView({ behavior: reducedMotionMedia.matches ? "auto" : "smooth", block: "nearest" });
          focusDialog(nestedPanel, ".nested-parent-link");
        });
      });
    };

    const renderCategory = (index) => {
      const category = PRODUCTS[index];
      if (!category) return;
      categoryButtons.forEach((button, buttonIndex) => button.classList.toggle("active", buttonIndex === index));
      const items = category.items || [];
      let content = '<p class="mega-label">' + escapeHtml(category.label.toUpperCase()) + '</p>';
      content += '<h3>' + escapeHtml(category.label) + '</h3><p>' + escapeHtml(category.blurb) + '</p>';
      if (items.length) {
        content += '<div class="subcategory-list">' + items.map((item, itemIndex) => {
          const symbol = item.children && item.children.length ? '<span>+</span>' : arrowIconMarkup;
          const expandable = item.children && item.children.length ? ' aria-haspopup="true" aria-expanded="' + String(itemIndex === 0) + '"' : "";
          return '<a href="' + escapeHtml(item.href) + '" class="' + (itemIndex === 0 ? "active" : "") + '"' + expandable + '>' + escapeHtml(item.label) + symbol + '</a>';
        }).join("") + '</div>';
      } else {
        content += '<a class="mega-feature-link" href="' + escapeHtml(category.href) + '">View ' + escapeHtml(category.label) + arrowIconMarkup + '</a>';
      }
      content += '<a class="view-all-link" href="' + escapeHtml(category.href) + '">View all in ' + escapeHtml(category.label) + arrowIconMarkup + '</a>';
      subcategoryPanel.innerHTML = content;
      const keys=SXR_HOME_CONFIG.products?.[index]?.editor_keys;
      if(keys){
        subcategoryPanel.querySelector('h3')?.setAttribute('data-sxr-content-text',keys.name);
        subcategoryPanel.querySelector('h3 + p')?.setAttribute('data-sxr-content-text',keys.description);
        subcategoryPanel.querySelector('.mega-label')?.setAttribute('data-sxr-content-text',keys.name);
      }
      bindSubcategoryFocus(category);
      renderNested(items[0]);
      if(keys)nestedPanel.querySelector('.mega-visual img')?.setAttribute('data-sxr-content-image',keys.image);
      window.dispatchEvent(new Event('sxr:directory-render'));
    };

    const setProductsOpen = (open, opener) => {
      const wasOpen = productModal.classList.contains("open");
      productModal.classList.toggle("open", open);
      productModal.setAttribute("aria-hidden", String(!open));
      productOpeners.forEach((button) => button.setAttribute("aria-expanded", String(open)));
      if (open) {
        setUtilityOpen(false);
        renderCategory(0);
        if (opener) returnFocus = opener;
        focusDialog(productModal, ".mega-header button");
      }
      syncPageLock();
      if (!open && wasOpen && !utilityMenu.classList.contains("open")) restoreFocus();
    };

    categoryButtons.forEach((button, index) => {
      const source=SXR_HOME_CONFIG.products?.[index];
      const label=button.querySelector('strong');
      if(source&&label){label.textContent=source.name;label.setAttribute('data-sxr-content-text',source.editor_keys?.name||'');}
      const activate = () => renderCategory(index);
      button.addEventListener("pointerenter", activate);
      button.addEventListener("focus", activate);
      button.addEventListener("click", activate);
    });

    productOpeners.forEach((button) => button.addEventListener("click", () => setProductsOpen(true, button)));
    root.querySelector(".modal-backdrop").addEventListener("click", () => setProductsOpen(false));
    root.querySelector(".mega-header button").addEventListener("click", () => setProductsOpen(false));
    menuButton.addEventListener("click", () => {
      setProductsOpen(false);
      setUtilityOpen(!utilityMenu.classList.contains("open"), menuButton);
    });
    root.querySelector(".utility-backdrop").addEventListener("click", () => setUtilityOpen(false));
    root.querySelector(".utility-top button").addEventListener("click", () => setUtilityOpen(false));

    const connectorSection = root.querySelector(".connector-scroll");
    const connectorVideo = connectorSection?.querySelector(".connector-scroll-video");
    const story = root.querySelector(".connection-story");
    const history = root.querySelector(".history-section");
    let lastHistoryIndex = -1;
    let connectorVideoMetadataReady = false;
    let connectorVideoProgress = 0;
    let connectorVideoTargetTime = 0;
    let connectorVideoControllerFrame = 0;
    let connectorVideoPreviousTime = 0;
    let connectorVideoNativePlaybackFailed = false;
    let connectorVideoLastObservedTime = connectorVideo?.currentTime || 0;
    let connectorVideoNativeStallDuration = 0;
    let connectorVideoPlayRequest = null;
    let connectorVideoObserver = null;
    let lastBeltSplineProgress = "";
    let resizeRenderTimer = 0;

    const pauseConnectorVideo = () => {
      if (connectorVideo && !connectorVideo.paused) connectorVideo.pause();
    };
    const requestConnectorVideoPlayback = () => {
      if (!connectorVideo || !connectorVideo.paused || connectorVideoPlayRequest || connectorVideoNativePlaybackFailed) return;
      connectorVideoPlayRequest = connectorVideo.play()
        .catch((error) => {
          if (!(error instanceof DOMException) || error.name !== "AbortError") {
            connectorVideoNativePlaybackFailed = true;
            connectorVideo.dataset.videoPlayback = "smooth-seek-fallback";
          }
        })
        .finally(() => {
          connectorVideoPlayRequest = null;
        });
    };
    const runConnectorVideoController = (timestamp) => {
      connectorVideoControllerFrame = 0;
      if (destroyed || !connectorVideoMetadataReady || !Number.isFinite(connectorVideo?.duration) || connectorVideo.duration <= 0) return;
      const elapsed = connectorVideoPreviousTime
        ? Math.min(0.05, Math.max(1 / 120, (timestamp - connectorVideoPreviousTime) / 1000))
        : 1 / 60;
      connectorVideoPreviousTime = timestamp;
      const delta = connectorVideoTargetTime - connectorVideo.currentTime;
      if (connectorVideo.currentTime > connectorVideoLastObservedTime + 0.001) {
        connectorVideoNativeStallDuration = 0;
      } else if (delta > 0 && !connectorVideo.paused && !connectorVideoNativePlaybackFailed) {
        connectorVideoNativeStallDuration += elapsed;
      } else {
        connectorVideoNativeStallDuration = 0;
      }
      connectorVideoLastObservedTime = connectorVideo.currentTime;
      if (connectorVideoNativeStallDuration >= 0.25) {
        connectorVideoNativePlaybackFailed = true;
        connectorVideoNativeStallDuration = 0;
        pauseConnectorVideo();
        connectorVideo.dataset.videoPlayback = "smooth-seek-fallback";
      }
      if (Math.abs(delta) <= 0.035) {
        pauseConnectorVideo();
        if (Math.abs(delta) > 0.008) connectorVideo.currentTime = connectorVideoTargetTime;
        connectorVideoPreviousTime = 0;
        connectorVideoLastObservedTime = connectorVideo.currentTime;
        connectorVideoNativeStallDuration = 0;
        connectorVideo.dataset.videoPlayback = "settled";
        return;
      }
      const speed = Math.min(4, Math.max(0.45, 0.65 + Math.abs(delta) * 0.75));
      if (delta > 0) {
        connectorVideo.playbackRate = speed;
        requestConnectorVideoPlayback();
        connectorVideo.dataset.videoPlayback = connectorVideoNativePlaybackFailed ? "forward-smooth-seek" : "forward-native";
        if (connectorVideoNativePlaybackFailed) {
          connectorVideo.currentTime = Math.min(connectorVideoTargetTime, connectorVideo.currentTime + elapsed * speed);
        }
      } else {
        pauseConnectorVideo();
        connectorVideo.currentTime = Math.max(connectorVideoTargetTime, connectorVideo.currentTime - elapsed * speed);
        connectorVideo.dataset.videoPlayback = "reverse-smooth-seek";
      }
      connectorVideoControllerFrame = requestAnimationFrame(runConnectorVideoController);
    };
    const startConnectorVideoController = () => {
      if (!connectorVideoControllerFrame) connectorVideoControllerFrame = requestAnimationFrame(runConnectorVideoController);
    };
    const syncConnectorVideo = (progress) => {
      const nextProgress = Math.min(1, Math.max(0, progress));
      const progressChanged = Math.abs(nextProgress - connectorVideoProgress) > 0.0005;
      connectorVideoProgress = nextProgress;
      if (!connectorVideoMetadataReady || !Number.isFinite(connectorVideo?.duration) || connectorVideo.duration <= 0) return;
      const finalFrame = Math.max(0, connectorVideo.duration - (1 / 25));
      connectorVideoTargetTime = connectorVideoProgress * finalFrame;
      if (!progressChanged && Math.abs(connectorVideo.currentTime - connectorVideoTargetTime) < 0.035) return;
      startConnectorVideoController();
    };
    const onConnectorVideoMetadata = () => {
      connectorVideoMetadataReady = true;
      connectorVideo.dataset.videoStatus = "ready";
      const finalFrame = Math.max(0, connectorVideo.duration - (1 / 25));
      connectorVideoTargetTime = connectorVideoProgress * finalFrame;
      if (Math.abs(connectorVideo.currentTime - connectorVideoTargetTime) > 0.018) {
        connectorVideo.currentTime = connectorVideoTargetTime;
      }
    };
    const onConnectorVideoError = () => {
      connectorVideoMetadataReady = false;
      if (connectorVideoControllerFrame) cancelAnimationFrame(connectorVideoControllerFrame);
      connectorVideoControllerFrame = 0;
      pauseConnectorVideo();
      connectorVideo.dataset.videoStatus = "error";
    };
    const attachConnectorVideoSource = () => {
      if (!connectorVideo || connectorVideo.src || reducedMotionMedia.matches || navigator.connection?.saveData) return;
      const mobile = window.matchMedia("(max-width: 760px)").matches;
      const pixelRatio = Math.max(1, window.devicePixelRatio || 1);
      const trueUhd = window.innerWidth * pixelRatio >= 3000 && window.innerHeight * pixelRatio >= 1600;
      const highResource = Number(navigator.deviceMemory || 0) >= 8
        && (!navigator.connection?.effectiveType || navigator.connection.effectiveType === "4g");
      const supports4KWebM = typeof connectorVideo.canPlayType !== "function"
        || connectorVideo.canPlayType('video/webm; codecs="vp9"') !== "";
      const source = mobile
        ? connectorVideo.getAttribute("data-video-720")
        : trueUhd && highResource && supports4KWebM
          ? connectorVideo.getAttribute("data-video-2160")
          : connectorVideo.getAttribute("data-video-1080");
      if (!source) return;
      connectorVideo.src = source;
      if (typeof connectorVideo.load === "function") connectorVideo.load();
    };
    if (connectorVideo) {
      connectorVideo.addEventListener("loadedmetadata", onConnectorVideoMetadata);
      connectorVideo.addEventListener("error", onConnectorVideoError);
      const nearViewport = connectorSection.getBoundingClientRect().top < window.innerHeight * 2;
      if (!reducedMotionMedia.matches && !navigator.connection?.saveData && nearViewport) {
        attachConnectorVideoSource();
      } else if (!reducedMotionMedia.matches && !navigator.connection?.saveData && "IntersectionObserver" in window) {
        connectorVideoObserver = new IntersectionObserver((entries) => {
          if (!entries.some((entry) => entry.isIntersecting)) return;
          connectorVideoObserver?.disconnect();
          attachConnectorVideoSource();
        }, { rootMargin: "100% 0px" });
        connectorVideoObserver.observe(connectorSection);
      } else if (!reducedMotionMedia.matches && !navigator.connection?.saveData) {
        attachConnectorVideoSource();
      } else {
        pauseConnectorVideo();
        connectorVideo.dataset.videoStatus = "poster";
      }
      if (!reducedMotionMedia.matches && !navigator.connection?.saveData && connectorVideo.readyState >= 1) {
        onConnectorVideoMetadata();
      }
    }
    const progressFor = (element) => {
      if (!element) return 0;
      const rect = element.getBoundingClientRect();
      const sticky = element.firstElementChild instanceof HTMLElement ? element.firstElementChild : null;
      const stickyHeight = sticky && getComputedStyle(sticky).position === "sticky"
        ? sticky.offsetHeight
        : window.innerHeight;
      const available = Math.max(1, element.offsetHeight - stickyHeight);
      return Math.min(1, Math.max(0, -rect.top / available));
    };
    const updateScrollScenes = (forceSpline = false) => {
      if (destroyed) return;
      scrollFrame = 0;
      const connectorSectionProgress = progressFor(connectorSection);
      const connectorProgress = Math.min(1, connectorSectionProgress / 0.82);
      const connectorProgressKey = connectorProgress.toFixed(4);
      connectorSection.style.setProperty("--connector-progress", connectorProgressKey);
      syncConnectorVideo(connectorProgress);
      const connectorLabel = connectorSection.querySelector(".connector-instruction > span");
      if (connectorLabel) connectorLabel.textContent = connectorProgress >= 0.985 ? "Connection complete" : "Scroll to continue";
      const connectorReadout = connectorSection.querySelector(".connector-instruction strong");
      if (connectorReadout) connectorReadout.textContent = String(Math.round(connectorProgress * 100)).padStart(2, "0") + "%";
      const storyProgress = progressFor(story);
      const storyProgressKey = storyProgress.toFixed(4);
      story.style.setProperty("--story-progress", storyProgressKey);
      if (forceSpline || storyProgressKey !== lastBeltSplineProgress) {
        lastBeltSplineProgress = storyProgressKey;
        syncBeltSpline(story.querySelector(".story-spline-canvas"), storyProgress);
      }
      const storyReadout = story.querySelector(".story-depth-readout strong");
      if (storyReadout) storyReadout.textContent = String(Math.round(storyProgress * 100)).padStart(2, "0") + "%";
      const historyProgress = window.matchMedia("(max-width: 720px)").matches ? 0 : progressFor(history);
      history.style.setProperty("--history-progress", historyProgress.toFixed(4));
      const historyEvents = Array.from(history.querySelectorAll(".history-event"));
      const historyPosition = historyProgress * Math.max(0, historyEvents.length - 1);
      const historyIndex = historyEvents.length
        ? Math.min(historyEvents.length - 1, Math.max(0, Math.round(historyPosition)))
        : 0;
      const historyChanged = historyIndex !== lastHistoryIndex;
      historyEvents.forEach((event, index) => {
        const delta = index - historyPosition;
        const current = index === historyIndex;
        const localOffset = current ? historyPosition - historyIndex : 0;
        event.style.setProperty("--event-opacity", current ? "1" : "0");
        event.style.setProperty("--event-y", current
          ? (-localOffset * 2.6).toFixed(3) + "rem"
          : (Math.sign(delta || 1) * 2.6).toFixed(3) + "rem");
        event.style.setProperty("--event-scale", current
          ? (1 - Math.abs(localOffset) * 0.018).toFixed(4)
          : "0.98");
        if (historyChanged) {
          event.classList.toggle("is-current", index === historyIndex);
          if (index === historyIndex) event.setAttribute("aria-current", "step");
          else event.removeAttribute("aria-current");
        }
      });
      if (historyChanged) {
        const historyStatus = history.querySelector(".history-status strong");
        if (historyStatus) historyStatus.textContent = String(historyIndex + 1).padStart(2, "0") + " / " + String(historyEvents.length).padStart(2, "0");
        const activeHistoryEvent = historyEvents[historyIndex];
        const historyAnnouncement = history.querySelector(".history-heading .sr-only[aria-live]");
        if (historyAnnouncement && activeHistoryEvent) {
          historyAnnouncement.textContent = "Milestone " + (historyIndex + 1) + " of " + historyEvents.length + ": " +
            (activeHistoryEvent.dataset.timelineYear || "") + ", " + (activeHistoryEvent.dataset.timelineText || "");
        }
      }
      if (historyChanged) lastHistoryIndex = historyIndex;
    };
    const scheduleScrollScenes = () => {
      if (!scrollFrame) scrollFrame = requestAnimationFrame(() => updateScrollScenes());
    };
    const handleSceneViewportChange = () => {
      scheduleScrollScenes();
      if (resizeRenderTimer) window.clearTimeout(resizeRenderTimer);
      resizeRenderTimer = window.setTimeout(() => updateScrollScenes(true), 160);
    };
    const sceneResizeObserver = typeof ResizeObserver === "undefined"
      ? null
      : new ResizeObserver(handleSceneViewportChange);
    splineCanvases.forEach((canvas) => {
      if (canvas.parentElement) sceneResizeObserver?.observe(canvas.parentElement);
    });
    window.addEventListener("scroll", scheduleScrollScenes, { passive: true });
    window.addEventListener("resize", handleSceneViewportChange);
    window.addEventListener("orientationchange", handleSceneViewportChange);
    window.visualViewport?.addEventListener("resize", handleSceneViewportChange);
    document.addEventListener("visibilitychange", handleSceneViewportChange);
    updateScrollScenes(true);

    const carousel = root.querySelector(".product-carousel");
    const cards = Array.from(carousel.querySelectorAll(".product-slide"));
    const counter = root.querySelector(".product-deck-counter strong");
    const productNodes = Array.from(root.querySelectorAll(".product-deck-node"));
    const autoplayButton = root.querySelector(".carousel-autoplay");
    const previousProductButton = root.querySelector('[aria-label="Previous product"]');
    const nextProductButton = root.querySelector('[aria-label="Next product"]');
    let drag = null;
    let suppressClick = false;
    let carouselFrame = 0;
    let activeProductIndex = 0;
    let renderedProductIndex = -1;
    let autoplayEnabled = true;
    let autoplayPaused = false;
    let autoplayTimer = 0;
    const clearAutoplay = () => {
      if (autoplayTimer) window.clearTimeout(autoplayTimer);
      autoplayTimer = 0;
    };
    const syncAutoplayControl = () => {
      if (!autoplayButton) return;
      const reducedMotion = reducedMotionMedia.matches;
      const running = autoplayEnabled && !reducedMotion;
      autoplayButton.dataset.playing = String(running);
      autoplayButton.disabled = reducedMotion;
      autoplayButton.setAttribute("aria-label", reducedMotion
        ? "Automatic carousel disabled by reduced motion preference"
        : running ? "Pause product carousel" : "Play product carousel");
      autoplayButton.setAttribute("aria-pressed", String(!autoplayEnabled || reducedMotion));
    };
    const scheduleAutoplay = () => {
      clearAutoplay();
      syncAutoplayControl();
      if (!autoplayEnabled || autoplayPaused || destroyed || cards.length < 2 || reducedMotionMedia.matches) return;
      autoplayTimer = window.setTimeout(() => {
        autoplayTimer = 0;
        goToProduct((activeProductIndex + 1) % cards.length);
      }, 4800);
    };
    const updateCarousel = () => {
      carouselFrame = 0;
      const center = carousel.scrollLeft + carousel.clientWidth / 2;
      let active = 0;
      let distance = Number.POSITIVE_INFINITY;
      cards.forEach((card, index) => {
        const cardCenter = card.offsetLeft + card.offsetWidth / 2;
        const nextDistance = Math.abs(cardCenter - center);
        const rawDistance = (cardCenter - center) / Math.max(1, card.offsetWidth);
        card.style.setProperty("--slide-distance", Math.min(1.35, Math.max(-1.35, rawDistance)).toFixed(4));
        card.style.setProperty("--slide-proximity", Math.min(1, Math.abs(rawDistance)).toFixed(4));
        if (nextDistance < distance) {
          distance = nextDistance;
          active = index;
        }
      });
      activeProductIndex = active;
      if (active !== renderedProductIndex) {
        cards.forEach((card, index) => {
          const isActive = index === active;
          card.classList.toggle("is-active", isActive);
          const link = card.querySelector(".product-card-link");
          if (link) link.tabIndex = isActive ? 0 : -1;
        });
        productNodes.forEach((node, index) => {
          node.classList.toggle("is-past", index < active);
          node.classList.toggle("is-active", index === active);
          node.setAttribute("aria-pressed", String(index === active));
        });
        if (counter) counter.textContent = String(active + 1).padStart(2, "0");
        if (previousProductButton) previousProductButton.disabled = active === 0;
        if (nextProductButton) nextProductButton.disabled = active === cards.length - 1;
        renderedProductIndex = active;
        scheduleAutoplay();
      }
    };
    const scheduleCarousel = () => {
      if (!carouselFrame) carouselFrame = requestAnimationFrame(updateCarousel);
    };
    const goToProduct = (index) => {
      const targetIndex = Math.min(cards.length - 1, Math.max(0, index));
      const card = cards[targetIndex];
      if (!card) return;
      carousel.scrollTo({
        left: card.offsetLeft - (carousel.clientWidth - card.offsetWidth) / 2,
        behavior: "smooth",
      });
      scheduleAutoplay();
    };
    carousel.addEventListener("scroll", scheduleCarousel, { passive: true });
    carousel.addEventListener("pointerdown", (event) => {
      if (!event.isPrimary || ((event.pointerType === "mouse" || event.pointerType === "pen") && event.button !== 0)) return;
      autoplayPaused = true;
      clearAutoplay();
      if (event.pointerType !== "mouse" && event.pointerType !== "pen") return;
      drag = { id: event.pointerId, startX: event.clientX, startScroll: carousel.scrollLeft, moved: false };
      carousel.setPointerCapture(event.pointerId);
      carousel.classList.add("is-dragging");
    });
    carousel.addEventListener("pointermove", (event) => {
      if (!drag || drag.id !== event.pointerId) return;
      const delta = event.clientX - drag.startX;
      drag.moved = drag.moved || Math.abs(delta) > 5;
      carousel.scrollLeft = drag.startScroll - delta;
    });
    const endDrag = (event) => {
      if (!drag || drag.id !== event.pointerId) {
        if (event.isPrimary) {
          autoplayPaused = false;
          scheduleAutoplay();
        }
        return;
      }
      suppressClick = drag.moved;
      if (carousel.hasPointerCapture(event.pointerId)) carousel.releasePointerCapture(event.pointerId);
      carousel.classList.remove("is-dragging");
      drag = null;
      autoplayPaused = false;
      scheduleCarousel();
      scheduleAutoplay();
    };
    const cancelDrag = (event) => {
      if (!drag || drag.id !== event.pointerId) {
        if (event.isPrimary) {
          autoplayPaused = false;
          scheduleAutoplay();
        }
        return;
      }
      if (carousel.hasPointerCapture(event.pointerId)) carousel.releasePointerCapture(event.pointerId);
      carousel.classList.remove("is-dragging");
      drag = null;
      suppressClick = false;
      autoplayPaused = false;
      scheduleCarousel();
      scheduleAutoplay();
    };
    carousel.addEventListener("pointerup", endDrag);
    carousel.addEventListener("pointercancel", cancelDrag);
    carousel.addEventListener("lostpointercapture", cancelDrag);
    carousel.addEventListener("dragstart", (event) => event.preventDefault());
    carousel.addEventListener("click", (event) => {
      if (!suppressClick) return;
      event.preventDefault();
      suppressClick = false;
    }, true);
    carousel.addEventListener("keydown", (event) => {
      if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
      event.preventDefault();
      if (event.key === "Home") goToProduct(0);
      else if (event.key === "End") goToProduct(cards.length - 1);
      else goToProduct(activeProductIndex + (event.key === "ArrowRight" ? 1 : -1));
    });
    carousel.addEventListener("focusin", () => {
      autoplayPaused = true;
      clearAutoplay();
    });
    carousel.addEventListener("focusout", () => {
      window.setTimeout(() => {
        if (carousel.contains(document.activeElement)) return;
        autoplayPaused = false;
        scheduleAutoplay();
      }, 0);
    });
    autoplayButton?.addEventListener("click", () => {
      autoplayEnabled = !autoplayEnabled;
      scheduleAutoplay();
    });
    const onReducedMotionChange = () => {
      if (reducedMotionMedia.matches && statsHasPlayed) finishStats();
      scheduleAutoplay();
    };
    reducedMotionMedia.addEventListener?.("change", onReducedMotionChange);
    productNodes.forEach((node, index) => node.addEventListener("click", () => goToProduct(index)));
    previousProductButton?.addEventListener("click", () => goToProduct(activeProductIndex - 1));
    nextProductButton?.addEventListener("click", () => goToProduct(activeProductIndex + 1));
    window.addEventListener("resize", scheduleCarousel);
    updateCarousel();
    scheduleAutoplay();

    root.addEventListener("keydown", (event) => {
      const activeOverlay = productModal.classList.contains("open")
        ? productModal
        : utilityMenu.classList.contains("open") ? utilityMenu : null;
      if (event.key === "Tab" && activeOverlay) {
        const dialog = activeOverlay.querySelector('[role="dialog"]');
        const focusable = dialog ? Array.from(dialog.querySelectorAll(focusableSelector))
          .filter((element) => element.getClientRects().length && !element.closest("[hidden]")) : [];
        if (!focusable.length) {
          event.preventDefault();
          dialog?.focus();
          return;
        }
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && (document.activeElement === first || !dialog.contains(document.activeElement))) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && (document.activeElement === last || !dialog.contains(document.activeElement))) {
          event.preventDefault();
          first.focus();
        }
        return;
      }
      if (event.key !== "Escape" || !activeOverlay) return;
      if (activeOverlay === productModal) setProductsOpen(false);
      else setUtilityOpen(false);
    });

    let removalObserver;
    const cleanup = () => {
      if (destroyed) return;
      destroyed = true;
      root.dataset.sxReady = "false";
      splineAbortController.abort();
      if (scrollFrame) cancelAnimationFrame(scrollFrame);
      if (resizeRenderTimer) window.clearTimeout(resizeRenderTimer);
      if (carouselFrame) cancelAnimationFrame(carouselFrame);
      clearAutoplay();
      window.removeEventListener("scroll", scheduleScrollScenes);
      window.removeEventListener("resize", handleSceneViewportChange);
      window.removeEventListener("orientationchange", handleSceneViewportChange);
      window.visualViewport?.removeEventListener("resize", handleSceneViewportChange);
      document.removeEventListener("visibilitychange", handleSceneViewportChange);
      sceneResizeObserver?.disconnect();
      connectorVideoObserver?.disconnect();
      if (connectorVideoControllerFrame) cancelAnimationFrame(connectorVideoControllerFrame);
      pauseConnectorVideo();
      connectorVideo?.removeEventListener("loadedmetadata", onConnectorVideoMetadata);
      connectorVideo?.removeEventListener("error", onConnectorVideoError);
      window.removeEventListener("resize", scheduleCarousel);
      reducedMotionMedia.removeEventListener?.("change", onReducedMotionChange);
      statsObserver?.disconnect();
      stopStatsFallback();
      if (statsFrame) cancelAnimationFrame(statsFrame);
      if (preloaderTimer) window.clearTimeout(preloaderTimer);
      if (splineWatchdogTimer) window.clearTimeout(splineWatchdogTimer);
      releasePreloaderLock();
      releaseOverlayLock();
      splineRegistry.roots = Math.max(0, splineRegistry.roots - 1);
      if (splineRegistry.roots === 0) splineRegistry.applications.forEach((record) => {
        if (record.starting) record.disposeWhenReady = true;
        else disposeSplineRecord(record);
      });
      splineCanvases.forEach((canvas) => {
        delete canvas.__sxSplineApplication;
        delete canvas.__sxSplineTimelines;
        delete canvas.__sxSplineLoadStarted;
        delete canvas.__sxConnectorRig;
        delete canvas.__sxConnectorSeatOffset;
        delete canvas.dataset.splineWarmState;
        delete canvas.dataset.splineWarmFrames;
        delete canvas.dataset.splineError;
      });
      if (removalObserver) removalObserver.disconnect();
    };
    root.__sxCleanup = cleanup;
    removalObserver = new MutationObserver(() => {
      if (!root.isConnected) cleanup();
    });
    removalObserver.observe(document.documentElement, { childList: true, subtree: true });
  });
})();
