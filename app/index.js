'use strict';


require('attract')({ basePath: __dirname });
const [
    express,
    bodyParser,
    compression,
    serveFavicon,
    router,
    models] = attract('express', 'body-parser', 'compression', 'serve-favicon', 'router', 'core/model');
const [app, port] = [express(), process.env.PORT || 9000];
models.on('error', error => {
    console.error(error);
    process.exit();
});

/**
 * Pre-load all model schemas, if any, and start the application.
 * This will make all schemas quickly available throughout the application.
 * @see core/models/index.js
 * @see Models.prototype.load()
 */
models
    .load()
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
            bodyParser.json(),
            bodyParser.urlencoded({ extended: false }),
            compression(),
            serveFavicon(`${__dirname}/public/img/favicon.png`),
            router(express)
        );

        app.listen(port, () => console.log(`Up on port: ${port}`));
    });
