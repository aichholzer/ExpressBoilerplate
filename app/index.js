// Modules
const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const serveFavicon = require('serve-favicon');

// Boilerplate
const m = require('./core/models');
const config = require('./config');
const router = require('./router');

const [app, port] = [express(), process.env.PORT || 9000];

/**
 * Pre-load all model schemas, if any, and start the application.
 * This will make all schemas quickly available throughout the application.
 * @see core/models/index.js
 * @see Models.prototype.load()
 */
m.load(config.mongo).then(() => {
  app.locals.pretty = process.env.PRETTY_HTML === 'true';
  app.set('views', `${__dirname}/core/views`);
  app.set('view engine', 'pug');
  app.use(
    (req, res, next) => {
      res.setHeader('x-powered-by', 'analogbird.com');
      next();
    },
    express.static(`${__dirname}/public`),
    bodyParser.json(),
    bodyParser.urlencoded({ extended: false }),
    compression(),
    serveFavicon(`${__dirname}/public/img/favicon.png`),
    router(express)
  );

  app.listen(port, () => console.log(`Up: ${port}`));
}).catch(error => console.error(error));
