'use strict';


const config = _require('config');

module.exports = {

    index: (req, res) => {

        res.send({
            message: 'Hello, welcome to your boilerplate.',
            version: config.version
        });
    },

    login: (req, res) => {

        res.render('home', {
            message: 'Hello, welcome to your boilerplate.',
            version: config.version
        });
    }
};
