export function loadImage(dataURI) {
    const image = new Image();
    const p = new Promise((resolve, reject) => {
        image.addEventListener('load', () => {
            resolve(image);
        });

        image.addEventListener('error', () => {
            reject('Error loading image');
        });
    });

    image.src = dataURI;
    return p;
}
