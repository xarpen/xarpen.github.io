class ProjectShowcase extends HTMLElement {
    connectedCallback() {
        const config = window.siteConfig || {};
        const paths = config.paths || {};
        const subtitleSlot = this.querySelector('[slot="subtitle"]');
        const descriptionSlot = this.querySelector('[slot="description"]');
        const backgroundsPrefix = paths.backgroundsPrefix || 'assets/backgrounds/';
        const videosPrefix = paths.videosPrefix || 'assets/video/';
        const backgroundImage = this.getAttribute('background-image') || '';
        const backgroundExt = this.getAttribute('background-ext') || 'jpg';
        const overlayColor = this.getAttribute('overlay-color') || 'rgba(0,0,0,0.25)';
        const date = this.getAttribute('date') || '';
        const subTitle = subtitleSlot ? subtitleSlot.innerHTML.trim() : (this.getAttribute('sub-title') || '');
        const title = this.getAttribute('project-title') || this.getAttribute('title') || 'Project';
        const role = this.getAttribute('role') || '';
        const description = descriptionSlot ? descriptionSlot.innerHTML.trim() : (this.getAttribute('description') || '');
        const videoPreview = this.getAttribute('video-preview') || '';
        const videoPreviewExt = this.getAttribute('video-preview-ext') || 'jpg';
        const videoMinHeight = this.getAttribute('video-min-height') || '12vw';
        const videoSrc = this.getAttribute('video-src') || '';
        const imageB = this.getAttribute('image-b') || '';
        const imageBExt = this.getAttribute('image-b-ext') || 'jpg';
        const imageC = this.getAttribute('image-c') || '';
        const imageCExt = this.getAttribute('image-c-ext') || 'jpg';

        this.innerHTML = `
            <div class="p-4" style="background-image: url('${backgroundsPrefix}${backgroundImage}.${backgroundExt}'); background-repeat: no-repeat; background-size: cover;">
                <div class="container p-3 project-showcase-panel" style="background-color: ${overlayColor}" data-aos="fade-right">
                    <div class="row g-4 align-items-start">
                        <div class="col-12 col-lg-8 project-showcase-copy pe-lg-4">
                            <div class="project-showcase-meta">
                                <p class="project-showcase-date">${date}</p>
                                <p class="project-showcase-role">${role}</p>
                            </div>
                            <h5 class="project-showcase-subtitle">${subTitle}</h5>
                            <h4 class="project-showcase-title">${title}</h4>
                            <div class="project-showcase-description">${description}</div>
                        </div>
                        <div class="col-12 col-lg-4 d-flex justify-content-center mt-3 mt-lg-4">
                            <div class="project-showcase-media">
                                <div class="video-thumbnail project-showcase-media-item hvr-grow-shadow"
                                     data-video-src="${videosPrefix}${videoSrc}.mp4"
                                     aria-label="${title} gameplay video preview"
                                     style="width: 100%; min-height: ${videoMinHeight}; background-image: url('${backgroundsPrefix}${videoPreview}.${videoPreviewExt}'); background-repeat: no-repeat; background-size: cover; background-origin: content-box; background-clip: content-box;">
                                    <div class="video-thumbnail-play"></div>
                                </div>
                                <a class="project-showcase-media-item hvr-grow-shadow" href="${backgroundsPrefix}${imageB}.${imageBExt}" target="_blank">
                                    <img class="project-showcase-media-image" src="${backgroundsPrefix}${imageB}.${imageBExt}" alt="${title} gameplay screenshot, secondary view" loading="lazy"/>
                                </a>
                                <a class="project-showcase-media-item hvr-grow-shadow" href="${backgroundsPrefix}${imageC}.${imageCExt}" target="_blank">
                                    <img class="project-showcase-media-image" src="${backgroundsPrefix}${imageC}.${imageCExt}" alt="${title} gameplay screenshot, tertiary view" loading="lazy"/>
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