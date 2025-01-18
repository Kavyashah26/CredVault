const crypto = require('crypto');

const algorithm = 'aes-256-cbc';
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

// Encrypt data
// exports.encrypt = (text, secretKey) => {
//   const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
//   let encrypted = cipher.update(text, 'utf8', 'hex');
//   encrypted += cipher.final('hex');
//   return `${iv.toString('hex')}:${encrypted}`;
// };

// exports.encrypt = (text, secretKey) => {
//   if (secretKey.length !== 32) {
//     throw new Error('Invalid secretKey length. It must be 32 bytes for aes-256-cbc.');
//   }

//   const cipher = crypto.createCipheriv(algorithm, Buffer.from(secretKey), iv);
//   let encrypted = cipher.update(text, 'utf8', 'hex');
//   encrypted += cipher.final('hex');

//   return `${iv.toString('hex')}:${encrypted}`;
// };
exports.encrypt = (text, secretKey) => {
  // Convert the hex string into a buffer
  const key = Buffer.from(secretKey, 'hex');

  // Create a cipher with the key and IV
  const cipher = crypto.createCipheriv(algorithm, key, iv);

  // Encrypt the text
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');

  // Return the IV and encrypted text
  return `${iv.toString('hex')}:${encrypted}`;
};


// Decrypt data
// exports.decrypt = (encryptedData, secretKey) => {
//   const [ivHex, encryptedText] = encryptedData.split(':');
//   const decipher = crypto.createDecipheriv(algorithm, secretKey, Buffer.from(ivHex, 'hex'));
//   let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
//   decrypted += decipher.final('utf8');
//   return decrypted;
// };


// exports.decrypt = (encryptedText, secretKey) => {
//   if (secretKey.length !== 32) {
//     throw new Error('Invalid secretKey length. It must be 32 bytes for aes-256-cbc.');
//   }

//   const [ivHex, encrypted] = encryptedText.split(':');
//   const iv = Buffer.from(ivHex, 'hex');

//   const decipher = crypto.createDecipheriv(algorithm, Buffer.from(secretKey), iv);
//   let decrypted = decipher.update(encrypted, 'hex', 'utf8');
//   decrypted += decipher.final('utf8');

//   return decrypted;
// };


exports.decrypt = (encryptedText, secretKey) => {
  // Split the encrypted string into the IV and the encrypted text
  const [ivHex, encryptedData] = encryptedText.split(':');

  // Convert the hex string into a buffer for the IV and key
  const iv = Buffer.from(ivHex, 'hex');
  const key = Buffer.from(secretKey, 'hex');

  // Create a decipher with the key and IV
  const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);

  // Decrypt the data
  let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
  decrypted += decipher.final('utf8');

  // Return the decrypted text
  return decrypted;
};