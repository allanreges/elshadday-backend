import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';
import authMiddleware from './app/middlewares/auth';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import EventController from './app/controllers/EventController';
import LivesController from './app/controllers/LivesController';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);
routes.get('/events', EventController.index);
routes.get('/lives', LivesController.index);

routes.use(authMiddleware);

routes.put('/users', UserController.update);

routes.post('/files', upload.single('file'), FileController.store);
routes.delete('/files/:id', FileController.delete);

routes.post('/events', EventController.store);
routes.put('/events', EventController.update);
routes.delete('/events/:id', EventController.delete);

routes.post('/lives', LivesController.store);
routes.delete('/lives/:id', LivesController.delete);

export default routes;
