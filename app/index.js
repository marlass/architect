const express = require('express');
const minifyHTML = require('express-minify-html');
const express_handlebars  = require('express-handlebars');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const cookie = require('cookie-parser');
const bcrypt = require('bcrypt-nodejs');

const app = express();

const config = require('./config');
const User = require('./models/user');

app.use('/static', express.static('public',{
    etag: true
}));

app.engine('handlebars', express_handlebars({
    defaultLayout: 'main',
    helpers: {
        equals: function(value, test, options) {
            if (value === test) {
                return options.fn(this);
            }
            return options.inverse(this);
        },
        equalsImg: function(dir, path, test, options) {
            if (dir+'/'+path === test) {
                return options.fn(this)
            }
        },
        json: function(context) {
            return JSON.stringify(context);
        }
    }
}));

app.use(minifyHTML({
    override: true,
    exception_url: false,
    htmlMinifier: {
        removeComments: true,
        collapseWhitespace: true,
        collapseBooleanAttributes: false,
        removeAttributeQuotes: false,
        removeEmptyAttributes: false,
        minifyJS: false
    }
}));

app.set('view engine', 'handlebars');

app.set('superSecret', config.secret);

mongoose.connect(config.database);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(morgan('dev'));

function isValidPassword (user, password, callback){
    bcrypt.compare(password, user.password, callback)
};

passport.use(new LocalStrategy(
    function(username, password, done) {
        User.findOne({ username: username }, function (err, user) {
            if (err) { return done(err); }
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            isValidPassword(user,password,function (err, match) {
                if (err) {
                    return done(null, false, { message: 'Incorrect password.' });
                }
                if (match) {
                    return done(null, user);
                }
            });      
        });
    }
));

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

app.use(cookie());
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());

/* Admin routes */
require('./routes/admin.js')(app);

/* Normal routes */
require('./routes/front.js')(app);

app.listen(3003, function () {
    console.log('Architect page listening on 3003');
});
