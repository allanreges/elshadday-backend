import Sequelize, { Model } from 'sequelize';

class File extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        type: Sequelize.STRING,
        path: Sequelize.STRING,
        enabled: Sequelize.BOOLEAN,
        url: {
          type: Sequelize.VIRTUAL,
          get() {
            return `${this.path}`;
          },
        },
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default File;
