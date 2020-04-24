import * as Yup from 'yup';
import Events from './models/Events';
import File from './models/File';

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

    const { id, name, address, time, description } = await Events.create(
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
    const event = await Events.findByPk(req.params.id);

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

    const events = await Events.findByPk(req.body.id);

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
    const events = await Events.findAll({
      attributes: ['id', 'name', 'address', 'description', 'geolocation'],
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

    return res.json({ events });
  }
}

export default new Event();
