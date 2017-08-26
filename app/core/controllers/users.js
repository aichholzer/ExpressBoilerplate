const m = require('../models');

module.exports = {
  read: async (req, res) => {
    if (req.params.user) {
      return res.send(await m.user.findById(req.params.user));
    }

    return res.render('users', {
      section: 'Users',
      users: await m.user.find({ 'meta.status': 'active' })
    });
  },

  create: async (req, res, next) => {
    try {
      const user = await m.user.create(req.body);
      return res.render('users', user);
    } catch (error) {
      return next(error);
    }
  },

  delete: async (req, res, next) => {
    try {
      const user = await m.user.findById(req.params.user).exec();
      await user.remove();
      return res.status(200).end();
    } catch (error) {
      return next(error);
    }
  }
};
