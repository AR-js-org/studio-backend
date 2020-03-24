import { PatternPackage } from './PatternPackage';
import { BarcodePackage } from './BarcodePackage';
import { ZipProvider, GithubProvider } from '../../providers';
import { ENC_BASE64 } from '../../providers/provider';

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

    async serveGitHub(params) {
        //to be implemented with params
    }

    async serveZip() {
        let provider = new ZipProvider();
        const generatedHtml = this.generateHtml();
        provider.addFile('index.html', generatedHtml);
        const { assetType, pattSrc, assetSrc } = this.config;
        switch (assetType) {
            case 'image':
                provider.addFile('assets/marker.patt', pattSrc);
                provider.addFile('assets/marker.jpg', assetSrc, ENC_BASE64);
                break;
            // TODO: add AR asset file (could be 3d model, 2d image, audio or video file
            case '3d':
                //to be implemented
                break;
            case 'audio':
                //to be implemented
                break;
            case 'video':
                //to be implemented
                break;
        }
        return await provider.serveFiles();
    }
}
