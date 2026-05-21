const maxMoveDistance = 15; 
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
            if (!isAnimating) {
                isAnimating = true;
                requestAnimationFrame(animate);
            }
        }, 1000);
    }
}

function animate() {
    if (!isAnimating) return;

    const img1 = document.querySelector('.ascii-la-1 img');
    const img2 = document.querySelector('.ascii-la-2 img');
    const img3 = document.querySelector('.ascii-la-3 img');
    const img4 = document.querySelector('.ascii-la-4 img');
    

    animationPhase += 0.01;
    const offset = Math.sin(animationPhase) * 5;

    if (img1) img1.style.transform = `translate(-50%, calc(-50% + ${offset}px))`;
    if (img2) img2.style.transform = `translate(-50%, calc(-50% + ${-offset}px))`;
    if (img3) img3.style.transform = `translate(-50%, calc(-50% + ${-offset}px))`;
    if (img4) img4.style.transform = `translate(-50%, calc(-50% + ${offset}px))`;
    

    requestAnimationFrame(animate);
}

function handleImage(img) {
    let isDragging = false;
    let offsetX, offsetY;
    let initialLeft = null;
    let initialTop = null;
    
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

        if (initialLeft === null) initialLeft = img.offsetLeft;
        if (initialTop === null) initialTop = img.offsetTop;
        
        activeInteractions++;
        pauseAnimation();
        
        img.style.cursor = "grabbing";
    
        offsetX = e.clientX - img.offsetLeft;
        offsetY = e.clientY - img.offsetTop;
    
        function onMouseMove(e) {
            if (isDragging) {
                let newLeft = e.clientX - offsetX;
                let newTop = e.clientY - offsetY;

                newLeft = Math.max(initialLeft - maxMoveDistance, Math.min(initialLeft + maxMoveDistance, newLeft));
                newTop = Math.max(initialTop - maxMoveDistance, Math.min(initialTop + maxMoveDistance, newTop));

                img.style.left = newLeft + "px";
                img.style.top = newTop + "px";
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

        if (initialLeft === null) initialLeft = img.offsetLeft;
        if (initialTop === null) initialTop = img.offsetTop;
        
        activeInteractions++;
        pauseAnimation();
        
        img.style.cursor = "grabbing";

        const touch = e.touches[0];
        offsetX = touch.clientX - img.offsetLeft;
        offsetY = touch.clientY - img.offsetTop;

        function onTouchMove(e) {
            if (isDragging) {
                const touch = e.touches[0];
                let newLeft = touch.clientX - offsetX;
                let newTop = touch.clientY - offsetY;

                newLeft = Math.max(initialLeft - maxMoveDistance, Math.min(initialLeft + maxMoveDistance, newLeft));
                newTop = Math.max(initialTop - maxMoveDistance, Math.min(initialTop + maxMoveDistance, newTop));

                img.style.left = newLeft + "px";
                img.style.top = newTop + "px";
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
    const images = document.querySelectorAll(".ascii-la-1 img, .ascii-la-2 img, .ascii-la-3 img, .ascii-la-4 img");
    images.forEach(handleImage);
    
    requestAnimationFrame(animate);
});