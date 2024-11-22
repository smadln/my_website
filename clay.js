const canvas = document.getElementById('clay-canvas');
const ctx = canvas.getContext('2d');

// Set up canvas dimensions
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

// Variables for clay manipulation
let blobs = [
  { x: canvas.width / 2, y: canvas.height / 2, radius: 100, isDragging: false, color: '#d2cfcf' }
];
let activeBlob = null;
let isDragging = false;
let stretchPoint = null;

// Helper function to draw blobs
function drawBlob(blob) {
  ctx.beginPath();
  ctx.arc(blob.x, blob.y, blob.radius, 0, Math.PI * 2);
  ctx.fillStyle = blob.color;
  ctx.fill();

  // Add dynamic shading
  const gradient = ctx.createRadialGradient(blob.x, blob.y, blob.radius * 0.5, blob.x, blob.y, blob.radius);
  gradient.addColorStop(0, '#e0e0e0');
  gradient.addColorStop(1, '#b9b6b6');
  ctx.fillStyle = gradient;
  ctx.fill();
}

// Function to render all blobs
function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  blobs.forEach(blob => {
    drawBlob(blob);
  });
}

// Function to find the clicked blob
function findBlob(x, y) {
  return blobs.find(blob => Math.hypot(blob.x - x, blob.y - y) < blob.radius);
}

// Function to create a new blob
function createBlob(x, y) {
  const radius = 50; // Smaller blobs
  const blob = { x, y, radius, isDragging: false, color: '#d2cfcf' };
  blobs.push(blob);
  return blob;
}

// Mouse events
canvas.addEventListener('mousedown', (e) => {
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const blob = findBlob(x, y);
  if (blob) {
    isDragging = true;
    activeBlob = blob;
  } else {
    const newBlob = createBlob(x, y);
    activeBlob = newBlob;
    isDragging = true;
  }
});

canvas.addEventListener('mousemove', (e) => {
  if (!isDragging) return;

  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  if (activeBlob) {
    const distance = Math.hypot(activeBlob.x - x, activeBlob.y - y);
    if (distance > activeBlob.radius * 0.5 && distance < activeBlob.radius * 1.5) {
      // Stretch the blob
      stretchPoint = { x, y };
      activeBlob.radius = Math.min(150, Math.max(30, distance)); // Size constraints
    } else {
      // Move the blob
      activeBlob.x = x;
      activeBlob.y = y;
    }
  }
  render();
});

canvas.addEventListener('mouseup', () => {
  isDragging = false;
  activeBlob = null;
  stretchPoint = null;
});

canvas.addEventListener('mouseleave', () => {
  isDragging = false;
  activeBlob = null;
  stretchPoint = null;
});

// Initial render
render();