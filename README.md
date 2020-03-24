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

Alternatively, you can use a CDN service like GitHack (replace `vX.Y.Z` with an actual version):

```html
<script src="https://rawcdn.githack.com/AR-js-org/studio-backend/vX.Y.Z/dist/arjs-studio-backend.min.js"></script>
```

## Modules

Modules are used to generate assets like marker and `.patt` files.

See [modules docs](docs/modules.md) for detailed documentation and examples.

## Providers

Providers are used to gather together the project assets and serve them in different formats.
A base `Provider` class can be found in `src/providers/Provider.js`, you can extend directly from it or use
others this library provides.

See [providers docs](docs/providers.md) for detailed documentation and examples.

## HTML generation

Modules also provide static functions to generate the content of `index.html` files for all kinds of AR.js applications.

See [templates docs](docs/templates.md) for detailed documentation and examples.

## TODO

- storage service
    - [github provider] save token, repo and branch name
