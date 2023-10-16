let img = document.getElementById("interactive-img");
let imgWidth = img.offsetWidth;
let movingRight = true;
let isDragging = false;

// Update the image width dynamically in case of window resizing
window.addEventListener("resize", () => {
    imgWidth = img.offsetWidth;
});

// Move the image automatically
setInterval(() => {
  if (!isDragging) {
    let position = parseInt(window.getComputedStyle(img).left, 10);
    if (movingRight) {
      position += 1;
    } else {
      position -= 1;
    }

    // Keep image within bounds
    if (position >= window.innerWidth - imgWidth) {
        movingRight = false;
        position = window.innerWidth - imgWidth;  // Correct the position
    }
      if (position <= 0) {
        movingRight = true;
        position = 0;  // Correct the position
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