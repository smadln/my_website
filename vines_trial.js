window.addEventListener('DOMContentLoaded', () => {
    document.body.insertAdjacentHTML('beforeend', `
        <svg xmlns="http://www.w3.org/2000/svg" width="0" height="0" style="position: absolute; pointer-events: none;">
            <filter id="scroll-meld" color-interpolation-filters="sRGB">
                <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="2" result="noise" />
                <feDisplacementMap id="meld-map" in="SourceGraphic" in2="noise" scale="0" xChannelSelector="R" yChannelSelector="G" />
            </filter>
        </svg>
    `);

    const images = document.querySelectorAll("#vines-ascii, #vines-ascii-i, .siblings-i img");
    images.forEach(img => {
        img.style.filter = "url(#scroll-meld)";
    });

    let lastScrollY = window.scrollY;
    let ticking = false;
    let scrollTimeout;
    let decayInterval;
    const map = document.getElementById("meld-map");

    window.addEventListener("scroll", () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const currentScrollY = window.scrollY;
                const velocity = Math.abs(currentScrollY - lastScrollY);
                lastScrollY = currentScrollY;

                if (map && velocity > 0) {
                    const meldAmount = Math.min(velocity * 3, 250);
                    map.setAttribute("scale", meldAmount);

                    images.forEach(img => {
                        img.style.transform = `scale(${1 + velocity * 0.0001})`;
                    });

                    clearTimeout(scrollTimeout);
                    clearInterval(decayInterval);
                    
                    scrollTimeout = setTimeout(() => {
                        let currentScale = parseFloat(map.getAttribute("scale"));
                        decayInterval = setInterval(() => {
                            currentScale *= 0.8;
                            if (currentScale < 1) {
                                currentScale = 0;
                                images.forEach(img => img.style.transform = "scale(1)");
                                clearInterval(decayInterval);
                            }
                            map.setAttribute("scale", currentScale);
                        }, 16);
                    }, 50);
                }
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
});