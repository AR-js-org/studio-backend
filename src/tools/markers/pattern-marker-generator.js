import { loadImage } from './helpers.js';

export class PatternMarkerGenerator {
    constructor(dataURI) {
        if (!dataURI.startsWith('data:image'))
            throw new Error('Invalid data URI');

        this.dataURI = dataURI;
    }

    async toPattern() {
        const image = await loadImage(this.dataURI);
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = 16;
        canvas.height = 16;

        let patternString = '';

        for (let orientation = 0; orientation > -2 * Math.PI; orientation -= Math.PI / 2) {
            context.save();
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.translate(canvas.width / 2, canvas.height / 2);
            context.rotate(orientation);
            context.drawImage(image, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
            context.restore();

            const imageData = context.getImageData(0, 0, canvas.width, canvas.height);

            if (orientation !== 0)
                patternString += '\n';

            for (let channelOffset = 2; channelOffset >= 0; channelOffset--) {
                for (let y = 0; y < imageData.height; y++) {
                    for (let x = 0; x < imageData.width; x++) {
                        if (x !== 0)
                            patternString += ' '

                        const offset = (y * imageData.width * 4) + (x * 4) + channelOffset;
                        const value = imageData.data[offset];
                        patternString += String(value).padStart(3);
                    }

                    patternString += '\n';
                }
            }
        }

        return patternString;
    }
}
