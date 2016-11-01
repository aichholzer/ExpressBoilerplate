'use strict';


const fs = require('fs');

module.exports = express => {

    /**
     * This will setup the routes (as found in the routes folder). It will also try to
     * load a corresponding controller and pass it into the route, just to keep things clean.
     * If a corresponding controller is not found, for a given route, then that route will
     * not be used by the application.
     * @returns {Router}
     */
    let router = express.Router();
    fs.readdirSync(`${__dirname}/routes/`).forEach(file => {
        if (file.match(/(.+)\.js$/)) {
            try {
                router = require(`${__dirname}/routes/${file}`)(router, _require(`mvc/controllers/${file}`));
            } catch (error) {
                console.error(`I was not able to find a controller for the ${file} route.`, error);
            }
        }
    });

    router.use((req, res) => res.sendStatus(404).end());
    return router;
};

