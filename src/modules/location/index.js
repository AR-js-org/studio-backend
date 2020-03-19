import Handlebars from 'handlebars';

export class LocationModule {

    generateHtml(asset_src, longitude, latitude, path = 'index.html') {
        const html = Handlebars.templates.locationBased({
            asset_src,
            longitude,
            latitude,
        });

        return {
            path,
            content: html,
        };
    }
}
