function handleImage(img) {
    let isDragging = false;
    let startX, startY, initialLeft, initialTop;

    img.style.touchAction = "none";
    img.style.userSelect = "none";
    img.style.padding = "10px";

    img.addEventListener("dragstart", (e) => e.preventDefault());

    img.addEventListener("pointerover", () => {
        if (!isDragging) img.style.cursor = "grab";
    });

    img.addEventListener("pointerdown", (e) => {
        isDragging = true;
        img.style.cursor = "grabbing";
        img.setPointerCapture(e.pointerId);

        startX = e.clientX;
        startY = e.clientY;
        initialLeft = img.offsetLeft;
        initialTop = img.offsetTop;
    });

    img.addEventListener("pointermove", (e) => {
        if (isDragging) {
            const dx = e.clientX - startX;
            const dy = e.clientY - startY;
            img.style.left = (initialLeft + dx) + "px";
            img.style.top = (initialTop + dy) + "px";
        }
    });

    const endDrag = (e) => {
        if (isDragging) {
            isDragging = false;
            img.style.cursor = "grab";
            img.releasePointerCapture(e.pointerId);
        }
    };

    img.addEventListener("pointerup", endDrag);
    img.addEventListener("pointercancel", endDrag);
}

window.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll(".siblings-i img");
    images.forEach(handleImage);
});