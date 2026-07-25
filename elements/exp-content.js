class ExperienceContent extends HTMLElement
{
    connectedCallback()
    {
        const config = window.siteConfig || {};
        const paths = config.paths || {};
        const image = String(this.getAttribute('image') || '').trim();
        const imageFull = String(this.getAttribute('image-full') || '').trim() || null;
        const heading = String(this.getAttribute('heading') || this.getAttribute('title') || 'Technology').trim();
        const years = String(this.getAttribute('years') || '').trim();
        const details = String(this.getAttribute('details') || '').trim();
        const experienceImagePrefix = paths.experienceImagePrefix || 'assets/';
        const imageSrc = imageFull || `${experienceImagePrefix}${image}.jpg`;
        const detailMarkup = details
            ? `<p class="exp-content-details mb-0">${details}</p>`
            : (years ? `<b style="color:goldenrod">${years} years</b>` : '');

        // The custom element itself needs to be the Bootstrap column in the row.
        this.classList.add('col', 'p-5', 'hvr-float');

        this.innerHTML = `
            <img class="p-3" src="${imageSrc}" alt="${heading} technology logo" loading="lazy" decoding="async" width="96" height="96"/>
            <h4>${heading}</h4>
            ${detailMarkup}`;
    }
}

customElements.define('exp-content', ExperienceContent);