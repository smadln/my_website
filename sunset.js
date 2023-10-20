let mouse = { x: 0, y: 0 };
let myWidth = 0, myHeight = 0;
let mouseIsDown = false;
let mouseIsDownDivision = false;

const updateDimensions = () => {
  myWidth = window.innerWidth;
  myHeight = window.innerHeight;
};

const updateElementStyle = (elementId, property, value) => {
  document.getElementById(elementId).style[property] = value;
};

const updateBackground = (elementId, gradientParams) => {
  const el = document.getElementById(elementId);
  const prefixes = ['-webkit-', '-moz-', '-ms-'];
  prefixes.forEach(prefix => {
    el.style.background = `${prefix}radial-gradient(${gradientParams})`;
  });
};

const updateOpacity = (elementId, value) => {
  document.getElementById(elementId).style.opacity = value;
};

document.addEventListener('mousemove', function(e) {
  mouse.x = e.clientX || e.pageX; 
  mouse.y = e.clientY || e.pageY;
  updateDimensions();

  const sunGradient = `${mouse.x}px ${mouse.y}px, circle, rgba(242,248,247,1) 0%,rgba(249,249,28,1) 3%,rgba(247,214,46,1) 8%, rgba(248,200,95,1) 12%,rgba(201,165,132,1) 30%,rgba(115,130,133,1) 51%,rgba(46,97,122,1) 85%,rgba(24,75,106,1) 100%`;
  const sunDayGradient = `${mouse.x}px ${mouse.y}px, circle, rgba(252,255,251,0.9) 0%,rgba(253,250,219,0.4) 30%,rgba(226,219,197,0.01) 70%, rgba(226,219,197,0.0) 70%,rgba(201,165,132,0) 100%`;
  const sunSetGradient = `${mouse.x}px ${mouse.y}px, circle, rgba(254,255,255,0.8) 5%,rgba(236,255,0,1) 10%,rgba(253,50,41,1) 25%, rgba(243,0,0,1) 40%,rgba(93,0,0,1) 100%`;

  updateBackground("sun", sunGradient);
  updateBackground("sunDay", sunDayGradient);
  updateBackground("sunSet", sunSetGradient);

  updateElementStyle("sandTextureContainer", "perspectiveOrigin", `${(mouse.x/myWidth*100).toString()}% -15%`);
  updateElementStyle("sandTextureMiddle", "left", `${(mouse.x-myWidth-(myWidth*.03)).toString()}px`);

  const opacityValue = (mouse.y/myHeight-0.6).toString();
  updateOpacity("starsContainer", opacityValue);
  
  // Other logic for updating styles and elements can go here
});

function startMove() {
  mouseIsDown = true;
}

function stopMove() {
  mouseIsDown = false;
  mouseIsDownDivision = false;
}

function startDraggingDivision() {
  mouseIsDownDivision = true;
}

function windowResize() {
  updateDimensions();
}
