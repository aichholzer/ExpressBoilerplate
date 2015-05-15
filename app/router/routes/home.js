'use strict';


var home = require('../../controllers/home');

module.exports = function homeRoute (router) {

    router.get('/', home.index);
    router.get('/login', home.login);

    return router;
};
