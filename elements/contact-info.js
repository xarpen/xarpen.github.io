class ContactInfo extends HTMLElement {
    connectedCallback() {
        const config = window.siteConfig || {};
        const paths = config.paths || {};
        const image = this.getAttribute('image') || '';
        const href = this.getAttribute('href') || '#';
        const text = this.getAttribute('text') || '';
        const icon24Prefix = paths.icons24Prefix || 'assets/icons/icons8-';
        const iconAlt = (image || 'contact') + ' icon';

        this.innerHTML = `
            <table>
                <tr>
                    <td>
                        <img src="${icon24Prefix}${image}-24.png" alt="${iconAlt}" loading="lazy">
                    </td>
                    <td>
                        <a class="nav-link text-light hvr-curl-top-left" style="font-size: 0.9em; font-weight: bold" href="${href}">${text}</a>
                    </td>
                </tr>
            </table>
        `;
    }
}

customElements.define('contact-info', ContactInfo);