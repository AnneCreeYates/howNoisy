import { getPositiveMaxDecibels } from "./dbCalculation.js";

// definiftion of canvas context elements
const canvas = document.getElementById("gauge_canvas");
// the warning message
const warningMessage = document.getElementById("warning-message");
// const outputParagraph = document.getElementById("output-paragraph");
const dynamicValue = document.getElementById("dynamic-value");

// constant values used for animation calculation
const constValues = {
  // gauge radius size
  radius: canvas.height / 3.2,
  // starting value for gauge angle calculation
  startValue: 0.8,
  // end value for gauge angle calculation
  endValue: 2.2,
  // maximum level of decibels that can be registered (approximately)
  highestDbLevel: 150,
  // gauge starting angle
  angleStart: function () {
    return this.startValue * Math.PI;
  },
  // gauge end angle
  angleEnd: function () {
    return this.endValue * Math.PI;
  },
};

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
      "DANGER: Protect your health! Harmful noise level.";
    warningMessage.style.color = "red";
  } else if (dbValue > 70) {
    dynamicValue.textContent = dbValue;
    dynamicValue.style.color = "orange";
    warningMessage.textContent = "CAUTION: Prolonged exposure may be harmful!";
    warningMessage.style.color = "orange";
    warningMessage.style.margin = "0";
  } else if (dbValue > 50) {
    dynamicValue.textContent = dbValue;
    dynamicValue.style.color = "#e6e600";
    warningMessage.textContent =
      "Noise level acceptable, but may cause irritation.";
    warningMessage.style.color = "#e6e600";
    warningMessage.style.margin = "0";
  } else {
    dynamicValue.textContent = dbValue;
    dynamicValue.style.color = "#3bb300";
    warningMessage.textContent = "Noise level safe.";
    warningMessage.style.color = "#3bb300";
    warningMessage.style.margin = "50px 0";
  }

  // repeatedly calls the updateDecibleValue function
  // CHECK IF THERE IS A WAY TO MAKE SURE THE VALUES ARE NOT PROCESSED IF THE APP IS PAUSED OR STOPPED -- PROBABLY NEED TO ACCESS THE isStopped
  requestAnimationFrame(updateDecibelValue);
  // update the gauge
  drawGradient(dbValue);
}
updateDecibelValue();

// function creating the static parts of gauge - animation is created with drawGradient and buildFullArc
function gagugeStaticBackground(ctx, lineWidth, strokeStyle) {
  ctx.beginPath();
  ctx.lineWidth = lineWidth;
  // arc method: 1st and 2nd param defines the coordinates of the center of the circle; 3rd is a circle radius; 4th and 5th define beinning and end angle
  ctx.arc(
    250,
    250,
    constValues.radius,
    constValues.angleStart(),
    constValues.angleEnd()
  );
  ctx.strokeStyle = strokeStyle;
  ctx.stroke();
}

// function calculating the representation of the dB value on the gauge -- length of the fill
function gaugeFillCalc(value) {
  const { startValue, endValue, highestDbLevel } = constValues;
  // Draw the fill-up of the gauge using the calculated decibel value
  return (
    (startValue + ((endValue - startValue) * value) / highestDbLevel) * Math.PI
  );
}

// function drawing the colour of the fill in real time
function gaugeFill(ctx, value, gaugeGradient) {
  // Fill the gauge with color
  ctx.beginPath();
  ctx.lineWidth = 25;
  ctx.arc(
    250,
    250,
    constValues.radius,
    constValues.angleStart(),
    gaugeFillCalc(value),
    false
  );
  ctx.strokeStyle = gaugeGradient;
  ctx.stroke();
  // restores the shadow level
  ctx.restore();
  ctx.lineCap = "round";
}

// function drawing the changing shadow
function drawShadow(ctx) {
  // saves the current state of the gauge for the shadow
  ctx.save();
  ctx.shadowColor = "rgb(136, 255, 77)";
  ctx.shadowBlur = 70;
}

// function building arc
function buildFullArc(ctx, value, gaugeGradient) {
  // creates the grove for the gauge colour -- not the canvas background
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // draw the background and the path of the desired shape in the canvas
  // dark gray outside arc -- the light border
  gagugeStaticBackground(ctx, 35, "rgba(140, 140, 140, 0.3)");
  // the dark inner arc
  gagugeStaticBackground(ctx, 30, "rgba(14, 11, 14, 0.9)");
  // create the shadow for the changing fill
  drawShadow(ctx);
  // introduce colour fill
  gaugeFill(ctx, value, gaugeGradient);
}

// function creates gradient for the gauge stroke and uses buildFullArc function for animated elements
function drawGradient(value) {
  // when the getcontext for canvas is supported
  if (canvas.getContext) {
    // introduce the 2d context for the canvas
    const ctx = canvas.getContext("2d");
    // gradient colours and direction
    const gaugeGradient = ctx.createLinearGradient(150, 150, 370, 175);
    gaugeGradient.addColorStop(0, "green");
    gaugeGradient.addColorStop(0.5, "yellow");
    gaugeGradient.addColorStop(0.8, "orange");
    gaugeGradient.addColorStop(1, "red");
    // the function animates the gauge arc
    buildFullArc(ctx, value, gaugeGradient);
  } else {
    // if canvas element is  not supported send an alert to notify the user
    alert(
      "Your browser doesn't support canvas! You may want to change the browser for full app experience!"
    );
  }
}
