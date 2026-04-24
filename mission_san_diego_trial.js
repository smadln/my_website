let isAnimating = true;
let resumeTimeout;
let activeInteractions = 0;
let animationPhase = 0;

function pauseAnimation() {
    isAnimating = false;
    clearTimeout(resumeTimeout);
}

function startResumeTimer() {
    clearTimeout(resumeTimeout);
    if (activeInteractions === 0) {
        resumeTimeout = setTimeout(() => {
            isAnimating = true;
            requestAnimationFrame(animate);
        }, 2000);
    }
}

function animate() {
    if (!isAnimating) return;

    const img1 = document.getElementById('ascii-photo-1');
    const img2 = document.getElementById('ascii-photo-2');

    if (img1 && img2) {
        animationPhase += 0.01;
        const offset = Math.sin(animationPhase) * 0.3;

        img1.style.transform = `translate(calc(-50% + ${offset}%), -50%)`;
        img2.style.transform = `translate(calc(-50% + ${-offset}%), -50%)`;
    }

    requestAnimationFrame(animate);
}

function handleImage(img) {
    let isDragging = false;
    let offsetX, offsetY;
    
    img.style.padding = "10px";
    
    img.addEventListener("mouseover", () => {
        img.style.cursor = "grab";
    });

    img.addEventListener("dragstart", (e) => {
        e.preventDefault();
    });
    
    img.addEventListener("mousedown", (e) => {
        e.preventDefault();
        isDragging = true;
        
        activeInteractions++;
        pauseAnimation();
        
        img.style.cursor = "grabbing";
    
        offsetX = e.clientX - img.offsetLeft;
        offsetY = e.clientY - img.offsetTop;
    
        function onMouseMove(e) {
            if (isDragging) {
                img.style.left = (e.clientX - offsetX) + "px";
                img.style.top = (e.clientY - offsetY) + "px";
            }
        }
    
        function onMouseUp() {
            isDragging = false;
            
            activeInteractions--;
            startResumeTimer();
            
            img.style.cursor = "grab";
            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseup", onMouseUp);
        }
    
        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
    });

    img.addEventListener("touchstart", (e) => {
        e.preventDefault();
        isDragging = true;
        
        activeInteractions++;
        pauseAnimation();
        
        img.style.cursor = "grabbing";

        const touch = e.touches[0];
        offsetX = touch.clientX - img.offsetLeft;
        offsetY = touch.clientY - img.offsetTop;

        function onTouchMove(e) {
            if (isDragging) {
                const touch = e.touches[0];
                img.style.left = (touch.clientX - offsetX) + "px";
                img.style.top = (touch.clientY - offsetY) + "px";
            }
        }

        function onTouchEnd() {
            isDragging = false;
            
            activeInteractions--;
            startResumeTimer();
            
            img.style.cursor = "grab";
            document.removeEventListener("touchmove", onTouchMove);
            document.removeEventListener("touchend", onTouchEnd);
        }

        document.addEventListener("touchmove", onTouchMove);
        document.addEventListener("touchend", onTouchEnd);
    });
}

window.addEventListener('DOMContentLoaded', (event) => {
    const images = document.querySelectorAll(".ascii-photo-1 img, .ascii-photo-2 img");
    images.forEach(handleImage);
    
    requestAnimationFrame(animate);
});