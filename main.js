// Connect the Check button
const startBtn = document.getElementById("gauge_start-btn");
const pauseBtn = document.getElementById("gauge_pause-btn");
const stopBtn = document.getElementById("gauge_stop-btn");

// AUDIO CAPTURING
// Create an audio context
const audioContext = new AudioContext();

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
      microphoneSource.connect(analyserNode);
      // Set up analyser node configuration
      analyserNode.fftSize = 2048;
      const bufferLength = analyserNode.frequencyBinCount;
      const dataArray = new Float32Array(bufferLength);

      // Create a function to process audio data and calculate noise levels
      const processAudio = () => {
        // Get audio data from the analyser node
        analyserNode.getFloatFrequencyData(dataArray);

        // Calculate the root mean square (RMS) of the audio data
        let sumOfsquares = 0;
        for (let i = 0; i < bufferLength; i++) {
          const amplitude = dataArray[i];
          sumOfsquares += amplitude * amplitude;
        }
        const rms = Math.sqrt(sumOfsquares / bufferLength);

        // Covert RMS to decibels (dB)
        const reference = 1; // Reference amplitude
        const decibels = 20 * Math.log10(rms / reference);

        // Updata the UI
        console.log(decibels);
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
  audioContext.suspend();
});

// Function stopping the capture
stopBtn.addEventListener("click", () => {
  // Stop the audio capture
  audioContext.close();
});
