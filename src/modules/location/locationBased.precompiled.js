(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['locationBased'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<!DOCTYPE html>\r\n<html>\r\n<head>\r\n    <meta charset='utf-8'>\r\n    <meta http-equiv='X-UA-Compatible' content='IE=edge'>\r\n    <script src='https://aframe.io/releases/0.9.2/aframe.min.js'></script>\r\n    <script src=\"https://raw.githack.com/jeromeetienne/AR.js/master/aframe/build/aframe-ar.min.js\"></script>\r\n    <script src=\"https://raw.githack.com/donmccurdy/aframe-extras/master/dist/aframe-extras.loaders.min.js\"></script>\r\n    <script>\r\n        THREEx.ArToolkitContext.baseURL = 'https://raw.githack.com/jeromeetienne/ar.js/master/three.js/'\r\n    </script>\r\n</head>\r\n\r\n<body style='margin: 0; overflow: hidden;'>\r\n<a-scene\r\n        vr-mode-ui=\"enabled: false\"\r\n        embedded\r\n        arjs='sourceType: webcam; sourceWidth:1280; sourceHeight:960; displayWidth: 1280; displayHeight: 960; debugUIEnabled: false;'>\r\n\r\n    <a-entity gltf-model=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"asset_src") || (depth0 != null ? lookupProperty(depth0,"asset_src") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"asset_src","hash":{},"data":data,"loc":{"start":{"line":20,"column":26},"end":{"line":20,"column":39}}}) : helper)))
    + "\" rotation=\"0 180 0\" scale=\"1 1 1\" gps-entity-place=\"longitude: "
    + alias4(((helper = (helper = lookupProperty(helpers,"longitude") || (depth0 != null ? lookupProperty(depth0,"longitude") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"longitude","hash":{},"data":data,"loc":{"start":{"line":20,"column":103},"end":{"line":20,"column":116}}}) : helper)))
    + "; latitude: "
    + alias4(((helper = (helper = lookupProperty(helpers,"latitude") || (depth0 != null ? lookupProperty(depth0,"latitude") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"latitude","hash":{},"data":data,"loc":{"start":{"line":20,"column":128},"end":{"line":20,"column":140}}}) : helper)))
    + ";\" animation-mixer/>\r\n\r\n    <a-camera gps-camera rotation-reader></a-camera>\r\n</a-scene>\r\n</body>";
},"useData":true});
})();