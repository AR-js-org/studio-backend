## GitHub Pages

**new GithubProvider()**

The constructor, no configuration needed.

**addFile(path, content, encoding)**

To add a file you need to provide its path in the repository, content and encoding.
Accepted encodings are `utf-8` for textual files and `base64` for encoded images (see exported `ENC_*` constants).

**serveFiles(config)**

Commit files to the user's repository and returns a `Promise` that resolves to the URL
of the deployed Pages.

```js
provider.serveFiles({
    token: 'YOUR-TOKEN', // required, must be an OAuth2 token
    message: 'custom commit message', // optional
    owner: 'custom owner', // automatically retrieved by default
    repo: 'custom repo', // defaults to 'arjs-studio-NUMBERS'
    branch: 'gh-pages' // automatically deploy to Pages by default
});
```

### Example

First, create a Personal Access Token from [GitHub Developer Settings](https://github.com/settings/tokens)
with scope `repo:public_repo`.

In production, you'll need to implement GitHub's OAuth Web Application flow ([see here](https://developer.github.com/apps/building-oauth-apps/authorizing-oauth-apps/#web-application-flow))
to obtain a token from your users.

Then use it to serve the project:

```js
const { GithubProvider, ENC_BASE64 } = ARjsStudioBackend;

const github = new GithubProvider();
github.addFile('index.html', 'Hello World!');
github.addFile('img/example.jpg', 'base64 encoded image ...', ENC_BASE64);
const pagesUrl = await github.serveFiles({
   token: 'YOUR-TOKEN',
   message: 'my awesome AR experience'
});
const repoName = github.repo; // store this
```

The provider will use the PAT to create the repository, branch, set up Pages, commit all the files and trigger
a Pages build.

## Zip file

**new ZipProvider()**

The constructor, no configuration needed.

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

### Example

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
window.location = `data:application/zip;base64,${base64}`;
```
