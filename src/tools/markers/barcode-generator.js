import { toBase64 } from '../../utils.js';

// For now just imports four types of matrixes, with best ratio
// bewtween Hamming distance/max num. of markers, supported by AR.js.
// see: https://github.com/nicolocarpignoli/artoolkit-barcode-markers-collection
const BARCODE_MATRIXES = [
    {
        id: '3x3_parity_6_5',
        max_num_markers: 32,
        hamming: 1,
    },
    {
        id: '3x3_hamming_6_3',
        max_num_markers: 8,
        hamming: 3,
    },
    {
        id: '4x4_bch_13_5_5',
        max_num_markers: 32,
        hamming: 5,
    },
    {
        id: '4x4_bch_13_9_3',
        max_num_markers: 512,
        hamming: 3,
    },
];

export class BarcodeMarkersGenerator {
    static getBarcodeMatrixes() {
        return BARCODE_MATRIXES;
    }

    static getBarcodeMarker(matrixName, value) {
       return toBase64(`../../../data/${matrixName}/${value}.png`);
    }
}
