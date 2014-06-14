var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var methodOverride = require('method-override')

var app = express();

// Database
// ====================================

var Sequelize = require("sequelize");
var sequelize = new Sequelize('wall','wall','wall', {
    'dialect': 'sqlite',
    'path': 'db.sqlite'
});

// Models
// =====================================

var models =  {
    User: require('./models/user')(sequelize),
    Language: require('./models/language')(sequelize)
};

models.Language.hasMany(models.User, {as: 'Favorite language'});

models.User.sync();
models.Language.sync();

// Routes
// =====================================

var general = require('./routes/index');
var users = require('./routes/users')(models);
var api = require('./routes/api')(models);

// Configuration 
// =====================================

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// Routing
// =====================================

app.use('/', general);
app.use('/users', users);
app.use('/api', api);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
