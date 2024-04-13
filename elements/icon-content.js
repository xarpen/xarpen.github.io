class IconContent extends HTMLElement
{
    connectedCallback()
    {
        const image = this.getAttribute('image');
        const title = this.getAttribute('title');

        const root = this.attachShadow({mode: 'open'});
        root.innerHTML = `
            <link rel="stylesheet" href="../css/bootstrap.min.css">
            <link rel="stylesheet" href="../css/hover.css">
            <div class="container px-5 py-2">
                <div class="row px-5">
                    <div class="col-auto hvr-float">
                        <img src="assets/icons/icons8-${image}-64.png" alt="" loading="lazy">
                    </div>
                    <div class="col">
                        <h5>${title}</h5>
                        <slot></slot>
                    </div>
                </div>
            </div>`;
    }
}

customElements.define('icon-content', IconContent);