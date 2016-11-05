'use strict';


global._require = module => require(`${__dirname}/${module}`);
const express = require('express');
const app = express();
const port = process.env.PORT || 9000;
const model = _require('core/model');
model.on('error', error => {
    console.error(error);
    process.exit();
});

/**
 * Pre-load all model schemas, if any, and start the application.
 * This will make all schemas quickly available throughout the application.
 * Example use (anywhere):
 *   const schemas = _require('core/model').schemas;
 *   schemas.user.findOne({ ... });
 *
 * @see core/models/index.js
 * @see Models.prototype.load()
 */
model.load()
    .then(() => {

        app.set('views', `${__dirname}/core/views`);
        app.set('view engine', 'pug');
        app.locals.pretty = process.env.PRETTY_HTML === 'true' || false;

        app.use(
            (req, res, next) => {
                res.setHeader('x-powered-by', 'analogbird.com');
                next();
            },
            express.static(`${__dirname}/public`),
            require('body-parser').json(),
            require('body-parser').urlencoded({ extended: false }),
            require('compression')(),
            require('serve-favicon')(`${__dirname}/public/img/favicon.png`),
            require('./router')(express)
        );

        app.listen(port, () => console.log(`Up on port: ${port}`));
    });
