import { PatternPackage } from './PatternPackage';
import { BarcodePackage } from './BarcodePackage';
import { ZipProvider, GithubProvider } from '../../providers';

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
            // to be implemented
        }
        if (this.type === 'ntf') {
            // to be implemented
        }
    }

    async serveFiles(providerType, providerConfig, serveConfig) {
        let provider = null;

        switch (providerType) {
            case 'zip':
                provider = new ZipProvider();
                break;

            case 'github':
                provider = new GithubProvider(providerConfig);
                break;

            default:
                throw new Error(`Unknown provider type '${providerType}'`);
        }

        const generatedHtml = this.generateHtml();
        provider.addFile('index.html', generatedHtml);

        return await provider.serveFiles(serveConfig);
    }
}
