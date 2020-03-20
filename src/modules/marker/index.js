import { BarcodeMarkerGenerator } from './tools/barcode-marker-generator';
import { PatternMarkerGenerator } from './tools/pattern-marker-generator';
import barcodeTemplate from './templates/barcode.handlebars';
import pattern3dTemplate from './templates/pattern.3d.handlebars';
import patternImageTemplate from './templates/pattern.image.handlebars';
import patternAudioTemplate from './templates/pattern.audio.handlebars';
import patternVideoTemplate from './templates/pattern.video.handlebars';

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

    static generateBarcodeHtml(matrixType, markerValue, modelSrc) {
        return barcodeTemplate({
            matrixType,
            markerValue,
            modelSrc,
        });
    }

    static generatePattern3dHtml(pattSrc, modelSrc) {
        return pattern3dTemplate({
            pattSrc,
            modelSrc,
        });
    }

    static generatePatternImageHtml(pattSrc, imageSrc) {
        return patternImageTemplate({
            pattSrc,
            imageSrc,
        });
    }

    static generatePatternAudioTemplate(pattSrc, audioSrc) {
        return patternAudioTemplate({
            pattSrc,
            audioSrc,
        });
    }

    static generatePatternVideoTemplate(pattSrc, videoSrc) {
        return patternVideoTemplate({
            pattSrc,
            videoSrc,
        });
    }
}
