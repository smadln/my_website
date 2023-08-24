// JavaScript code
const bound = document.getElementById('bound-one');
const video = bound.querySelector('video');

window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    video.style.transform = `translateY(-${scrollPosition * 0.8}px)`; // Adjust the factor for parallax effect
});