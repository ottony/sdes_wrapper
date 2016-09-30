# sdes_wrapper
An wrapper implementing Strem.Transform from http://github.com/ottony/sdes to be used on https://github.com/gabriel-araujjo/node-chat

# Usage

```javascript
const SDesStream = require('./lib/index.js');

let enc = new SDesStream.SDesStreamEncrypt({key: 123});
let dec = new SDesStream.SDesStreamDecrypt({key: 123});

> enc.write('ottony')
ɚ��.l
true
> dec.write('c99a9ac92e6c', 'hex')
ottony
true
```
