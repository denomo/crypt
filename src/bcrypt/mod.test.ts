import {
  assertEquals,
  assertThrows,
} from 'https://deno.land/std/testing/asserts.ts';

import * as bcrypt from './mod.ts';

Deno.test({
  name: 'Successful checking - Hashing password then checking returns true.',
  fn(): void {
    const passwordToTest = 'thisisapassword';

    const hashedPassword = bcrypt.hashSync(passwordToTest);

    const passwordVerified = bcrypt.compareSync(passwordToTest, hashedPassword);

    assertEquals(passwordVerified, true);
  },
});

Deno.test({
  name: 'Successful checking - Hashing password async then checking async returns true.',
  async fn(): Promise<void> {
    const passwordToTest = 'thisisapassword';

    const hashedPassword = await bcrypt.hash(passwordToTest);

    const passwordVerified = await bcrypt.compare(
      passwordToTest,
      hashedPassword,
    );

    assertEquals(passwordVerified, true);
  },
});

Deno.test({
  name: 'Successful checking- hashing password with a custom salt then checking returns true.',
  fn(): void {
    const salt = bcrypt.genSaltSync(8);
    const passwordToTest = 'thisisapassword';

    const hashedPassword = bcrypt.hashSync(passwordToTest, salt);

    const passwordVerified = bcrypt.compareSync(passwordToTest, hashedPassword);

    assertEquals(passwordVerified, true);
  },
});

Deno.test({
  name: 'Successful checking - Hashing password with a custom salt async then checking async returns true.',
  async fn(): Promise<void> {
    const salt = await bcrypt.genSalt(8);
    const passwordToTest = 'thisisapassword';

    const hashedPassword = await bcrypt.hash(passwordToTest, salt);

    const passwordVerified = await bcrypt.compare(
      passwordToTest,
      hashedPassword,
    );

    assertEquals(passwordVerified, true);
  },
});

Deno.test({
  name: 'Generating a hash with more than 30 rounds fails.',
  fn(): void {
    assertThrows(() => {
      bcrypt.genSaltSync(31);
    });
  },
});

Deno.test({
  name: 'Successful checking - Checking a previously generated hash from Deno Crypt.',
  async fn(): Promise<void> {
    const previousHash =
      '$2a$10$27xCvRE5eHcyjeyO6iZujeWUDl0HCTFbwF9tw6hd1sKMjV3TlRw2O';
    const previousPlaintext = "test";

    const plaintextVerified = await bcrypt.compare(
      previousPlaintext,
      previousHash,
    );

    assertEquals(plaintextVerified, true);
  },
});

Deno.test({
  name: 'Successful checking - Checking a previously generated hash from php.',
  async fn(): Promise<void> {
    // Generated using 'password_hash' function in PHP
    const previousHash =
      '$2y$10$YCW2KSGtFxODsDj5SzCvpussZrfsQb7S3Qtyb7meIumNtyr9ptWoK';
    const previousPlaintext = "test";

    const plaintextVerified = await bcrypt.compare(
      previousPlaintext,
      previousHash,
    );

    assertEquals(plaintextVerified, true);
  },
});

Deno.test({
  name: 'Successful checking - Checking a previously generated hash from Node.',
  async fn(): Promise<void> {
    // Generated using "hash" function in 'bcryptjs' npm package.
    const previousHash =
      '$2a$10$nnXyDPxy/eA9oHV.bhAqKeD9xZ55wAxwKwNSoBcM9z8GeBMB1GmI2';
    const previousPlaintext = "test";

    const plaintextVerified = await bcrypt.compare(
      previousPlaintext,
      previousHash,
    );

    assertEquals(plaintextVerified, true);
  },
});

Deno.test({
  name: 'Successful checking - Hashing password with non-standard characters.',
  async fn(): Promise<void> {
    const passwordToTest = '🎉わたしは、あなたを愛しています。🎉';

    const hashedPassword = await bcrypt.hash(passwordToTest);

    const passwordVerified = await bcrypt.compare(
      passwordToTest,
      hashedPassword,
    );

    assertEquals(passwordVerified, true);
  },
});

Deno.test({
  name: 'Unsuccessful checking - Hashing password then checking with a different hashed password.',
  async fn(): Promise<void> {
    const plaintextToCheck = 'plaintext';
    const hashToVerify = await bcrypt.hash('hashed');

    const passwordVerified = await bcrypt.compare(
      plaintextToCheck,
      hashToVerify,
    );

    assertEquals(passwordVerified, false);
  },
});
