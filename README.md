<p align="center">
  ⭐️ Please support us by giving a star! Thanks! ⭐️
</p>

# 🔑 Crypt

Crypt is a standard Deno module that it is used to compute the hash of passwords.

<!-- BCrypt, SCrypt, PBKDF2, SHA1, SHA256, SHA384, SHA512. -->

## 🎁 Features

* [x] BCrypt
* [ ] SCrypt

## 🎀 BCrypt

### 🔧 How to use

```js
import * as bcrypt from 'https://deno.land/x/crypt@v0.1.0/bcrypt.ts';
```

### 💡 Usage

#### 🔛 Async

To hash a password (with auto-generated salt):

```js
const hash = await bcrypt.hash('Crypt');
```

To check a password:

```js
const result = await bcrypt.compare('Crypt', hash);
```

To hash a password with a manually generated salt:

```js
const salt = await bcrypt.genSalt(8);
const hash = await bcrypt.hash('Crypt', salt);
```

#### 🔛 Sync

To hash a password (with auto-generated salt):

```js
const hash = bcrypt.hash('Crypt');
```

To check a password:

```js
const result = bcrypt.compare('Crypt', hash);
```

To hash a password with a manually generated salt:

```js
const salt = bcrypt.genSaltSync(8);
const hash = bcrypt.hashSync("Crypt", salt);
```

## 📜 Changelog

Details changes for each release are documented in the [CHANGELOG.md](https://github.com/Bunlong/crypt/blob/master/CHANGELOG.md).

## ❗ Issues

If you think any of the `Crypt` can be improved, please do open a PR with any updates and submit any issues. Also, I will continue to improve this, so you might want to watch/star this repository to revisit.

## 💪 Contribution

We'd love to have your helping hand on contributions to `Crypt` by forking and sending a pull request!

Your contributions are heartily ♡ welcome, recognized and appreciated. (✿◠‿◠)

How to contribute:

- Open pull request with improvements
- Discuss ideas in issues
- Spread the word
- Reach out with any feedback

## ⚖️ License

The MIT License [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

<!-- deno run --unstable --allow-net --allow-read bcrypt.ts -->
