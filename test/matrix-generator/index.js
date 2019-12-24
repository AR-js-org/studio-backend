import {expect} from 'chai';
import * as encoders from '../../src/tools/markers/matrix-encoders';
import codewords from './codewords.json';

function bitStringToBitArray(str) {
  return str.split('').map(c => (c == '1' ? true : false));
}

describe('matrix-generator', function() {
  it('correctly encodes 3x3_hamming_6_3', function() {
    for (let i = 0; i < codewords.hamming_6_3.length; ++i) {
      expect(encoders.encode_3x3_hamming_6_3(i)).to.eql(
        bitStringToBitArray(codewords.hamming_6_3[i]),
      );
    }
  });

  it('correctly encodes 3x3_parity_6_5', function() {
    for (let i = 0; i < codewords.parity_6_5.length; ++i) {
      expect(encoders.encode_3x3_parity_6_5(i)).to.eql(
        bitStringToBitArray(codewords.parity_6_5[i]),
      );
    }
  });

  it('correctly encodes 4x4_bch_13_5_5', function() {
    for (let i = 0; i < codewords.bch_13_5_5.length; ++i) {
      expect(encoders.encode_4x4_bch_13_5_5(i)).to.eql(
        bitStringToBitArray(codewords.bch_13_5_5[i]),
      );
    }
  });

  it('correctly encodes 4x4_bch_13_9_3', function() {
    for (let i = 0; i < codewords.bch_13_9_3.length; ++i) {
      expect(encoders.encode_4x4_bch_13_9_3(i)).to.eql(
        bitStringToBitArray(codewords.bch_13_9_3[i]),
      );
    }
  });

  it('correctly encodes 5x5_bch_22_7_7', function() {
    for (let i = 0; i < codewords.bch_22_7_7.length; ++i) {
      expect(encoders.encode_5x5_bch_22_7_7(i)).to.eql(
        bitStringToBitArray(codewords.bch_22_7_7[i]),
      );
    }
  });

  it('correctly encodes 5x5_bch_22_12_5', function() {
    for (let i = 0; i < codewords.bch_22_12_5.length; ++i) {
      expect(encoders.encode_5x5_bch_22_12_5(i)).to.eql(
        bitStringToBitArray(codewords.bch_22_12_5[i]),
      );
    }
  });
});
