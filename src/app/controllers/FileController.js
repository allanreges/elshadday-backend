import File from './models/File';

const upload = require('../../config/multer');

const singleUpload = upload.single('file');

class FileController {
  async store(req, res) {
    const {
      originalname: name,
      filename: originalname,
      location: path,
    } = req.file;
    const { type, event_id, enabled } = req.body;

    const file = await File.create({
      name,
      path,
      type,
      event_id,
      enabled,
    });

    singleUpload(req, res, function (err) {
      return res.json({ file });
    });
  }

  async delete(req, res) {
    const file = await File.findByPk(req.params.id);

    file.canceled_at = new Date();
    file.enabled = false;

    await file.save();

    return res.json({ file });
  }
}

export default new FileController();
