function handleImage(img) {
    console.log('handleImage called on', img); 
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

    img.addEventListener("touchstart", (e) => {
        e.preventDefault(); 
        isDragging = true;
        img.style.cursor = "grabbing";

        const touch = e.touches[0];
        offsetX = touch.clientX - img.offsetLeft;
        offsetY = touch.clientY - img.offsetTop;
        console.log('Touch start', offsetX, offsetY); 

        function onTouchMove(e) {
            if (isDragging) {
                const touch = e.touches[0];
                img.style.left = (touch.clientX - offsetX) + "px";
                img.style.top = (touch.clientY - offsetY) + "px";
                console.log('Touch dragging', img.style.left, img.style.top); 
            }
        }

        function onTouchEnd() {
            isDragging = false;
            img.style.cursor = "grab";
            document.removeEventListener("touchmove", onTouchMove);
            document.removeEventListener("touchend", onTouchEnd);
            console.log('Touch drag ended'); 
        }

        document.addEventListener("touchmove", onTouchMove);
        document.addEventListener("touchend", onTouchEnd);
    });
}

window.addEventListener('DOMContentLoaded', (event) => {
    const images = document.querySelectorAll(".ascii-la-1 img, .ascii-la-2 img, .ascii-la-3 img,.ascii-la-4 img,\
    .ascii-la-5 img");
    images.forEach(handleImage);
});