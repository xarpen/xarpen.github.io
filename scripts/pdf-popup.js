(() => {
    function isPdfHref(href) {
        return /\.pdf$/i.test(href || "");
    }

    function setup() {
        const modal = document.getElementById("pdfPopupModal");
        const objectEl = document.getElementById("pdfPopupObject");
        const fallbackLink = document.getElementById("pdfPopupFallbackLink");
        if (!modal || !objectEl || !fallbackLink) {
            return;
        }

        const closeTriggers = modal.querySelectorAll("[data-close-pdf-popup]");
        const closeButton = modal.querySelector(".image-popup-close");
        const FOCUSABLE_SELECTOR = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
        const CLOSE_DELAY_MS = 210;
        let closeTimer = null;
        let lastActiveElement = null;

        function getFocusableElements() {
            return Array.from(modal.querySelectorAll(FOCUSABLE_SELECTOR)).filter((el) => {
                return !el.hasAttribute("hidden") && el.getAttribute("aria-hidden") !== "true";
            });
        }

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

        function clearCloseTimer() {
            if (closeTimer) {
                window.clearTimeout(closeTimer);
                closeTimer = null;
            }
        }

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
                objectEl.setAttribute("data", "");
                fallbackLink.setAttribute("href", "#");
                modal.setAttribute("hidden", "hidden");
                modal.classList.remove("is-closing");
                if (lastActiveElement && typeof lastActiveElement.focus === "function") {
                    lastActiveElement.focus();
                }
                lastActiveElement = null;
                closeTimer = null;
            }, CLOSE_DELAY_MS);
        }

        function openModal(src) {
            clearCloseTimer();
            lastActiveElement = document.activeElement instanceof HTMLElement ? document.activeElement : null;
            objectEl.setAttribute("data", src + "#view=FitH");
            fallbackLink.setAttribute("href", src);
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
            if (!isPdfHref(href)) {
                return;
            }

            event.preventDefault();
            openModal(href);
        });

        closeTriggers.forEach((trigger) => {
            trigger.addEventListener("click", closeModal);
        });

        objectEl.addEventListener("click", (event) => {
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
        document.addEventListener("DOMContentLoaded", setup);
    } else {
        setup();
    }
})();


