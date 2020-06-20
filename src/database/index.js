import Sequelize from 'sequelize';
import databaseConfig from '../config/database';

import User from '../app/controllers/models/User';
import File from '../app/controllers/models/File';
import Events from '../app/controllers/models/Events';
import Lives from '../app/controllers/models/Lives';
import Prays from '../app/controllers/models/Prays';

const models = [User, File, Events, Lives, Prays];

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
