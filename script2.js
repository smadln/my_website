// Function to handle each image
function handleImage(img) {
    let imgWidth = img.offsetWidth;
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
  
        if (position >= window.innerWidth - imgWidth) {
          movingRight = false;
          position = window.innerWidth - imgWidth;
        }
        if (position <= 0) {
          movingRight = true;
          position = 0;
        }
  
        img.style.left = position + "px";
      }
    }, 30);
  
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
  }
  
  // Get all interactive images and apply the function to each of them
  const images = document.querySelectorAll(".interactive-img");
  images.forEach(handleImage);
  