/**
 * Multiplies two polynomials using bitwise operations and returns the result. lhs and rhs
 * describe polynomials as a series of bits. Does not check whether lhs and rhs are actually
 * integers.
 */
function polynomialMultiply(lhs, rhs) {
  let i = 0,
    ret = 0;
  while (rhs > 0) {
    if (rhs & 1) ret ^= lhs << i;
    rhs >>= 1;
    ++i;
  }
  return ret;
}

/**
 * Divides two polynomials using bitwise operations and returns an object with two entries:
 * the quotient and the remainder. Code originates from https://math.stackexchange.com/a/1916440 .
 * lhs and rhs describe polynomials as a series of bits, e.g. 0b1010011 will be interpreted as
 * x^6 + x^4 + x + 1. Does not check whether lhs and rhs are actually integers.
 */
function polynomialDivide(lhs, rhs) {
  let rem = lhs,
    div = rhs;
  if (rhs === 0) throw new Error('divisor may not be zero');

  // shift until leftmost bits line is up
  let i = 1;
  while ((div | rem) > div << 1) {
    div <<= 1;
    ++i;
  }

  // now keep dividing until we're back where we started
  let quot = 0;
  while (i > 0) {
    quot <<= 1;
    --i;
    if ((rem ^ div) < rem) {
      quot |= 1;
      rem ^= div;
    }
    div >>= 1;
  }

  return {quot, rem};
}

/**
 * Converts an integer to an array of boolean values.
 */
function intToBitArray(n, minWidth) {
  let ret = [];
  while (n > 0) {
    ret.push((n & 1) !== 0);
    n >>= 1;
  }
  while (ret.length < minWidth) ret.push(false);
  return ret.reverse();
}

/**
 * Encodes the given number for the AR_MATRIX_CODE_3x3_HAMMING63 ARToolKit matrix code type and
 * returns a bit array with exactly nine boolean bits to be used in a 3x3 matrix.
 */
export function encode_3x3_hamming_6_3(n) {
  if (!Number.isInteger(n) || n < 0 || n >= 1 << 3)
    throw new Error('value invalid or out of range for 3x3_hamming_6_3: ' + n);
  let bits = intToBitArray(n, 3);
  return [
    true,
    bits[0],
    bits[1],
    (bits[0] ^ bits[1]) > 0,
    bits[2],
    (bits[0] ^ bits[2]) > 0,
    true,
    (bits[1] ^ bits[2]) > 0,
    false,
  ];
}

/**
 * Encodes the given number for the AR_MATRIX_CODE_3x3_PARITY65 ARToolKit matrix code type and
 * returns a bit array with exactly nine boolean bits to be used in a 3x3 matrix.
 */
export function encode_3x3_parity_6_5(n) {
  if (!Number.isInteger(n) || n < 0 || n >= 1 << 5)
    throw new Error('value invalid or out of range for 3x3_parity_6_5: ' + n);
  let bits = intToBitArray(n, 5);
  return [
    true,
    (bits[0] ^ bits[1] ^ bits[2] ^ bits[3] ^ bits[4]) > 0,
    bits[0],
    bits[1],
    bits[2],
    bits[3],
    true,
    bits[4],
    false,
  ];
}

/**
 * Encodes the given data integer using the desired Bose–Chaudhuri–Hocquenghem code (see
 * https://en.wikipedia.org/wiki/BCH_code ).
 */
function encode_bch(n, k, generator, data) {
  // k is thenumber of actual data bits
  if (!Number.isInteger(data) || data < 0 || data >= 1 << k)
    throw new Error(
      `value invalid or out of range for BCH with n = ${n}, k = ${k}: ${data}`,
    );

  // n is total number of bits per code word (i.e. number of data bits + number of error correction bits)
  if (n <= k) throw new Error(`invalid BCH parameters: n = ${n}, k = ${k}`);

  // generator polynomial has degree n-k, i.e. n-k+1 bits
  if (generator < (1 << (n - k) || generator >= 1 << (n - k + 1)))
    throw new Error(
      `invalid generator polynomial for BCH with n = ${n}, k = ${k}: ${generator}`,
    );

  let ret = intToBitArray(
    (data << (n - k)) ^ polynomialDivide(data << (n - k), generator).rem,
    n,
  );
  if (ret.length < n) throw new Error(`BCH calculation invalid`);
  return ret;
}

/**
 * Encodes the given number for the AR_MATRIX_CODE_4x4_BCH_13_5_5 ARToolKit matrix code type and
 * returns a bit array with exactly 16 boolean bits to be used in a 4x4 matrix. The internal
 * BCH generator polynomial is x^8 + x^7 + x^6 + x^4 + 1.
 */
export function encode_4x4_bch_13_5_5(n) {
  let enc = encode_bch(13, 5, 465, n);
  enc.splice(0, 0, true);
  enc.splice(12, 0, true);
  enc.splice(15, 0, false);
  return enc;
}

/**
 * Encodes the given number for the AR_MATRIX_CODE_4x4_BCH_13_9_3 ARToolKit matrix code type and
 * returns a bit array with exactly 16 boolean bits to be used in a 4x4 matrix. The internal
 * BCH generator polynomial is x^4 + x + 1.
 */
export function encode_4x4_bch_13_9_3(n) {
  let enc = encode_bch(13, 9, 19, n);
  enc.splice(0, 0, true);
  enc.splice(12, 0, true);
  enc.splice(15, 0, false);
  return enc;
}

/**
 * Encodes the given number for the AR_MATRIX_CODE_5x5_BCH_22_7_7 ARToolKit matrix code type and
 * returns a bit array with exactly 25 boolean bits to be used in a 5x5 matrix. The internal
 * BCH generator polynomial is x^15 + x^11 + x^10 + x^9 + x^8 + x^7 + x^5 + x^3 + x^2 + x + 1.
 */
export function encode_5x5_bch_22_7_7(n) {
  let enc = encode_bch(22, 7, 36783, n);
  enc.splice(0, 0, true);
  enc.splice(20, 0, true);
  enc.splice(25, 0, false);
  return enc;
}

/**
 * Encodes the given number for the AR_MATRIX_CODE_5x5_BCH_22_12_5 ARToolKit matrix code type and
 * returns a bit array with exactly 25 boolean bits to be used in a 5x5 matrix. The internal
 * BCH generator polynomial is x^10 + x^9 + x^8 + x^6 + x^5 + x^3 + 1.
 */
export function encode_5x5_bch_22_12_5(n) {
  let enc = encode_bch(22, 12, 1897, n);
  enc.splice(0, 0, true);
  enc.splice(20, 0, true);
  enc.splice(25, 0, false);
  return enc;
}
