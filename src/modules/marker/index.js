import { BarcodeMarkerGenerator } from './tools/barcode-marker-generator';
import { PatternMarkerGenerator } from './tools/pattern-marker-generator';

export class MarkerModule {
    static getBarcodeMarkerSVGDataURI(matrixTypeId, value) {
        return new BarcodeMarkerGenerator(matrixTypeId, value).asSVGDataURI();
    }
}
