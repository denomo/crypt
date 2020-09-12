import * as bcrypt from './mod.ts';

const context: Worker = self as any;

context.onmessage = (event) => {
  let data = event.data;
  switch (data.action) {
    case 'hash': {
      context.postMessage(
        bcrypt.hashPw(data.payload.plaintext, data.payload.salt)
      );
      break;
    }
    case 'genSalt': {
      context.postMessage(bcrypt.genSalt(data.payload.log_rounds));
      break;
    }
  }
};
