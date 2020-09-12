import * as bcrypt from './bcrypt.ts';

// **
// * Using the async variant is highly recommended.
// * This function is blocking and computationally expensive but requires no additonal flags.
// *

/**
 * It is used to check if a plaintext password matches a hash
 *
 * @export
 * @param {string} plaintext The plaintext password to check
 * @param {string} hash The hash to compare to
 * @returns {boolean} Whether the password matches the hash
 */
export function compareSync(plaintext: string, hash: string): boolean {
  try {
    return bcrypt.checkPw(plaintext, hash);
  } catch {
    return false;
  }
}
