## GitHub Pages

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

## Zip file

**new ZipProvider()**

The constructor, no configuration is needed.

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
