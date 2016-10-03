# sdes_wrapper
A wrapper implementing [stream.Transform](https://nodejs.org/api/stream.html#stream_class_stream_transform) from http://github.com/ottony/sdes to be used on https://github.com/gabriel-araujjo/node-chat

# Usage

```javascript
const SDesStream = require('sdes_stream');

let enc = new SDesStream.SDesStreamEncrypt({key: 123});
let dec = new SDesStream.SDesStreamDecrypt({key: 123});

> enc.write('ottony')
ɚ��.l // Is 'c99a9ac92e6c' hexadecimal buffer

> Buffer.from('c99a9ac92e6c', 'hex').toString();
ɚ��.l

> let b = Buffer.from('c99a9ac92e6c', 'hex');
<Buffer c9 9a 9a c9 2e 6c>

> dec.write(b)
ottony
```
