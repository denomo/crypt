import * as bcrypt from './bcrypt.ts';

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
    case 'compare': {
      let result: boolean;
      try {
        result = bcrypt.checkPw(data.payload.plaintext, data.payload.hash);
      } catch {
        result = false;
      }
      context.postMessage(result);
      break;
    }
    default: {
      throw Error('Invalid data sent to worker');
    }
  }
};
