// Add JavaScript code here
const conical = document.querySelector(".conical");

// on page load, calculate the point for the conical gradient
const percentages = [41, 29, 23, 4, 3];
let normalize = 0;
const breakPoints = percentages.map((data) => {
    normalize += data;
    return `${Math.ceil(360 * (normalize / 100))}deg`;
});

breakPoints.map((point, index) => {
    conical.style.setProperty(`--point-${index + 1}`, point);
})
