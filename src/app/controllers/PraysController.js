import * as Yup from 'yup';
import Pray from './models/Prays';

class Prays {
  async store(req, res) {
    const schema = Yup.object().shape({
      description: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id, url, description } = await Pray.create(req.body);

    return res.json({
      id,
      url,
      description,
    });
  }

  async delete(req, res) {
    const prays = await Pray.findByPk(req.params.id);

    prays.enabled = false;

    await prays.save();

    return res.json({ prays });
  }

  async index(req, res) {
    const prays = await Pray.findAll({
      attributes: ['name', 'description', 'id', 'enabled'],
      where: {
        enabled: true,
      },
    });

    return res.json({ prays });
  }
}

export default new Prays();
