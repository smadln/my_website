document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById("stitchCanvas");
    const colorPicker = document.getElementById("stitchColor");
    const undoBtn = document.getElementById("undo");
    const redoBtn = document.getElementById("redo");
    const saveBtn = document.getElementById("save");
    const loadBtn = document.getElementById("load");
    const xStitchBtn = document.getElementById("x-stitch-mode");
    const fillBtn = document.getElementById("fill-mode");
    const eraserBtn = document.getElementById("eraser");

    const gridSize = 20; // 20x20 grid
    let history = [];
    let redoStack = [];
    let stitchMode = "x-stitch"; // Default to cross-stitch mode

    // Generate the grid
    function createGrid() {
        canvas.innerHTML = ""; // Clear existing grid
        for (let i = 0; i < gridSize * gridSize; i++) {
            let cell = document.createElement("div");
            cell.classList.add("stitch");
            cell.dataset.index = i;

            cell.addEventListener("click", function () {
                addToHistory();
                let color = colorPicker.value;

                if (stitchMode === "x-stitch") {
                    cell.classList.add("x-stitch");
                    cell.classList.remove("fill-stitch");
                    cell.style.setProperty('--stitch-color', color);
                } else if (stitchMode === "fill-stitch") {
                    cell.classList.add("fill-stitch");
                    cell.classList.remove("x-stitch");
                    cell.style.setProperty('--stitch-color', color);
                } else if (stitchMode === "eraser") {
                    cell.classList.remove("x-stitch", "fill-stitch");
                    cell.style.setProperty('--stitch-color', 'transparent');
                }
            });

            canvas.appendChild(cell);
        }
        addToHistory(); // Store initial empty state
    }

    function addToHistory() {
        let state = [...document.querySelectorAll(".stitch")].map(cell => ({
            color: cell.style.getPropertyValue('--stitch-color'),
            xStitch: cell.classList.contains("x-stitch"),
            fillStitch: cell.classList.contains("fill-stitch")
        }));
        history.push(state);
        redoStack = []; // Clear redo history
    }

    function restoreState(state) {
        document.querySelectorAll(".stitch").forEach((cell, i) => {
            cell.classList.toggle("x-stitch", state[i].xStitch);
            cell.classList.toggle("fill-stitch", state[i].fillStitch);
            cell.style.setProperty('--stitch-color', state[i].color);
        });
    }

    undoBtn.addEventListener("click", function () {
        if (history.length > 1) {
            redoStack.push(history.pop());
            restoreState(history[history.length - 1]);
        }
    });

    redoBtn.addEventListener("click", function () {
        if (redoStack.length > 0) {
            let state = redoStack.pop();
            history.push(state);
            restoreState(state);
        }
    });

    saveBtn.addEventListener("click", function () {
        let savedData = [...document.querySelectorAll(".stitch")].map(cell => ({
            color: cell.style.getPropertyValue('--stitch-color'),
            xStitch: cell.classList.contains("x-stitch"),
            fillStitch: cell.classList.contains("fill-stitch")
        }));
        localStorage.setItem("crossStitchPattern", JSON.stringify(savedData));
        alert("Pattern saved!");
    });

    loadBtn.addEventListener("click", function () {
        let savedData = localStorage.getItem("crossStitchPattern");
        if (savedData) {
            savedData = JSON.parse(savedData);
            restoreState(savedData);
            history.push(savedData);
            alert("Pattern loaded!");
        } else {
            alert("No saved pattern found.");
        }
    });

    // Switch modes
    xStitchBtn.addEventListener("click", function () {
        stitchMode = "x-stitch";
    });

    fillBtn.addEventListener("click", function () {
        stitchMode = "fill-stitch";
    });

    eraserBtn.addEventListener("click", function () {
        stitchMode = "eraser";
    });

    createGrid(); // Initialize grid on page load
});