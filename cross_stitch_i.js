document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById("stitchCanvas");
    const colorPicker = document.getElementById("stitchColor");
    const undoBtn = document.getElementById("undo");
    const redoBtn = document.getElementById("redo");
    const saveBtn = document.getElementById("save");
    const loadBtn = document.getElementById("load");

    const gridSize = 20; // 20x20 grid
    let history = [];
    let redoStack = [];

    // Generate the grid
    for (let i = 0; i < gridSize * gridSize; i++) {
        let cell = document.createElement("div");
        cell.classList.add("stitch");
        cell.dataset.index = i;
        
        cell.addEventListener("click", function () {
            addToHistory();
            let color = colorPicker.value;
            if (!cell.classList.contains("x-stitch")) {
                cell.classList.add("x-stitch");
                cell.style.setProperty('--stitch-color', color);
            } else {
                cell.classList.remove("x-stitch");
                cell.style.setProperty('--stitch-color', 'transparent');
            }
        });

        canvas.appendChild(cell);
    }

    function addToHistory() {
        let state = [...document.querySelectorAll(".stitch")].map(cell => ({
            color: cell.style.getPropertyValue('--stitch-color'),
            xStitch: cell.classList.contains("x-stitch")
        }));
        history.push(state);
        redoStack = []; // Clear redo history
    }

    function restoreState(state) {
        document.querySelectorAll(".stitch").forEach((cell, i) => {
            cell.classList.toggle("x-stitch", state[i].xStitch);
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
            xStitch: cell.classList.contains("x-stitch")
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

    addToHistory(); // Store initial empty state
});