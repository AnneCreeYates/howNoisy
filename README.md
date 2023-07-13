# Project Title: howNoisy

### Video Demo: [URL]

### Description:

In today's world, individuals are increasingly prioritizing their well-being and actively seeking ways to mitigate factors that can negatively impact their health. Pollution and unhealthy habits are being recognized as contributors to various diseases, prompting a search for solutions. While it is relatively straightforward to identify and address pollutants in the air, water, and ground due to their noticeable presence and, in case of higher concentration, immediate effects, there is another widespread pollutant that tends to go unnoticed—noise.

Living in urban environments, we quickly become accustomed to loud noises that can have adverse effects on our health without our conscious awareness. This realization inspired the creation of the howNoisy app. Its primary objective is to provide real-time measurement of the environmental noise level, enabling users to assess the noise levels in their surroundings at any given moment. The app visually represents noise levels through an animated gauge, utilizing variations in length and color of the "fluid" indicator. Additionally, it provides measurements in decibels. The app classifies noise levels into four categories: safe, acceptable, harmful prolonged exposure, and danger (more infomration in Understanding Noise Levels section below). Each category is accompanied by a corresponding caption, advising users on the necessary measures to protect their hearing.

## App Usage:

The howNoisy app offers a user-friendly experience, requiring no installation or sign-in for basic functionality. To utilize the app, follow these simple steps:

1. Open your preferred web browser.
2. Visit the howNoisy website at [https://annecreeyates.github.io/howNoisy/].
3. Initiate the noise measurement by clicking the "START" button.
4. For accurate functioning, the app requires permission to access the device's microphone. Please grant the necessary permission when prompted by your browser. Also, please make sure your mic is not muted as it will cause incorrect app output.

## Code Operation:

The howNoisy app comprises several files: index.html, styles.css, main.js, dbCalculation.js, and animation.js. The modular approach adopted during development ensures improved code readability and maintainability.

### File Overview:

#### index.html:

The **index.html** file forms the foundation of the app. In addition to static text and headers, it incorporates a canvas element that serves as the backdrop for the animated gauge. The gauge animation is created dynamically using JavaScript (see details below).

#### styles.css:

The **styles.css** file primarily governs the app's design and visual presentation. It includes a reset section to eliminate default elements and values that might disrupt the intended design. To ensure responsiveness, flexible box (flexbox) and grid techniques are employed for layout structuring.

#### JavaScript Files:

JavaScript plays a crucial role in introducing dynamic elements to the app. Let's explore the purpose of each JavaScript file:

- **main.js**: This file manages event listeners for the Start, Pause, and Stop buttons. Upon button activation, the corresponding information is relayed to dbCalculation.js, triggering relevant events such as initiating the measurement, pausing an ongoing measurement, or concluding the measurement process.

- **dbCalculation.js**: The app utilizes the device's microphone to gather real-time information about the noise level. By leveraging the capabilities of the Web Audio API, dbCalculation.js captures the audio stream from the microphone. Subsequently, the captured audio data is processed using the `getFloatFrequencyData` method to derive decibel values. As the processed data is presented as negative values, which are not directly useful to users, an offset value is applied. To make the resulting value accessible to animation.js, the `getPositiveMaxDecibels` function is employed. This function dynamically exports the calculated value to animation.js.

- **animation.js**: Upon receiving dynamically generated data from dbCalculation.js, animation.js utilizes the CanvasJS library to generate an animation that adjusts the gauge fill in response to the measured noise level. Furthermore, animation.js generates dynamic styles for the changing decibel numbers (also used as an element of visualization) and modifies the color and messaging presented to the user based on the decibel value. All static and dynamic visualization elements are following consistent pattern established using the canvas element referenced in the HTML file.

## Additional Details:

### Understanding Noise Levels:

The howNoisy app classifies noise levels into four categories:

- Safe: This denotes an environment posing minimal or no risk to hearing.
- Acceptable: The noise level is slightly elevated but remains within safe limits.
- Harmful Prolonged Exposure: This classification advises the use of auditory protection during extended exposure to prevent hearing damage.
- Danger: Immediate risk of lasting harm. Urgent auditory protection is necessary to avert irreversible hearing damage.

It's important to note that specific decibel ranges associated with each noise level may vary based on regional standards and regulations. Here are some examples of common sounds and their approximate decibel levels:

- Safe: Rustling leaves (20 dB), whispering (30 dB).
- Acceptable: Quiet office (50 dB), moderate rainfall (60 dB).
- Harmful Prolonged Exposure: Busy street traffic (70 dB), vacuum cleaner (80 dB).
- Danger: Concerts (100+ dB), fireworks (120+ dB).

### Usage Tips:

- To ensure accurate noise measurements, ensure that the device's microphone remains unobstructed and properly positioned to capture ambient sounds effectively.
- Bear in mind that factors such as distance from the noise source and background noise can impact measurement accuracy.
- The howNoisy app is designed for personal use and provides general guidance regarding noise levels. It is not intended for scientific or professional purposes.

### Additional Resources:

For further information on the health effects of noise pollution, decibel measurements, and tips for protecting your hearing, consider referring to the following resources:

[https://www.commodious.co.uk/knowledge-bank/hazards/noise/measuring-levels]
[https://www.healthyhearing.com/report/52514-What-is-a-decibel]
[https://decibelpro.app/blog/decibel-chart-of-common-sound-sources/]
