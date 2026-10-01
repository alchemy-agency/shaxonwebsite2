(() => {
	"use strict";

	const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
	const shortViewport = window.matchMedia("(max-height: 46rem)");
	const clamp = (value, minimum = 0, maximum = 1) => Math.min(maximum, Math.max(minimum, value));

	const progressFor = (element) => {
		const rect = element.getBoundingClientRect();
		const range = Math.max(1, rect.height - window.innerHeight);
		return clamp(-rect.top / range);
	};

	const canEnhance = () => !reducedMotion.matches && !shortViewport.matches;

	const initBulkRunStory = (story) => {
		if (!(story instanceof HTMLElement) || story.dataset.sxrImageStoryReady === "true") return;
		const frames = Array.from(story.querySelectorAll("[data-sxr-bulk-run-frame]"));
		const steps = Array.from(story.querySelectorAll("[data-sxr-bulk-run-step]"));
		const progress = story.querySelector("[data-sxr-bulk-run-progress]");
		if (!frames.length || frames.length !== steps.length) return;

		story.dataset.sxrImageStoryReady = "true";
		let requestedFrame = 0;
		let activeIndex = -1;

		const draw = () => {
			requestedFrame = 0;
			const enhanced = canEnhance();
			story.classList.toggle("is-enhanced", enhanced);
			story.classList.toggle("is-fallback", !enhanced);
			if (!enhanced) {
				story.style.setProperty("--sxr-image-progress", "1");
				if (progress instanceof HTMLElement) progress.style.transform = "scaleX(1)";
				frames.forEach((frame) => frame.classList.add("is-active"));
				steps.forEach((step) => {
					step.classList.add("is-active");
					step.removeAttribute("aria-current");
				});
				activeIndex = -1;
				return;
			}
			const amount = progressFor(story);
			const index = Math.min(frames.length - 1, Math.floor(amount * frames.length));
			story.style.setProperty("--sxr-image-progress", amount.toFixed(4));
			if (progress instanceof HTMLElement) progress.style.transform = `scaleX(${amount})`;
			if (index === activeIndex) return;
			activeIndex = index;
			frames.forEach((frame, frameIndex) => frame.classList.toggle("is-active", frameIndex === index));
			steps.forEach((step, stepIndex) => {
				const current = stepIndex === index;
				step.classList.toggle("is-active", current);
				if (current) step.setAttribute("aria-current", "step");
				else step.removeAttribute("aria-current");
			});
		};
		const schedule = () => {
			if (!requestedFrame) requestedFrame = window.requestAnimationFrame(draw);
		};
		window.addEventListener("scroll", schedule, { passive: true });
		window.addEventListener("resize", schedule, { passive: true });
		reducedMotion.addEventListener("change", schedule);
		shortViewport.addEventListener("change", schedule);
		draw();
	};

	const initCustomImageHero = (hero) => {
		if (!(hero instanceof HTMLElement) || hero.dataset.sxrImageStoryReady === "true") return;
		hero.dataset.sxrImageStoryReady = "true";
		let requestedFrame = 0;
		const draw = () => {
			requestedFrame = 0;
			const enhanced = canEnhance();
			hero.classList.toggle("is-enhanced", enhanced);
			if (!enhanced) {
				hero.style.setProperty("--sxr-image-progress", "1");
				return;
			}
			const rect = hero.getBoundingClientRect();
			const amount = clamp(-rect.top / Math.max(1, rect.height));
			hero.style.setProperty("--sxr-image-progress", amount.toFixed(4));
		};
		const schedule = () => {
			if (!requestedFrame) requestedFrame = window.requestAnimationFrame(draw);
		};
		window.addEventListener("scroll", schedule, { passive: true });
		window.addEventListener("resize", schedule, { passive: true });
		reducedMotion.addEventListener("change", schedule);
		shortViewport.addEventListener("change", schedule);
		draw();
	};

	const initCaliforniaWipeStory = (story) => {
		if (!(story instanceof HTMLElement) || story.dataset.sxrImageStoryReady === "true") return;
		const progress = story.querySelector("[data-sxr-california-wipe-progress]");
		const actions = story.querySelector("[data-sxr-california-actions]");
		story.dataset.sxrImageStoryReady = "true";
		let requestedFrame = 0;
		let actionsVisible = true;

		const setActionsAccessible = (visible) => {
			if (!(actions instanceof HTMLElement) || visible === actionsVisible) return;
			actionsVisible = visible;
			actions.inert = !visible;
			if (visible) actions.removeAttribute("aria-hidden");
			else actions.setAttribute("aria-hidden", "true");
		};

		const draw = () => {
			requestedFrame = 0;
			const enhanced = !reducedMotion.matches;
			story.classList.toggle("is-enhanced", enhanced);
			story.classList.toggle("is-fallback", !enhanced);
			if (!enhanced) {
				story.style.setProperty("--sxr-image-progress", "1");
				story.classList.add("is-actions");
				setActionsAccessible(true);
				if (progress instanceof HTMLElement) progress.style.transform = "scaleY(1)";
				return;
			}
			const amount = progressFor(story);
			story.style.setProperty("--sxr-image-progress", amount.toFixed(4));
			const showActions = amount >= 0.2;
			story.classList.toggle("is-actions", showActions);
			setActionsAccessible(showActions);
			if (progress instanceof HTMLElement) progress.style.transform = `scaleY(${amount})`;
		};
		const schedule = () => {
			if (!requestedFrame) requestedFrame = window.requestAnimationFrame(draw);
		};
		window.addEventListener("scroll", schedule, { passive: true });
		window.addEventListener("resize", schedule, { passive: true });
		reducedMotion.addEventListener("change", schedule);
		shortViewport.addEventListener("change", schedule);
		setActionsAccessible(false);
		draw();
	};

	const initCaliforniaStatement = (stage) => {
		if (!(stage instanceof HTMLElement) || stage.dataset.sxrCaliforniaStatementReady === "true") return;
		stage.dataset.sxrCaliforniaStatementReady = "true";
		let requestedFrame = 0;

		const draw = () => {
			requestedFrame = 0;
			const enhanced = !reducedMotion.matches;
			stage.classList.toggle("is-enhanced", enhanced);
			stage.style.setProperty("--sxr-ca-statement-progress", (enhanced ? progressFor(stage) : 1).toFixed(4));
		};
		const schedule = () => {
			if (!requestedFrame) requestedFrame = window.requestAnimationFrame(draw);
		};

		window.addEventListener("scroll", schedule, { passive: true });
		window.addEventListener("resize", schedule, { passive: true });
		reducedMotion.addEventListener("change", schedule);
		shortViewport.addEventListener("change", schedule);
		draw();
	};

	const boot = () => {
		document.querySelectorAll("[data-sxr-bulk-run-story]").forEach(initBulkRunStory);
		document.querySelectorAll("[data-sxr-custom-image-hero]").forEach(initCustomImageHero);
		document.querySelectorAll("[data-sxr-california-wipe-story]").forEach(initCaliforniaWipeStory);
		document.querySelectorAll("[data-sxr-california-statement]").forEach(initCaliforniaStatement);
	};

	if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot, { once: true });
	else boot();
})();
