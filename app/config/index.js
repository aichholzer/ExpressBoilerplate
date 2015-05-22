'use strict';


module.exports = (function config() {

    try {
        var configFile = (typeof process.env.NODE_ENV === 'undefined') ? 'development' : process.env.NODE_ENV,
            configObject = require('./settings/' + configFile);

        return configObject;
    } catch (e) {
        console.error('I was not able to load the configuration file.', e.message);
        process.exit(1);
    }

}());
