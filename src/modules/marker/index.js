import { BarcodeMarkerGenerator } from './tools/barcode-marker-generator';
import { PatternMarkerGenerator } from './tools/pattern-marker-generator';
import Handlebars from 'handlebars';

export class MarkerModule {
    static getBarcodeMarkerSVGDataURI(matrixTypeId, value) {
        return new BarcodeMarkerGenerator(matrixTypeId, value).asSVGDataURI();
    }

    static async getMarkerPattern(dataURI) {
        return await new PatternMarkerGenerator(dataURI).toPattern();
    }

    static async getFullMarkerImage(dataURI, ratio, size, color) {
        return await new PatternMarkerGenerator(dataURI).toFullMarker(ratio, size, color);
    }

    generateHtml(matrix_code_type, marker_value, asset_src, path = 'index.html') {
        const html  = Handlebars.templates.markerBased({
            matrix_code_type,
            asset_src,
            marker_value});

        return {
            path,
            content: html,
        };
    }
}
