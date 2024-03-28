// Function to generate and set the gradient background
function setGradientBackground() {
    const container = document.getElementById('background-container');
    const colors = ['rgb(136, 172, 255)', 'lightyellow', 'rgb(255, 213, 135)'];
    let currentIndex = 0;

    // Function to update the background gradient
    function updateGradient() {
        currentIndex = (currentIndex + 1) % colors.length;
        const nextIndex = (currentIndex + 1) % colors.length;
        const gradient = `linear-gradient(to bottom, ${colors[currentIndex]}, ${colors[nextIndex]})`;
        container.style.background = gradient;
    }

    // Update the gradient every 5 seconds (adjust as needed)
    setInterval(updateGradient, 5000); // 5000 milliseconds = 5 seconds
}

// Call the function to start the gradient animation
setGradientBackground();
