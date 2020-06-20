"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);
var _nodegeocoder = require('node-geocoder'); var _nodegeocoder2 = _interopRequireDefault(_nodegeocoder);

const options = {
  provider: 'openstreetmap',
};

const geoCoder = _nodegeocoder2.default.call(void 0, options);

class Event extends _sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        name: _sequelize2.default.STRING,
        description: _sequelize2.default.STRING,
        address: _sequelize2.default.STRING,
        time: _sequelize2.default.DATE,
        geolocation: _sequelize2.default.VIRTUAL,
        canceled_at: _sequelize2.default.DATE,
        enabled: _sequelize2.default.BOOLEAN,
      },
      {
        sequelize,
      }
    );

    this.addHook('beforeSave', async (event) => {
      if (event.address) {
        const location = await geoCoder.geocode(event.address).then((res) => {
          const data = {
            address: event.address,
            latitude: res[0].latitude,
            longitude: res[0].longitude,
          };
          event.address = JSON.stringify(data);
        });
      }
    });

    return this;
  }

  static associate(models) {
    this.hasMany(models.File, { foreignKey: 'event_id', as: 'images' });
  }
}

exports. default = Event;
