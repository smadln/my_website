let img = document.getElementById("interactive-img");
let movingRight = true;
let isDragging = false;

// Move the image automatically
setInterval(() => {
  if (!isDragging) {
    let position = parseInt(window.getComputedStyle(img).left, 10);
    if (movingRight) {
      position += 1;
    } else {
      position -= 1;
    }

    if (position >= window.innerWidth - 100) {
      movingRight = false;
    }
    if (position <= 0) {
      movingRight = true;
    }

    img.style.left = position + "px";
  }
}, 20);

// Make the image draggable
img.addEventListener("mousedown", (e) => {
  isDragging = true;
  img.style.cursor = "grabbing";

  let offsetX = e.clientX - parseInt(window.getComputedStyle(img).left, 10);
  let offsetY = e.clientY - parseInt(window.getComputedStyle(img).top, 10);

  document.addEventListener("mousemove", onMouseMove);
  document.addEventListener("mouseup", onMouseUp);

  function onMouseMove(e) {
    img.style.left = (e.clientX - offsetX) + "px";
    img.style.top = (e.clientY - offsetY) + "px";
  }

  function onMouseUp() {
    isDragging = false;
    img.style.cursor = "grab";
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
  }
});