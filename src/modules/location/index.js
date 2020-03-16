export class LocationModule {

  generateHtml(asset_src, longitude, latitude, path = 'index.html') {
    const html = Handlebars.templates.locationBased({
      asset_src: asset_src,
      longitude: longitude,
      latitude: latitude
    });

    return {
      path: path,
      content: html
    };
  }
}
