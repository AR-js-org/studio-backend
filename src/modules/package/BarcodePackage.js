import {MarkerModule} from '../marker';

export class BarcodePackage {

  /**
   * @param config : object  {matrixType: '', markerValue: '', assetSrc: ''}
   * @returns generatedHtml(String)
   */
  static generateHtml(config) {
    return  MarkerModule.generateBarcodeHtml(config.matrixType, config.markerValue, config.assetSrc);
  }
}