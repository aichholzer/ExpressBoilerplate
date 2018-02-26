// Boilerplate
const m = require('../models');

module.exports = {
  read: async (req, res) => {
    if (req.params.city) {
      return res.send(await m.city.findById(req.params.city));
    }

    return res.render('cities', {
      section: 'Cities',
      cities: await m.city.find({ 'meta.status': 'active' })
    });
  },

  create: async (req, res, next) => {
    try {
      const city = await m.city.create(req.body);
      return res.render('cities', city);
    } catch (error) {
      return next(error);
    }
  },

  delete: async (req, res, next) => {
    try {
      const city = await m.city.findById(req.params.city).exec();
      await city.remove();
      return res.status(200).end();
    } catch (error) {
      return next(error);
    }
  }
};
