// Modules
require('attract')({ basePath: __dirname });
const bodyParser = require('body-parser');
const compression = require('compression');
const express = require('express');
const powered = require('powered');
const serveFavicon = require('serve-favicon');

// Boilerplate
const config = attract('config');
const log = attract('core/lib/log');
const m = attract('core/models');
const router = attract('core/lib/router');

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
    powered(),
    compression(),
    express.static(`${__dirname}/public`),
    bodyParser.json(),
    bodyParser.urlencoded({ extended: false }),
    serveFavicon(`${__dirname}/public/img/favicon.png`),
    router({
      express,
      routes: `${__dirname}/core/routes`,
      controllers: `${__dirname}/core/controllers`
    })
  );

  app.listen(port, log.info.bind(null, `🚀 Up on port: ${port}`));
}).catch(log.error);
