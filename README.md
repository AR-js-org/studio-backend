# AR.js Studio Backend

## Introduction

This project provides general functionality for the AR.js Studio Frontend, e.g. barcode/matrix code generation,
pattern image generation etc. It is a separate project in order to be able to maintain functionality that is
independent from the concrete frontend implementation.

## Developing

For maintaining a consistent code style while developing, please use Visual Studio Code with the Pretter plugin
installed.

To run the internal test suite, execute `npm run test`.

The project uses Webpack + Babel. For local development, edit the entrypoint file `index.js` and
run `yarn install && yarn serve`

## Usage

### Providers

1. create a Personal Access Token from [GitHub Developer Settings](https://github.com/settings/tokens)
    with scope `repo:publis_repo` and store it in your local `.env` file.

1. import and create an instance of your preferred provider:

   ```js
   import { GithubProvider, ENC_BASE64 } from 'studio-backend';
   
   const token = process.env.GITHUB_TOKEN; // store this
   const github = new GithubProvider({
       token,
       repo: null,
       branch: null,
       owner: null
   });
   ```

1. add files to be published:
   ```js
   github.addFile('index.html', 'Hello World!');
   github.addFile('img/example.jpg', 'base64 encoded image ...', ENC_BASE64);
   ```

1. publish them with a message:
   ```js
   const pagesUrl = await github.publishFiles({
       message: 'my awesome AR experience',
       repo: null,
       branch: null,
       owner: null
   });
   const branchName = github.branch; // store this
   ```

The package will use the PAT to create the repo, the branch, set up Pages, commit all the files and
trigger a Pages build.

**NOTE**: this is still WIP, see `src/index.js` commented code for a working example

**TODO**: storage service for saving token, repo and branch name
