import Sequelize, { Model } from 'sequelize';
import nodeGeocoder from 'node-geocoder';

const options = {
  provider: 'openstreetmap',
};

const geoCoder = nodeGeocoder(options);

class Event extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        description: Sequelize.STRING,
        address: Sequelize.STRING,
        time: Sequelize.DATE,
        geolocation: Sequelize.VIRTUAL,
        canceled_at: Sequelize.DATE,
        enabled: Sequelize.BOOLEAN,
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

export default Event;
