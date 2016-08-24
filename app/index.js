'use strict';


let express = require('express'),
    app = express();

app.set('views', __dirname + '/mvc/views');
app.set('view engine', 'jade');
app.locals.pretty = true;

app.use(
    (req, res, next) => {
        res.setHeader('X-POWERED-BY', 'analogbird.com');
        return next();
    },
    express.static(__dirname + '/public'),
    require('body-parser').json(),
    require('body-parser').urlencoded({ extended: false }),
    require('compression')(),
    require('serve-favicon')(__dirname + '/public/img/favicon.png'),
    require('./router')(express)
);


app.listen(process.env.PORT || 9000, () => {
    console.log('The app is up on port: ', process.env.PORT || 9000);
});
