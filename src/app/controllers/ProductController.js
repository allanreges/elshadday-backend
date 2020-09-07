import * as Yup from 'yup';
import Product from './models/Product';
import File from './models/File';

class Products {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      description: Yup.string().required(),
      classes: Yup.string().required(),
      price: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id, name, classes, price, description } = await Product.create(
      req.body
    );

    return res.json({
      id,
      name,
      classes,
      price,
      description,
    });
  }

  async delete(req, res) {
    const product = await Product.findByPk(req.params.id);

    product.canceled_at = new Date();
    product.enabled = false;

    await product.save();

    return res.json({ product });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      description: Yup.string().required(),
      classes: Yup.string().required(),
      price: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const product = await Product.findByPk(req.body.id);

    const { id, name, classes, price, description } = await Product.create(
      req.body
    );

    return res.json({
      id,
      name,
      classes,
      price,
      description,
    });
  }

  async index(req, res) {
    const product = await product.findAll({
      attributes: ['id', 'name', 'address', 'description', 'classes', 'price'],
      include: [
        {
          model: File,
          where: { enabled: true },
          required: false,
          as: 'images',
          attributes: ['url', 'id', 'path'],
        },
      ],
    });

    return res.json({ product });
  }
}

export default new Products();
