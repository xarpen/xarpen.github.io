class ContactInfo extends HTMLElement {
    connectedCallback() {
        const image = this.getAttribute('image');
        const href = this.getAttribute('href');
        const text = this.getAttribute('text');

        this.innerHTML = `
            <table>
                <tr>
                    <td>
                        <img src="assets/icons/icons8-${image}-24.png" alt="" loading="lazy">
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