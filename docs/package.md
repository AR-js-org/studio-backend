## Package

**new Package(config)**

Accepts the following configuration:

```js
new Package({
    arType: 'pattern', // see exported AR_* constants
    assetType: '3d', // see exported ASSET_* constants
    assetFile: yourAssetFile, // read details after this code block
    assetName: 'model.gltf', // the AR asset filename, including the file extension
    assetParam: {
        scale: 1.0, // scale of the asset
        size: { // sizes of the asset, unused
            width: 1.0,
            height: 1.0,
            depth: 1.0
        },
        locations: [
            {
                latitude: 12.345678, // required for location based AR
                longitude: 12.345678 // required for location based AR
            }
        ]
    },
    markerPatt: '...', // the content of the generated .patt file, as a string (required for pattern/location based AR)
    matrixType: '...', // see exported MATRIX_* constants (required for barcode based AR)
    markerValue: 7, // barcode value (required for barcode based AR)
});
```

The `assetFile` parameter must be:
- a base64 encoded string (use `FileReader.readAsDataURL()` and strip the initial `data:*/*;base64,` string) for 3d/image assets
- a `Blob` for audio/video assets when using Zip provider
- an `ArrayBuffer` for audio/video when using GitHub provider

**serve(config)**

Deploys the package, based on the chosen provider. Accepts the following configuration:

```js
package.serve({
    packageType: 'zip', // see exported PACKAGE_* constants
    config: {...} // see either serveFiles() documentation for your chosen provider
});
```

### Example

```js
const {
    AR_PATTERN,
    ASSET_3D,
    PACKAGE_GITHUB,
    PACKAGE_ZIP,
    MarkerModule
} = ARjsStudioBackend;

// helper function -- promisify file reading
const reader = new FileReader();
const waitRead = () => {
    return new Promise(resolve => {
        reader.addEventListener('load', () => {
            resolve(reader.result);
        });
    })
};

// read marker image
const markerFile = document.querySelector('#marker-image').files[0];
reader.readAsDataURL(markerFile);
const originalMarker = await waitRead();

// generate .patt file
const textPatt = await MarkerModule.getMarkerPattern(originalMarker);

// read asset file
const assetFile = document.querySelector('#asset-file-selector').files[0];
reader.readAsDataURL(assetFile);
const base64Asset = await waitRead();

// create the package
const package = new Package({
    arType: AR_PATTERN,
    assetType: ASSET_3D,
    assetFile: base64Asset,
    assetName: file.name,
    assetParam: {
        scale: 1.0
    },
    markerPatt: textPatt
});

// deploy to github...
const pagesURL = await package.serve({
    packageType: PACKAGE_GITHUB,
    token: 'user github token',
    repo: 'arjs-awesome-repo-84265'
});
console.log(`navigate to ${pagesURL} to see your project`);

// ...or generate a zip file (or both!)
const zipFile = await package.serve({
    packageType: PACKAGE_ZIP,
    compress: 9
});
// trigger download
window.location = `data:application/zip;base64,${zipFile}`;
```
