class ExperienceContent extends HTMLElement
{
    connectedCallback()
    {
        const image = this.getAttribute('image')
        const title = this.getAttribute('title');
        const years = this.getAttribute('years');

        this.innerHTML = `
        <div class="col p-5 hvr-float">
            <img class="p-3" src="assets/${image}.jpg" alt="" loading="lazy"/>
            <h4>${title}</h4>
            <b style="color:goldenrod">${years} years</b>
        </div>`;
    }
}

customElements.define('exp-content', ExperienceContent);