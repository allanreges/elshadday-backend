"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _multer = require('multer'); var _multer2 = _interopRequireDefault(_multer);
var _multer3 = require('./config/multer'); var _multer4 = _interopRequireDefault(_multer3);
var _auth = require('./app/middlewares/auth'); var _auth2 = _interopRequireDefault(_auth);

var _UserController = require('./app/controllers/UserController'); var _UserController2 = _interopRequireDefault(_UserController);
var _SessionController = require('./app/controllers/SessionController'); var _SessionController2 = _interopRequireDefault(_SessionController);
var _FileController = require('./app/controllers/FileController'); var _FileController2 = _interopRequireDefault(_FileController);
var _EventController = require('./app/controllers/EventController'); var _EventController2 = _interopRequireDefault(_EventController);
var _LivesController = require('./app/controllers/LivesController'); var _LivesController2 = _interopRequireDefault(_LivesController);
var _PraysController = require('./app/controllers/PraysController'); var _PraysController2 = _interopRequireDefault(_PraysController);

const routes = new (0, _express.Router)();
const upload = _multer2.default.call(void 0, _multer4.default);

routes.post('/users', _UserController2.default.store);
routes.post('/sessions', _SessionController2.default.store);
routes.get('/events', _EventController2.default.index);
routes.get('/lives', _LivesController2.default.index);

routes.use(_auth2.default);

routes.put('/users', _UserController2.default.update);

routes.post('/files', upload.single('file'), _FileController2.default.store);
routes.delete('/files/:id', _FileController2.default.delete);

routes.post('/events', _EventController2.default.store);
routes.put('/events', _EventController2.default.update);
routes.delete('/events/:id', _EventController2.default.delete);

routes.post('/lives', _LivesController2.default.store);
routes.delete('/lives/:id', _LivesController2.default.delete);

routes.post('/prays', _PraysController2.default.store);
routes.get('/prays', _PraysController2.default.index);
routes.delete('/prays/:id', _PraysController2.default.delete);

exports. default = routes;
