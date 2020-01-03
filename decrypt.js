#! /usr/bin/env node

const myArgs = process.argv.slice(2);
const [JSONfilename, keyword, ...keys2encrypt] = myArgs;

const path = require('path');
const dirname = path.dirname(myArgs[0]);
const basename = path.basename(myArgs[0], '.json');

let CryptJSON = require('./CryptJson.js');
let config = {
  'decriptedJsonFilename': __dirname + '/' + basename + '.decripted.json',
  'encriptedJsonFilename': JSONfilename,
  'keyword': keyword,
  'arrFieldsEnc': keys2encrypt
};

let cJSON = new CryptJSON(config);

cJSON.decJson();