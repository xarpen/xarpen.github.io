class IconContent extends HTMLElement
{
    connectedCallback()
    {
        const config = window.siteConfig || {};
        const paths = config.paths || {};
        const image = String(this.getAttribute('image') || '').trim();
        const heading = String(this.getAttribute('heading') || this.getAttribute('title') || 'Section').trim();
        const iconSize = String(this.getAttribute('icon-size') || '64').trim();
        const iconWidth = String(this.getAttribute('icon-width') || iconSize).trim();
        const photoMode = this.hasAttribute('photo');
        const icon64Prefix = paths.icons64Prefix || 'assets/icons/icons8-';
        const iconSrc = `${icon64Prefix}${image}-64.png`;
        const iconAlt = photoMode
            ? `${heading} profile photo`
            : `${heading} section icon`;

        const root = this.attachShadow({mode: 'open'});
        root.innerHTML = `
            <link rel="stylesheet" href="../css/bootstrap.min.css">
            <link rel="stylesheet" href="../css/hover.css">
            <style>
                .icon-image {
                    width: ${iconWidth}px;
                    height: ${iconSize}px;
                    object-fit: ${photoMode ? 'cover' : 'contain'};
                    border-radius: ${photoMode ? '0.25rem' : '0'};
                    display: block;
                }
            </style>
            <div class="container px-5 py-2">
                <div class="row px-5 align-items-start">
                    <div class="col-auto hvr-float">
                        <img class="icon-image" src="${iconSrc}" alt="${iconAlt}" loading="lazy" width="${iconWidth}" height="${iconSize}">
                    </div>
                    <div class="col">
                        <h5>${heading}</h5>
                        <slot></slot>
                    </div>
                </div>
            </div>`;
    }
}

customElements.define('icon-content', IconContent);