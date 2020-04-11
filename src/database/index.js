import Sequelize from 'sequelize';
import databaseConfig from '../config/database';

import User from '../app/controllers/models/User';

const models = [User];

class Database {
  constructor() {
    this.init();
    // this.mongo();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models.map((model) => model.init(this.connection));
    models.map(
      (model) => model.associate && model.associate(this.connection.models)
    );
  }
}

export default new Database();
