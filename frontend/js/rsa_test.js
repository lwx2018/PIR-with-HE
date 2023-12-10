(() => {
  const NodeRSA = require('node-rsa');
  const key = new NodeRSA();
  const bits = 512;
  const exp = 65537;
  key.generateKeyPair(bits, exp);
  const privateKey = key.exportKey('pkcs1-private-pem');
  const publicKey = key.exportKey('pkcs1-public-pem');
  const text = JSON.stringify({'A':1});
  const encrypted = key.encrypt(text, 'base64');
  console.log('encrypted: ', encrypted);
  const decrypted = key.decrypt(encrypted, 'utf8');
  console.log('decrypted: ', decrypted);
})();