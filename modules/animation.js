import { getPositiveMaxDecibels } from "./dbCalculation.js";

// this is a temporary element to check if the changing dB values are being dynamicly sent from dbCalculation file -- remove when working
const outputParagraph = document.getElementById("output-paragraph");

function updateDecibelValue() {
  const dbValue = getPositiveMaxDecibels();
  outputParagraph.textContent = dbValue;
  requestAnimationFrame(updateDecibelValue);
}

updateDecibelValue();
