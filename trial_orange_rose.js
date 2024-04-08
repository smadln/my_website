const canvas = document.getElementById("gradientCanvas");
const ctx = canvas.getContext("2d");
const speed = 0.002; // Adjust the speed of color change
let phase = 0;

function updateGradient() {
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height); // Vertical gradient

    const colors = [
        [136, 255, 209],
        [251, 255, 135],
        [136, 255, 209]
    ];

    const sectionLength = 1 / colors.length;

    // Calculate the current section and the phase within that section
    const sectionIndex = Math.floor(phase / sectionLength);
    const localPhase = (phase % sectionLength) / sectionLength;

    const color1 = colors[sectionIndex];
    const color2 = colors[(sectionIndex + 1) % colors.length];

    // Interpolate between colors based on the phase within the current section
    const interpolatedColor = interpolateColor(color1, color2, localPhase);

    gradient.addColorStop(0, `rgb(${color1.join(',')})`);
    gradient.addColorStop(1, `rgb(${interpolatedColor.join(',')})`);

    ctx.fillStyle = gradient;
}

// Linear interpolation function
function lerp(a, b, t) {
    return a + (b - a) * t;
}

// Interpolate between colors using linear interpolation
function interpolateColor(color1, color2, t) {
    return color1.map((channel, index) =>
        Math.round(lerp(channel, color2[index], t))
    );
}

function drawGradient() {
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function animate() {
    updateGradient();
    drawGradient();
    phase += speed;
    if (phase >= 1) {
        phase = 0; // Reset phase to loop the colors
    }
    requestAnimationFrame(animate);
}

// Start the animation
animate();

