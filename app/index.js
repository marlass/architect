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

const sizeOf = require('image-size');

function dimensionsGenerator(path) {
    let dim200 = sizeOf('./public/uploads_resized_200/'+path);
    let dimensions = {};
    dimensions.path = path;
    dimensions.img200 = {
        src: '/static/uploads_resized_200/'+path,
        w: dim200.width,
        h: dim200.height

    }
    let dim320 = sizeOf('./public/uploads_resized_320/'+path);
    dimensions.img320 = {
        src: '/static/uploads_resized_320/'+path,
        w: dim320.width,
        h: dim320.height

    }
    let dim640 = sizeOf('./public/uploads_resized_640/'+path);
    dimensions.img640 = {
        src: '/static/uploads_resized_640/'+path,
        w: dim640.width,
        h: dim640.height

    }
    let dim960 = sizeOf('./public/uploads_resized_960/'+path);
    dimensions.img960 = {
        src: '/static/uploads_resized_960/'+path,
        w: dim960.width,
        h: dim960.height

    }
    let dim1024 = sizeOf('./public/uploads_resized_1024/'+path);
    dimensions.img1024 = {
        src: '/static/uploads_resized_1024/'+path,
        w: dim1024.width,
        h: dim1024.height

    }
    let dim1280 = sizeOf('./public/uploads_resized_1280/'+path);
    dimensions.img1280 = {
        src: '/static/uploads_resized_1280/'+path,
        w: dim1280.width,
        h: dim1280.height

    }
    let dim1600 = sizeOf('./public/uploads_resized_1600/'+path);
    dimensions.img1600 = {
        src: '/static/uploads_resized_1600/'+path,
        w: dim1600.width,
        h: dim1600.height

    }
    let dim1920 = sizeOf('./public/uploads_resized_1920/'+path);
    dimensions.img1920 = {
        src: '/static/uploads_resized_1920/'+path,
        w: dim1920.width,
        h: dim1920.height

    }
    let dim3840 = sizeOf('./public/uploads_resized_3840/'+path);
    dimensions.img3840 = {
        src: '/static/uploads_resized_3840/'+path,
        w: dim3840.width,
        h: dim3840.height

    }
    return dimensions;
}

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
        },
        size: function(path) {
            return JSON.stringify(dimensionsGenerator(path));
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
