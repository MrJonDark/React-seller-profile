const string_decoder = require("string_decoder");
const crypto = require("crypto");

  function generateNonce (length) {
    const decoder = new string_decoder.StringDecoder("ascii");
    const buf = Buffer.alloc(length);
    var nonce = "";
    while (nonce.length < length) {
      crypto.randomFillSync(buf);
      nonce = decoder.write(buf);
    }
    return nonce.substr(0, length);
  };
  module.exports = generateNonce;
