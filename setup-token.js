const fs = require('fs');
const readline = require('readline');
const utils = require('./utils.js');

// load the config file
const config = utils.getConfig();
if (!config) {
  return console.log('Could not find the config file');
}

// assert that the client secret file exists
const clientSecret = utils.getClientSecret(config);
if (!clientSecret) {
  return console.log(`Could not find the client secret file in: ${config.paths.clientSecret}`);
}

// assert that the token file does not exist
const token = utils.getToken(config);
if (token) {
  return console.log(`The token file already exists in: ${config.paths.token}`);
}

// generate the authentication url so that the user can authenticate
const auth = utils.getAuth(clientSecret);
const authUrl = auth.generateAuthUrl(config.server.auth);
console.log(`Authorize this app by visiting this url:\n${authUrl}`);
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
rl.question(`Enter the authorization code here:\n`, code => {
  // the user has provided the authorization token so it can be persisted
  rl.close();
  auth.getToken(code, (error, token) => {
    if (error) {
      return console.log(`There was an error getting the token:\n${error}`);
    }
    fs.writeFileSync(config.paths.token, JSON.stringify(token));
    console.log(`Token saved successfully to: ${config.paths.token}`);
  });
});
