"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _File = require('./models/File'); var _File2 = _interopRequireDefault(_File);

class FileController {
  async store(req, res) {
    const { originalname: name, filename: path } = req.file;
    const { type, event_id, enabled } = req.body;

    const file = await _File2.default.create({
      name,
      path,
      type,
      event_id,
      enabled,
    });

    return res.json(file);
  }

  async delete(req, res) {
    const file = await _File2.default.findByPk(req.params.id);

    file.canceled_at = new Date();
    file.enabled = false;

    await file.save();

    return res.json({ file });
  }
}

exports. default = new FileController();
