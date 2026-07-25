class ContactInfo extends HTMLElement {
    connectedCallback() {
        const config = window.siteConfig || {};
        const paths = config.paths || {};
        const image = String(this.getAttribute('image') || '').trim();
        const href = String(this.getAttribute('href') || '#').trim();
        const text = String(this.getAttribute('text') || '').trim();
        const icon24Prefix = paths.icons24Prefix || 'assets/icons/icons8-';
        const iconAlt = (image || 'contact') + ' icon';

        this.innerHTML = `
            <a class="top-contact-link nav-link text-light hvr-curl-top-left" href="${href}">
                <img class="top-contact-icon" src="${icon24Prefix}${image}-24.png" alt="${iconAlt}" loading="lazy" width="24" height="24">
                <span class="top-contact-text">${text}</span>
            </a>
        `;
    }
}

customElements.define('contact-info', ContactInfo);