import { startBtn, pauseBtn } from "../main.js";
// initialise the default value of positiveMaxDecibels
let positiveMaxDecibels = 0;

// AUDIO CAPTURING
let audioContext;
let stream;
let isStopped = false;
let isPaused = false;
let processAudio;

// Start capture
function startCapture() {
  // Reset the stop and pause variable
  isStopped = false;
  isPaused = false;
  // Change the text displayed on the pauseBtn and startBtn
  pauseBtn.textContent = "Pause";
  startBtn.textContent = "New";
  startAudioCapture();
}

// Pause capture
function pauseCapture() {
  // Toggle the isPaused variable
  isPaused = !isPaused;
  // Change the text displayed on the pause button
  if (isPaused && !isStopped) {
    pauseBtn.textContent = "Resume";
  } else {
    pauseBtn.textContent = "Pause";
  }
  // Call processAudio again to resume processing audio
  processAudio();
}

// Stop capture
function stopCapture() {
  // Set the isStopped variable to true
  isStopped = true;
  // Stop the audio capture
  // check how to stop the audio capture so that user can press check again and the
  if (stream) {
    stream.getAudioTracks().forEach((track) => track.stop());
  }
  if (audioContext) {
    audioContext.close();
  }
  // After the button name is changed to New when pressed the first time, this changes it back to Start
  startBtn.textContent = "Start";
  // IF REMOVING THE ELEMENTS THAT ARE PRINTING TO BROWSER THE VALUES SENT TO THE ANIMATION FROM THIS FILE, REMOVE THIS AS WELL
  // Reset the output displyed inthe browser to 0
  // outputParagraph.textContent = "0";
}

// Function starting the capture
export async function startAudioCapture() {
  // create new audio Context
  audioContext = new AudioContext();

  try {
    // Access the user's microphone
    stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    // Create a media stream source node from the microphone stream
    const microphoneSource = audioContext.createMediaStreamSource(stream);
    // Create the analyser node
    const analyserNode = audioContext.createAnalyser();
    // connect the analyserNode to the microphone source
    microphoneSource.connect(analyserNode);
    // Set up analyser node configuration
    analyserNode.fftSize = 2048;
    const bufferLength = analyserNode.frequencyBinCount;
    const dataArray = new Float32Array(bufferLength);

    // Create a function to process audio data and calculate noise levels
    processAudio = () => {
      //Check if the audio capture is paused
      if (isPaused || isStopped) return;
      // Get audio data from the analyser node - getFloatFrequencyData converts received data into dB's, but the output is negative (from -Infinity to 0, where 0 is the loudest)
      analyserNode.getFloatFrequencyData(dataArray);
      // set the maximum decibel level to use for offsetting the negative value
      let maxDecibels = -Infinity;
      for (let i = 0; i < bufferLength; i++) {
        const decibels = dataArray[i];
        if (decibels > maxDecibels) {
          maxDecibels = decibels;
        }
      }
      // offset corrects the negative values received from getFloatFrequencyData to present positive dB values of noise
      const offset = 110;
      positiveMaxDecibels = (maxDecibels + offset).toFixed(0);

      // THIS PART MAY BE NOT NECESSARY BECAUSE THE VALUES ARE EXPORTED IN REAL TIME TO ANIMATION FILE -- CHECK LATER
      // Print only the values that are numbers, not -Infinity
      // if (positiveMaxDecibels === "-Infinity") {
      //   outputParagraph.textContent = 0 + " dB";
      // } else {
      //   outputParagraph.textContent = positiveMaxDecibels + " dB";
      // }
      // END OF THE PART FOR REMOVING -- POTENTIALLY

      // Call the processAudio function to continuously process audio data
      requestAnimationFrame(processAudio);
    };
    // Start processing audio data
    processAudio();
  } catch (error) {
    // Handle error
    console.log(error);
  }
}

// getter function for dynamic export of changing positiveMaxDecibels values
function getPositiveMaxDecibels() {
  // Return only the values that are numbers, not -Infinity
  if (positiveMaxDecibels === "-Infinity" || isStopped === true) {
    return 0;
  } else {
    return positiveMaxDecibels;
  }
}
export { startCapture, pauseCapture, stopCapture, getPositiveMaxDecibels };
