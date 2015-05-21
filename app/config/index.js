'use strict';


module.exports = function config() {

    var configFile = process.env.NODE_ENV === 'undefined' ? 'development' : process.env.NODE_ENV,
        config = require('./setups/' + configFile);

    return config;
};
