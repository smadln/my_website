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
    
    // Make the image draggable
    img.addEventListener("mousedown", (e) => {
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
}

// Get all interactive images and apply the function to each of them
window.addEventListener('DOMContentLoaded', (event) => {
    const images = document.querySelectorAll(".siblings-i img");
    images.forEach(handleImage);
});