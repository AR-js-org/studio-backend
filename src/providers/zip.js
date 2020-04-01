import { Provider as BaseProvider, ENC_UTF8, ENC_BASE64 } from './provider';
import JSZip from 'jszip';

export const ENC_BINARY = 'binary';

export const ZIP_TYPE_BASE64 = 'base64';
export const ZIP_TYPE_BINARY_STRING = 'binarystring';
export const ZIP_TYPE_ARRAY = 'array'; // array of bytes (0-255)
export const ZIP_TYPE_UINT8_ARRAY = 'uint8array';
export const ZIP_TYPE_ARRAY_BUFFER = 'arraybuffer';
export const ZIP_TYPE_BLOB = 'blob';
export const ZIP_TYPE_NODE_BUFFER = 'nodebuffer';

const COMPRESS_DEFLATE = 'DEFLATE';
const COMPRESS_STORE = 'STORE';

export class ZipProvider extends BaseProvider {
    /**
     * Add file to bundle.
     *
     * @param {string} path file path inside the zip
     * @param {string|ArrayBuffer|Uint8Array|Buffer|Blob|Promise|Stream} content
     * @param {string} [encoding] utf-8 or base64
     */
    addFile(path, content, encoding = ENC_UTF8) {
        this.files.push({
            content,
            encoding,
            path,
        });
    }

    /**
     * Creates a ZIP with all files.
     *
     * @param {string} [type] - output ZIP file format, default to base64 string
     * @param {number} [compress] - compression level, default to 0
     * @return {Promise<string|Array<number>|Uint8Array|ArrayBuffer|Blob|Buffer>} - ZIP file in chosen format
     */
    async serveFiles({ type = ZIP_TYPE_BASE64, compress = 0 } = {}) {
        super.serveFiles();

        this.zip = new JSZip();

        if ([ZIP_TYPE_ARRAY_BUFFER, ZIP_TYPE_UINT8_ARRAY, ZIP_TYPE_BLOB, ZIP_TYPE_NODE_BUFFER].indexOf(type) !== -1) {
            if (!JSZip.support[type]) {
                throw new Error(`Output type not supported by browser: ${type}`);
            }
        }

        this.files.forEach((file) => {
            this.zip.file(file.path, file.content, {
                base64: file.encoding === ENC_BASE64,
                ...(file.encoding === ENC_BINARY && { binary: true }), // define only if forced
            });
        });

        return this.zip.generateAsync({
            type,
            compression: compress > 0 ? COMPRESS_DEFLATE : COMPRESS_STORE,
            compressionOptions: {
                level: compress, // ignored if STORE
            },
        });
    }
}
