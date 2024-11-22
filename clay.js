const canvas = document.getElementById('clay-canvas');
const ctx = canvas.getContext('2d');

// Set up canvas dimensions
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

// Initialize clay color
ctx.fillStyle = '#d2cfcf';
ctx.fillRect(0, 0, canvas.width, canvas.height);

// Variables for manipulation
let isDragging = false;
let clayPieces = [];
let currentPiece = null;

// Function to create clay piece
function createClayPiece(x, y) {
  const radius = 20; // Size of the piece
  const piece = {
    x: x - radius / 2,
    y: y - radius / 2,
    radius: radius,
    color: '#b9b6b6', // A slightly darker taupe
    dx: 0,
    dy: 0,
    isDragging: false,
  };
  clayPieces.push(piece);
  return piece;
}

// Function to draw clay pieces
function drawClayPieces() {
  ctx.fillStyle = '#d2cfcf'; // Clay base color
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Render each piece
  clayPieces.forEach(piece => {
    ctx.beginPath();
    ctx.arc(piece.x, piece.y, piece.radius, 0, Math.PI * 2);
    ctx.fillStyle = piece.color;
    ctx.fill();
  });
}

// Check if a piece is being clicked
function findPiece(x, y) {
  return clayPieces.find(piece => {
    const dist = Math.hypot(piece.x - x, piece.y - y);
    return dist < piece.radius;
  });
}

// Mouse event handlers
canvas.addEventListener('mousedown', (e) => {
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const piece = findPiece(x, y);

  if (piece) {
    isDragging = true;
    piece.isDragging = true;
    piece.dx = x - piece.x;
    piece.dy = y - piece.y;
    currentPiece = piece;
  } else {
    const newPiece = createClayPiece(x, y);
    isDragging = true;
    newPiece.isDragging = true;
    currentPiece = newPiece;
  }
});

canvas.addEventListener('mousemove', (e) => {
  if (!isDragging) return;

  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  if (currentPiece && currentPiece.isDragging) {
    currentPiece.x = x - currentPiece.dx;
    currentPiece.y = y - currentPiece.dy;
  }

  drawClayPieces();
});

canvas.addEventListener('mouseup', () => {
  isDragging = false;
  if (currentPiece) {
    currentPiece.isDragging = false;
    currentPiece = null;
  }
});

canvas.addEventListener('mouseleave', () => {
  isDragging = false;
  if (currentPiece) {
    currentPiece.isDragging = false;
    currentPiece = null;
  }
});

// Initial draw
drawClayPieces();