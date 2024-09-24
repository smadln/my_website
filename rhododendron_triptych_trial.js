function makeDraggable(element) {
    let isDragging = false;
    let startX, startY, initialX, initialY;

    element.addEventListener('mousedown', function(e) {
        isDragging = true;
        // Get the current mouse position and element's position
        startX = e.clientX;
        startY = e.clientY;

        // Get the computed transform values
        const computedStyle = window.getComputedStyle(element);
        const matrix = new WebKitCSSMatrix(computedStyle.transform);
        
        // Set the initial positions based on current transform
        initialX = matrix.m41;
        initialY = matrix.m42;

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    });

    function onMouseMove(e) {
        if (!isDragging) return;

        const deltaX = e.clientX - startX;
        const deltaY = e.clientY - startY;

        // Update the transform to move the element
        element.style.transform = `translate(${initialX + deltaX}px, ${initialY + deltaY}px)`;
    }

    function onMouseUp() {
        isDragging = false;
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    }
}

// Apply the draggable functionality to all images within image-layer
document.querySelectorAll('.image-layer img').forEach(makeDraggable);