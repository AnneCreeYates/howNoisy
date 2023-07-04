import {
  startCapture,
  pauseCapture,
  stopCapture,
} from "./modules/dbCalculation.js";

const startBtn = document.getElementById("gauge_start-btn");
const pauseBtn = document.getElementById("gauge_pause-btn");
const stopBtn = document.getElementById("gauge_stop-btn");
const outputContainer = document.getElementById("output-container");

startBtn.addEventListener("click", startCapture);
pauseBtn.addEventListener("click", pauseCapture);
stopBtn.addEventListener("click", stopCapture);

export { startBtn, pauseBtn, stopBtn, outputContainer };
