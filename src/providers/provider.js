export class Provider {
    constructor (config) {
        this.files = [];
    }

    addFile (path, content, encoding) {
        this.files.push({
            path,
            content,
            encoding
        });
    }

    clearFiles () {
        this.files = [];
    }

    async publishFiles () {
        console.log(JSON.stringify(this.files));
    }
}
