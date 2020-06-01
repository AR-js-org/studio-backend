import {
    ASSET_3D,
    ASSET_IMAGE,
    ASSET_AUDIO,
    ASSET_VIDEO,
} from '../../index';

import location3dTemplate from './templates/location.3d.handlebars';
import locationImageTemplate from './templates/location.image.handlebars';
import locationAudioTemplate from './templates/location.audio.handlebars';
import locationVideoTemplate from './templates/location.video.handlebars';

const TEMPLATES = {
    [ASSET_3D]: location3dTemplate,
    [ASSET_IMAGE]: locationImageTemplate,
    [ASSET_AUDIO]: locationAudioTemplate,
    [ASSET_VIDEO]: locationVideoTemplate,
};

export class LocationModule {
    static generateHtml(assetType, assetParam, assetPath) {
        return TEMPLATES[assetType]({
            assetParam,
            assetPath,
        });
    }
}
