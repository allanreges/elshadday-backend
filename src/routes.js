import { Router } from 'express';
import multer from 'multer';
import authMiddleware from './app/middlewares/auth';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import EventController from './app/controllers/EventController';
import LivesController from './app/controllers/LivesController';
import PraysController from './app/controllers/PraysController';
import multerConfig from './config/multer';

const upload = multer(multerConfig);

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);
routes.get('/events', EventController.index);
routes.get('/lives', LivesController.index);
routes.get('/prays', PraysController.index);

routes.use(authMiddleware);
routes.post('/prays', PraysController.store);

routes.put('/users', UserController.update);

routes.post('/files', upload.single('file'), FileController.store);
routes.delete('/files/:id', FileController.delete);

routes.post('/events', EventController.store);
routes.put('/events', EventController.update);
routes.delete('/events/:id', EventController.delete);

routes.post('/lives', LivesController.store);
routes.delete('/lives/:id', LivesController.delete);

routes.delete('/prays/:id', PraysController.delete);

export default routes;
