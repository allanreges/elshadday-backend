import * as Yup from 'yup';
import Live from './models/Lives';

class Lives {
  async store(req, res) {
    const schema = Yup.object().shape({
      url: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id, url, description } = await Live.create(req.body);

    return res.json({
      id,
      url,
      description,
    });
  }

  async delete(req, res) {
    const lives = await Live.findByPk(req.params.id);

    lives.enabled = false;

    await lives.save();

    return res.json({ lives });
  }

  async index(req, res) {
    const lives = await Live.findAll({
      attributes: ['id', 'description', 'url'],
      where: { enabled: true },
    });

    return res.json({ lives });
  }
}

export default new Lives();
