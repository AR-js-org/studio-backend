import {BarcodeMarkerGenerator} from './src/tools/markers/barcode-marker-generator';
import {PatternMarkerGenerator} from './src/tools/markers/pattern-marker-generator';

export class StudioBackend {
  static getBarcodeMarkerSVG(matrixTypeId, value) {
    return BarcodeMarkerGenerator.getMarkerSVG(matrixTypeId, value);
  }
}
