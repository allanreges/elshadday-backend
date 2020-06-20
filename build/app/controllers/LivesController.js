"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);
var _Lives = require('./models/Lives'); var _Lives2 = _interopRequireDefault(_Lives);

class Lives {
  async store(req, res) {
    const schema = Yup.object().shape({
      url: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id, url, description } = await _Lives2.default.create(req.body);

    return res.json({
      id,
      url,
      description,
    });
  }

  async delete(req, res) {
    const lives = await _Lives2.default.findByPk(req.params.id);

    lives.enabled = false;

    await lives.save();

    return res.json({ lives });
  }

  async index(req, res) {
    const lives = await _Lives2.default.findAll({
      attributes: ['id', 'description', 'url'],
    });

    return res.json({ lives });
  }
}

exports. default = new Lives();
