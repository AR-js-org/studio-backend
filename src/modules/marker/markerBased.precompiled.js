(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['markerBased'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<!doctype HTML>\r\n<html>\r\n<head>\r\n    <meta name=\"viewport\" content=\"width=device-width, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0\">\r\n</head>\r\n<script src=\"https://aframe.io/releases/0.9.2/aframe.min.js\"></script>\r\n<script src=\"https://raw.githack.com/jeromeetienne/AR.js/master/aframe/build/aframe-ar.min.js\"></script>\r\n<script src=\"https://raw.githack.com/donmccurdy/aframe-extras/master/dist/aframe-extras.loaders.min.js\"></script>\r\n\r\n<body style='margin : 0px; overflow: hidden;'>\r\n<!-- we add detectionMode and matrixCodeType to tell AR.js to recognize barcode markers -->\r\n<a-scene embedded vr-mode-ui=\"enabled: false\" arjs=\"sourceType: webcam; debugUIEnabled: false; detectionMode: mono_and_matrix; matrixCodeType: "
    + alias4(((helper = (helper = lookupProperty(helpers,"matrix_code_type") || (depth0 != null ? lookupProperty(depth0,"matrix_code_type") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"matrix_code_type","hash":{},"data":data,"loc":{"start":{"line":12,"column":143},"end":{"line":12,"column":163}}}) : helper)))
    + ";\">\r\n\r\n    <a-assets>\r\n        <a-asset-item id=\"animated-asset\" src=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"asset_src") || (depth0 != null ? lookupProperty(depth0,"asset_src") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"asset_src","hash":{},"data":data,"loc":{"start":{"line":15,"column":47},"end":{"line":15,"column":60}}}) : helper)))
    + "\"></a-asset-item>\r\n    </a-assets>\r\n\r\n    <a-marker id=\"animated-marker\" type='barcode' value='"
    + alias4(((helper = (helper = lookupProperty(helpers,"marker_value") || (depth0 != null ? lookupProperty(depth0,"marker_value") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"marker_value","hash":{},"data":data,"loc":{"start":{"line":18,"column":57},"end":{"line":18,"column":73}}}) : helper)))
    + "'>\r\n        <a-entity\r\n                animation-mixer\r\n                gltf-model=\"#animated-asset\"\r\n                scale=\"2 2 2\">\r\n        </a-entity>\r\n    </a-marker>\r\n\r\n    <a-entity camera></a-entity>\r\n</a-scene>\r\n</body>\r\n</html>";
},"useData":true});
})();