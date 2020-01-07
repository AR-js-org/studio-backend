import {BarcodeMarkerGenerator} from './src/tools/markers/barcode-marker-generator';
import {PatternMarkerGenerator} from './src/tools/markers/pattern-marker-generator';

export class StudioBackend {
  static getBarcodeMarkerSVGDataURI(matrixTypeId, value) {
    return new BarcodeMarkerGenerator(matrixTypeId, value).asSVGDataURI();
  }

  static async getMarkerPattern(dataURI) {
    return await new PatternMarkerGenerator(dataURI).toPattern();
  }
}
