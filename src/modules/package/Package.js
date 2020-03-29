import { ZipProvider, GithubProvider } from '../../providers';
import { MarkerModule } from '../marker';

export const AR_BARCODE = 'barcode';
export const AR_PATTERN = 'pattern';
export const AR_LOCATION = 'location';
export const AR_NTF = 'ntf';

export class Package {
    /**
     * @param {Object} config
     * @param {string} config.arType - one of barcode, pattern, location or ntf (see exported constants)
     * @param {string} config.assetType - one of 3d, image, audio or video (see {@link MarkerModule} exported constants)
     * @param {string|Blob} config.assetFile - the file to be show in AR
     * @param {string} config.assetName - the file name, to be included in HTML template
     * @param {string} [config.markerPatt] - the marker image patt file (required for pattern AR type)
     * @param {string} [config.matrixType] - the barcode matrix type (see {@link BarcodeMarkerGenerator} exported constants, required for barcode AR type)
     * @param {number} [config.markerValue] - the barcode value of the marker (required for barcode AR type)
     */
    constructor(config) {
        this.arType = config.arType;
        this.assetType = config.assetType;
        this.assetFile = config.assetFile;
        this.assetName = config.assetName;
        this.config = config;
    }

    /**
     * @param {Object} config - see {@link ZipProvider#serveFiles} or {@link GithubProvider#serveFiles} for available parameters
     * @param {string} config.packageType - either 'zip' or 'github'
     * @return {Promise<string|Array<number>|Uint8Array|ArrayBuffer|Blob|Buffer>} - the package, see {@link ZipProvider#serveFiles} or {@link GithubProvider#serveFiles} for actual return value
     */
    async serve(config) {
        /** @type {Provider} */
        let provider = null;

        // init provider
        switch (config.packageType) {
            case 'zip':
                provider = new ZipProvider();
                break;

            case 'github':
                provider = new GithubProvider();
                break;

            default:
                throw new Error(`Unknown provider: ${config.packageType}`);
        }

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

                generatedHtml = MarkerModule.generateBarcodeHtml(this.config.matrixType, this.config.markerValue, `/assets/${this.assetName}`);
                // barcode requires no marker file
                break;

            case AR_PATTERN:
                generatedHtml = MarkerModule.generatePatternHtml(this.assetType, `/assets/${this.assetName}`);

                if (!this.config.markerPatt) {
                    throw new Error('Pattern-based AR needs a marker.patt file');
                }

                provider.addFile('assets/marker.patt', this.config.markerPatt);
                break;

            case AR_LOCATION:
                throw new Error('Location template is not implemented');

            case AR_NTF:
                throw new Error('NTF template is not implemented');

            default:
                throw new Error(`Unknown AR type: ${this.arType}`);
        }

        provider.addFile('index.html', generatedHtml);
        provider.addFile(`assets/${this.assetName}`, this.assetFile);

        return provider.serveFiles(config);
    }
}
