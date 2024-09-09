// Function to handle each image
function handleImage(img) {
    console.log('handleImage called on', img); // Debugging
    let isDragging = false;
    let offsetX, offsetY; // Declare outside to be available in both functions
    
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
        console.log('Drag started', offsetX, offsetY); // Debugging
    
        function onMouseMove(e) {
            if (isDragging) {
                img.style.left = (e.clientX - offsetX) + "px";
                img.style.top = (e.clientY - offsetY) + "px";
                console.log('Dragging', img.style.left, img.style.top); // Debugging
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
        offsetX = touch.clientX - img.offsetLeft;
        offsetY = touch.clientY - img.offsetTop;
        console.log('Touch start', offsetX, offsetY); // Debugging

        function onTouchMove(e) {
            if (isDragging) {
                const touch = e.touches[0];
                img.style.left = (touch.clientX - offsetX) + "px";
                img.style.top = (touch.clientY - offsetY) + "px";
                console.log('Touch dragging', img.style.left, img.style.top); // Debugging
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
    const images = document.querySelectorAll(".yellow-orchid img, .ascii-plant img");
    images.forEach(handleImage);
});