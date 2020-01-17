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
  constructor(matrixTypeId, value) {
    this.typeDesc = BARCODE_MATRIX_TYPES.find(x => x.id === matrixTypeId);
    if (!this.typeDesc)
      throw new Error('unknown barcode matrix type id: ' + matrixTypeId);
    if (!Number.isInteger(value))
      throw new Error('barcode value is not an integer: ' + value);
    if (value < 0 || value >= this.typeDesc.maxNumMarkers)
      throw new Error('barcode value out of range: ' + value);

    this.value = value;
    this.valueEncoded = this.typeDesc.encoder(value);
  }

  asSVG() {
    let svgStr =
      '<?xml version="1.0" encoding="utf-8"?>' +
      '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="100" height="100">' +
      '<rect x="0" y="0" width="100" height="100" fill="black" />';

    const pixelSize = 50.0 / this.typeDesc.matrixSize;
    for (let y = 0; y < this.typeDesc.matrixSize; ++y)
      for (let x = 0; x < this.typeDesc.matrixSize; ++x)
        if (!this.valueEncoded[y * this.typeDesc.matrixSize + x])
          svgStr += `<rect x="${25 + x * pixelSize}" y="${25 +
            y *
              pixelSize}" width="${pixelSize}" height="${pixelSize}" fill="white" />`;

    svgStr += '</svg>';
    return svgStr;
  }

  asSVGDataURI() {
    return (
      'data:image/svg+xml,' +
      encodeURIComponent(this.asSVG())
        .replace(/'/g, '%27')
        .replace(/"/g, '%22')
    );
  }

  static getMatrixTypes() {
    return BARCODE_MATRIX_TYPES;
  }
}
