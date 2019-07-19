let CryptoJSON = require('../index.js');
let config = {
  "decriptedJsonFilename": __dirname + '/decripted.json',
  "encriptedJsonFilename": __dirname + '/encripted.json',
  "keyword": "miclaveesesta",
  "arrFieldsEnc": [ 'nombreColor' ]
};

let cJSON = new CryptoJSON(config);

cJSON.encJson();

cJSON.decJson();