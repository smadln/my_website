document.addEventListener('DOMContentLoaded', function () {
    const floatingImage = document.getElementById('sunset-moth');
    const cursor = document.querySelector(".custom-cursor");
    let aimlessMove;

    if (floatingImage) {
        // Update image position to follow the cursor
        function updateImagePosition(event) {
            const x = Math.min(event.clientX + 20, window.innerWidth - floatingImage.offsetWidth);
            const y = Math.min(event.clientY + 20, window.innerHeight - floatingImage.offsetHeight);
            floatingImage.style.left = `${x}px`;
            floatingImage.style.top = `${y}px`;

            // Restart aimless drifting
            clearInterval(aimlessMove);
            aimlessMove = setInterval(aimlessDrift, 4000);
        }

        // Random aimless drift for the image
        function aimlessDrift() {
            const x = Math.random() * (window.innerWidth - floatingImage.offsetWidth);
            const y = Math.random() * (window.innerHeight - floatingImage.offsetHeight);
            floatingImage.style.left = `${x}px`;
            floatingImage.style.top = `${y}px`;
        }

        // Attach event listener for mouse movement
        document.addEventListener('mousemove', updateImagePosition);

        // Start aimless drifting on load
        aimlessMove = setInterval(aimlessDrift, 4000);
    } else {
        console.error('Element #sunset-moth not found!');
    }

    // Custom cursor functionality
    if (cursor) {
        document.addEventListener("mousemove", (e) => {
            cursor.style.left = e.pageX + "px";
            cursor.style.top = e.pageY + "px";
        });
    } else {
        console.error('Custom cursor element not found!');
    }
});