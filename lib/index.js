const BufferCrypt = require('sdes');
const Transform   = require('stream').Transform;
const util        = require('util');
const Buffer      = require('buffer').Buffer;

const defaults = {
  keyEnc: 'hex'
};

function SDesStream(options) {
  if (!(this instanceof SDesStream))
    return new SDesStream(options);

  options = Object.assign({}, defaults, options);
  this.key = options.key;

  Transform.call(this, options);
}

util.inherits(SDesStream, Transform);

SDesStream.prototype._transform = function (chunk, encoding, callBack) {
  if(encoding != 'buffer')
    chunk = Buffer.from(chunk.toString(), encoding);

  const transformed = this.sdes(chunk);

  this.push(transformed);

  callBack();
};

SDesStream.prototype.sdes = function (chunk) {
  return BufferCrypt.sdesEncrypt(this.key, chunk);
}

function SDesStreamEncrypt(options) {
  if (!(this instanceof SDesStreamEncrypt))
    return new SDesStreamEncrypt(options);

  SDesStreamEncrypt.super_.apply(this, arguments);
};

function SDesStreamDecrypt(options) {
  if (!(this instanceof SDesStreamDecrypt))
    return new SDesStreamDecrypt(options);

  SDesStreamDecrypt.super_.apply(this, arguments);
};

SDesStreamEncrypt.prototype.sdes = function (chunk) {
  return BufferCrypt.sdesEncrypt(this.key, chunk);
}
util.inherits(SDesStreamEncrypt, SDesStream);

SDesStreamDecrypt.prototype.sdes = function (chunk) {
  return BufferCrypt.sdesDecrypt(this.key, chunk);
}

util.inherits(SDesStreamDecrypt, SDesStream);

module.exports = {
  Encrypt: SDesStreamEncrypt,
  Decrypt: SDesStreamDecrypt
};
