import {toBase64} from '../../utils.js';
import * as encoders from './matrix-encoders';

const BARCODE_MATRIX_TYPES = [
  {
    id: '3x3_hamming_6_3',
    maxNumMarkers: 8,
    hamming: 3,
    encoder: encoders.encode_3x3_hamming_6_3,
  },
  {
    id: '3x3_parity_6_5',
    maxNumMarkers: 32,
    hamming: 1,
    encoder: encoders.encode_3x3_parity_6_5,
  },
  {
    id: '4x4_bch_13_5_5',
    maxNumMarkers: 32,
    hamming: 5,
    encoder: encoders.encode_4x4_bch_13_5_5,
  },
  {
    id: '4x4_bch_13_9_3',
    maxNumMarkers: 512,
    hamming: 3,
    encoder: encoders.encode_4x4_bch_13_9_3,
  },
  {
    id: '5x5_bch_22_7_7',
    maxNumMarkers: 128,
    hamming: 7,
    encoder: encoders.encode_5x5_bch_22_7_7,
  },
  {
    id: '5x5_bch_22_12_5',
    maxNumMarkers: 4096,
    hamming: 5,
    encoder: encoders.encode_5x5_bch_22_12_5,
  },
];

export class BarcodeMarkerGenerator {
  static getMatrixTypes() {
    return BARCODE_MATRIX_TYPES;
  }

  static getMarker(matrixTypeId, value) {
    const typeDesc = BARCODE_MATRIX_TYPES.find(x => x.id === matrixTypeId);
    if (!typeDesc)
      throw new Error('unknown barcode matrix type id: ' + matrixTypeId);
    if (!Number.isInteger(value))
      throw new Error('barcode value is not an integer: ' + value);
    if (value < 0 || value >= typeDesc.maxNumMarkers)
      throw new Error('barcode value out of range: ' + value);

    const bitArray = typeDesc.encoder(value);
    throw new Error('unimplemented');
  }
}
