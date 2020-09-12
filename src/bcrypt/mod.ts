import * as bcrypt from './bcrypt.ts';

// **
// * Using the async variant is highly recommended
// * This function is blocking and computationally expensive but not requires additonal flags
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

/**
 * It is used to generates a salt using a number of log rounds
 *
 * @export
 * @param {(number | undefined)} [log_rounds=undefined] Number of log rounds to use. Recommended to leave this undefined.
 * @returns {string} The generated salt
 */
export function genSaltSync(
  log_rounds: number | undefined = undefined,
): string {
  return bcrypt.genSalt(log_rounds);
}

/**
 * It is used to generate a hash for the plaintext password
 *
 * @export
 * @param {string} plaintext The password to hash
 * @param {(string | undefined)} [salt=undefined] The salt to use when hashing. Recommended to leave this undefined.
 * @returns {string} The hashed password
 */
export function hashSync(
  plaintext: string,
  salt: string | undefined = undefined,
): string {
  return bcrypt.hashPw(plaintext, salt);
}

/**
 * It is used to check if a plaintext password matches a hash
 * Requires --allow-net and --unstable flags
 *
 * @export
 * @param {string} plaintext The plaintext password to check
 * @param {string} hash The hash to compare to
 * @returns {Promise<boolean>} Whether the password matches the hash
 */
export async function compare(
  plaintext: string,
  hash: string,
): Promise<boolean> {
  let worker = new Worker(
    new URL("worker.ts", import.meta.url).toString(),
    { type: "module", deno: true },
  );

  worker.postMessage({
    action: "compare",
    payload: {
      plaintext,
      hash,
    },
  });

  return new Promise((resolve) => {
    worker.onmessage = (event) => {
      resolve(event.data);
      worker.terminate();
    };
  });
}
