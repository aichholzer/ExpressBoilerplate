const fs = require('fs');

module.exports = (express) => {
  /**
   * This will setup the routes (found in the /router/routes).
   * For each route, it will also try to load a corresponding controller.
   * If a corresponding controller is not found, then that route will not be available.
   * @returns {Router}
   */
  let router = express.Router();
  const routePath = `${__dirname}/routes/`;
  const routes = fs.readdirSync(routePath);

  /**
   * "path" is used by the sidebar to expand or contract sections.
   */
  router.use((req, res, next) => {
    res.path = req.path;
    res.locals.path = req.path;
    next();
  });

  routes.forEach((file) => {
    if (file.match(/(.+)\.js$/)) {
      try {
        const route = require.call(null, `${routePath + file}`);
        const controller = require.call(null, `../core/controllers/${file}`);
        router = route(router, controller);
      } catch (error) {
        console.error(`Can't load controller: ${file}`, error);
      }
    }
  });

  router.use((req, res) => res.render('404'));
  return router;
};
