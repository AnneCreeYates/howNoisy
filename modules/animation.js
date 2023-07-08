import { getPositiveMaxDecibels } from "./dbCalculation.js";

const outputParagraph = document.getElementById("output-paragraph");
// definiftion of canvas context elements
const canvas = document.getElementById("gauge_canvas");

// the function updates the content of the outputParagraph in the real time.
//The function is called repeatedly using requestAnimationFrame, so it will continuously update the text content of the element with the current value.
function updateDecibelValue() {
  // dbValue is real-time value of calculated dB's that is being imported from the dbCalculteion.js
  const dbValue = getPositiveMaxDecibels();
  // outputs the value in the browser
  outputParagraph.textContent = dbValue;
  // repeatedly calls the updateDecibleValue function
  requestAnimationFrame(updateDecibelValue);

  // update the gauge
  drawGauge(dbValue);
}
updateDecibelValue();

// draw gauge function
function drawGauge(value) {
  // when the getcontext for canvas is supported
  if (canvas.getContext) {
    // introduce the 2d context for the canvas
    const ctx = canvas.getContext("2d");
    // gauge radius size
    const radius = canvas.height / 2.8;
    // starting value for gauge angle calculation
    const startValue = 0.8;
    // end value for gauge angle calculation
    const endValue = 2.2;
    // maximum level of decibels that can be registered (approximately)
    const highestDbLevel = 150;
    // gauge starting angle
    const angleStart = startValue * Math.PI;
    // gauge end angle
    const angleEnd = endValue * Math.PI;
    // gradient colours and direction
    const gaugeGradient = ctx.createLinearGradient(90, 190, 210, 175);
    gaugeGradient.addColorStop(0, "green");
    gaugeGradient.addColorStop(0.5, "yellow");
    gaugeGradient.addColorStop(0.8, "orange");
    gaugeGradient.addColorStop(1, "red");

    // fills up the background
    // ctx.fillStyle = gaugeGradient;

    // creates the grove for the gauge colour -- not the canvas background
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // the shape and size of the canvas
    // ctx.fillRect(0, 0, 300, 300);
    // draw the background and the path of the desired shape in the canvas
    ctx.beginPath();
    ctx.lineWidth = 30;
    // arc method: 1st and 2nd param defines the coordinates of the center of the circle; 3rd is a circle radius; 4th and 5th define beinning and end angle
    ctx.arc(150, 150, radius, angleStart, angleEnd);
    ctx.strokeStyle = "black";
    ctx.stroke();

    // Draw the fill-up of the gauge to the calculated decibel value
    const gaugeValueRepresentation =
      (startValue + ((endValue - startValue) * value) / highestDbLevel) *
      Math.PI;

    // Fill the gauge with color
    ctx.beginPath();
    ctx.lineWidth = 20;
    ctx.arc(150, 150, radius, angleStart, gaugeValueRepresentation, false);
    ctx.strokeStyle = gaugeGradient;
    ctx.lineCap = "round";
    ctx.stroke();
  } else {
    // if unsupported for now send an alert to notify the user
  }
}
