import {BarcodeMarkerGenerator} from './src/tools/markers/barcode-marker-generator';
import {PatternMarkerGenerator} from './src/tools/markers/pattern-marker-generator';

export class StudioBackend {
  static getBarcodeMarker(matrixTypeId, value) {
    return BarcodeMarkerGenerator.getMarker(matrixTypeId, value);
  }
}
