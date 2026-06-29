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
        img.style.transform = "translateZ(0)";
    });

    let lastScrollY = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop;
    let lastScrollX = window.scrollX || document.documentElement.scrollLeft || document.body.scrollLeft;
    let ticking = false;
    let scrollTimeout;
    let decayInterval;
    const map = document.getElementById("meld-map");

    const onScroll = () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const currentScrollY = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop;
                const currentScrollX = window.scrollX || document.documentElement.scrollLeft || document.body.scrollLeft;
                
                const velocityY = Math.abs(currentScrollY - lastScrollY);
                const velocityX = Math.abs(currentScrollX - lastScrollX) * 3.5; 
                const velocity = Math.hypot(velocityX, velocityY);

                lastScrollY = currentScrollY;
                lastScrollX = currentScrollX;

                if (map && velocity > 0) {
                    const meldAmount = Math.min(velocity * 6, 350);
                    map.setAttribute("scale", meldAmount);

                    images.forEach(img => {
                        img.style.transform = `scale(${1 + velocity * 0.0001}) translateZ(0)`;
                    });

                    clearTimeout(scrollTimeout);
                    clearInterval(decayInterval);
                    
                    scrollTimeout = setTimeout(() => {
                        let currentScale = parseFloat(map.getAttribute("scale"));
                        decayInterval = setInterval(() => {
                            currentScale *= 0.8;
                            if (currentScale < 1) {
                                currentScale = 0;
                                images.forEach(img => img.style.transform = "scale(1) translateZ(0)");
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
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    document.body.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("scroll", onScroll, { capture: true, passive: true });
});