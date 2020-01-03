# CRYPT-JSON

Librería y ejecutable para encriptar y/o desencriptar los campos que elijamos de un JSON.

## Ejecutable

### Encriptar
Dado un JSON 'mi.json' del que queremos encriptar algunos campos

> encrypt mi.json MICLAVEESSTA key1toCrypt [key2toCrypt ...]

Generando el fichero: mi.encrypted.json

### Desencriptar
Dado un JSON 'mi.json' del que queremos desencriptar algunos campos

> decrypt mi.json MICLAVEESSTA key1toDecrypt [key2toDecrypt ...]

Generando el fichero: mi.decrypted.json

## Libreria
Dado un JSON de entrada:
```javascript
{ 
  arrayColores:
    { 
      '0': { nombreColor: 'rojo', valorHexadec: '#f00' },
      '1': { nombreColor: 'verde', valorHexadec: '#0f0' },
      '2': { nombreColor: 'azul', valorHexadec: '#00f' },
      '3': { nombreColor: 'cyan', valorHexadec: '#0ff' },
      '4': { nombreColor: 'magenta', valorHexadec: '#f0f' },
      '5': { nombreColor: 'amarillo', valorHexadec: '#ff0' },
      '6': { nombreColor: 'negro', valorHexadec: '#000' } 
  } 
}
```

Dado el fichero de configuración: 
```javascript
let config = {
  "decriptedJsonFilename": __dirname + '/decripted.json',
  "encriptedJsonFilename": __dirname + '/encripted.json',
  "keyword": "miclaveesesta",
  "arrFieldsEnc": [ 'nombreColor' ]
};
```

Donde: 
* decriptedJsonFilename: es el nombre del fichero JSON de salida
* encriptedJsonFilename: es el nombre del fichero JSON de entrada
* keyword: clave utilizada para encriptar o desencriptar
* arrFieldsEnc: Array con las claves(keys) de los valores de JSON que queremos encriptar o desencriptar.

Uso:
```javascript
let CryptJSON = require('../CryptJson.js');
let config = {
  "decriptedJsonFilename": __dirname + '/decripted.json',
  "encriptedJsonFilename": __dirname + '/encripted.json',
  "keyword": "miclaveesesta",
  "arrFieldsEnc": [ 'nombreColor' ]
};
let cJSON = new CryptJSON(config);
cJSON.encJson();
cJSON.decJson();
```


