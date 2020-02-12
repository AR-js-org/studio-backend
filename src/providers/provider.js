export const ENC_UTF8 = 'utf-8';
export const ENC_BASE64 = 'base64';

/**
 * @typedef File
 * @property {string} path - file path relative to the container
 * @property {string} content - file content
 * @property {string} encoding - content encoding (utf-8, base64)
 */

export class Provider {
    constructor (config = {}) {
        this.files = [];
    }

    addFile (path, content, encoding = null) {
        this.files.push({
            path,
            content,
            encoding
        });
    }

    clearFiles () {
        this.files = [];
    }

    async serveFiles (config = {}) {
        console.log(JSON.stringify(this.files));
    }
}
