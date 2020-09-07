import ProductImages from './models/ProductImage';

const upload = require('../../config/multer');

const singleUpload = upload.single('file');

class ProductImage {
  async store(req, res) {
    const {
      originalname: name,
      filename: originalname,
      location: path,
    } = req.file;
    const { type, event_id, enabled } = req.body;

    const productImages = await ProductImages.create({
      name,
      path,
      type,
      event_id,
      enabled,
    });

    singleUpload(req, res, function (err) {
      return res.json({ productImages });
    });
  }

  async delete(req, res) {
    const productImages = await ProductImages.findByPk(req.params.id);

    productImages.canceled_at = new Date();
    productImages.enabled = false;

    await productImages.save();

    return res.json({ productImages });
  }
}

export default new ProductImage();
