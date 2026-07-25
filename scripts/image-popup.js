(() => {
	/**
	 * Checks if a given href is an image file by testing common image extensions
	 * @param {string} href - The URL/href to check
	 * @returns {boolean} - True if href matches an image extension
	 */
	function isImageHref(href) {
		return /\.(png|jpe?g|webp|gif)$/i.test(href || "");
	}

	/**
	 * Initializes the image popup modal with event listeners and focus management
	 * Handles opening/closing modal, keyboard navigation (Tab, Escape), and focus trapping
	 */
	function setupImagePopup() {
		const modal = document.getElementById("imagePopupModal");
		const preview = document.getElementById("imagePopupPreview");
		if (!modal || !preview) {
			return;
		}

		const closeTriggers = modal.querySelectorAll("[data-close-image-popup]");
		const closeButton = modal.querySelector(".image-popup-close");
		const FOCUSABLE_SELECTOR = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
		const CLOSE_DELAY_MS = 210;
		let closeTimer = null;
		let lastActiveElement = null;

		/**
		 * Gets all focusable elements within the modal that are not hidden
		 * @returns {HTMLElement[]} - Array of focusable elements
		 */
		function getFocusableElements() {
			return Array.from(modal.querySelectorAll(FOCUSABLE_SELECTOR)).filter((el) => {
				return !el.hasAttribute("hidden") && el.getAttribute("aria-hidden") !== "true";
			});
		}

		/**
		 * Implements keyboard focus trapping within modal
		 * Ensures Tab/Shift+Tab cycles focus between modal elements
		 * @param {KeyboardEvent} event - The keyboard event
		 */
		function trapFocus(event) {
			const focusable = getFocusableElements();
			if (!focusable.length) {
				event.preventDefault();
				modal.focus();
				return;
			}

			const first = focusable[0];
			const last = focusable[focusable.length - 1];
			const active = document.activeElement;

			if (event.shiftKey && active === first) {
				event.preventDefault();
				last.focus();
				return;
			}

			if (!event.shiftKey && active === last) {
				event.preventDefault();
				first.focus();
			}
		}

		/**
		 * Clears any pending close timer to prevent double-close issues
		 */
		function clearCloseTimer() {
			if (closeTimer) {
				window.clearTimeout(closeTimer);
				closeTimer = null;
			}
		}

		/**
		 * Closes the modal with fade-out animation
		 * Restores focus to the previously active element that opened the modal
		 */
		function closeModal() {
			if (modal.hasAttribute("hidden") || modal.classList.contains("is-closing")) {
				return;
			}

			clearCloseTimer();
			modal.classList.remove("is-open");
			modal.classList.add("is-closing");
			modal.setAttribute("aria-hidden", "true");
			document.body.classList.remove("image-popup-open");

			closeTimer = window.setTimeout(() => {
				modal.setAttribute("hidden", "hidden");
				modal.classList.remove("is-closing");
				preview.setAttribute("src", "");
				preview.setAttribute("alt", "");
				if (lastActiveElement && typeof lastActiveElement.focus === "function") {
					lastActiveElement.focus();
				}
				lastActiveElement = null;
				closeTimer = null;
			}, CLOSE_DELAY_MS);
		}

		/**
		 * Opens the modal with fade-in animation and sets focus to close button
		 * @param {string} src - Image source URL
		 * @param {string} altText - Alt text for the image
		 */
		function openModal(src, altText) {
			clearCloseTimer();
			lastActiveElement = document.activeElement instanceof HTMLElement ? document.activeElement : null;
			preview.setAttribute("src", src);
			preview.setAttribute("alt", altText || "Portfolio image preview");
			modal.removeAttribute("hidden");
			modal.classList.remove("is-closing");
			modal.setAttribute("aria-hidden", "false");
			document.body.classList.add("image-popup-open");
			requestAnimationFrame(() => {
				modal.classList.add("is-open");
				const firstTarget = closeButton || getFocusableElements()[0] || modal;
				firstTarget.focus();
			});
		}

		document.addEventListener("click", (event) => {
			const link = event.target.closest("a[href]");
			if (!link) {
				return;
			}

			const href = link.getAttribute("href") || "";
			if (!isImageHref(href)) {
				return;
			}

			event.preventDefault();
			const linkedImage = link.querySelector("img");
			const altText = (linkedImage && linkedImage.getAttribute("alt")) || link.getAttribute("title") || "";
			openModal(href, altText);
		});

		closeTriggers.forEach((trigger) => {
			trigger.addEventListener("click", closeModal);
		});

		preview.addEventListener("click", (event) => {
			event.stopPropagation();
		});

		modal.addEventListener("click", closeModal);

		document.addEventListener("keydown", (event) => {
			if (modal.hasAttribute("hidden")) {
				return;
			}

			if (event.key === "Escape") {
				closeModal();
				return;
			}

			if (event.key === "Tab") {
				trapFocus(event);
			}
		});
	}

	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", setupImagePopup);
	} else {
		setupImagePopup();
	}
})();

