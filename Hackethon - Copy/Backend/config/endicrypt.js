import { randomBytes, createCipheriv, createDecipheriv } from 'crypto';

// Encryption and Decryption Configuration
const algorithm = 'aes-256-cbc';
const secretKey = process.env.ENCRYPTION_KEY || randomBytes(32).toString('hex'); // 32 bytes key
const ivLength = 16; // Initialization vector length

// Encrypt Function
export const encrypt = (data) => {
  const iv = randomBytes(ivLength); // Random IV for each encryption
  const cipher = createCipheriv(algorithm, Buffer.from(secretKey, 'hex'), iv);
  let encrypted = cipher.update(data, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return `${iv.toString('hex')}:${encrypted}`; // Store IV with encrypted data
};

// Decrypt Function
export const decrypt = (encryptedData) => {
  const [iv, encrypted] = encryptedData.split(':');
  const decipher = createDecipheriv(
    algorithm,
    Buffer.from(secretKey, 'hex'),
    Buffer.from(iv, 'hex')
  );
  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
};
