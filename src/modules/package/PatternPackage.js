import { MarkerModule } from '../marker';

export class PatternPackage {

    /**
     * @param {{ assetType: string, pattSrc: string,  assetSrc: string }} config
     * @return {string}
     */
    static generateHtml(config) {
        return MarkerModule.generatePatternHtml(config.assetType, config.pattSrc, config.assetSrc);
    }
}
