import { BarcodeMarkerGenerator } from './tools/barcode-marker-generator';
import { PatternMarkerGenerator } from './tools/pattern-marker-generator';
import template from './markerBased.handlebars';

export class MarkerModule {
    static getBarcodeMarkerSVGDataURI(matrixType, value) {
        return new BarcodeMarkerGenerator(matrixType, value).asSVGDataURI();
    }

    static async getMarkerPattern(dataURI) {
        return await new PatternMarkerGenerator(dataURI).toPattern();
    }

    static async getFullMarkerImage(dataURI, ratio, size, color) {
        return await new PatternMarkerGenerator(dataURI).toFullMarker(ratio, size, color);
    }

    static generateHtml(matrixType, markerValue, assetSrc) {
        return template({
            matrixType,
            markerValue,
            assetSrc,
        });
    }
}
