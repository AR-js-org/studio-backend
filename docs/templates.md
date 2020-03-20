## Marker applications

**MarkerModule.generatePattern3dHtml(pattSrc, modelSrc)**

Generates the `index.html` contents for an AR.js application using a marker pattern and 3d model as AR asset.
Parameters are the relative paths for `.patt` and `.gltf` files.

**MarkerModule.generatePatternImageHtml(pattSrc, imageSrc)**

Generates the `index.html` contents for an AR.js application using a marker pattern and an image as AR asset.
Parameters are the relative paths for `.patt` file and the image.

**MarkerModule.generatePatternAudioHtml(pattSrc, audioSrc)**

Generates the `index.html` contents for an AR.js application using a marker pattern and an audio file as AR asset.
Parameters are the relative paths for `.patt` file and the audio.

**MarkerModule.generatePatternVideoHtml(pattSrc, videoSrc)**

Generates the `index.html` contents for an AR.js application using a marker pattern and a video file as AR asset.
Parameters are the relative paths for `.patt` file and the video.

**Example**

```js
const { MarkerModule } = ARjsStudioBackend;

// generate the index.html for an AR application that uses marker pattern and an audio file as AR asset
const content = MarkerModule.generatePatternAudioTemplate('/marker.patt', '/assets/audio.mp3');
```
