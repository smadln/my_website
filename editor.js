const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const WIDTH = 60;
const HEIGHT = 90;
const CELL = 8;

canvas.width = WIDTH * CELL;
canvas.height = HEIGHT * CELL;

// palette index 0 = background
let palette = ["#111111", "#8b2f2f", "#3fe3a2", "#ffffff"];
let current = 1;

// grid stored as flat array
let grid = Array(WIDTH * HEIGHT).fill(0);
let drawing = false;

// ---------- DRAW ----------
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  grid.forEach((v, i) => {
    const x = i % WIDTH;
    const y = Math.floor(i / WIDTH);
    const color = palette[v];

    const cx = x * CELL + CELL / 2;
    const cy = y * CELL + CELL / 2;

    ctx.globalAlpha = 0.6;
    ctx.shadowBlur = 10;
    ctx.shadowColor = color;
    ctx.fillStyle = color;

    ctx.beginPath();
    ctx.arc(cx, cy, CELL / 2, 0, Math.PI * 2);
    ctx.fill();

    ctx.globalAlpha = 1;
    ctx.shadowBlur = 0;
  });
}

// ---------- INPUT ----------
canvas.addEventListener("mousedown", () => drawing = true);
canvas.addEventListener("mouseup", () => drawing = false);
canvas.addEventListener("mouseleave", () => drawing = false);

canvas.addEventListener("mousemove", e => {
  if (!drawing) return;

  const r = canvas.getBoundingClientRect();
  const x = Math.floor((e.clientX - r.left) / CELL);
  const y = Math.floor((e.clientY - r.top) / CELL);
  const i = y * WIDTH + x;

  if (grid[i] !== undefined) {
    grid[i] = current;
    updatePattern();
    draw();
  }
});

// ---------- PALETTE ----------
function renderPalette() {
  const p = document.getElementById("palette");
  p.innerHTML = "";

  palette.forEach((c, i) => {
    const b = document.createElement("button");
    b.style.background = c;
    b.onclick = () => current = i;
    p.appendChild(b);
  });
}

// ---------- GRADIENT ----------
function makeGradient() {
  const start = document.getElementById("start").value;
  const end = document.getElementById("end").value;
  const steps = parseInt(document.getElementById("steps").value);

  palette = [palette[0], ...gradient(start, end, steps)];
  renderPalette();
  draw();
}

function gradient(a, b, n) {
  const A = hex(a), B = hex(b);
  return Array.from({ length: n }, (_, i) => {
    const t = i / (n - 1);
    return rgb(
      A.r + t * (B.r - A.r),
      A.g + t * (B.g - A.g),
      A.b + t * (B.b - A.b)
    );
  });
}

function hex(h) {
  return {
    r: parseInt(h.slice(1,3),16),
    g: parseInt(h.slice(3,5),16),
    b: parseInt(h.slice(5,7),16)
  };
}

function rgb(r,g,b) {
  return "#" + [r,g,b].map(v =>
    Math.round(v).toString(16).padStart(2,"0")
  ).join("");
}

// ---------- PATTERN ----------
function updatePattern() {
  document.getElementById("pattern").value = grid.join("");
}

renderPalette();
draw();
updatePattern();