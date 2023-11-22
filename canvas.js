const canvas = document.getElementById("gradientCanvas");
const ctx = canvas.getContext("2d");

function drawGradient() {
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);

    // Define gradient colors and positions
    gradient.addColorStop(0, "red");
    gradient.addColorStop(0.5, "green");
    gradient.addColorStop(1, "blue");

    // Fill the canvas with the gradient
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function animateGradient() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update gradient colors based on time or user input
    // You can use a variety of techniques to change colors dynamically

    // Call the drawGradient function
    drawGradient();

    // Repeat the animation
    requestAnimationFrame(animateGradient);
}

// Start the animation
animateGradient();