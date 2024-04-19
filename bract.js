function handleImage(img) {
    console.log('handleImage called on', img); 
    let isDragging = false;
    let offsetX, offsetY; 
    
    img.style.padding = "10px"; 
  
    img.addEventListener("mouseover", () => {
        img.style.cursor = "grab";
    });
    
    img.addEventListener("mousedown", (e) => {
        isDragging = true;
        img.style.cursor = "grabbing";
    
        offsetX = e.clientX - img.offsetLeft;
        offsetY = e.clientY - img.offsetTop;
        console.log('Drag started', offsetX, offsetY); 
    
        function onMouseMove(e) {
            if (isDragging) {
                img.style.left = (e.clientX - offsetX) + "px";
                img.style.top = (e.clientY - offsetY) + "px";
                console.log('Dragging', img.style.left, img.style.top); 
            }
        }
    
        function onMouseUp() {
            isDragging = false;
            img.style.cursor = "grab";
            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseup", onMouseUp);
            console.log('Drag ended'); 
        }
    
        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
    });
}

window.addEventListener('DOMContentLoaded', (event) => {
    const images = document.querySelectorAll(".ascii-plant-1 img, .ascii-plant-2 img, .ascii-plant-3 img, .ascii-plant-4 img,\
    .transparent img, .ascii-plant-5 img, .ascii-plant-6 img");
    images.forEach(handleImage);
});