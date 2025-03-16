document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById("stitchCanvas");
    const colorPicker = document.getElementById("stitchColor");
    const gridSize = 20; // 20x20 grid

    // Generate the grid
    for (let i = 0; i < gridSize * gridSize; i++) {
        let cell = document.createElement("div");
        cell.classList.add("stitch");
        cell.addEventListener("click", function () {
            cell.style.backgroundColor = colorPicker.value;
        });
        canvas.appendChild(cell);
    }
});