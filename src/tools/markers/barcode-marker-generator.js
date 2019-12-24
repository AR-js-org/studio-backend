import * as encoders from './matrix-encoders';

const BARCODE_MATRIX_TYPES = [
  {
    id: '3x3_hamming_6_3',
    maxNumMarkers: 8,
    hamming: 3,
    matrixSize: 3,
    encoder: encoders.encode_3x3_hamming_6_3,
  },
  {
    id: '3x3_parity_6_5',
    maxNumMarkers: 32,
    hamming: 1,
    matrixSize: 3,
    encoder: encoders.encode_3x3_parity_6_5,
  },
  {
    id: '4x4_bch_13_5_5',
    maxNumMarkers: 32,
    hamming: 5,
    matrixSize: 4,
    encoder: encoders.encode_4x4_bch_13_5_5,
  },
  {
    id: '4x4_bch_13_9_3',
    maxNumMarkers: 512,
    hamming: 3,
    matrixSize: 4,
    encoder: encoders.encode_4x4_bch_13_9_3,
  },
  {
    id: '5x5_bch_22_7_7',
    maxNumMarkers: 128,
    hamming: 7,
    matrixSize: 5,
    encoder: encoders.encode_5x5_bch_22_7_7,
  },
  {
    id: '5x5_bch_22_12_5',
    maxNumMarkers: 4096,
    hamming: 5,
    matrixSize: 5,
    encoder: encoders.encode_5x5_bch_22_12_5,
  },
];

export class BarcodeMarkerGenerator {
  static encodeValue(matrixTypeId, value) {
    const typeDesc = BARCODE_MATRIX_TYPES.find(x => x.id === matrixTypeId);
    if (!typeDesc)
      throw new Error('unknown barcode matrix type id: ' + matrixTypeId);
    if (!Number.isInteger(value))
      throw new Error('barcode value is not an integer: ' + value);
    if (value < 0 || value >= typeDesc.maxNumMarkers)
      throw new Error('barcode value out of range: ' + value);
    return [typeDesc, typeDesc.encoder(value)];
  }

  static getMatrixTypes() {
    return BARCODE_MATRIX_TYPES;
  }

  static getMarkerSVG(matrixTypeId, value) {
    const [typeDesc, enc] = BarcodeMarkerGenerator.encodeValue(
      matrixTypeId,
      value,
    );

    let svgStr =
      '<?xml version="1.0" encoding="utf-8"?>' +
      '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="100" height="100">' +
      '<rect x="0" y="0" width="100" height="100" fill="black" />';

    const pixelSize = 50.0 / typeDesc.matrixSize;
    for (let y = 0; y < typeDesc.matrixSize; ++y)
      for (let x = 0; x < typeDesc.matrixSize; ++x)
        if (!enc[y * typeDesc.matrixSize + x])
          svgStr += `<rect x="${25 + x * pixelSize}" y="${25 +
            y *
              pixelSize}" width="${pixelSize}" height="${pixelSize}" fill="white" />`;

    svgStr += '</svg>';

    return (
      'data:image/svg+xml,' +
      encodeURIComponent(svgStr)
        .replace(/'/g, '%27')
        .replace(/"/g, '%22')
    );
  }
}
