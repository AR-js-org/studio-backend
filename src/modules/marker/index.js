import { BarcodeMarkerGenerator } from './tools/barcode-marker-generator';
import { PatternMarkerGenerator } from './src/modules/marker/tools/pattern-marker-generator';

export class MarkerModule {
    static getBarcodeMarkerSVGDataURI(matrixTypeId, value) {
        return new BarcodeMarkerGenerator(matrixTypeId, value).asSVGDataURI();
    }
}
