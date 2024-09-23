function handleImage(img) {
    console.log('handleImage called on', img); 
    let isDragging = false;
    let offsetX, offsetY;

    img.style.padding = "10px"; 

    img.addEventListener("mouseover", () => {
        img.style.cursor = "grab";
    });

    // Mouse event listeners
    img.addEventListener("mousedown", (e) => {
        startDrag(e);
    });

    // Touch event listeners
    img.addEventListener("touchstart", (e) => {
        const touch = e.touches[0]; 
        startDrag(touch);
    });

    function startDrag(e) {
        isDragging = true;
        img.style.cursor = "grabbing";

        offsetX = e.clientX - img.offsetLeft;
        offsetY = e.clientY - img.offsetTop;
        console.log('Drag started', offsetX, offsetY); 

        function onMove(e) {
            if (isDragging) {
                let clientX, clientY;
                if (e.touches) {
                    clientX = e.touches[0].clientX;
                    clientY = e.touches[0].clientY;
                } else {
                    clientX = e.clientX;
                    clientY = e.clientY;
                }
                
                img.style.left = (clientX - offsetX) + "px";
                img.style.top = (clientY - offsetY) + "px";
                console.log('Dragging', img.style.left, img.style.top); 
            }
        }

        function stopDrag() {
            isDragging = false;
            img.style.cursor = "grab";
            document.removeEventListener("mousemove", onMove);
            document.removeEventListener("mouseup", stopDrag);
            document.removeEventListener("touchmove", onMove);
            document.removeEventListener("touchend", stopDrag);
            console.log('Drag ended'); 
        }

        document.addEventListener("mousemove", onMove);
        document.addEventListener("mouseup", stopDrag);
        document.addEventListener("touchmove", onMove);
        document.addEventListener("touchend", stopDrag);
    }
}

window.addEventListener('DOMContentLoaded', (event) => {
    const images = document.querySelectorAll(".ascii-plant-1 img, .ascii-plant-2 img, .ascii-plant-3 img, .ascii-plant-4 img,\
    .transparent img, .ascii-plant-5 img, .ascii-plant-6 img");
    images.forEach(handleImage);
});