'use strict';


global._require = module => require(`${__dirname}/${module}`);
const express = require('express');
const app = express();
const port = process.env.PORT || 9000;

app.set('views', `${__dirname}/mvc/views`);
app.set('view engine', 'pug');
app.locals.pretty = true;

app.use(
    (req, res, next) => {
        res.setHeader('x-powered-by', 'analogbird.com');
        next();
    },
    express.static(`${__dirname}/public`),
    require('body-parser').json(),
    require('body-parser').urlencoded({ extended: false }),
    require('compression')(),
    require('serve-favicon')(`${__dirname}/public/img/favicon.png`),
    require('./router')(express)
);

app.listen(port, () => console.log(`Up on port: ${port}`));
