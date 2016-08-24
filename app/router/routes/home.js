'use strict';


module.exports = (router, control) => {

    router.get('/', control.index);
    router.get('/login', control.login);

    return router;
};
