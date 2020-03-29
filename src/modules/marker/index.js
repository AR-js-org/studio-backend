import { BarcodeMarkerGenerator } from './tools/barcode-marker-generator';
import { PatternMarkerGenerator } from './tools/pattern-marker-generator';
import barcodeTemplate from './templates/barcode.handlebars';
import pattern3dTemplate from './templates/pattern.3d.handlebars';
import patternImageTemplate from './templates/pattern.image.handlebars';
import patternAudioTemplate from './templates/pattern.audio.handlebars';
import patternVideoTemplate from './templates/pattern.video.handlebars';

export const ASSET_3D = '3d';
export const ASSET_IMAGE = 'image';
export const ASSET_AUDIO = 'audio';
export const ASSET_VIDEO = 'video';

const TEMPLATES = {
    [ASSET_3D]: pattern3dTemplate,
    [ASSET_IMAGE]: patternImageTemplate,
    [ASSET_AUDIO]: patternAudioTemplate,
    [ASSET_VIDEO]: patternVideoTemplate,
};

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

    static generateBarcodeHtml(matrixType, markerValue, assetPath) {
        return barcodeTemplate({
            matrixType,
            markerValue,
            assetPath,
        });
    }

    static generatePatternHtml(assetType, assetPath) {
        return TEMPLATES[assetType]({
            assetPath,
        });
    }
}
