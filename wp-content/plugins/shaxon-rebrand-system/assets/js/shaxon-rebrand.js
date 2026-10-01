(() => {
	"use strict";

	document.documentElement.classList.add("sxr-js");

	const config = window.SXRFrontend || {};
	const i18n = config.i18n || {};
	const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
	const focusableSelector = [
		"a[href]",
		"button:not([disabled])",
		"input:not([disabled]):not([type='hidden'])",
		"select:not([disabled])",
		"textarea:not([disabled])",
		"[tabindex]:not([tabindex='-1'])",
	].join(",");

	const visibleFocusable = (container) =>
		Array.from(container.querySelectorAll(focusableSelector)).filter((element) => {
			if (element.closest("[hidden]")) return false;
			const style = window.getComputedStyle(element);
			return style.visibility !== "hidden" && style.display !== "none";
		});

	const lockState = {
		count: 0,
		paddingRight: "",
	};

	const lockPage = () => {
		lockState.count += 1;
		if (lockState.count > 1) return;
		lockState.paddingRight = document.body.style.paddingRight;
		const scrollbar = Math.max(0, window.innerWidth - document.documentElement.clientWidth);
		if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`;
		document.body.classList.add("sxr-overlay-open", "overlay-open");
	};

	const unlockPage = () => {
		lockState.count = Math.max(0, lockState.count - 1);
		if (lockState.count > 0) return;
		document.body.classList.remove("sxr-overlay-open", "overlay-open");
		document.body.style.paddingRight = lockState.paddingRight;
	};

	const setBackgroundInert = (root, inert) => {
		root
			.querySelectorAll(":scope > .sxr-skip-link, :scope > .sxr-header, :scope > .sxr-main, :scope > .sxr-footer")
			.forEach((element) => {
				if (inert) element.setAttribute("inert", "");
				else element.removeAttribute("inert");
			});
	};

	const initProductTabs = (root) => {
		const tablist = root.querySelector(".sxr-mega-menu__tabs[role='tablist']");
		if (!tablist || tablist.dataset.sxrReady === "true") return;
		tablist.dataset.sxrReady = "true";

		const tabs = Array.from(tablist.querySelectorAll("[data-sxr-product-tab]"));
		const panels = Array.from(root.querySelectorAll("[data-sxr-product-panel]"));
		const hoverQuery = window.matchMedia("(hover: hover) and (pointer: fine)");

		const activate = (tab, focus = false) => {
			const targetId = tab.getAttribute("aria-controls");
			tabs.forEach((candidate) => {
				const active = candidate === tab;
				candidate.setAttribute("aria-selected", String(active));
				candidate.setAttribute("tabindex", active ? "0" : "-1");
			});
			panels.forEach((panel) => {
				panel.hidden = panel.id !== targetId;
			});
			if (focus) tab.focus();
		};

		tabs.forEach((tab, index) => {
			tab.addEventListener("click", () => activate(tab));
			tab.addEventListener("focus", () => activate(tab));
			tab.addEventListener("pointerenter", () => {
				if (hoverQuery.matches) activate(tab);
			});
			tab.addEventListener("keydown", (event) => {
				let nextIndex = index;
				if (["ArrowDown", "ArrowRight"].includes(event.key)) nextIndex = (index + 1) % tabs.length;
				else if (["ArrowUp", "ArrowLeft"].includes(event.key)) nextIndex = (index - 1 + tabs.length) % tabs.length;
				else if (event.key === "Home") nextIndex = 0;
				else if (event.key === "End") nextIndex = tabs.length - 1;
				else return;
				event.preventDefault();
				activate(tabs[nextIndex], true);
			});
		});
	};

	const initAboutHeader = (root) => {
		if (!root.querySelector('.sxr-about-v3-hero')) return;
		const header = root.querySelector('.site-header');
		if (!header) return;
		const controller = new AbortController();
		let lastY = Math.max(0, window.scrollY), travel = 0, direction = 0, frame = 0;
		const show = () => header.classList.remove('is-scroll-hidden');
		const update = () => {
			frame = 0;
			if (!root.isConnected) { controller.abort(); return; }
			const y = Math.max(0, window.scrollY), delta = y - lastY;
			lastY = y;
			if (y < 160 || header.contains(document.activeElement) || document.body.classList.contains('sxr-overlay-open')) { show(); travel = 0; return; }
			const nextDirection = Math.sign(delta);
			if (direction !== nextDirection) travel = 0;
			direction = nextDirection; travel += Math.abs(delta);
			if (direction < 0 && travel >= 8) show();
			if (direction > 0 && travel >= 24) header.classList.add('is-scroll-hidden');
		};
		window.addEventListener('scroll', () => { if (!frame) frame = requestAnimationFrame(update); }, { passive: true, signal: controller.signal });
		header.addEventListener('focusin', show, { signal: controller.signal });
		document.addEventListener('keydown', (event) => { if (event.key === 'Tab') show(); }, { signal: controller.signal });
	};

	const initSite = (root) => {
		if (root.dataset.sxrReady === "true") return;
		root.dataset.sxrReady = "true";
		initProductTabs(root);
		initAboutHeader(root);

		const menuButton = root.querySelector(".sxr-menu-button");
		const menuIconMarkup = menuButton?.innerHTML || "";
		const closeIcon = root.querySelector(".sxr-menu-dialog .close-icon");
		const closeMenuIconMarkup = closeIcon
			? closeIcon.outerHTML
					.replace("sxr-icon--close", "sxr-icon--menu")
					.replace("close-icon", "menu-icon")
			: "";
		let activeOverlay = null;
		let returnFocus = null;
		let closeTimer = 0;

		const syncOpeners = (name, open) => {
			root.querySelectorAll(`[data-sxr-open="${name}"]`).forEach((opener) => {
				opener.setAttribute("aria-expanded", String(open));
				if (name === "menu" && opener.classList.contains("sxr-menu-button")) {
					opener.setAttribute(
						"aria-label",
						open ? i18n.closeMenu || "Close menu" : i18n.openMenu || "Open menu",
					);
					if (menuIconMarkup && closeMenuIconMarkup) {
						opener.innerHTML = open ? closeMenuIconMarkup : menuIconMarkup;
					}
				}
			});
		};

		const finishClose = (overlay) => {
			overlay.hidden = true;
			overlay.classList.remove("is-opening", "open");
		};

		const closeOverlay = ({ restoreFocus = true, immediate = false } = {}) => {
			if (!activeOverlay) return;
			const overlay = activeOverlay;
			const name = overlay.dataset.sxrOverlay;
			activeOverlay = null;
			window.clearTimeout(closeTimer);
			overlay.classList.remove("is-open", "open");
			overlay.setAttribute("aria-hidden", "true");
			syncOpeners(name, false);
			setBackgroundInert(root, false);
			unlockPage();

			if (immediate || reducedMotion.matches) finishClose(overlay);
			else closeTimer = window.setTimeout(() => finishClose(overlay), 520);

			if (restoreFocus && returnFocus instanceof HTMLElement && returnFocus.isConnected) {
				window.requestAnimationFrame(() => returnFocus.focus());
			}
		};

		const openOverlay = (name, opener) => {
			const overlay = root.querySelector(`[data-sxr-overlay="${name}"]`);
			if (!overlay) return false;
			if (activeOverlay === overlay) return true;
			const nestedReturnFocus =
				activeOverlay && opener instanceof HTMLElement && activeOverlay.contains(opener)
					? returnFocus
					: null;
			if (activeOverlay) closeOverlay({ restoreFocus: false, immediate: true });

			window.clearTimeout(closeTimer);
			returnFocus =
				nestedReturnFocus ||
				(opener instanceof HTMLElement ? opener : document.activeElement);
			activeOverlay = overlay;
			overlay.hidden = false;
			overlay.setAttribute("aria-hidden", "false");
			overlay.classList.add("is-opening");
			syncOpeners(name, true);
			lockPage();
			setBackgroundInert(root, true);

			window.requestAnimationFrame(() => {
				if (activeOverlay !== overlay) return;
				overlay.classList.add("is-open");
				if (overlay.classList.contains("utility-menu")) overlay.classList.add("open");
				overlay.classList.remove("is-opening");
				const dialog = overlay.querySelector("[role='dialog']");
				const focusable = dialog ? visibleFocusable(dialog) : [];
				(focusable[0] || dialog)?.focus();
			});
			return true;
		};

		root.addEventListener("click", (event) => {
			const opener = event.target.closest("[data-sxr-open]");
			if (opener && root.contains(opener)) {
				const name = opener.dataset.sxrOpen;
				if (root.querySelector(`[data-sxr-overlay="${name}"]`)) {
					event.preventDefault();
					openOverlay(name, opener);
					return;
				}
			}

			const closer = event.target.closest("[data-sxr-close]");
			if (closer && activeOverlay?.contains(closer)) {
				event.preventDefault();
				closeOverlay();
			}
		});

		root.addEventListener("keydown", (event) => {
			if (!activeOverlay) return;
			if (event.key === "Escape") {
				event.preventDefault();
				closeOverlay();
				return;
			}
			if (event.key !== "Tab") return;

			const dialog = activeOverlay.querySelector("[role='dialog']");
			if (!dialog) return;
			const focusable = visibleFocusable(dialog);
			if (!focusable.length) {
				event.preventDefault();
				dialog.focus();
				return;
			}

			const first = focusable[0];
			const last = focusable[focusable.length - 1];
			if (event.shiftKey && document.activeElement === first) {
				event.preventDefault();
				last.focus();
			} else if (!event.shiftKey && document.activeElement === last) {
				event.preventDefault();
				first.focus();
			}
		});

	};

	const slugify = (value) =>
		String(value)
			.toLowerCase()
			.normalize("NFD")
			.replace(/[\u0300-\u036f]/g, "")
			.replace(/[^a-z0-9]+/g, "-")
			.replace(/^-|-$/g, "")
			.slice(0, 64);

	const initInteraction = (interaction) => {
		if (interaction.dataset.sxrReady === "true") return;

		const tablist = interaction.querySelector("[role='tablist']");
		const tabs = Array.from(interaction.querySelectorAll("[data-sxr-interaction-tab]"));
		const panels = Array.from(interaction.querySelectorAll("[data-sxr-interaction-panel]"));
		const nodes = Array.from(interaction.querySelectorAll("[data-sxr-interaction-node]"));
		if (!tablist || !tabs.length || !panels.length) return;

		const panelForTab = (tab) => {
			const panelId = tab.getAttribute("aria-controls");
			return panelId ? panels.find((panel) => panel.id === panelId) || null : null;
		};
		const validTabs = tabs.filter(panelForTab);
		if (!validTabs.length) return;

		interaction.dataset.sxrReady = "true";
		const hoverQuery = window.matchMedia("(hover: hover) and (pointer: fine)");

		const syncMotionPreference = () => {
			interaction.classList.toggle("is-reduced-motion", reducedMotion.matches);
		};
		syncMotionPreference();
		reducedMotion.addEventListener?.("change", syncMotionPreference);

		const focusTab = (tab) => {
			if (!reducedMotion.matches) {
				tab.focus();
				return;
			}

			tab.focus({ preventScroll: true });
			const tablistBounds = tablist.getBoundingClientRect();
			const tabBounds = tab.getBoundingClientRect();
			if (tabBounds.left < tablistBounds.left || tabBounds.right > tablistBounds.right) {
				tablist.scrollLeft +=
					tabBounds.left < tablistBounds.left
						? tabBounds.left - tablistBounds.left
						: tabBounds.right - tablistBounds.right;
			}
			if (tabBounds.top < tablistBounds.top || tabBounds.bottom > tablistBounds.bottom) {
				tablist.scrollTop +=
					tabBounds.top < tablistBounds.top
						? tabBounds.top - tablistBounds.top
						: tabBounds.bottom - tablistBounds.bottom;
			}
		};

		const activate = (tab, { focus = false } = {}) => {
			const activeIndex = validTabs.indexOf(tab);
			if (activeIndex < 0) return;
			const activePanel = panelForTab(tab);

			tabs.forEach((candidate) => {
				const active = candidate === tab;
				candidate.setAttribute("aria-selected", String(active));
				candidate.setAttribute("tabindex", active ? "0" : "-1");
				candidate.classList.toggle("is-active", active);
			});

			panels.forEach((panel) => {
				const active = panel === activePanel;
				panel.hidden = !active;
				panel.setAttribute("aria-hidden", String(!active));
				panel.setAttribute("tabindex", active ? "0" : "-1");
				panel.classList.toggle("is-active", active);
			});

			nodes.forEach((node, index) => {
				node.classList.toggle("is-active", index === activeIndex);
			});

			interaction.style.setProperty("--sxr-active-index", String(activeIndex));
			interaction.dataset.sxrActiveIndex = String(activeIndex);
			if (focus) focusTab(tab);
		};

		validTabs.forEach((tab, index) => {
			tab.addEventListener("click", () => activate(tab, { focus: true }));
			tab.addEventListener("focus", () => activate(tab));
			tab.addEventListener("pointerenter", () => {
				if (hoverQuery.matches) activate(tab);
			});
			tab.addEventListener("keydown", (event) => {
				const orientation = tablist.getAttribute("aria-orientation") || "horizontal";
				const previousKey = "vertical" === orientation ? "ArrowUp" : "ArrowLeft";
				const nextKey = "vertical" === orientation ? "ArrowDown" : "ArrowRight";
				let nextIndex = index;

				if (event.key === previousKey) {
					nextIndex = (index - 1 + validTabs.length) % validTabs.length;
				} else if (event.key === nextKey) {
					nextIndex = (index + 1) % validTabs.length;
				} else if (event.key === "Home") {
					nextIndex = 0;
				} else if (event.key === "End") {
					nextIndex = validTabs.length - 1;
				} else {
					return;
				}

				event.preventDefault();
				activate(validTabs[nextIndex], { focus: true });
			});
		});

		const initialTab =
			validTabs.find((tab) => "true" === tab.getAttribute("aria-selected")) || validTabs[0];
		activate(initialTab);
	};

	const initSectionNav = (nav) => {
		if (nav.dataset.sxrReady === "true") return;
		nav.dataset.sxrReady = "true";
		const scope = nav.closest(".sxr-content-layout, .sxr-site, .sxr-components") || document;
		const source = scope.querySelector("[data-sxr-index-source]");
		const list = nav.querySelector("ol");
		if (!source || !list) return;

		const headings = Array.from(source.querySelectorAll("h2[data-sxr-index], h3[data-sxr-index]")).filter(
			(heading) => !heading.closest("[hidden], form, .screen-reader-text"),
		).slice(0, 10);
		if (headings.length < 2) return;

		const links = [];
		headings.forEach((heading, index) => {
			let id = heading.id || `sxr-${slugify(heading.textContent) || "section"}-${index + 1}`;
			let suffix = 2;
			while (document.getElementById(id) && document.getElementById(id) !== heading) {
				id = `${id}-${suffix}`;
				suffix += 1;
			}
			heading.id = id;
			heading.style.scrollMarginTop = "7rem";

			const item = document.createElement("li");
			const link = document.createElement("a");
			link.href = `#${id}`;
			link.dataset.index = String(index + 1).padStart(2, "0");
			link.textContent = heading.textContent.trim();
			item.append(link);
			list.append(item);
			links.push({ heading, link });
		});
		nav.hidden = false;

		if (!("IntersectionObserver" in window)) return;
		const observer = new IntersectionObserver(
			(entries) => {
				const visible = entries
					.filter((entry) => entry.isIntersecting)
					.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
				if (!visible.length) return;
				links.forEach(({ heading, link }) => {
					if (heading === visible[0].target) link.setAttribute("aria-current", "true");
					else link.removeAttribute("aria-current");
				});
			},
			{ rootMargin: "-22% 0px -62%", threshold: [0, 1] },
		);
		links.forEach(({ heading }) => observer.observe(heading));
	};

	const initReveals = (scope) => {
		const elements = Array.from(scope.querySelectorAll(".sxr-reveal:not([data-sxr-reveal-ready])"));
		if (!elements.length) return;
		elements.forEach((element) => {
			element.dataset.sxrRevealReady = "true";
		});
		if (reducedMotion.matches || !("IntersectionObserver" in window)) {
			elements.forEach((element) => element.classList.add("is-visible"));
			return;
		}

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (!entry.isIntersecting) return;
					entry.target.classList.add("is-visible");
					observer.unobserve(entry.target);
				});
			},
			{ threshold: 0.12, rootMargin: "0px 0px -8%" },
		);
		elements.forEach((element) => observer.observe(element));
	};

	const initStats = (panel) => {
		if (panel.dataset.sxrReady === "true") return;
		panel.dataset.sxrReady = "true";
		const counters = Array.from(panel.querySelectorAll("[data-sxr-count]"));
		if (!counters.length) return;
		let played = false;
		let frame = 0;

		const write = (counter, value) => {
			const padding = Number(counter.dataset.sxrCountPad || 0);
			counter.textContent = String(Math.round(value)).padStart(padding, "0");
		};
		const finish = () => counters.forEach((counter) => write(counter, Number(counter.dataset.sxrCount || 0)));
		const play = () => {
			if (played) return;
			played = true;
			if (reducedMotion.matches) {
				finish();
				return;
			}
			counters.forEach((counter) => write(counter, 0));
			const start = performance.now();
			const tick = (now) => {
				let complete = true;
				counters.forEach((counter, index) => {
					const elapsed = now - start - index * 90;
					const progress = Math.min(1, Math.max(0, elapsed / 1200));
					const eased = 1 - Math.pow(1 - progress, 3);
					write(counter, Number(counter.dataset.sxrCount || 0) * eased);
					if (progress < 1) complete = false;
				});
				if (complete) finish();
				else frame = window.requestAnimationFrame(tick);
			};
			frame = window.requestAnimationFrame(tick);
		};

		if (!("IntersectionObserver" in window)) {
			play();
			return;
		}
		const observer = new IntersectionObserver(
			(entries) => {
				if (!entries.some((entry) => entry.isIntersecting)) return;
				observer.disconnect();
				play();
			},
			{ threshold: 0.28, rootMargin: "0px 0px -12%" },
		);
		observer.observe(panel);
		panel.addEventListener("sxr:destroy", () => {
			observer.disconnect();
			if (frame) window.cancelAnimationFrame(frame);
		}, { once: true });
	};

	const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));

	const scrollProgressFor = (section) => {
		const bounds = section.getBoundingClientRect();
		const start = window.scrollY + bounds.top;
		const range = Math.max(1, section.offsetHeight - window.innerHeight);
		return clamp((window.scrollY - start) / range);
	};

	/**
	 * One absolute-scroll engine drives the bespoke compositions. Because state
	 * comes directly from position, upward scrolling always reverses the scene.
	 */
	const initScrollSequence = (sequence) => {
		if (sequence.dataset.sxrSequenceReady === "true") return;
		sequence.dataset.sxrSequenceReady = "true";

		const items = Array.from(sequence.querySelectorAll("[data-sxr-sequence-item]"));
		const markers = Array.from(sequence.querySelectorAll("[data-sxr-sequence-marker]"));
		const paths = Array.from(sequence.querySelectorAll("[data-sxr-sequence-path]"));
		const status = sequence.querySelector("[data-sxr-sequence-status]");
		if (!items.length) return;

		const desktop = window.matchMedia("(min-width: 981px) and (min-height: 780px)");
		let activeIndex = -1;
		let frame = 0;
		let enhanced = false;

		const describe = (item, index) => {
			const heading = item.querySelector("h2, h3, strong");
			return heading?.textContent?.trim() || `Item ${index + 1}`;
		};

		const activate = (index, announce = false) => {
			const nextIndex = clamp(index, 0, items.length - 1);
			if (nextIndex === activeIndex) return;
			activeIndex = nextIndex;

			items.forEach((item, itemIndex) => {
				item.classList.toggle("is-active", itemIndex === activeIndex);
				if (enhanced) {
					const hidden = itemIndex !== activeIndex;
					item.setAttribute("aria-hidden", String(hidden));
					item.toggleAttribute("inert", hidden);
				} else {
					item.removeAttribute("aria-hidden");
					item.removeAttribute("inert");
				}
			});
			markers.forEach((marker, markerIndex) => {
				marker.classList.toggle("is-active", markerIndex === activeIndex);
			});
			paths.forEach((path, pathIndex) => {
				path.classList.toggle("is-active", pathIndex === activeIndex);
			});
			sequence.dataset.sxrSequenceIndex = String(activeIndex);
			if (announce && status) status.textContent = describe(items[activeIndex], activeIndex);
		};

		const update = () => {
			frame = 0;
			if (!enhanced) return;
			const progress = scrollProgressFor(sequence);
			const rawIndex = Math.min(items.length - 1, Math.floor(progress * items.length));
			const localProgress = clamp(progress * items.length - rawIndex);
			sequence.style.setProperty("--sxr-sequence-progress", progress.toFixed(4));
			sequence.style.setProperty("--sxr-sequence-local-progress", localProgress.toFixed(4));
			activate(rawIndex, true);
		};

		const schedule = () => {
			if (!frame) frame = window.requestAnimationFrame(update);
		};

		const syncMode = () => {
			enhanced = desktop.matches && !reducedMotion.matches;
			sequence.classList.toggle("is-sequence-ready", enhanced);
			if (enhanced) {
				activeIndex = -1;
				schedule();
				return;
			}

			sequence.style.removeProperty("--sxr-sequence-progress");
			sequence.style.removeProperty("--sxr-sequence-local-progress");
			items.forEach((item) => item.removeAttribute("aria-hidden"));
			activeIndex = -1;
			activate(0);
		};

		syncMode();
		window.addEventListener("scroll", schedule, { passive: true });
		window.addEventListener("resize", schedule, { passive: true });
		window.visualViewport?.addEventListener("resize", schedule, { passive: true });
		desktop.addEventListener?.("change", syncMode);
		reducedMotion.addEventListener?.("change", syncMode);
	};

	const initProductReel = (reel) => {
		if (reel.dataset.sxrReady === "true") return;
		reel.dataset.sxrReady = "true";

		const viewport = reel.querySelector("[data-sxr-reel-viewport]");
		const cards = Array.from(reel.querySelectorAll("[data-sxr-reel-card]"));
		const previous = reel.querySelector("[data-sxr-reel-prev]");
		const next = reel.querySelector("[data-sxr-reel-next]");
		if (!(viewport instanceof HTMLElement) || cards.length < 2) return;

		let timer = 0;
		let resumeTimer = 0;
		let paused = false;
		let dragPointer = null;
		let dragStartX = 0;
		let dragStartScroll = 0;
		let dragDistance = 0;

		const cardStep = () => {
			const first = cards[0];
			const second = cards[1];
			return Math.max(1, second.offsetLeft - first.offsetLeft);
		};

		const move = (direction) => {
			const step = cardStep();
			const current = Math.round(viewport.scrollLeft / step);
			let target = current + direction;
			if (target >= cards.length) target = 0;
			if (target < 0) target = cards.length - 1;
			viewport.scrollTo({
				left: cards[target].offsetLeft,
				behavior: reducedMotion.matches ? "auto" : "smooth",
			});
		};

		const stop = () => {
			if (timer) window.clearInterval(timer);
			timer = 0;
		};

		const start = () => {
			stop();
			if (paused || reducedMotion.matches || document.hidden) return;
			timer = window.setInterval(() => move(1), 4800);
		};

		const pauseTemporarily = () => {
			paused = true;
			stop();
			if (resumeTimer) window.clearTimeout(resumeTimer);
			resumeTimer = window.setTimeout(() => {
				paused = false;
				start();
			}, 8000);
		};

		previous?.addEventListener("click", () => {
			move(-1);
			pauseTemporarily();
		});
		next?.addEventListener("click", () => {
			move(1);
			pauseTemporarily();
		});
		viewport.addEventListener("pointerdown", (event) => {
			if (event.button !== 0) return;
			dragPointer = event.pointerId;
			dragStartX = event.clientX;
			dragStartScroll = viewport.scrollLeft;
			dragDistance = 0;
			viewport.classList.add("is-dragging");
			viewport.setPointerCapture?.(event.pointerId);
			pauseTemporarily();
		});
		viewport.addEventListener("pointermove", (event) => {
			if (event.pointerId !== dragPointer) return;
			dragDistance = event.clientX - dragStartX;
			if (Math.abs(dragDistance) > 4) event.preventDefault();
			viewport.scrollLeft = dragStartScroll - dragDistance;
		});
		const finishDrag = (event) => {
			if (event.pointerId !== dragPointer) return;
			viewport.releasePointerCapture?.(event.pointerId);
			dragPointer = null;
			viewport.classList.remove("is-dragging");
		};
		viewport.addEventListener("pointerup", finishDrag);
		viewport.addEventListener("pointercancel", finishDrag);
		viewport.addEventListener(
			"click",
			(event) => {
				if (Math.abs(dragDistance) <= 7) return;
				event.preventDefault();
				event.stopPropagation();
				dragDistance = 0;
			},
			true,
		);
		viewport.addEventListener("wheel", pauseTemporarily, { passive: true });
		reel.addEventListener("mouseenter", () => {
			paused = true;
			stop();
		});
		reel.addEventListener("mouseleave", () => {
			paused = false;
			start();
		});
		reel.addEventListener("focusin", () => {
			paused = true;
			stop();
		});
		reel.addEventListener("focusout", (event) => {
			if (event.relatedTarget instanceof Node && reel.contains(event.relatedTarget)) return;
			paused = false;
			start();
		});
		document.addEventListener("visibilitychange", start);
		reducedMotion.addEventListener?.("change", start);
		start();
	};

	const initArchive = (archive) => {
		if (archive.dataset.sxrReady === "true") return;
		archive.dataset.sxrReady = "true";
		const groups = Array.from(archive.querySelectorAll("[data-sxr-archive-year]"));
		const links = Array.from(archive.querySelectorAll("[data-sxr-archive-link]"));
		if (!groups.length || !links.length) return;

		const activate = (year) => {
			let activeLink = null;
			links.forEach((link) => {
				const active = link.dataset.sxrArchiveLink === year;
				link.classList.toggle("is-active", active);
				if (active) {
					link.setAttribute("aria-current", "location");
					activeLink = link;
				}
				else link.removeAttribute("aria-current");
			});
			const navigation = activeLink?.parentElement;
			if (navigation && navigation.scrollWidth > navigation.clientWidth) {
				activeLink.scrollIntoView({ block: "nearest", inline: "nearest", behavior: "auto" });
			}
		};

		activate(groups[0].dataset.sxrArchiveYear || "");
		if (!("IntersectionObserver" in window)) return;

		const observer = new IntersectionObserver(
			(entries) => {
				const visible = entries
					.filter((entry) => entry.isIntersecting)
					.sort((a, b) => Math.abs(a.boundingClientRect.top) - Math.abs(b.boundingClientRect.top));
				const group = visible[0]?.target;
				if (group instanceof HTMLElement) activate(group.dataset.sxrArchiveYear || "");
			},
			{ rootMargin: "-18% 0px -66%", threshold: [0, 0.15, 0.5] },
		);
		groups.forEach((group) => observer.observe(group));
	};

	const initContactLocations = (workspace) => {
		if (workspace.dataset.sxrReady === "true") return;
		workspace.dataset.sxrReady = "true";
		const tabs = Array.from(workspace.querySelectorAll("[data-sxr-location-tab]"));
		const panels = Array.from(workspace.querySelectorAll("[data-sxr-location-panel]"));
		const map = workspace.querySelector("[data-sxr-location-map]");
		if (!tabs.length || tabs.length !== panels.length) return;

		const activate = (index, focus = false) => {
			const nextIndex = Math.max(0, Math.min(tabs.length - 1, index));
			tabs.forEach((tab, tabIndex) => {
				const active = tabIndex === nextIndex;
				tab.setAttribute("aria-selected", String(active));
				tab.tabIndex = active ? 0 : -1;
			});
			panels.forEach((panel, panelIndex) => {
				const active = panelIndex === nextIndex;
				panel.classList.toggle("is-active", active);
				panel.hidden = !active;
			});
			const activeTab = tabs[nextIndex];
			if (map instanceof HTMLIFrameElement) {
				const source = activeTab.dataset.sxrLocationMapSrc || "";
				const title = activeTab.dataset.sxrLocationMapTitle || "";
				if (source && map.getAttribute("src") !== source) map.src = source;
				if (title) map.title = title;
			}
			if (focus) tabs[nextIndex].focus();
		};

		tabs.forEach((tab, index) => {
			tab.addEventListener("click", () => activate(index));
			tab.addEventListener("keydown", (event) => {
				let nextIndex = index;
				if (event.key === "ArrowRight" || event.key === "ArrowDown") nextIndex = (index + 1) % tabs.length;
				else if (event.key === "ArrowLeft" || event.key === "ArrowUp") nextIndex = (index - 1 + tabs.length) % tabs.length;
				else if (event.key === "Home") nextIndex = 0;
				else if (event.key === "End") nextIndex = tabs.length - 1;
				else return;
				event.preventDefault();
				activate(nextIndex, true);
			});
		});
		activate(Math.max(0, tabs.findIndex((tab) => tab.getAttribute("aria-selected") === "true")));
	};

	const initContactChoices = (source) => {
		if (source.dataset.sxrChoiceReady === "true") return;
		source.dataset.sxrChoiceReady = "true";
		const scope = source.closest("[data-sxr-site]") || document;
		const form = source.querySelector("#_form_2_, form");
		const contactType = source.querySelector('[name="field[5]"]');
		if (!(form instanceof HTMLElement)) return;

		if (contactType instanceof HTMLSelectElement) {
			Array.from(contactType.options)
				.filter((option) => (option.textContent || "").includes("%CONTACT_TYPE%"))
				.forEach((option) => option.remove());
			const options = Array.from(contactType.options);
			let placeholder = options.find((option) => !String(option.value || "").trim());
			if (!placeholder) {
				placeholder = document.createElement("option");
				placeholder.value = "";
				contactType.prepend(placeholder);
			}
			if (placeholder) {
				placeholder.textContent = i18n.selectContactType || "Select contact type";
				placeholder.value = "";
				placeholder.disabled = true;
			}
		}

		const normalize = (value) =>
			String(value)
				.toLowerCase()
				.normalize("NFD")
				.replace(/[\u0300-\u036f]/g, "")
				.replace(/[^a-z0-9]+/g, " ")
				.trim();

		const choices = Array.from(scope.querySelectorAll("[data-sxr-contact-choice]"));
		const syncChoiceState = () => {
			const selectedOption =
				contactType instanceof HTMLSelectElement
					? contactType.selectedOptions[0]
					: null;
			const selected = normalize(selectedOption?.textContent || contactType?.value || "");
			choices.forEach((button) => {
				const active = Boolean(selected) && normalize(button.dataset.sxrContactChoice || "") === selected;
				button.classList.toggle("is-active", active);
				button.setAttribute("aria-pressed", String(active));
			});
		};

		choices.forEach((button) => {
			button.addEventListener("click", (event) => {
				event.preventDefault();
				const choice = normalize(button.dataset.sxrContactChoice || "");
				if (contactType instanceof HTMLSelectElement) {
					const option = Array.from(contactType.options).find((candidate) =>
						normalize(candidate.textContent || candidate.value) === choice,
					);
					if (option) {
						contactType.value = option.value;
						contactType.dispatchEvent(new Event("input", { bubbles: true }));
						contactType.dispatchEvent(new Event("change", { bubbles: true }));
					}
				}

				form.scrollIntoView({ behavior: reducedMotion.matches ? "auto" : "smooth", block: "start" });
				window.setTimeout(() => {
					const target = contactType instanceof HTMLElement ? contactType : visibleFocusable(form)[0];
					target?.focus({ preventScroll: true });
				}, reducedMotion.matches ? 0 : 550);
			});
		});
		contactType?.addEventListener("change", syncChoiceState);
		syncChoiceState();
	};

	const initTerritory = (territory) => {
		if (territory.dataset.sxrReady === "true") return;
		territory.dataset.sxrReady = "true";
		const select = territory.querySelector("[data-sxr-territory-select]");
		const cards = Array.from(territory.querySelectorAll("[data-sxr-territory-card]"));
		const status = territory.querySelector("[data-sxr-territory-status]");
		const empty = territory.querySelector("[data-sxr-territory-empty]");
		const map = territory.querySelector("[data-sxr-territory-map]");
		const mapCanvas = territory.querySelector("[data-sxr-territory-map-canvas]");
		const locations = Array.from(territory.querySelectorAll("[data-sxr-territory-location]"));
		if (!(select instanceof HTMLSelectElement) || !cards.length) return;
		const optionsByMapId = new Map(
			Array.from(select.options)
				.filter((option) => option.dataset.sxrMapId)
				.map((option) => [option.dataset.sxrMapId, option]),
		);

		const activate = (code) => {
			const option = Array.from(select.options).find((candidate) => candidate.value === code);
			const selected = Boolean(option?.value);
			const region = selected ? option?.dataset.sxrRegion || "national" : "";
			const label = option?.textContent?.trim() || "";
			select.value = option ? code : "";
			cards.forEach((card) => {
				const active = selected && card.dataset.sxrTerritoryCard === region;
				card.classList.toggle("is-active", active);
				card.hidden = !active;
				card.setAttribute("aria-hidden", String(!active));
				card.toggleAttribute("inert", !active);
			});
			if (empty instanceof HTMLElement) {
				empty.hidden = selected;
				empty.setAttribute("aria-hidden", String(selected));
			}
			locations.forEach((location) => {
				location.textContent = selected ? label : "";
			});
			if (map instanceof HTMLElement) {
				map.dataset.sxrRegion = region;
				map.querySelectorAll(".sxr-territory-path-selected").forEach((path) => {
					path.classList.remove("sxr-territory-path-selected");
				});
				const mapId = option?.dataset.sxrMapId || "";
				const path = mapId ? map.querySelector(`#${CSS.escape(mapId)}`) : null;
				path?.classList.add("sxr-territory-path-selected");
			}
			if (status) {
				status.textContent = selected
					? region === "southeast"
						? `${label} is covered by ISM Southeast.`
						: `${label} is served directly by Shaxon Industries.`
					: "No location selected yet.";
			}
		};

		const mapTargetFromEvent = (event) =>
			event.target instanceof Element
				? event.target.closest('[id^="usmap_"], [id^="usvn_"]')
				: null;

		select.addEventListener("change", () => activate(select.value));
		["pointerup", "mouseup"].forEach((eventName) => {
			mapCanvas?.addEventListener(
				eventName,
				(event) => {
					if (mapTargetFromEvent(event)) event.stopPropagation();
				},
				true,
			);
		});
		mapCanvas?.addEventListener(
			"click",
			(event) => {
				const target = mapTargetFromEvent(event);
				if (!(target instanceof Element)) return;
				const mapId = target.id.replace(/^usvn_/, "usmap_");
				const option = optionsByMapId.get(mapId);
				if (!(option instanceof HTMLOptionElement)) return;
				event.preventDefault();
				event.stopPropagation();
				select.value = option.value;
				select.dispatchEvent(new Event("change", { bubbles: true }));
			},
			true,
		);
		activate(select.value);
	};

	const initWirewayStory = (story) => {
		if (story.dataset.sxrReady === "true") return;

		const steps = Array.from(story.querySelectorAll("[data-sxr-wireway-step]"));
		const previewImage = story.querySelector("[data-sxr-wireway-preview-image]");
		const previewTitle = story.querySelector("[data-sxr-wireway-preview-title]");
		const previewIndex = story.querySelector("[data-sxr-wireway-preview-index]");
		const progress = story.querySelector("[data-sxr-wireway-progress]");
		if (!steps.length) return;

		story.dataset.sxrReady = "true";
		story.style.setProperty("--sxr-wireway-count", String(steps.length));
		let activeIndex = -1;

		const activate = (index) => {
			const nextIndex = Math.max(0, Math.min(index, steps.length - 1));
			if (nextIndex === activeIndex) return;
			activeIndex = nextIndex;
			const active = steps[activeIndex];

			steps.forEach((step, stepIndex) => {
				const current = stepIndex === activeIndex;
				step.classList.toggle("is-active", current);
				if (current) step.setAttribute("aria-current", "step");
				else step.removeAttribute("aria-current");
			});

			if (previewImage instanceof HTMLImageElement) {
				const source = active.dataset.sxrWirewayImage || "";
				if (source && previewImage.src !== source) previewImage.src = source;
				previewImage.alt = active.dataset.sxrWirewayAlt || "";
			}
			if (previewTitle) previewTitle.textContent = active.dataset.sxrWirewayTitle || "";
			if (previewIndex) {
				previewIndex.textContent = `${String(activeIndex + 1).padStart(2, "0")} / ${String(steps.length).padStart(2, "0")}`;
			}
			if (progress instanceof HTMLElement) {
				progress.style.transform = `scaleX(${(activeIndex + 1) / steps.length})`;
			}
		};

		steps.forEach((step, index) => {
			step.addEventListener("focusin", () => activate(index));
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
				const index = steps.indexOf(visible[0].target);
				if (index >= 0) activate(index);
			},
			{ rootMargin: "-28% 0px -42%", threshold: [0.05, 0.25, 0.55] },
		);
		steps.forEach((step) => observer.observe(step));
	};

	const initProductStory = (story) => {
		if (story.dataset.sxrReady === "true") return;

		const steps = Array.from(story.querySelectorAll("[data-sxr-product-story-step]"));
		const previewImage = story.querySelector("[data-sxr-product-story-image]");
		const previewTitle = story.querySelector("[data-sxr-product-story-title]");
		const previewIndex = story.querySelector("[data-sxr-product-story-index]");
		const progress = story.querySelector("[data-sxr-product-story-progress]");
		if (!steps.length) return;

		story.dataset.sxrReady = "true";
		let activeIndex = -1;

		const activate = (index) => {
			const nextIndex = Math.max(0, Math.min(index, steps.length - 1));
			if (nextIndex === activeIndex) return;
			activeIndex = nextIndex;
			const active = steps[activeIndex];

			steps.forEach((step, stepIndex) => {
				const current = stepIndex === activeIndex;
				step.classList.toggle("is-active", current);
				if (current) step.setAttribute("aria-current", "step");
				else step.removeAttribute("aria-current");
			});

			if (previewImage instanceof HTMLImageElement) {
				const source = active.dataset.sxrStoryImage || "";
				if (source && previewImage.src !== source) {
					previewImage.style.opacity = "0";
					window.setTimeout(() => {
						previewImage.src = source;
						previewImage.style.opacity = "";
					}, reducedMotion.matches ? 0 : 160);
				}
			}
			if (previewTitle) previewTitle.textContent = active.dataset.sxrStoryTitle || "";
			if (previewIndex) {
				previewIndex.textContent = `${String(activeIndex + 1).padStart(2, "0")} / ${String(steps.length).padStart(2, "0")}`;
			}
			if (progress instanceof HTMLElement) {
				progress.style.width = `${((activeIndex + 1) / steps.length) * 100}%`;
			}
		};

		steps.forEach((step, index) => {
			step.addEventListener("focusin", () => activate(index));
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
				const index = steps.indexOf(visible[0].target);
				if (index >= 0) activate(index);
			},
			{ rootMargin: "-28% 0px -42%", threshold: [0.05, 0.25, 0.55] },
		);
		steps.forEach((step) => observer.observe(step));
	};

	const initAuthoredWirewaysCards = (root) => {
		if (root.dataset.sxrCardsReady === "true") return;

		const grid = root.querySelector("#shx-ww-grid, .shx-ww-grid");
		const template = root.querySelector("template[data-sxr-wireways-missing-card]");
		if (!(grid instanceof HTMLElement) || !(template instanceof HTMLTemplateElement)) return;

		const renumberCards = () => {
			grid.querySelectorAll(".shx-ww-card").forEach((card, index) => {
				const number = card.querySelector(".shx-ww-card-num");
				if (number) number.textContent = String(index + 1).padStart(2, "0");
			});
		};

		const productId = template.dataset.sxrProductId || "";
		let card = productId
			? grid.querySelector(`[data-sxr-product-id="${productId}"]`)
			: null;
		if (!card) {
			card = grid.querySelector('a[href*="/wireway-45-degree-elbow-type-d-galvanized-steel/"]');
		}

		if (!card) {
			const candidate = template.content.firstElementChild?.cloneNode(true);
			if (!(candidate instanceof HTMLElement)) return;

			const typeC = grid.querySelector('a[href*="/wireway-45-degree-elbow-type-c-galvanized-steel/"]');
			const currentCards = Array.from(grid.querySelectorAll(":scope > .shx-ww-card"));
			if (typeC instanceof HTMLElement) typeC.insertAdjacentElement("afterend", candidate);
			else grid.insertBefore(candidate, currentCards[3] || null);
			card = candidate;

			const image = card.querySelector(".shx-ww-card-img img");
			if (image instanceof HTMLImageElement) {
				image.addEventListener(
					"error",
					() => {
						card?.remove();
						renumberCards();
					},
					{ once: true },
				);
			}
		}

		card.classList.add("is-visible");
		renumberCards();

		const productionCardImage = root.dataset.sxrWirewaysCardImage || "";
		const openTrough = grid.querySelector('a[href*="/galvanized-steel-wireway-trough-without-cover/"]');
		const openTroughImage = openTrough?.querySelector(".shx-ww-card-img img");
		if (productionCardImage && openTroughImage instanceof HTMLImageElement) {
			openTroughImage.src = productionCardImage;
			openTroughImage.removeAttribute("srcset");
			openTroughImage.removeAttribute("sizes");
			openTroughImage.classList.add("shx-ww-card-img--cad-export");
		}

		[
			'/wireway-cover-galvanized-steel-60-inches/',
			'/wireway-end-plate-galvanized-steel/',
		].forEach((path) => {
			const image = grid.querySelector(`a[href*="${path}"] .shx-ww-card-img img`);
			if (image instanceof HTMLImageElement) image.classList.add("shx-ww-card-img--flip-x");
		});

		root.dataset.sxrCardsReady = "true";
	};

	const initAuthoredWirewaysViewer = (root) => {
		if (root.dataset.sxrViewerReady === "true") return;

		const configNode = root.querySelector("[data-sxr-wireways-model-config]");
		const heroTemplate = root.querySelector("template[data-sxr-wireways-hero-viewer]");
		const grid = root.querySelector("#shx-ww-grid, .shx-ww-grid");
		const modal = root.querySelector("#shx-ww-3d-modal");
		if (!(configNode instanceof HTMLScriptElement) || !(grid instanceof HTMLElement) || !(modal instanceof HTMLElement)) return;

		let config;
		try {
			config = JSON.parse(configNode.textContent || "{}");
		} catch (error) {
			return;
		}

		const modelBase = typeof config.modelBase === "string" ? config.modelBase : "";
		const products = config.products && typeof config.products === "object" ? config.products : {};
		const modelUrl = (file) => {
			try {
				return new URL(String(file || ""), modelBase).href;
			} catch (error) {
				return `${modelBase}${String(file || "")}`;
			}
		};

		const heroTarget = root.querySelector("#shx-panel-right");
		const heroCopy = root.querySelector("#shx-panel-left .shx-cta-text");
		if (heroCopy instanceof HTMLElement) {
			heroCopy.textContent = "Explore our full range of certified wire management solutions — or interact with a product-accurate 3D preview based directly on the supplied CAD model.";
		}
		if (heroTarget instanceof HTMLElement && heroTemplate instanceof HTMLTemplateElement) {
			const hero = heroTemplate.content.firstElementChild?.cloneNode(true);
			if (hero instanceof HTMLElement) {
				heroTarget.replaceChildren(hero);
				const heroViewer = hero.querySelector("#shx-hero-viewer");
				const heroReset = hero.querySelector("[data-sxr-wireways-hero-reset]");
				if (heroViewer instanceof HTMLElement) {
					heroViewer.setAttribute("src", modelUrl(config.heroModel));
					if (reducedMotion.matches) heroViewer.removeAttribute("auto-rotate");
					heroViewer.addEventListener("load", () => {
						heroViewer.dataset.loaded = "true";
					});
				}
				if (heroReset instanceof HTMLButtonElement && heroViewer instanceof HTMLElement) {
					heroReset.addEventListener("click", () => {
						heroViewer.setAttribute("camera-orbit", "35deg 72deg 108%");
						heroViewer.setAttribute("field-of-view", "24deg");
						heroViewer.jumpCameraToGoal?.();
					});
				}
			}
		}

		const modalViewer = modal.querySelector("#shx-ww-model-viewer");
		const title = modal.querySelector("#shx-ww-3d-title");
		const description = modal.querySelector("#shx-ww-3d-description");
		const variants = modal.querySelector("#shx-ww-3d-variants");
		const variantList = modal.querySelector("#shx-ww-3d-variant-list");
		const sku = modal.querySelector("#shx-ww-3d-sku");
		const size = modal.querySelector("#shx-ww-3d-size");
		const productLink = modal.querySelector("#shx-ww-3d-product-link");
		const resetButton = modal.querySelector("#shx-ww-3d-reset");
		const closeButton = modal.querySelector(".shx-ww-3d-close");
		const loader = modal.querySelector("#shx-ww-3d-loader");
		const loaderLabel = modal.querySelector("#shx-ww-3d-loader-label");
		const progressBar = modal.querySelector("#shx-ww-3d-progress");
		const errorPanel = modal.querySelector("#shx-ww-3d-error");

		if (
			!(modalViewer instanceof HTMLElement)
			|| !(title instanceof HTMLElement)
			|| !(description instanceof HTMLElement)
			|| !(variants instanceof HTMLElement)
			|| !(variantList instanceof HTMLElement)
			|| !(sku instanceof HTMLElement)
			|| !(size instanceof HTMLElement)
			|| !(productLink instanceof HTMLAnchorElement)
			|| !(resetButton instanceof HTMLButtonElement)
			|| !(closeButton instanceof HTMLButtonElement)
			|| !(loader instanceof HTMLElement)
			|| !(loaderLabel instanceof HTMLElement)
			|| !(progressBar instanceof HTMLElement)
			|| !(errorPanel instanceof HTMLElement)
		) return;

		let activeProduct = null;
		let activeModelIndex = 0;
		let activeRequestId = 0;
		let lastFocusedElement = null;
		let loadTimeout = 0;
		let loaderHideTimeout = 0;
		let focusTimeout = 0;
		let activeModelSrc = "";
		const preparingLabel = loaderLabel.textContent || "Preparing 3D model";
		const siteRoot = root.closest("[data-sxr-site]");

		if (reducedMotion.matches) modalViewer.removeAttribute("auto-rotate");

		const resetView = () => {
			modalViewer.setAttribute("camera-target", "auto auto auto");
			modalViewer.setAttribute("camera-orbit", "35deg 70deg 105%");
			modalViewer.setAttribute("field-of-view", "auto");
			modalViewer.resetTurntableRotation?.(0);
			modalViewer.jumpCameraToGoal?.();
		};

		const showLoadError = () => {
			if (loadTimeout) window.clearTimeout(loadTimeout);
			if (loaderHideTimeout) window.clearTimeout(loaderHideTimeout);
			loader.classList.add("is-hidden");
			errorPanel.hidden = false;
		};

		const setLoadingState = (model) => {
			if (loadTimeout) window.clearTimeout(loadTimeout);
			if (loaderHideTimeout) window.clearTimeout(loaderHideTimeout);
			loader.classList.remove("is-hidden");
			loaderLabel.textContent = `Loading ${model.sku}`;
			progressBar.style.width = "4%";
			errorPanel.hidden = true;
			const requestId = activeRequestId;
			loadTimeout = window.setTimeout(() => {
				if (requestId === activeRequestId && modal.classList.contains("is-open")) showLoadError();
			}, 22000);
		};

		const updateVariantButtons = () => {
			variantList.querySelectorAll(".shx-ww-3d-variant").forEach((button, index) => {
				const current = index === activeModelIndex;
				button.classList.toggle("is-active", current);
				button.setAttribute("aria-pressed", current ? "true" : "false");
			});
		};

		const selectModel = (index) => {
			const models = Array.isArray(activeProduct?.models) ? activeProduct.models : [];
			const model = models[index];
			if (!model) return;

			activeModelIndex = index;
			const requestId = ++activeRequestId;
			sku.textContent = String(model.sku || "—");
			size.textContent = String(model.size || "—");
			modalViewer.setAttribute("alt", `${activeProduct.title}, ${model.size}, interactive 3D model`);
			modalViewer.removeAttribute("src");
			activeModelSrc = modelUrl(model.file);
			setLoadingState(model);
			updateVariantButtons();
			window.requestAnimationFrame(() => {
				if (requestId !== activeRequestId || !modal.classList.contains("is-open")) return;
				modalViewer.setAttribute("src", activeModelSrc);
				resetView();
			});
		};

		const buildVariants = (product) => {
			variantList.replaceChildren();
			const models = Array.isArray(product.models) ? product.models : [];
			variants.hidden = models.length <= 1;
			models.forEach((model, index) => {
				const button = document.createElement("button");
				button.type = "button";
				button.className = "shx-ww-3d-variant";
				button.textContent = String(model.size || "");
				button.setAttribute("aria-label", `View ${model.sku}, ${model.size}`);
				button.setAttribute("aria-pressed", "false");
				button.addEventListener("click", () => selectModel(index));
				variantList.appendChild(button);
			});
		};

		const openViewer = (productKey, trigger) => {
			const product = products[productKey];
			if (!product || !Array.isArray(product.models) || !product.models.length) return;
			activeProduct = product;
			activeModelIndex = 0;
			lastFocusedElement = trigger || document.activeElement;
			title.textContent = String(product.title || "Wireway product");
			description.textContent = String(product.description || "");
			productLink.href = String(product.productUrl || "#");
			buildVariants(product);
			modal.hidden = false;
			modal.classList.add("is-open");
			modal.setAttribute("aria-hidden", "false");
			lockPage();
			if (siteRoot instanceof HTMLElement) setBackgroundInert(siteRoot, true);
			document.documentElement.classList.add("shx-ww-3d-lock");
			selectModel(0);
			if (focusTimeout) window.clearTimeout(focusTimeout);
			focusTimeout = window.setTimeout(() => {
				if (modal.classList.contains("is-open")) closeButton.focus({ preventScroll: true });
			}, 30);
		};

		const closeViewer = () => {
			if (!modal.classList.contains("is-open")) return;
			activeRequestId += 1;
			activeModelSrc = "";
			modal.classList.remove("is-open");
			modal.setAttribute("aria-hidden", "true");
			modal.hidden = true;
			if (siteRoot instanceof HTMLElement) setBackgroundInert(siteRoot, false);
			unlockPage();
			document.documentElement.classList.remove("shx-ww-3d-lock");
			if (loadTimeout) window.clearTimeout(loadTimeout);
			if (loaderHideTimeout) window.clearTimeout(loaderHideTimeout);
			if (focusTimeout) window.clearTimeout(focusTimeout);
			modalViewer.removeAttribute("src");
			loader.classList.remove("is-hidden");
			loaderLabel.textContent = preparingLabel;
			errorPanel.hidden = true;
			progressBar.style.width = "0%";
			if (lastFocusedElement instanceof HTMLElement && lastFocusedElement.isConnected) {
				lastFocusedElement.focus({ preventScroll: true });
			}
			lastFocusedElement = null;
		};

		Object.entries(products).forEach(([productKey, product]) => {
			const productPath = String(product.productPath || "");
			const card = Array.from(grid.querySelectorAll("a.shx-ww-card, .shx-ww-card > a.shx-ww-card-main")).find(
				(link) => link instanceof HTMLAnchorElement && productPath && link.href.includes(productPath),
			);
			if (!(card instanceof HTMLAnchorElement)) return;
			let shell = card.parentElement;
			if (
				!(shell instanceof HTMLElement)
				|| !shell.classList.contains("shx-ww-card")
				|| !card.classList.contains("shx-ww-card-main")
			) {
				shell = document.createElement("article");
				shell.className = card.className;
				shell.classList.add("shx-ww-card", "sxr-wireways-model-card", "is-visible");
				shell.style.cssText = card.style.cssText;
				card.removeAttribute("style");
				card.classList.remove("shx-ww-card", "is-visible");
				card.classList.add("shx-ww-card-main");
				card.replaceWith(shell);
				shell.appendChild(card);
			}
			const image = card.querySelector(".shx-ww-card-img img");
			if (image instanceof HTMLImageElement) {
				image.addEventListener("error", () => shell.remove(), { once: true });
			}
			if (shell.querySelector(".shx-ww-3d-trigger")) return;
			const trigger = document.createElement("button");
			trigger.type = "button";
			trigger.className = "shx-ww-3d-trigger";
			trigger.setAttribute("data-shx-3d", productKey);
			trigger.setAttribute("data-sxr-wireways-3d-trigger", "");
			trigger.setAttribute("aria-haspopup", "dialog");
			trigger.setAttribute("aria-controls", "shx-ww-3d-modal");
			trigger.setAttribute("aria-label", `Open ${product.title} in an interactive 3D viewer`);
			trigger.innerHTML = `
				<span class="shx-ww-3d-trigger__badge">
					<svg viewBox="0 0 24 24" aria-hidden="true">
						<path d="M12 3.2 19 7v8l-7 3.8L5 15V7l7-3.8Z"></path>
						<path d="m5.4 7.2 6.6 3.6 6.6-3.6M12 10.8v7.6"></path>
						<path class="shx-ww-3d-trigger__orbit" d="M3.3 13.1c.5 4 4.2 7.1 8.7 7.1 4.2 0 7.7-2.6 8.6-6.2"></path>
						<path class="shx-ww-3d-trigger__orbit" d="m18.4 14.3 2.4-.6.5 2.4"></path>
					</svg>
					<span>Open to see it in 3D</span>
				</span>
			`;
			trigger.addEventListener("click", () => openViewer(productKey, trigger));
			shell.appendChild(trigger);
		});

		modal.addEventListener("click", (event) => {
			if (event.target.closest?.("[data-shx-3d-close]")) closeViewer();
		});
		document.addEventListener("keydown", (event) => {
			if (!modal.classList.contains("is-open")) return;
			if (event.key === "Escape") {
				event.preventDefault();
				closeViewer();
				return;
			}
			if (event.key !== "Tab") return;
			const focusable = visibleFocusable(modal);
			if (!focusable.length) return;
			const first = focusable[0];
			const last = focusable[focusable.length - 1];
			if (!modal.contains(document.activeElement)) {
				event.preventDefault();
				first.focus();
			} else if (event.shiftKey && document.activeElement === first) {
				event.preventDefault();
				last.focus();
			} else if (!event.shiftKey && document.activeElement === last) {
				event.preventDefault();
				first.focus();
			}
		});
		resetButton.addEventListener("click", resetView);
		modalViewer.addEventListener("progress", (event) => {
			if (!modal.classList.contains("is-open") || modalViewer.getAttribute("src") !== activeModelSrc) return;
			const rawValue = typeof event.detail?.totalProgress === "number" ? event.detail.totalProgress : 0;
			const value = Number.isFinite(rawValue) ? Math.min(1, Math.max(0, rawValue)) : 0;
			progressBar.style.width = `${Math.round(4 + value * 96)}%`;
		});
		modalViewer.addEventListener("load", () => {
			if (!modal.classList.contains("is-open") || modalViewer.getAttribute("src") !== activeModelSrc) return;
			if (loadTimeout) window.clearTimeout(loadTimeout);
			if (loaderHideTimeout) window.clearTimeout(loaderHideTimeout);
			progressBar.style.width = "100%";
			errorPanel.hidden = true;
			const requestId = activeRequestId;
			loaderHideTimeout = window.setTimeout(() => {
				if (requestId === activeRequestId && modal.classList.contains("is-open")) loader.classList.add("is-hidden");
			}, 180);
		});
		modalViewer.addEventListener("error", () => {
			if (modal.classList.contains("is-open") && modalViewer.getAttribute("src") === activeModelSrc) showLoadError();
		});

		if (modal.parentNode !== document.body) document.body.appendChild(modal);
		root.dataset.sxrViewerReady = "true";
	};

	const initEnhancements = (scope = document) => {
		if (scope instanceof HTMLElement && scope.matches("[data-sxr-interaction]")) {
			initInteraction(scope);
		}
		scope.querySelectorAll("[data-sxr-interaction]").forEach(initInteraction);
		scope.querySelectorAll("[data-sxr-section-nav]").forEach(initSectionNav);
		scope.querySelectorAll("[data-sxr-stats]").forEach(initStats);
		scope.querySelectorAll("[data-sxr-scroll-sequence]").forEach(initScrollSequence);
		scope.querySelectorAll("[data-sxr-product-reel]").forEach(initProductReel);
		scope.querySelectorAll("[data-sxr-archive]").forEach(initArchive);
		scope.querySelectorAll("[data-sxr-contact-locations]").forEach(initContactLocations);
		scope.querySelectorAll("[data-sxr-contact-source]").forEach(initContactChoices);
		scope.querySelectorAll("[data-sxr-territory]").forEach(initTerritory);
		scope.querySelectorAll("[data-sxr-wireway-story]").forEach(initWirewayStory);
		scope.querySelectorAll("[data-sxr-product-story]").forEach(initProductStory);
		scope.querySelectorAll("[data-sxr-wireways-authored]").forEach(initAuthoredWirewaysCards);
		scope.querySelectorAll("[data-sxr-wireways-authored]").forEach(initAuthoredWirewaysViewer);
		initReveals(scope);
	};

	const boot = () => {
		document.querySelectorAll("[data-sxr-site]").forEach(initSite);
		initEnhancements(document);

		const observer = new MutationObserver((records) => {
			records.forEach((record) => {
				record.addedNodes.forEach((node) => {
					if (!(node instanceof HTMLElement)) return;
					if (node.matches("[data-sxr-site]")) initSite(node);
					node.querySelectorAll?.("[data-sxr-site]").forEach(initSite);
					initEnhancements(node);
				});
			});
		});
		observer.observe(document.body, { childList: true, subtree: true });

		reducedMotion.addEventListener?.("change", () => {
			if (!reducedMotion.matches) return;
			document.querySelectorAll(".sxr-reveal").forEach((element) => element.classList.add("is-visible"));
			document.querySelectorAll("[data-sxr-count]").forEach((counter) => {
				const padding = Number(counter.dataset.sxrCountPad || 0);
				counter.textContent = String(Number(counter.dataset.sxrCount || 0)).padStart(padding, "0");
			});
		});
	};

	if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot, { once: true });
	else boot();
})();
