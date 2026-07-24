class IconContent extends HTMLElement
{
    connectedCallback()
    {
        const config = window.siteConfig || {};
        const paths = config.paths || {};
        const image = this.getAttribute('image') || '';
        const heading = this.getAttribute('heading') || this.getAttribute('title') || 'Section';
        const iconSize = this.getAttribute('icon-size') || '64';
        const iconWidth = this.getAttribute('icon-width') || iconSize;
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
                        <img class="icon-image" src="${iconSrc}" alt="${iconAlt}" loading="lazy">
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