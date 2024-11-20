const floatingImage = document.getElementById('sunset-moth');

let aimlessMove;

function updateImagePosition(event) {
    const x = event.clientX + 20;  
    const y = event.clientY + 20;  
    floatingImage.style.left = `${x}px`;
    floatingImage.style.top = `${y}px`;
    clearInterval(aimlessMove);
    aimlessMove = setInterval(aimlessDrift, 4000);  // Restart aimless drifting
}

function aimlessDrift() {
    const x = Math.random() * (window.innerWidth - 100);  // Subtracting 100 to prevent the image from going off-screen
    const y = Math.random() * (window.innerHeight - 100); 
    floatingImage.style.left = `${x}px`;
    floatingImage.style.top = `${y}px`;
}

document.addEventListener('mousemove', updateImagePosition);

document.addEventListener('DOMContentLoaded', function () {
    const cursor = document.querySelector(".custom-cursor");

    document.addEventListener("mousemove", (e) => {
        cursor.style.left = e.pageX + "px";
        cursor.style.top = e.pageY + "px";
    });

    aimlessMove = setInterval(aimlessDrift, 4000);  // 4 seconds interval
});