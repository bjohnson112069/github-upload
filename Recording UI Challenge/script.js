const video = document.querySelector('.player');
const canvas = document.querySelector('.draw');
const ctx = canvas.getContext('2d');
const recorder = document.querySelector(".recorder");
const zoom = document.querySelector(".zoom-level");
const timer = document.querySelector(".timer");
const main = document.querySelector("main");
const footer = document.querySelector("footer");

let isDrawing = false;
let lastX = 0;
let lastY = 0;
let hue = 0;

let isPlaying = false;
let intervalID;
let timerValue = 0;

let zoomValue = 1.0;

let isMuted = false;


// Explicity set the canvas width/height to match the element's dimensions
canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;

// Function to load a <video> element
function getVideo() {
          navigator.mediaDevices.getUserMedia({ video: true, audio: true })
          .then(localMediaStream => {
                    video.srcObject = localMediaStream;

                    // Explicity set the canvas width and height to match the video dimoneions
                    canvas.width = video.clientWidth;
                    canvas.height = video.clientHeight;
          })
          .catch(err => {
                    console.error(`OH NO!!!`, err);
          });
}

// Function to draw on the <canvas>
function draw(e) {
          if (!isDrawing) return; // stop the fn from running when they are not moused down

          ctx.lineJoin = 'round';
          ctx.lineCap = 'round';  
          ctx.lineWidth = 10;
          ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
          ctx.beginPath();
          
          // start from
          ctx.moveTo(lastX, lastY);
          
          // go to
          ctx.lineTo(e.offsetX, e.offsetY);
          ctx.stroke();
          [lastX, lastY] = [e.offsetX, e.offsetY];

          hue++;
          if (hue >= 360) {
                    hue = 0;
          }
}

// List for moust events on the <canvas>
canvas.addEventListener('mousedown', (e) => {
          isDrawing = true;
          [lastX, lastY] = [e.offsetX, e.offsetY];
});
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false);

// Function to handle event delegation to all "icon" clicks
function handleButtonClicks(e) {
          // Do not proceed if the element originating the event is not an "icon" 
          if (!e.target.matches(".icon")) return;

          const button = e.target;

          if (button.matches(".icon-record")) {
                    video.classList.add("active")
                    video.play();
          }

          if (button.matches(".icon-pause")) {
                    video.pause();
          }

          if (button.matches(".icon-stop")) {
                    timerValue = 0;
                    // if video is play then pause the video othersie just update the timer
                    isPlaying ? video.pause() : updateTimer(timerValue);
                    video.classList.remove("active")
          }

          if (button.matches(".icon-draw")) {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    canvas.classList.toggle("active");
                    lastX = 0;
                    lastY = 0;
          }

          const zoomMin = 1;
          const zoomMax = 2;
          const zoomStep = .1;
          if ( button.matches(".icon-zoom-in") && (zoomValue >= zoomMin && zoomValue < zoomMax) ) {
                    zoomValue = parseFloat((zoomValue + zoomStep).toFixed(1));
                    zoom.textContent = `X${zoomValue.toFixed(1)}`;
                    video.style.transform = `scale(${zoomValue})`;
                    canvas.style.transform = `scale(${zoomValue})`;
          }
          
          if ( button.matches(".icon-zoom-out") && (zoomValue > zoomMin && zoomValue <= zoomMax) ) {
                    zoomValue = parseFloat((zoomValue - zoomStep).toFixed(1));
                    zoom.textContent = `X${zoomValue.toFixed(1)}`;
                    video.style.transform = `scale(${zoomValue})`;
                    canvas.style.transform = `scale(${zoomValue})`;
          }

          if (button.matches('.icon-camera')) {
                    button.classList.toggle("disabled");
          }

          if (button.matches(".icon-microphone")) {
                    isMuted = !isMuted;
                    if (isPlaying) video.muted = isMuted;
                    button.classList.toggle("disabled");
          }

          if (button.matches('.icon-volume')) {
                    button.classList.toggle("disabled");
          }

          if (button.matches(".icon-close")) {
                    recorder.style.display = "none";
          }

          if (button.matches(".icon-minimize")) {
                    button.classList.toggle("active");
                    main.classList.toggle("minimized");
                    footer.classList.toggle("minimized");
                    recorder.classList.toggle("minimized");
                    
                    // Explicity set the canvas width/height to match the element's dimensions
                    canvas.width = canvas.clientWidth;
                    canvas.height = canvas.clientHeight;
          }

}

// Add an eventLitener for all clicks on the 'recorder' container and delegate event handling
recorder.addEventListener("click", handleButtonClicks);

function updateTimer(value) {
          const seconds = value % 60;
          const minutes = Math.floor((value / 60) % 60);
          const hours = Math.floor((value / 60) / 60);
          timer.textContent = `
                    ${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}
          `
}

// Function to start an interval timer
function startTimer() {

          if (!intervalID) {
                    intervalID = setInterval(() => {
                              timerValue++;
                              updateTimer(timerValue);
                    }, 1000);
          }
}

// Function to stop an interval timer
function stopTimer() {
          clearInterval(intervalID);

          // reinitialize the ID variable
          intervalID = null;
          // timerValue = 0;
          updateTimer(timerValue);
}

// Start the timer when the video 'play' event is invoked
video.addEventListener("play", (e) => {
          isPlaying = true;
          startTimer();
})

// Stop the timer when the video 'play' event is invoked
video.addEventListener("pause", (e) => {
          isPlaying = false;
          stopTimer();
})

// on page load, get the video stream
getVideo();