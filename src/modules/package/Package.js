import { arrayBufferToBase64 } from '../../helpers.js';
import {
    ENC_BASE64,
    ENC_BINARY,
    ZipProvider,
    GithubProvider,
    MarkerModule,
    LocationModule,
} from '../../index';

export const ASSET_3D = '3d';
export const ASSET_IMAGE = 'image';
export const ASSET_AUDIO = 'audio';
export const ASSET_VIDEO = 'video';

export const AR_BARCODE = 'barcode';
export const AR_PATTERN = 'pattern';
export const AR_LOCATION = 'location';
export const AR_NTF = 'ntf';

export const PACKAGE_ZIP = 'zip';
export const PACKAGE_GITHUB = 'github';

/**
 * @typedef AssetParam
 * @property {boolean} isValid
 * @property {Number} scale
 * @property {{width: Number, height: Number, depth: Number}} size
 * @property {Number} [latitude] - only for location-based
 * @property {Number} [longitude] - only for location-based
 */
const defaultAssetParam = {
    isValid: true,
    scale: 1.0,
    size: {
        width: 1.0,
        height: 1.0,
        depth: 1.0,
    },
};

export class Package {
    /**
     * @param {Object} config
     * @param {string} config.arType - one of barcode, pattern, location or ntf (see exported constants)
     * @param {string} config.assetType - one of 3d, image, audio or video (see exported constants)
     * @param {string|Blob} config.assetFile - the file to be show in AR
     * @param {string} config.assetName - the file name, to be included in HTML template
     * @param {AssetParam} [config.assetParam] - scale and position of AR asset
     * @param {string} [config.markerPatt] - the marker image patt file (required for pattern and location AR type)
     * @param {string} [config.matrixType] - the barcode matrix type (see {@link BarcodeMarkerGenerator} exported constants, required for barcode AR type)
     * @param {number} [config.markerValue] - the barcode value of the marker (required for barcode AR type)
     */
    constructor(config) {
        this.arType = config.arType;
        this.assetType = config.assetType;
        this.assetFile = config.assetFile;
        this.assetName = config.assetName;
        this.assetParam = config.assetParam || defaultAssetParam;
        
        if (!this.assetParam.isValid) {
            throw new Error('Asset parameters are not valid');
        }
        
        this.config = config;
    }

    /**
     * @param {Object} config - see {@link ZipProvider#serveFiles} or {@link GithubProvider#serveFiles} for available parameters
     * @param {string} config.packageType - either 'zip' or 'github'
     * @return {Promise<string|Array<number>|Uint8Array|ArrayBuffer|Blob|Buffer>} - the package, see {@link ZipProvider#serveFiles} or {@link GithubProvider#serveFiles} for actual return value
     */
    async serve(config) {
        const provider = this.initProvider(config.packageType);
        let generatedHtml = '';

        // generate HTML and add marker files, depending on chosen AR experience type
        switch (this.arType) {
            case AR_BARCODE:
                if (!this.config.matrixType) {
                    throw new Error('Barcode-based AR needs a matrix type');
                }
                if (!this.config.markerValue) {
                    throw new Error('Barcode-based AR needs a marker value');
                }

                generatedHtml = MarkerModule.generateBarcodeHtml(this.config.matrixType, this.config.markerValue, `assets/${this.assetName}`);
                // barcode requires no marker file
                break;

            case AR_PATTERN:
                generatedHtml = MarkerModule.generatePatternHtml(this.assetType, this.assetParam, `assets/${this.assetName}`);
                this.addMarkerToProvider(provider, this.config.markerPatt);
                break;

            case AR_LOCATION:
                generatedHtml = LocationModule.generateHtml(this.assetType, this.assetParam, `assets/${this.assetName}`);
                this.addMarkerToProvider(provider, this.config.markerPatt);
                break;

            case AR_NTF:
                throw new Error('NTF template is not implemented');

            default:
                throw new Error(`Unknown AR type: ${this.arType}`);
        }

        provider.addFile('index.html', generatedHtml);
        this.addAssetToProvider(provider);
        return provider.serveFiles(config);
    }

    /**
     * @param {string} packageType - either 'zip' or 'github'
     * @return {Provider}
     */
    initProvider(packageType) {
        /** @type {Provider} */
        let provider = null;

        // init provider
        switch (packageType) {
            case PACKAGE_ZIP:
                provider = new ZipProvider();
                break;

            case PACKAGE_GITHUB:
                provider = new GithubProvider();
                break;

            default:
                throw new Error(`Unknown provider: ${packageType}`);
        }
        return provider;
    }

    addAssetToProvider(provider) {
        switch (this.assetType) {
            case ASSET_3D:
            case ASSET_IMAGE:
                provider.addFile(`assets/${this.assetName}`, this.assetFile, ENC_BASE64);
                break;

            case ASSET_AUDIO:
            case ASSET_VIDEO:
                if (provider instanceof ZipProvider) {
                    provider.addFile(`assets/${this.assetName}`, this.assetFile, ENC_BINARY);
                } else if (provider instanceof GithubProvider) {
                    if (!(this.assetFile instanceof ArrayBuffer)) {
                        throw new Error('Audio/video asset files for GitHub must be converted to ArrayBuffer');
                    }

                    // GitHub API does not support binary files
                    // assetFile should be a base64-encoded string
                    provider.addFile(`assets/${this.assetName}`, arrayBufferToBase64(this.assetFile), ENC_BASE64);
                }
                break;

            default:
                throw new Error(`Unknown asset type: ${this.assetType}`);
        }
    }
    
    addMarkerToProvider(provider, markerPatt) {
        if (!markerPatt) {
            throw new Error('Missing marker.patt file');
        }

        provider.addFile('assets/marker.patt', markerPatt);
    }
}
