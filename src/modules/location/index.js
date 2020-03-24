import location3dTemplate from './templates/location.3d.handlebars';

export class LocationModule {
    static generateLocation3dHtml(longitude, latitude, assetSrc) {
        return location3dTemplate({
            longitude,
            latitude,
            assetSrc,
        });
    }
}
