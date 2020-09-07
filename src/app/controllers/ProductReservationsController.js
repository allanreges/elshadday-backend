import * as Yup from 'yup';
import ProductReservations from './models/ProductReservations';

class ProductReservation {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      description: Yup.string().required(),
      product: Yup.string().required(),
      price: Yup.number().required(),
      phone: Yup.string().required(),
      amount: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const {
      id,
      name,
      product,
      price,
      description,
      phone,
      amount,
    } = await ProductReservations.create(req.body);

    return res.json({
      id,
      name,
      product,
      price,
      description,
      phone,
      amount,
    });
  }

  async delete(req, res) {
    const productReservations = await ProductReservations.findByPk(
      req.params.id
    );

    productReservations.canceled_at = new Date();
    productReservations.enabled = false;

    await productReservations.save();

    return res.json({ productReservations });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      description: Yup.string().required(),
      product: Yup.string().required(),
      price: Yup.number().required(),
      phone: Yup.string.required(),
      amount: Yup.number.required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const productReservations = await ProductReservations.findByPk(req.body.id);

    const {
      id,
      name,
      product,
      price,
      description,
      phone,
      amount,
    } = await ProductReservations.create(req.body);

    return res.json({
      id,
      name,
      product,
      price,
      description,
      phone,
      amount,
    });
  }

  async index(req, res) {
    const product = await ProductReservations.findAll({
      attributes: [
        'id',
        'name',
        'description',
        'product',
        'price',
        'phone',
        'amount',
      ],
    });

    return res.json({ product });
  }
}

export default new ProductReservation();
