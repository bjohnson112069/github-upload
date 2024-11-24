function loadContent() {
    const links = document.querySelectorAll('a');
    const form = document.querySelector('form');
    const clipboard = document.querySelector('#copy-to-clipboard');

    // Marcin Malecki's thumbnail hack
    if (navigator.userAgent.includes("Headless")) {
        document.body.style.setProperty("padding-block-end", "0");
        document.body.style.setProperty("margin-block-start", "152px");
        document.body.style.setProperty("min-block-size", "0");
        document.body.style.setProperty("block-size", "calc(100vh - 304px)");
        document.body.style.setProperty("position", "relative");
    }
    // Takes the viewport widths in pixels and the font sizes in rem
    function clampBuilder( minWidthPx, maxWidthPx, minFontSize, maxFontSize ) {
        const root = document.querySelector( "html" );
        const pixelsPerRem = Number( getComputedStyle( root ).fontSize.slice( 0,-2 ) );
    
        const minWidth = minWidthPx / pixelsPerRem;
        const maxWidth = maxWidthPx / pixelsPerRem;
        const slope = ( maxFontSize - minFontSize ) / ( maxWidth - minWidth );
        const yAxisIntersection = -minWidth * slope + minFontSize;
    
        return `clamp( ${ minFontSize }rem, ${ yAxisIntersection }rem + ${ slope * 100 }vw, ${ maxFontSize }rem )`;
    }
    
    // Utility: copy str to the clipboard
    const copyToClipboard = (str) => {  
        if (navigator && navigator.clipboard && navigator.clipboard.writeText) {    
            return navigator.clipboard.writeText(str);  
        }  
        return Promise.reject('The Clipboard API is not available.');
    }

    function handleCopyToClipboard() {
        copyToClipboard(document.querySelector('.output').textContent);
    }

    function handleFormSubmission(e) {
        e.preventDefault();

        const minWdithPx = Number(this.querySelector('input[name="min-view-size"]').value);
        const maxWidthPx = Number(this.querySelector('input[name="max-view-size"]').value);
        const minFontSize = Number(this.querySelector('input[name="min-font-size"]').value);
        const maxFontSize = Number(this.querySelector('input[name="max-font-size"]').value);
        const clamp = clampBuilder(minWdithPx, maxWidthPx, minFontSize, maxFontSize);
        console.log(clamp)

        const output = document.querySelector('.output');
        output.textContent = clamp;
    }

    // on page load ...


    // Event Listeners
    links.forEach(link => link.addEventListener('click', (e) => e.preventDefault()));
    form.addEventListener('submit', handleFormSubmission);
    clipboard.addEventListener('click', handleCopyToClipboard);
}

window.addEventListener('DOMContentLoaded', loadContent);