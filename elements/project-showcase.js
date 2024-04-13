class ProjectShowcase extends HTMLElement {
    connectedCallback() {
        const backgroundImage = this.getAttribute('background-image');
        const overlayColor = this.getAttribute('overlay-color') || 'rgba(0,0,0,0.25)';
        const title = this.getAttribute('title');
        const role = this.getAttribute('role');
        const description = this.getAttribute('description');
        const videoPreview = this.getAttribute('video-preview');
        const videoMinHeight = this.getAttribute('video-min-height');
        const videoSrc = this.getAttribute('video-src');
        const imageB = this.getAttribute('image-b');
        const imageC = this.getAttribute('image-c');

        this.innerHTML = `
            <div style="background-image: url('assets/backgrounds/${backgroundImage}.jpg'); background-repeat: no-repeat; background-size: cover" class="p-5">
                <div class="container p-3" style="background-color: ${overlayColor}" data-aos="fade-right">
                    <div class="row">
                        <div class="col-8">
                            <p style="color: deepskyblue;">${this.getAttribute('date')}</p>
                            <h5 style="color: darkgoldenrod">${this.getAttribute('sub-title')}</h5>
                            <h4 class="text-white">${title} - ${role}</h4>
                            <p class="text-white">${description}</p>
                        </div>
                        <div class="col-4 container">
                            <div class="col">
                                <div class="row p-3" style="max-width: 20vw; min-height: ${videoMinHeight};">
                                    <video src="assets/video/${videoSrc}.mp4" style="padding: 0!important; background-image: url('assets/backgrounds/${videoPreview}.jpg'); background-repeat: no-repeat; background-size: cover" controls preload="none"></video>
                                </div>
                                <a class="hvr-grow-shadow" href="assets/backgrounds/${imageB}.jpg" target="_blank">
                                    <img class="row p-3" src="assets/backgrounds/${imageB}.jpg" style="max-width: 20vw" alt="" loading="lazy"/>
                                </a>
                                <a class="hvr-grow-shadow" href="assets/backgrounds/${imageC}.jpg" target="_blank">
                                    <img class="row p-3" src="assets/backgrounds/${imageC}.jpg" style="max-width: 20vw" alt="" loading="lazy"/>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}

customElements.define('project-showcase', ProjectShowcase);