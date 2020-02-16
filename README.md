# AR.js Studio Backend

## Introduction

This project provides general functionality for the AR.js Studio Frontend, e.g. barcode/matrix code generation,
pattern image generation etc. It is a separate project in order to be able to maintain functionality that is
independent from the concrete frontend implementation.

## Features

The following static methods are available for the frontend side:

- [x] Barcode Marker Generator, given matrix type and value (number)

- [x] Pattern Marker Generator (marker image + .patt file), given input image and default parameters

- [x] Pattern Marker Generator (marker image + .patt file), given input image and custom parameters

- [ ] Creation and Output for `a-scene` element of Marker Based app, with default parameters

- [ ] Creation and Output for `a-scene` element of Location Based app, with default parameters

- [ ] Creation and Output for `a-scene` element of NFT Based app, with default parameters

- [ ] Creation and Output of `a-marker` element, with custom parameters (pattern, barcode markers)

- [ ] Creation and Output of `gps-entity-place` element, with custom parameters

- [ ] Creation and Output of `a-nft` element, with custom parameters

more to add

## Developing

For maintaining a consistent code style while developing, please use Visual Studio Code.

To run the internal test suite, execute `npm run test`.

## Usage

For browser usage, download the library from the `dist` directory and import in your page:

```html
<script src="js/arjs-studio-backend.min.js"></script>
```

## Modules

Modules are used to generate assets like marker files.

### Marker

This module can generate both barcode and pattern markers.

**MarkerModule.getBarcodeMarkerSVGDataURI(matrixTypeId, value)**

This method is used to create a barcode image from a value.
Accepts a matrix type (see exported `MATRIX_*` constants) and a value and returns a data URI string,
representing an SVG of the barcode marker.

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

// generate an SVG data URI for the value '8'
const barcodeMarkerSVG = MarkerModule.getBarcodeMarkerSVGDataURI(MATRIX_3X3_HAMMING_63, 8);

const barcodeImage = new Image();
barcodeImage.src = barcodeMarkerSVG; // use the image 'load' event to know when image is ready

// ----

// draw the image on an off-screen canvas and use `.toDataURL()` to get a data URI
const fullMarker = MarkerModule.getFullMarkerImage(imageDataURI, 1.0, 100, 'black');
const pattFile = MarkerModule.getMarkerPattern(imageDataURI);

const patternImage = new Image();
patternImage.src = fullMarker; // use the image 'load' event to know when image is ready

const pattFileDownload = document.createElement('a');
pattFileDownload.href = `data:text/plain;charset=utf-8,${pattFile}`;
pattFileDownload.download = 'marker.patt'; // filename
pattFileDownload.click(); // trigger download
```

### Location (TBI)

### NFT (TBI)

## Providers

Providers are used to gather together the project assets and serve them in different formats.
A base `Provider` class can be found in `src/providers/Provider.js`, you can extend directly from it or use
others this library provides.

### GitHub Pages

**new GithubProvider(config)**

Accepts the following configuration:

```js
new GithubProvider({
    token: 'authorization token', // required, can be a PAT or OAuth token
    owner: 'username', // automatically retrieved by default
    repo: 'name of the repository', // defaults to 'arjs-studio-NUMBERS'
    branch: 'gh-pages' // automatically deploy to Pages by default
});
```

**addFile(path, content, encoding)**

To add a file you need to provide its path in the repository, content and encoding.
Accepted encodings are `utf-8` for textual files and `base64` for encoded images (see exported `ENC_*` constants).

**serveFiles(config)**

Commits files to the user's repository and returns a `Promise` that resolves to the URL
of the deployed Pages.

```js
provider.serveFiles({
    message: 'custom commit message',
    owner: 'custom owner',
    repo: 'custom repo',
    branch: 'custom branch'
});
```

**Example**

First, create a Personal Access Token from [GitHub Developer Settings](https://github.com/settings/tokens)
with scope `repo:publis_repo`.

Then use it to serve the project:

```js
const { GithubProvider, ENC_BASE64 } = ARjsStudioBackend;

const github = new GithubProvider({
   token: 'YOUR-TOKEN'
});
github.addFile('index.html', 'Hello World!');
github.addFile('img/example.jpg', 'base64 encoded image ...', ENC_BASE64);
const pagesUrl = await github.serveFiles({
   message: 'my awesome AR experience'
});
const branchName = github.branch; // store this
```

The provider will use the PAT to create repo, branch, set up Pages, commit all the files and trigger
a Pages build.

### Zip file

**new ZipProvider()**

The constructor.

**addFile(path, content, encoding)**

To add a file you need to provider its path in the ZIP, content and encoding.
Accepted encodings are `utf-8` for textual files, `base64` for encoded images and `binary` if data
should be treated as raw content (see exported `ENC_*` constants).

**serveFiles(config)**

Generates the ZIP file returning a `Promise` that resolves to the requested format.

```js
provider.serveFiles({
    type: 'output format', // see ZIP_* constants, defaults to base64
    compress: 6 // set to 0 to disable compression, defaults to 0
});
```

**Example**

```js
const image = 'base64 encoded image';
const {
    ZipProvider,
    ENC_BASE64
} = ARjsStudioBackend;

const zip = new ZipProvider();
zip.addFile('readme.txt', 'Hello world!');
zip.addFile('images/img.jpg', image, ENC_BASE64);
const base64 = await zip.serveFiles({ compress: 9 });
// trigger download
window.location = `data:application/zip;base64,${base64}`
```

## TODO

- storage service
    - [github provider] save token, repo and branch name
