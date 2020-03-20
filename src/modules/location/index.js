import template from './locationBased.handlebars';

export class LocationModule {
    static generateHtml(longitude, latitude, assetSrc) {
        return template({
            longitude,
            latitude,
            assetSrc,
        });
    }
}
