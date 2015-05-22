'use strict';


var express = require('express'),
    app = express();

app.set('views', __dirname + '/public/views');
app.set('view engine', 'jade');

app.use(
    express.static(__dirname + '/public'),
    require('body-parser').json(),
    require('body-parser').urlencoded({ extended: false }),
    require('compression')(),
    require('serve-favicon')(__dirname + '/public/img/favicon.png'),
    require('./router')(express)
);


app.listen(process.env.PORT || 9000, function () {
    console.log('The app is up on port: ', process.env.PORT || 9000);
});
