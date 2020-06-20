"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);
var _database = require('../config/database'); var _database2 = _interopRequireDefault(_database);

var _User = require('../app/controllers/models/User'); var _User2 = _interopRequireDefault(_User);
var _File = require('../app/controllers/models/File'); var _File2 = _interopRequireDefault(_File);
var _Events = require('../app/controllers/models/Events'); var _Events2 = _interopRequireDefault(_Events);
var _Lives = require('../app/controllers/models/Lives'); var _Lives2 = _interopRequireDefault(_Lives);
var _Prays = require('../app/controllers/models/Prays'); var _Prays2 = _interopRequireDefault(_Prays);

const models = [_User2.default, _File2.default, _Events2.default, _Lives2.default, _Prays2.default];

class Database {
  constructor() {
    this.init();
    // this.mongo();
  }

  init() {
    this.connection = new (0, _sequelize2.default)(_database2.default);

    models.map((model) => model.init(this.connection));
    models.map(
      (model) => model.associate && model.associate(this.connection.models)
    );
  }
}

exports. default = new Database();
