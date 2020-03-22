import { MarkerModule } from '../marker';

export class BarcodePackage {

    /**
     * @param {{ matrixType: string, markerValue: string, assetSrc: string }} config
     * @return {string}
     */
    static generateHtml(config) {
        return MarkerModule.generateBarcodeHtml(config.matrixType, config.markerValue, config.assetSrc);
    }
}
