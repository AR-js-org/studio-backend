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

## Providers

Providers are used to gather together the project assets and serve them in different formats.
A base `Provider` class can be found in `src/providers/Provider.js`, you can extend directly from it or use
others this library provides.

### Base

**new Provider()**

The constructor.

**addFile(path, content, encoding)**

To add a file you need to provide its path in the file hierarchy, content and encoding.
Accepted encodings are `utf-8` for textual files and `base64` for text representing images.

**clearFiles()**

Helper method to clear stored files.

**serveFiles()**

This method processes the files and serves them depending on the Provider implementation.

### GitHub Pages

**new Provider(config)**

Accepts the following configuration:

```js
new GithubProvider({
    token: 'authorization token', // required, can be a PAT or OAuth token
    owner: 'username', // automatically retrieved by default
    repo: 'name of the repository', // defaults to 'arjs-studio-NUMBERS'
    branch: 'gh-pages' // automatically deploy to Pages by default
})
```

**serveFiles(config)**

Commits files to the user's repository and returns a `Promise<string>` with the URL of the deployed Pages.

```js
provider.serveFiles({
    message: 'custom commit message',
    owner: 'custom owner',
    repo: 'custom repo',
    branch: 'custom branch'
})
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

## TODO

- storage service
    - [github provider] save token, repo and branch name
