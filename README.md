# AR.js Studio Backend

## Introduction

This project provides general functionality for the AR.js Studio Frontend, e.g. barcode/matrix code generation,
pattern image generation etc. It is a separate project in order to be able to maintain functionality that is
independent from the concrete frontend implementation.

## Features

The following static methods are available for the frontend side:

[x] Barcode Marker Generator, given matrix type and value (number)
[ ] Pattern Marker Generator (marker image + .patt file), given input image and default parameters
[ ] Pattern Marker Generator (marker image + .patt file), given input image and custom parameters
[ ] Creation and Output for `a-scene` element of Marker Based app, with default parameters
[ ] Creation and Output for `a-scene` element of Location Based app, with default parameters
[ ] Creation and Output for `a-scene` element of NFT Based app, with default parameters
[ ] Creation and Output of `a-marker` element, with custom parameters (pattern, barcode markers)
[ ] Creation and Output of `gps-entity-place` element, with custom parameters
[ ] Creation and Output of `a-nft` element, with custom parameters
more to add

## Developing

For maintaining a consistent code style while developing, please use Visual Studio Code.

To run the internal test suite, execute `npm run test`.
