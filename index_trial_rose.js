const canvas = document.getElementById("gradientCanvas");
const ctx = canvas.getContext("2d");
const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);

let phase = 0;
const speed = 0.005; // Adjust the speed of color change

function updateGradient() {
    gradient.addColorStop(0, `hsl(${phase * 360}, 100%, 50%)`);
    gradient.addColorStop(1, `hsl(${(phase + 0.5) * 360}, 100%, 50%)`);

    phase += speed;
    if (phase >= 1) {
        phase = 0; // Reset phase to loop the colors
    }
}

function drawGradient() {
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function animate() {
    updateGradient();
    drawGradient();
    requestAnimationFrame(animate);
}

// Start the animation
animate();
