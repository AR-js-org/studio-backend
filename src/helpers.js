export const loadImage = (dataURI) => {
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
};

// thanks to https://stackoverflow.com/a/9458996/2270403
// this should be faster, if we ever have the need: https://gist.github.com/jonleighton/958841
export const arrayBufferToBase64 = (buffer) => {
    const binary = [];
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
        binary.push(String.fromCharCode(bytes[i]));
    }
    return btoa(binary.join(''));
};

