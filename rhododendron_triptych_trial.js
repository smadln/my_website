function handleImage(img) {
    let isDragging = false;
    let offsetX, offsetY;

    // Increase the clickable area by adding padding
    img.style.padding = "10px"; // Adjust the padding size as needed

    // Change cursor style on mouseover
    img.addEventListener("mouseover", () => {
        img.style.cursor = "grab";
    });

    // Disable default dragging behavior
    img.addEventListener("dragstart", (e) => {
        e.preventDefault();
    });

    // Make the image draggable with mouse events
    img.addEventListener("mousedown", (e) => {
        e.preventDefault(); // Prevent default drag behavior
        isDragging = true;
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
            img.style.cursor = "grab";
            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseup", onMouseUp);
        }

        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
    });

    // Handle touch events for touchscreens
    img.addEventListener("touchstart", (e) => {
        e.preventDefault(); // Prevent default touch behavior
        isDragging = true;
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
            img.style.cursor = "grab";
            document.removeEventListener("touchmove", onTouchMove);
            document.removeEventListener("touchend", onTouchEnd);
        }

        document.addEventListener("touchmove", onTouchMove);
        document.addEventListener("touchend", onTouchEnd);
    });
}

// Apply the function to all interactive images
window.addEventListener('DOMContentLoaded', (event) => {
    const images = document.querySelectorAll('.image-layer img');
    images.forEach(handleImage);
});