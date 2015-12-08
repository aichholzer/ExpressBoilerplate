'use strict';


let config = require('../../config');

module.exports = {

    index : function home$index(req, res, next) {

        res.send('<h2>Hello, welcome to the version ' + config.version + '</h2>');
    },

    login : function home$login(req, res, next) {

        res.render('home', {
            title: 'Welcome',
            version: config.version
        });
    }

};
