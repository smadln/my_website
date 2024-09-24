function makeDraggable(element) {
    let isDragging = false;
    let startX, startY, initialX, initialY;

    // Function to handle the start of the drag (for both mouse and touch)
    function dragStart(e) {
        isDragging = true;
        
        // For touch events, we need to get the first touch point
        if (e.type === 'touchstart') {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        } else {
            startX = e.clientX;
            startY = e.clientY;
        }

        const computedStyle = window.getComputedStyle(element);
        const matrix = new WebKitCSSMatrix(computedStyle.transform);
        
        initialX = matrix.m41;
        initialY = matrix.m42;

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
        document.addEventListener('touchmove', onTouchMove);
        document.addEventListener('touchend', onTouchEnd);
        
        // Prevent default touch behavior to avoid issues with scrolling
        e.preventDefault();
    }

    // Function to handle dragging with mouse
    function onMouseMove(e) {
        if (!isDragging) return;

        const deltaX = e.clientX - startX;
        const deltaY = e.clientY - startY;

        element.style.transform = `translate(${initialX + deltaX}px, ${initialY + deltaY}px)`;
    }

    // Function to handle dragging with touch
    function onTouchMove(e) {
        if (!isDragging) return;

        const deltaX = e.touches[0].clientX - startX;
        const deltaY = e.touches[0].clientY - startY;

        element.style.transform = `translate(${initialX + deltaX}px, ${initialY + deltaY}px)`;

        // Prevent scrolling while dragging
        e.preventDefault();
    }

    // Function to handle the end of dragging (for both mouse and touch)
    function dragEnd() {
        isDragging = false;
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
        document.removeEventListener('touchmove', onTouchMove);
        document.removeEventListener('touchend', onTouchEnd);
    }

    // Event listeners for both mouse and touch events
    element.addEventListener('mousedown', dragStart);
    element.addEventListener('touchstart', dragStart);
    document.addEventListener('mouseup', dragEnd);
    document.addEventListener('touchend', dragEnd);
}

// Apply the draggable functionality to all images within image-layer
document.querySelectorAll('.image-layer img').forEach(makeDraggable);function makeDraggable(element) {
    let isDragging = false;
    let startX, startY, initialX, initialY;

    // Function to handle the start of the drag (for both mouse and touch)
    function dragStart(e) {
        isDragging = true;
        
        // For touch events, we need to get the first touch point
        if (e.type === 'touchstart') {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        } else {
            startX = e.clientX;
            startY = e.clientY;
        }

        const computedStyle = window.getComputedStyle(element);
        const matrix = new WebKitCSSMatrix(computedStyle.transform);
        
        initialX = matrix.m41;
        initialY = matrix.m42;

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
        document.addEventListener('touchmove', onTouchMove);
        document.addEventListener('touchend', onTouchEnd);
        
        // Prevent default touch behavior to avoid issues with scrolling
        e.preventDefault();
    }

    // Function to handle dragging with mouse
    function onMouseMove(e) {
        if (!isDragging) return;

        const deltaX = e.clientX - startX;
        const deltaY = e.clientY - startY;

        element.style.transform = `translate(${initialX + deltaX}px, ${initialY + deltaY}px)`;
    }

    // Function to handle dragging with touch
    function onTouchMove(e) {
        if (!isDragging) return;

        const deltaX = e.touches[0].clientX - startX;
        const deltaY = e.touches[0].clientY - startY;

        element.style.transform = `translate(${initialX + deltaX}px, ${initialY + deltaY}px)`;

        // Prevent scrolling while dragging
        e.preventDefault();
    }

    // Function to handle the end of dragging (for both mouse and touch)
    function dragEnd() {
        isDragging = false;
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
        document.removeEventListener('touchmove', onTouchMove);
        document.removeEventListener('touchend', onTouchEnd);
    }

    // Event listeners for both mouse and touch events
    element.addEventListener('mousedown', dragStart);
    element.addEventListener('touchstart', dragStart);
    document.addEventListener('mouseup', dragEnd);
    document.addEventListener('touchend', dragEnd);
}

// Apply the draggable functionality to all images within image-layer
document.querySelectorAll('.image-layer img').forEach(makeDraggable);