const jwt = require('jsonwebtoken');
const crypto = require('crypto');

class JWTManager {
  constructor() {
    this.secret = this.generateSecret();
    this.refreshInterval = 24 * 60 * 60 * 1000; // 24 hours
    this.startSecretRotation();
  }

  generateSecret() {
    return crypto.randomBytes(64).toString('hex');
  }

  startSecretRotation() {
    setInterval(() => {
      this.secret = this.generateSecret();
      console.log('JWT secret rotated');
    }, this.refreshInterval);
  }

  sign(payload, options = {}) {
    return jwt.sign(payload, this.secret, {
      expiresIn: '7d',
      ...options
    });
  }

  verify(token) {
    return jwt.verify(token, this.secret);
  }

  getSecret() {
    return this.secret;
  }
}

module.exports = new JWTManager();