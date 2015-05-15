'use strict';


var fs = require('fs'),
    expressRouter = require('express').Router(),
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
        error: function router$error (err, req, res, next) {

            var status = err.status || 500;
            res.status(status).send({ message: 'An error has occurred, we are on it!' });
        },

        setup: function router$setup () {

            var schemaPath = __dirname + '/routes/';
            fs.readdirSync(schemaPath).forEach(function (file) {
                if (file.match(/(.+)\.js(on)?$/)) {
                    expressRouter = require(schemaPath + file)(expressRouter);
                }
            });

            expressRouter.use(this.error);
            return expressRouter;
        }
    };

module.exports = appRouter.setup();
