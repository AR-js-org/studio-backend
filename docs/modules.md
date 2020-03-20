## Marker

This module can generate both barcode and pattern markers.

**MarkerModule.getBarcodeMarkerSVGDataURI(matrixTypeId, value)**

This method is used to create a barcode image from a value.
Accepts a matrix type (see exported `MATRIX_*` constants) and a value and returns a data URI string,
representing an SVG of the barcode marker.

Supported matrix types (values start from 0):

| Matrix type       | Max value   |
| ----------------- | ----------- |
| `3x3_hamming_6_3` |           7 |
| `3x3_parity_6_5`  |          31 |
| `4x4_bch_13_5_5`  |          31 |
| `4x4_bch_13_9_3`  |         511 |
| `5x5_bch_22_7_7`  |         128 |
| `5x5_bch_22_12_5` |        4095 |

**MarkerModule.getMarkerPattern(dataURI)**

This method is used to create a `.patt` file from an image.
Accepts an image as a data URI string and returns a string for the `.patt` file.

**MarkerModule.getFullMarkerImage(dataURI, ratio, size, color)**

This method is used to create the marker image with border from an image.
Accepts an image as a data URI string, size, ratio and border color for the marker and returns
a data URI string representing the final marker image.

**Example**

```js
const { MarkerModule, MATRIX_3X3_HAMMING_63 } = ARjsStudioBackend;

// generate an SVG data URI for the value '7'
const barcodeMarkerSVG = MarkerModule.getBarcodeMarkerSVGDataURI(MATRIX_3X3_HAMMING_63, 7);

const barcodeImage = new Image();
barcodeImage.src = barcodeMarkerSVG; // use the image 'load' event to know when image is ready

// ----

// draw the image on an off-screen canvas and use `.toDataURL()` to get a data URI
const fullMarker = await MarkerModule.getFullMarkerImage(imageDataURI, 1.0, 100, 'black');
const pattFile = await MarkerModule.getMarkerPattern(imageDataURI);

const patternImage = new Image();
patternImage.src = fullMarker;
// use the image 'load' event to know when image is ready
patternImage.addEventListener('load', () => {
    document.body.appendChild(patternImage);
})

const pattFileDownload = document.createElement('a');
pattFileDownload.href = `data:text/plain;charset=utf-8,${pattFile}`;
pattFileDownload.download = 'marker.patt'; // filename
pattFileDownload.click(); // trigger download
```

## Location (TBI)

## NFT (TBI)
