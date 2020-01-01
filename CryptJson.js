let LUCipher = require('lucipher');
let fs = require('fs');

class CryptJson {

  /**
   * @description constructor de la clase
   * @param {json} config json de configuración con todos los parámetros necesarios: decriptedJsonFilename, encriptedjson, keyword, salt, arrFieldsEnc
   */
  constructor(config) {
    this.decriptedJsonFilename = config.decriptedJsonFilename;
    this.encriptedJsonFilename = config.encriptedJsonFilename;
    this.keyword = config.keyword || 'clavedefault';
    this.salt = config.salt || 'saltdefault';
    this.arrFieldsEnc = config.arrFieldsEnc;

    this.jsonEnc = {};
    this.keyType = {};
    this.LUC = new LUCipher(this.keyword, this.salt);
  }

  /**
   * @description Encripta los valores de los campos especificados de un JSON y lo guarda en un nuevo fichero
   * @return {JSON}
   */
  encJson() {
    this.decriptedJson = JSON.parse(fs.readFileSync(this.decriptedJsonFilename, 'utf-8'));
    this.encriptedJson = this._travelJSON('_encryptField', this.decriptedJson, {});
    this.save(this.encriptedJsonFilename, this.encriptedJson);
    return this.encriptedJson;
  }

  /**
   * @description
   * @return {JSON}
   */
  decJson() {
    this.encriptedJson = JSON.parse(fs.readFileSync(this.encriptedJsonFilename, 'utf-8'));
    this.decriptedJson = this._travelJSON('_dencryptField', this.encriptedJson, {});
    this.save(this.decriptedJsonFilename, this.decriptedJson);
    return this.decriptedJson;
  }

  /**
   * @description
   * @param {JSON} json
   * @param {JSON} jsonOutput
   * @return
   */
  _travelJSON(func, json, jsonOutput) {
    for (var clave in json) {
      if (json.hasOwnProperty(clave)) {
        let valor = json[clave];
        jsonOutput[clave] = {};
        jsonOutput[clave] = this[func](valor, clave, jsonOutput[clave]);
      }
    }
    return jsonOutput;
  }

  /**
   * @description
   * @param {*} valor
   * @param {String} clave
   * @param {JSON} jsonOutput
   * @return {JSON}
   */
  _encryptField(valor, clave, jsonOutput) {
    let valorOutput;
    if (this.arrFieldsEnc.includes(clave)) {
      if (typeof valor === 'object') {
        valor = JSON.stringify(valor);
      }
      valorOutput =  this.LUC.cipher(valor);
    } else {
      if (typeof valor === 'object') {
        valorOutput = this._travelJSON('_encryptField', valor, jsonOutput);
      } else {
        valorOutput = valor;
      }
    }
    return valorOutput;
  }

  /**
   * @description
   * @param {*} valor
   * @param {String} clave
   * @param {JSON} jsonOutput
   * @return {JSON}
   */
  _dencryptField(valor, clave, jsonOutput) {
    let valorOutput;
    if (this.arrFieldsEnc.includes(clave)) {
      if (typeof valor === 'object') {
        valor = JSON.stringify(valor);
      }
      valorOutput =  this.LUC.desCipher(valor);
    } else {
      if (typeof valor === 'object') {
        valorOutput = this._travelJSON('_dencryptField', valor, jsonOutput);
      } else {
        valorOutput = valor;
      }
    }
    return valorOutput;
  }

  save(filename, json) {
    if (filename) {
      fs.writeFileSync(filename, JSON.stringify(json), 'utf-8');
    }
  }
}

module.exports = CryptJson;