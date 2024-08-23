function handleImage(img) {
    console.log('handleImage called on', img); // Debugging
    let isDragging = false;
    let offsetX, offsetY; // Declare outside to be available in both functions

    // Prevent default dragging of the image
    img.setAttribute('draggable', false);

    // Increase the clickable area by adding padding
    img.style.padding = "10px"; // Adjust the padding size as needed

    // Change cursor style on mouseover (for mouse devices)
    img.addEventListener("mouseover", () => {
        img.style.cursor = "grab";
    });

    // Function to handle the drag movement
    function moveImage(x, y) {
        img.style.left = (x - offsetX) + "px";
        img.style.top = (y - offsetY) + "px";
        console.log('Dragging', img.style.left, img.style.top); // Debugging
    }

    // Mouse events
    img.addEventListener("mousedown", (e) => {
        isDragging = true;
        img.style.cursor = "grabbing";

        offsetX = e.clientX - img.offsetLeft;
        offsetY = e.clientY - img.offsetTop;
        console.log('Drag started', offsetX, offsetY); // Debugging

        function onMouseMove(e) {
            if (isDragging) {
                moveImage(e.clientX, e.clientY);
            }
        }

        function onMouseUp() {
            isDragging = false;
            img.style.cursor = "grab";
            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseup", onMouseUp);
            console.log('Drag ended'); // Debugging
        }

        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
    });

    // Touch events
    img.addEventListener("touchstart", (e) => {
        isDragging = true;

        // Use the first touch point
        let touch = e.touches[0];
        offsetX = touch.clientX - img.offsetLeft;
        offsetY = touch.clientY - img.offsetTop;
        console.log('Touch drag started', offsetX, offsetY); // Debugging
    });

    img.addEventListener("touchmove", (e) => {
        if (isDragging) {
            // Prevent scrolling
            e.preventDefault();
            let touch = e.touches[0];
            moveImage(touch.clientX, touch.clientY);
        }
    });

    img.addEventListener("touchend", () => {
        isDragging = false;
        console.log('Touch drag ended'); // Debugging
    });
}

// Get all interactive images and apply the function to each of them
window.addEventListener('DOMContentLoaded', (event) => {
    const images = document.querySelectorAll(".ascii-plant-1 img, .ascii-plant-2 img, .ascii-plant-3 img,.ascii-plant-4 img,\
    .ascii-plant-5 img, .ascii-plant-6 img, .ascii-plant-7 img, .ascii-plant-8 img");
    images.forEach(handleImage);
});