'use strict';


module.exports = {

    index : function home$index (req, res, next) {

        res.send('<h2>Hello, welcome to the index.</h2>');
    },

    login : function home$login (req, res, next) {

        res.render('home', {
            title: 'Welcome'
        });
    }

};
