'use strict';


let fs = require('fs'),
    appRouter = {

        /**
         * This error handler can be made as complex as you wish it to be.
         * If you want to use some sort of logger, then this is probably the best place to take
         * care of it.
         *
         * @param err
         * @param req
         * @param res
         * @param next
         */
        error: function(err, req, res, next) {

            let status = err.status || 500;
            res.status(status).send({ message: 'An error has occurred, we are on it!' });
            next = null;
        },


        /**
         * This will setup the routes (as found in the routes folder). It will also try to
         * load a corresponding controller and pass it into the route, just to keep things clean.
         * If a corresponding controller is not found, for a given route, then that route will not be used by the app.
         * @returns {Router}
         */
        setup: function(router) {

            const schemaPath = __dirname + '/routes/';
            const control = __dirname + '/../mvc/controllers/';

            fs.readdirSync(schemaPath).forEach(file => {
                if (file.match(/(.+)\.js(on)?$/)) {
                    fs.stat(control + file, err => {
                        if (!err) {
                            router = require(schemaPath + file)(router, require(control + file));
                        } else {
                            console.error(`I was not able to find a controller for the ${file} route.`);
                        }
                    });
                }
            });

            router.use(this.error);
            return router;
        }
    };

module.exports = express => appRouter.setup(express.Router());
