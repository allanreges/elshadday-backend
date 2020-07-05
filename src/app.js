import 'dotenv/config';
import 'express-async-errors';
import express from 'express';
import path from 'path';
import Youch from 'youch';
import cors from 'cors';
import routes from './routes';

import './database/index';

class App {
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use(cors());
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
