(() => {
    function setup() {
        const modal = document.getElementById("videoPopupModal");
        const player = document.getElementById("videoPopupPlayer");
        if (!modal || !player) {
            return;
        }

        const closeTriggers = modal.querySelectorAll("[data-close-video-popup]");
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
            player.pause();
            modal.classList.remove("is-open");
            modal.classList.add("is-closing");
            modal.setAttribute("aria-hidden", "true");
            document.body.classList.remove("image-popup-open");

            closeTimer = window.setTimeout(() => {
                player.removeAttribute("src");
                player.load();
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
            player.src = src;
            modal.removeAttribute("hidden");
            modal.classList.remove("is-closing");
            modal.setAttribute("aria-hidden", "false");
            document.body.classList.add("image-popup-open");
            requestAnimationFrame(() => {
                modal.classList.add("is-open");
                const firstTarget = closeButton || getFocusableElements()[0] || modal;
                firstTarget.focus();
            });
            player.play().catch(() => {});
        }

        document.addEventListener("click", (event) => {
            const thumb = event.target.closest("[data-video-src]");
            if (!thumb) {
                return;
            }
            event.preventDefault();
            openModal(thumb.getAttribute("data-video-src"));
        });

        closeTriggers.forEach((trigger) => {
            trigger.addEventListener("click", closeModal);
        });

        player.addEventListener("click", (event) => {
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



