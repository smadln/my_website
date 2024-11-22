const canvas = document.getElementById('clay-canvas');
const ctx = canvas.getContext('2d');

// Set up canvas dimensions
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

// Blob object class
class Blob {
  constructor(x, y, radius, points = 30) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.vertices = this.generateVertices(radius, points);
    this.isDragging = false;
  }

  // Generate smoother irregular shape using noise
  generateVertices(radius, points) {
    const vertices = [];
    const noiseFactor = 0.4; // Adjust for more or less irregularity
    for (let i = 0; i < points; i++) {
      const angle = (i / points) * Math.PI * 2;
      const offset = Math.random() * radius * noiseFactor; // Noise for irregularity
      vertices.push({
        x: this.x + (radius + offset) * Math.cos(angle),
        y: this.y + (radius + offset) * Math.sin(angle),
      });
    }
    return vertices;
  }

  // Draw the blob with smooth curves
  draw(ctx) {
    ctx.beginPath();
    for (let i = 0; i < this.vertices.length; i++) {
      const current = this.vertices[i];
      const next = this.vertices[(i + 1) % this.vertices.length];
      const controlX = (current.x + next.x) / 2; // Control point for Bézier curve
      const controlY = (current.y + next.y) / 2;
      if (i === 0) {
        ctx.moveTo(controlX, controlY);
      }
      ctx.quadraticCurveTo(current.x, current.y, controlX, controlY);
    }
    ctx.closePath();

    // Apply gradient shading
    const gradient = ctx.createRadialGradient(this.x, this.y, this.radius * 0.5, this.x, this.y, this.radius);
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

  // Tear off a new blob by splitting vertices
  tear(x, y) {
    const tearIndex = this.vertices.findIndex(v => Math.hypot(v.x - x, v.y - y) < 20);
    if (tearIndex === -1) return null;

    // Split the blob into two parts
    const newVertices = this.vertices.splice(tearIndex);
    if (newVertices.length < 3) return null; // Avoid creating blobs with too few vertices
    return new Blob(x, y, this.radius / 2, newVertices.length);
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

  // Reshape blob by moving vertices
  reshape(vertexIndex, dx, dy) {
    const vertex = this.vertices[vertexIndex];
    vertex.x += dx;
    vertex.y += dy;

    // Smooth neighboring vertices to maintain continuity
    const prevIndex = (vertexIndex - 1 + this.vertices.length) % this.vertices.length;
    const nextIndex = (vertexIndex + 1) % this.vertices.length;

    this.vertices[prevIndex].x += dx * 0.2;
    this.vertices[prevIndex].y += dy * 0.2;
    this.vertices[nextIndex].x += dx * 0.2;
    this.vertices[nextIndex].y += dy * 0.2;
  }
}

// Global variables
let blobs = [new Blob(canvas.width / 2, canvas.height / 2, 100)];
let selectedBlob = null;
let selectedVertexIndex = null;
let isDraggingBlob = false;

// Render all blobs
function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  blobs.forEach(blob => blob.draw(ctx));
}

// Mouse events
canvas.addEventListener('mousedown', (e) => {
  const rect = canvas.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;

  selectedBlob = null;
  selectedVertexIndex = null;

  // Check if the user clicked on a blob or its vertices
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

  // Tear a new blob if clicking outside an existing one
  if (!selectedBlob) {
    for (let blob of blobs) {
      if (blob.isPointInside(mouseX, mouseY)) {
        const newBlob = blob.tear(mouseX, mouseY);
        if (newBlob) blobs.push(newBlob);
        render();
        break;
      }
    }
  }
});

canvas.addEventListener('mousemove', (e) => {
  if (!selectedBlob) return;

  const rect = canvas.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;

  if (selectedVertexIndex !== null) {
    const dx = mouseX - selectedBlob.vertices[selectedVertexIndex].x;
    const dy = mouseY - selectedBlob.vertices[selectedVertexIndex].y;
    selectedBlob.reshape(selectedVertexIndex, dx, dy);
  } else if (isDraggingBlob) {
    const dx = mouseX - selectedBlob.x;
    const dy = mouseY - selectedBlob.y;
    selectedBlob.move(dx, dy);
  }

  render();
});

canvas.addEventListener('mouseup', () => {
  selectedBlob = null;
  selectedVertexIndex = null;
  isDraggingBlob = false;
});

// Initial render
render();
