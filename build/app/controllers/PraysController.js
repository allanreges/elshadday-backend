"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);
var _Prays = require('./models/Prays'); var _Prays2 = _interopRequireDefault(_Prays);

class Prays {
  async store(req, res) {
    const schema = Yup.object().shape({
      description: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id, url, description } = await _Prays2.default.create(req.body);

    return res.json({
      id,
      url,
      description,
    });
  }

  async delete(req, res) {
    const prays = await _Prays2.default.findByPk(req.params.id);

    prays.enabled = false;

    await prays.save();

    return res.json({ prays });
  }

  async index(req, res) {
    const prays = await _Prays2.default.findAll({
      attributes: ['name', 'description', 'id', 'enabled'],
    });

    return res.json({ prays });
  }
}

exports. default = new Prays();
