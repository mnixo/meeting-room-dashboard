const fs = require('fs');
const OAuth2 = require('googleapis').google.auth.OAuth2;

module.exports = {

  getConfig: function() {
    const configPath = 'config.json';
    return fs.existsSync(configPath) ? JSON.parse(fs.readFileSync(configPath)) : null;
  },

  getClientSecret: function(config) {
    const clientSecretPath = config.paths.clientSecret;
    return fs.existsSync(clientSecretPath) ? JSON.parse(fs.readFileSync(clientSecretPath)) : null;
  },

  getToken: function(config) {
    const tokenPath = config.paths.token;
    return fs.existsSync(tokenPath) ? JSON.parse(fs.readFileSync(tokenPath)) : null;
  },

  getAuth: function(clientSecret) {
    const { client_secret, client_id, redirect_uris } = clientSecret.installed;
    return new OAuth2(client_id, client_secret, redirect_uris[0]);
  },

  getAuthWithCredentials: function(config) {
    const clientSecret = this.getClientSecret(config);
    if (!clientSecret) {
      return console.log(`Could not find the client secret file: ${config.paths.clientSecret}`);
    }
    const token = this.getToken(config);
    if (!token) {
      return console.log(`Could not find the token file in: ${config.paths.token}`);
    }
    const auth = this.getAuth(clientSecret);
    auth.setCredentials(token);
    return auth;
  }

};
