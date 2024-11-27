// Function to handle each image
function handleImage(img) {
    let isDragging = false;
    let offsetX, offsetY, initialLeft, initialTop;

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

        // Get the computed styles and initial transform values
        const style = window.getComputedStyle(img);
        const matrix = new DOMMatrixReadOnly(style.transform);
        initialLeft = matrix.m41; // The 'x' translation
        initialTop = matrix.m42;  // The 'y' translation

        // Calculate offsets based on current position
        offsetX = e.clientX - initialLeft;
        offsetY = e.clientY - initialTop;
        console.log('Drag started', offsetX, offsetY); // Debugging

        function onMouseMove(e) {
            if (isDragging) {
                const left = e.clientX - offsetX;
                const top = e.clientY - offsetY;
                img.style.transform = `translate(${left}px, ${top}px)`;
                console.log('Dragging', img.style.transform); // Debugging
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

    // Handle touch events for touchscreens
    img.addEventListener("touchstart", (e) => {
        e.preventDefault(); // Prevent default touch behavior
        isDragging = true;
        img.style.cursor = "grabbing";

        // Get touch coordinates
        const touch = e.touches[0];
        const style = window.getComputedStyle(img);
        const matrix = new DOMMatrixReadOnly(style.transform);
        initialLeft = matrix.m41;
        initialTop = matrix.m42;

        offsetX = touch.clientX - initialLeft;
        offsetY = touch.clientY - initialTop;
        console.log('Touch start', offsetX, offsetY); // Debugging

        function onTouchMove(e) {
            if (isDragging) {
                const touch = e.touches[0];
                const left = touch.clientX - offsetX;
                const top = touch.clientY - offsetY;
                img.style.transform = `translate(${left}px, ${top}px)`;
                console.log('Touch dragging', img.style.transform); // Debugging
            }
        }

        function onTouchEnd() {
            isDragging = false;
            img.style.cursor = "grab";
            document.removeEventListener("touchmove", onTouchMove);
            document.removeEventListener("touchend", onTouchEnd);
            console.log('Touch drag ended'); // Debugging
        }

        document.addEventListener("touchmove", onTouchMove);
        document.addEventListener("touchend", onTouchEnd);
    });
}

// Get all interactive images and apply the function to each of them
window.addEventListener('DOMContentLoaded', (event) => {
    const images = document.querySelectorAll(".yellow-orchid img, orchid_ascii.png");
    images.forEach(handleImage);
});