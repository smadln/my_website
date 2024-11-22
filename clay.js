const canvas = document.getElementById('clay-canvas');
const ctx = canvas.getContext('2d');

// Set up canvas dimensions
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

// Blob object class
class Blob {
  constructor(x, y, radius, points = 20) {
    this.x = x;
    this.y = y;
    this.vertices = this.generateVertices(radius, points);
    this.isDragging = false;
    this.isSelected = false;
  }

  // Generate an irregular blob shape with vertices
  generateVertices(radius, points) {
    const vertices = [];
    for (let i = 0; i < points; i++) {
      const angle = (i / points) * Math.PI * 2;
      const offset = Math.random() * radius * 0.3; // Randomize for unevenness
      vertices.push({
        x: this.x + (radius + offset) * Math.cos(angle),
        y: this.y + (radius + offset) * Math.sin(angle),
      });
    }
    return vertices;
  }

  // Draw the blob with dynamic shading
  draw(ctx) {
    ctx.beginPath();
    const start = this.vertices[0];
    ctx.moveTo(start.x, start.y);
    this.vertices.forEach(v => ctx.lineTo(v.x, v.y));
    ctx.closePath();

    // Apply gradient shading
    const gradient = ctx.createRadialGradient(this.x, this.y, 10, this.x, this.y, 100);
    gradient.addColorStop(0, '#d2cfcf');
    gradient.addColorStop(1, '#b9b6b6');
    ctx.fillStyle = gradient;
    ctx.fill();

    ctx.strokeStyle = '#9e9e9e';
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  // Check if a point is inside the blob
  isPointInside(x, y) {
    let inside = false;
    for (let i = 0, j = this.vertices.length - 1; i < this.vertices.length; j = i++) {
      const xi = this.vertices[i].x, yi = this.vertices[i].y;
      const xj = this.vertices[j].x, yj = this.vertices[j].y;
      const intersect = ((yi > y) !== (yj > y)) &&
                        (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
      if (intersect) inside = !inside;
    }
    return inside;
  }

  // Move the blob
  move(dx, dy) {
    this.vertices.forEach(v => {
      v.x += dx;
      v.y += dy;
    });
    this.x += dx;
    this.y += dy;
  }

  // Reshape blob by pulling a point
  reshape(vertexIndex, dx, dy) {
    this.vertices[vertexIndex].x += dx;
    this.vertices[vertexIndex].y += dy;
  }
}

// Global variables
let blobs = [new Blob(canvas.width / 2, canvas.height / 2, 100)]; // Initial clay blob
let selectedBlob = null;
let selectedVertexIndex = null;
let isDraggingBlob = false;

// Render all blobs
function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  blobs.forEach(blob => blob.draw(ctx));
}

// Handle mouse down
canvas.addEventListener('mousedown', (e) => {
  const rect = canvas.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;

  selectedBlob = null;
  selectedVertexIndex = null;

  // Check if the user clicked on any blob or its vertices
  for (let blob of blobs) {
    if (blob.isPointInside(mouseX, mouseY)) {
      selectedBlob = blob;

      // Check if the user clicked near a vertex
      blob.vertices.forEach((vertex, index) => {
        if (Math.hypot(vertex.x - mouseX, vertex.y - mouseY) < 10) {
          selectedVertexIndex = index;
        }
      });

      if (selectedVertexIndex === null) {
        isDraggingBlob = true;
      }
      break;
    }
  }

  // If no blob is selected, create a tear and form a new blob
  if (!selectedBlob) {
    for (let blob of blobs) {
      if (blob.isPointInside(mouseX, mouseY)) {
        const newBlob = createTornBlob(blob, mouseX, mouseY);
        blobs.push(newBlob);
        render();
        break;
      }
    }
  }
});

// Handle mouse move
canvas.addEventListener('mousemove', (e) => {
  if (!selectedBlob) return;

  const rect = canvas.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;

  if (selectedVertexIndex !== null) {
    // Reshape the blob by moving the selected vertex
    const vertex = selectedBlob.vertices[selectedVertexIndex];
    const dx = mouseX - vertex.x;
    const dy = mouseY - vertex.y;
    selectedBlob.reshape(selectedVertexIndex, dx, dy);
  } else if (isDraggingBlob) {
    // Move the entire blob
    const dx = mouseX - selectedBlob.x;
    const dy = mouseY - selectedBlob.y;
    selectedBlob.move(dx, dy);
  }

  render();
});

// Handle mouse up
canvas.addEventListener('mouseup', () => {
  selectedBlob = null;
  selectedVertexIndex = null;
  isDraggingBlob = false;
});

// Create a new blob from a torn section
function createTornBlob(blob, x, y) {
  const newBlobVertices = blob.vertices.splice(Math.floor(blob.vertices.length / 2)); // Split blob vertices
  return new Blob(x, y, 50, newBlobVertices.length); // New smaller blob
}

// Initial render
render();