(() => {
	"use strict";

	const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

	const initCustomProcess = (process) => {
		if (!(process instanceof HTMLElement) || process.dataset.sxrReady === "true") return;

		const steps = Array.from(process.querySelectorAll("[data-sxr-custom-step]"));
		const image = process.querySelector("[data-sxr-custom-process-image]");
		const title = process.querySelector("[data-sxr-custom-process-title]");
		const indexLabel = process.querySelector("[data-sxr-custom-process-index]");
		const progress = process.querySelector("[data-sxr-custom-process-progress]");
		if (!steps.length || !(image instanceof HTMLImageElement)) return;

		process.dataset.sxrReady = "true";
		let activeIndex = -1;
		let requestedIndex = -1;
		let swapTimer = 0;
		let swapGeneration = 0;
		let pendingImage = null;

		const preloadImage = (source, generation) =>
			new Promise((resolve) => {
				const candidate = new Image();
				pendingImage = candidate;
				let settled = false;
				const finish = (loaded) => {
					if (settled) return;
					settled = true;
					if (pendingImage === candidate) pendingImage = null;
					resolve(loaded && generation === swapGeneration);
				};
				candidate.decoding = "async";
				candidate.addEventListener(
					"load",
					() => {
						if (typeof candidate.decode !== "function") {
							finish(true);
							return;
						}
						candidate.decode().then(() => finish(true)).catch(() => finish(true));
					},
					{ once: true },
				);
				candidate.addEventListener("error", () => finish(false), { once: true });
				candidate.src = source;
			});

		const commit = (index, source, nextTitle) => {
			activeIndex = index;
			requestedIndex = index;
			steps.forEach((step, stepIndex) => {
				const current = stepIndex === index;
				step.classList.toggle("is-active", current);
				if (current) step.setAttribute("aria-current", "step");
				else step.removeAttribute("aria-current");
			});
			if (source) image.src = source;
			image.alt = nextTitle;
			if (title) title.textContent = nextTitle;
			if (indexLabel) indexLabel.textContent = `${String(index + 1).padStart(2, "0")} / ${String(steps.length).padStart(2, "0")}`;
			if (progress instanceof HTMLElement) progress.style.transform = `scaleX(${(index + 1) / steps.length})`;
			process.removeAttribute("data-sxr-image-error");
		};

		const activate = (nextIndex) => {
			const index = Math.max(0, Math.min(nextIndex, steps.length - 1));
			if (index === requestedIndex) return;
			requestedIndex = index;
			const generation = ++swapGeneration;
			window.clearTimeout(swapTimer);
			image.style.opacity = "";
			if (pendingImage) {
				pendingImage.onload = null;
				pendingImage.onerror = null;
				pendingImage.src = "";
				pendingImage = null;
			}
			if (index === activeIndex) return;
			const active = steps[index];
			const source = active.dataset.sxrStepImage || "";
			const nextTitle = active.dataset.sxrStepTitle || "";

			if (source && image.src !== source) {
				preloadImage(source, generation).then((loaded) => {
					if (!loaded) {
						if (generation === swapGeneration) {
							requestedIndex = activeIndex;
							process.dataset.sxrImageError = "true";
						}
						return;
					}
					image.style.opacity = "0";
					swapTimer = window.setTimeout(() => {
						if (generation !== swapGeneration) return;
						commit(index, source, nextTitle);
						image.style.opacity = "";
					}, reducedMotion.matches ? 0 : 150);
				});
			} else commit(index, "", nextTitle);
		};

		steps.forEach((step, index) => {
			step.addEventListener("pointerenter", () => activate(index));
		});

		activate(0);
		if (!("IntersectionObserver" in window)) return;

		const observer = new IntersectionObserver(
			(entries) => {
				const visible = entries
					.filter((entry) => entry.isIntersecting)
					.sort((left, right) => right.intersectionRatio - left.intersectionRatio);
				if (!visible.length) return;
				const nextIndex = steps.indexOf(visible[0].target);
				if (nextIndex >= 0) activate(nextIndex);
			},
			{ rootMargin: "-25% 0px -42%", threshold: [0.08, 0.3, 0.55] },
		);
		steps.forEach((step) => observer.observe(step));
	};

	const initCategoryExplorer = (explorer) => {
		if (!(explorer instanceof HTMLElement) || explorer.dataset.sxrReady === "true") return;
		const tabs = Array.from(explorer.querySelectorAll('[role="tab"][data-sxr-category-tab]'));
		const panels = Array.from(explorer.querySelectorAll('[role="tabpanel"][data-sxr-category-panel]'));
		const markers = Array.from(explorer.querySelectorAll("[data-sxr-explorer-marker]"));
		const current = explorer.querySelector("[data-sxr-explorer-current]");
		if (!tabs.length || tabs.length !== panels.length) return;

		explorer.dataset.sxrReady = "true";
		const activate = (requestedIndex, moveFocus = false) => {
			const index = Math.max(0, Math.min(requestedIndex, tabs.length - 1));
			tabs.forEach((tab, tabIndex) => {
				const selected = tabIndex === index;
				tab.setAttribute("aria-selected", String(selected));
				tab.tabIndex = selected ? 0 : -1;
				tab.classList.toggle("is-selected", selected);
				panels[tabIndex].hidden = !selected;
			});
			markers.forEach((marker, markerIndex) => {
				marker.classList.toggle("is-current", markerIndex === index);
				marker.classList.toggle("is-visited", markerIndex < index);
			});
			explorer.dataset.sxrActiveIndex = String(index);
			explorer.style.setProperty("--sxr-explorer-position", String(index));
			if (current) current.textContent = panels[index].dataset.sxrExplorerTitle || "";
			if (moveFocus) tabs[index].focus();
		};

		tabs.forEach((tab, index) => {
			tab.addEventListener("click", () => activate(index));
			tab.addEventListener("keydown", (event) => {
				let next = index;
				if (event.key === "ArrowRight" || event.key === "ArrowDown") next = (index + 1) % tabs.length;
				else if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = (index - 1 + tabs.length) % tabs.length;
				else if (event.key === "Home") next = 0;
				else if (event.key === "End") next = tabs.length - 1;
				else return;
				event.preventDefault();
				activate(next, true);
			});
		});
		activate(0);
	};

	const initClickVideo = (trigger) => {
		if (!(trigger instanceof HTMLAnchorElement) || trigger.dataset.sxrVideoReady === "true") return;
		trigger.dataset.sxrVideoReady = "true";
		trigger.addEventListener(
			"click",
			(event) => {
				const mount = trigger.closest("[data-sxr-video-mount]");
				const videoId = trigger.dataset.sxrVideoId || "";
				if (!(mount instanceof HTMLElement) || !/^[A-Za-z0-9_-]{6,20}$/.test(videoId)) return;
				event.preventDefault();

				const frame = document.createElement("iframe");
				frame.src = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&playsinline=1&rel=0&modestbranding=1`;
				frame.title = trigger.dataset.sxrVideoTitle || "Shaxon manufacturing film";
				frame.allow = "autoplay; encrypted-media; picture-in-picture";
				frame.allowFullscreen = true;
				frame.loading = "eager";
				mount.classList.add("is-playing");
				trigger.replaceWith(frame);
				frame.addEventListener("load", () => frame.focus(), { once: true });
			},
			{ once: true },
		);
	};

	const initBulkIndustries = (section) => {
		if (!(section instanceof HTMLElement) || section.dataset.sxrReady === "true") return;
		const rows = Array.from(section.querySelectorAll("[data-sxr-bulk-industry]"));
		if (!rows.length) return;

		section.dataset.sxrReady = "true";
		let activeIndex = 0;
		const activate = (index) => {
			activeIndex = Math.max(0, Math.min(index, rows.length - 1));
			rows.forEach((row, rowIndex) => row.classList.toggle("is-active", rowIndex === activeIndex));
		};

		activate(0);
		if (reducedMotion.matches || !("IntersectionObserver" in window)) {
			rows.forEach((row) => row.classList.add("is-active"));
			return;
		}

		const observer = new IntersectionObserver(
			(entries) => {
				const visible = entries
					.filter((entry) => entry.isIntersecting)
					.sort((left, right) => right.intersectionRatio - left.intersectionRatio);
				if (!visible.length) return;
				const index = rows.indexOf(visible[0].target);
				if (index >= 0) activate(index);
			},
			{ rootMargin: "-34% 0px -42%", threshold: [0.12, 0.4, 0.72] },
		);
		rows.forEach((row) => observer.observe(row));
	};

	const boot = () => {
		document.querySelectorAll("[data-sxr-custom-process]").forEach(initCustomProcess);
		document.querySelectorAll("[data-sxr-video-trigger]").forEach(initClickVideo);
		document.querySelectorAll("[data-sxr-bulk-industries]").forEach(initBulkIndustries);
		document.querySelectorAll("[data-sxr-category-explorer]").forEach(initCategoryExplorer);
	};

	if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot, { once: true });
	else boot();
})();
