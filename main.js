// Connect the Check button
const startBtn = document.getElementById("gauge_start-btn");
const pauseBtn = document.getElementById("gauge_pause-btn");
const stopBtn = document.getElementById("gauge_stop-btn");
const outputContainer = document.getElementById("output-container");

// AUDIO CAPTURING
const audioContext = new AudioContext();

// Variable to track the pause state
let isPaused = false;

// Function starting the measurement
startBtn.addEventListener("click", () => {
  // Access the user's microphone
  navigator.mediaDevices
    .getUserMedia({ audio: true })
    .then((stream) => {
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
      const processAudio = () => {
        //Check if the audio capture is paused
        if (isPaused) return;
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
        const positiveMaxDecibels = maxDecibels + offset;
        outputContainer.textContent = positiveMaxDecibels.toFixed(0);

        // Call the processAudio function to continuously process audio data
        requestAnimationFrame(processAudio);
      };
      // Start processing audio data
      processAudio();
    })
    // Handle error
    .catch((error) => {
      console.log(error);
    });
});

// Function pausing the capture
pauseBtn.addEventListener("click", () => {
  // Pause the audio capture
  //   audioContext.suspend(); -- this doesn't work properly
  isPaused = true;
});

// Function stopping the capture
stopBtn.addEventListener("click", () => {
  isPaused = true;
  // Stop the audio capture
  // check how to stop the audio capture so that user can press check again and the process is restrted
  audioContext.close();
});
