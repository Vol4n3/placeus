var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var app = express();

mongoose.connect("mongodb://localhost:27017/us");
var db = mongoose.connection;
// mongo error
db.on('error', console.error.bind(console, 'connection error:'));

// use sessions for tracking logins
app.use(session({
    secret: 'secret session', //todo : Change the secret on production
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
        mongooseConnection: db
    })
}));
// parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// include routes
var routes = require('./routes.js');
app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    res.status(404);
    res.json({
        error: "request not found"
    })
});


// listen on port 8080
app.listen(8080, function() {
    console.log('Api us is launched on port 8080');
});