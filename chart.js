const WIDTH = 60;

// must match editor palette
const palette = ["#111111", "#8b2f2f", "#3fe3a2", "#ffffff"];

function render() {
  const str = document.getElementById("pattern").value.trim();
  const data = str.split("").map(n => parseInt(n));

  const chart = document.getElementById("chart");
  chart.innerHTML = "";
  chart.style.gridTemplateColumns = `repeat(${WIDTH}, 10px)`;

  const counts = {};

  data.forEach(v => {
    const c = document.createElement("div");
    c.className = "cell";
    c.style.background = palette[v];
    chart.appendChild(c);
    counts[v] = (counts[v] || 0) + 1;
  });

  renderPalette(counts);
}

function renderPalette(counts) {
  const p = document.getElementById("palette");
  p.innerHTML = "";

  palette.forEach((c, i) => {
    const s = document.createElement("div");
    s.className = "swatch";

    const box = document.createElement("div");
    box.className = "color";
    box.style.background = c;

    const label = document.createElement("div");
    label.textContent = counts[i] || 0;

    s.appendChild(box);
    s.appendChild(label);
    p.appendChild(s);
  });
}