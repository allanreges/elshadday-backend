"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);
var _Events = require('./models/Events'); var _Events2 = _interopRequireDefault(_Events);
var _File = require('./models/File'); var _File2 = _interopRequireDefault(_File);

class Event {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      address: Yup.string().required(),
      time: Yup.string().required(),
      description: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id, name, address, time, description } = await _Events2.default.create(
      req.body
    );

    return res.json({
      id,
      name,
      address,
      time,
      description,
    });
  }

  async delete(req, res) {
    const event = await _Events2.default.findByPk(req.params.id);

    event.canceled_at = new Date();
    event.enabled = false;

    await event.save();

    return res.json({ event });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      address: Yup.string().required(),
      time: Yup.string().required(),
      description: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const events = await _Events2.default.findByPk(req.body.id);

    const { id, name, address, time, description } = await events.update(
      req.body
    );

    return res.json({
      id,
      name,
      address,
      time,
      description,
    });
  }

  async index(req, res) {
    const events = await _Events2.default.findAll({
      attributes: ['id', 'name', 'address', 'description', 'geolocation'],
      include: [
        {
          model: _File2.default,
          where: { enabled: true },
          required: false,
          as: 'images',
          attributes: ['url', 'id', 'path'],
        },
      ],
    });

    return res.json({ events });
  }
}

exports. default = new Event();
