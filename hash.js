var crypto = require('crypto');

var sha = crypto.createHash('sha256');
sha.update('shit');
console.log(sha.digest('hex'));
