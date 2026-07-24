class ProjectShowcase extends HTMLElement {
    connectedCallback() {
        const config = window.siteConfig || {};
        const paths = config.paths || {};
        const subtitleSlot = this.querySelector('[slot="subtitle"]');
        const descriptionSlot = this.querySelector('[slot="description"]');
        const backgroundsPrefix = paths.backgroundsPrefix || 'assets/backgrounds/';
        const videosPrefix = paths.videosPrefix || 'assets/video/';
        const backgroundImage = String(this.getAttribute('background-image') || '').trim();
        const backgroundExt = String(this.getAttribute('background-ext') || 'jpg').trim();
        const overlayColor = String(this.getAttribute('overlay-color') || 'rgba(0,0,0,0.25)').trim();
        const date = String(this.getAttribute('date') || '').trim();
        const subTitle = subtitleSlot ? String(subtitleSlot.innerHTML || '').trim() : String(this.getAttribute('sub-title') || '').trim();
        const title = String(this.getAttribute('project-title') || this.getAttribute('title') || 'Project').trim();
        const role = String(this.getAttribute('role') || '').trim();
        const description = descriptionSlot ? String(descriptionSlot.innerHTML || '').trim() : String(this.getAttribute('description') || '').trim();
        const videoPreview = String(this.getAttribute('video-preview') || '').trim();
        const videoPreviewExt = String(this.getAttribute('video-preview-ext') || 'jpg').trim();
        const videoMinHeight = String(this.getAttribute('video-min-height') || '12vw').trim();
        const videoSrc = String(this.getAttribute('video-src') || '').trim();
        const imageB = String(this.getAttribute('image-b') || '').trim();
        const imageBExt = String(this.getAttribute('image-b-ext') || 'jpg').trim();
        const imageC = String(this.getAttribute('image-c') || '').trim();
        const imageCExt = String(this.getAttribute('image-c-ext') || 'jpg').trim();

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
                                    <img class="project-showcase-media-image" src="${backgroundsPrefix}${imageB}.${imageBExt}" alt="${title} gameplay screenshot, secondary view" loading="lazy" decoding="async" width="800" height="450"/>
                                </a>
                                <a class="project-showcase-media-item hvr-grow-shadow" href="${backgroundsPrefix}${imageC}.${imageCExt}" target="_blank">
                                    <img class="project-showcase-media-image" src="${backgroundsPrefix}${imageC}.${imageCExt}" alt="${title} gameplay screenshot, tertiary view" loading="lazy" decoding="async" width="800" height="450"/>
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