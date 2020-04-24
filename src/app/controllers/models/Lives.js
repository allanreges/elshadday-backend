import Sequelize, { Model } from 'sequelize';

class Lives extends Model {
  static init(sequelize) {
    super.init(
      {
        url: Sequelize.STRING,
        enabled: Sequelize.BOOLEAN,
        description: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default Lives;
