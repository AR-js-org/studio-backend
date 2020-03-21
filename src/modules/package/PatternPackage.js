import {MarkerModule} from '../marker';

export class PatternPackage {

  /**
   * @param config: object {assetType: '3d/image/audio/video', pattSrc: '',  assetSrc: ''}
   * @returns generateHtml(String)
   */
  static generateHtml(config) {
    return  MarkerModule.generatePatternHtml(config.assetType, config.pattSrc, config.assetSrc);
  }

}