## Marker pattern

**MarkerModule.generatePatternHtml(assetType, pattSrc, assetSrc)**

Generate the `index.html` contents for AR.js applications using marker pattern.
Accepts an asset type (see exported `ASSET_*` constants) and relative paths for `.patt` and asset files.

### Example

```js
const { MarkerModule, ASSET_AUDIO } = ARjsStudioBackend;

// generate the index.html for an AR application that uses marker pattern and an audio file as AR asset
const content = MarkerModule.generatePatternHtml(ASSET_AUDIO, '/marker.patt', '/assets/audio.mp3');
```

## Marker barcode

**MarkerModule.generateBarcodeHtml(matrixType, markerValue, assetSrc)**

Generate the `index.html` contents for AR.js applications using marker barcode.
Accepts a matrix type (see exported `MATRIX_*` constants), the barcode value represented by the marker and
asset file.

### Example

```js
const { MarkerModule, MATRIX_3X3_HAMMING_63 } = ARjsStudioBackend;

// generate the index.html for an AR application that uses marker barcode and a 3d model file as AR asset
const content = MarkerModule.generateBarcodeHtml(MATRIX_3X3_HAMMING_63, 7, '/assets/model.gltf');
```
