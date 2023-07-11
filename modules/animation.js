import { getPositiveMaxDecibels } from "./dbCalculation.js";

// definiftion of canvas context elements
const canvas = document.getElementById("gauge_canvas");
// the warning message
const warningMessage = document.getElementById("warning-message");
// const outputParagraph = document.getElementById("output-paragraph");
const dynamicValue = document.getElementById("dynamic-value");

// the function updates the content of the outputParagraph in the real time.
//The function is called repeatedly using requestAnimationFrame, so it will continuously update the text content of the element with the current value.
function updateDecibelValue() {
  // dbValue is real-time value of calculated dB's that is being imported from the dbCalculteion.js
  const dbValue = getPositiveMaxDecibels();
  // outputs the value in the browser
  if (dbValue > 100) {
    dynamicValue.textContent = dbValue;
    dynamicValue.style.color = "red";
    warningMessage.textContent =
      "WARNING: Protect your health! Harmful noise level.";
    warningMessage.style.color = "red";
  } else if (dbValue > 80) {
    dynamicValue.textContent = dbValue;
    dynamicValue.style.color = "orange";
    warningMessage.textContent = "CAUTION: Prolonged exposure may be harmful!";
    warningMessage.style.color = "#3bb300";
    warningMessage.style.margin = "0";
  } else if (dbValue > 60) {
    dynamicValue.textContent = dbValue;
    dynamicValue.style.color = "#e6e600";
    warningMessage.textContent = "Noise level acceptable.";
    warningMessage.style.color = "#3bb300";
  } else {
    dynamicValue.textContent = dbValue;
    dynamicValue.style.color = "#3bb300";
    warningMessage.textContent = "Noise level safe.";
    warningMessage.style.color = "#3bb300";
    warningMessage.style.margin = "50px 0";
  }

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
    const radius = canvas.height / 3.2;
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
    const gaugeGradient = ctx.createLinearGradient(150, 150, 370, 175);
    gaugeGradient.addColorStop(0, "green");
    gaugeGradient.addColorStop(0.5, "yellow");
    gaugeGradient.addColorStop(0.8, "orange");
    gaugeGradient.addColorStop(1, "red");

    // fills up the background
    // ctx.fillStyle = gaugeGradient;

    // creates the grove for the gauge colour -- not the canvas background
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // the shape and size of the canvas
    // ctx.fillRect(0, 0, 500, 500);
    // draw the background and the path of the desired shape in the canvas
    // dark gray outside arc -- the light border
    ctx.beginPath();
    ctx.lineWidth = 35;
    // arc method: 1st and 2nd param defines the coordinates of the center of the circle; 3rd is a circle radius; 4th and 5th define beinning and end angle
    ctx.arc(250, 250, radius, angleStart, angleEnd);
    ctx.strokeStyle = "rgba(140, 140, 140, 0.3)";
    ctx.stroke();

    // the dark inner arc
    ctx.beginPath();
    ctx.lineWidth = 30;
    // arc method: 1st and 2nd param defines the coordinates of the center of the circle; 3rd is a circle radius; 4th and 5th define beinning and end angle
    ctx.arc(250, 250, radius, angleStart, angleEnd);
    ctx.strokeStyle = "rgba(14, 11, 14, 0.9)";
    ctx.stroke();

    // Draw the fill-up of the gauge to the calculated decibel value
    const gaugeValueRepresentation =
      (startValue + ((endValue - startValue) * value) / highestDbLevel) *
      Math.PI;

    // saves the current state of the gauge for the shadow
    ctx.save();
    ctx.shadowColor = "rgb(136, 255, 77)";
    // ctx.shadowOffsetX = 0;
    // ctx.shadowOffsetY = 0;
    ctx.shadowBlur = 70;

    // Fill the gauge with color
    ctx.beginPath();
    ctx.lineWidth = 25;
    ctx.arc(250, 250, radius, angleStart, gaugeValueRepresentation, false);
    ctx.strokeStyle = gaugeGradient;
    ctx.stroke();
    // restores the shadow level
    ctx.restore();
    ctx.lineCap = "round";
  } else {
    // if unsupported for now send an alert to notify the user
  }
}
