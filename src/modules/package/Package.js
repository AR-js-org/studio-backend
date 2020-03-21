import {PatternPackage} from './PatternPackage';
import {BarcodePackage} from './BarcodePackage';

export class Package {

  constructor(type, config) {
    this.type = type;
    this.config = config;
  }

  generateHtml() {
    if (this.type === 'barcode') {
      return BarcodePackage.generateHtml(this.config);
    }
    if (this.type === 'pattern') {
      return PatternPackage.generateHtml(this.config);
    }
    if (this.type === 'location') {

    }
  }

  serveFiles(providerType) {
    const generatedHtml = this.generateHtml();
    const {
      ZipProvider,
      GithubProvider
    } = ARjsStudioBackend;

    if (providerType === 'zip') {
      var zipProvider = new ZipProvider();
      zipProvider.addFile('test.html', generatedHtml);
      (async () => {
        const base64 = await zipProvider.serveFiles();
        // trigger download
        window.location = `data:application/zip;base64,${base64}`
      })();
    } else {
      const githubProvider = new GithubProvider();
      //gitHub provider logic
    }
  }
}