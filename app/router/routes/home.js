'use strict';


module.exports = function homeRoute (router, control) {

    router.get('/', control.index);
    router.get('/login', control.login);

    return router;
};
