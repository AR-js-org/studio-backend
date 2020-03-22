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

    async serveFiles(providerConfig, serveConfig) {
        const { providerType } = providerConfig;
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
        // TODO: add AR asset file (could be 3d model, 2d image, audio or video file

        // add files for marker pattern
        if (this.type === 'pattern') {
            const { pattFile, markerFile } = this.config;
            provider.addFile('/assets/marker.patt', pattFile);
            // TODO: provider expects a base64-encoded image, while MarkerModule.getFullMarkerImage()
            //  returns a dataURI string
            provider.addFile('/assets/marker.jpg', markerFile);
        }
        if (this.type === 'ntf') {
            // to be implemented
            // NTF needs some pre-generated files like 'marker pattern'
        }

        return await provider.serveFiles(serveConfig);
    }
}
