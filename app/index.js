const express = require('express');
const express_handlebars  = require('express-handlebars');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const cookie = require('cookie-parser');

const app = express();

const config = require('./config');
const User = require('./models/user');

app.use('/static', express.static('public',{
  etag: true
}));

app.engine('handlebars', express_handlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.set('superSecret', config.secret);

mongoose.connect(config.database);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(morgan('dev'));

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      /*if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }*/
      return done(null, user);
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login')
}

app.use(cookie());
app.use(session({secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());

app.post('/login', 
    passport.authenticate('local',
        { successRedirect: '/admin',
        failureRedirect: '/login' })
);

app.get('/login', function (req, res) {
    res.render('login');
});

app.all('/admin/*',ensureAuthenticated, function(req,res){
  res.render('home');
});

app.get('/setup', function(req, res) {

  // create a sample user
  var nick = new User({ 
    username: 'admin', 
    password: 'admin',
    admin: true 
  });

  // save the sample user
  nick.save(function(err) {
    if (err) throw err;

    console.log('User saved successfully');
    res.json({ success: true });
  });
});

/* Normal app routes */
app.get('/', function (req, res) {
    res.render('home');
});

app.get('/about', function (req, res) {
    res.render('about');
});

app.get('/contact', function (req, res) {
    res.render('contact');
});

app.get('/offer', function (req, res) {
    res.render('offer');
});

app.get('/portfolio', function (req, res) {
    res.render('portfolio');
});

app.get('/portfolio/*', function (req, res) {
    res.render('portfolio-item');
});

app.get('/realizacje', function (req, res) {
    res.render('portfolio');
});

app.get('/realizacje/*', function (req, res) {
    res.render('portfolio-item');
});

app.get('/o-nas', function (req, res) {
    res.render('about');
});

app.get('/oferta', function (req, res) {
    res.render('offer');
});

app.get('/kontakt', function (req, res) {
    res.render('contact');
});

app.listen(3000, function () {
    console.log('Architect page listening on 3000');
});
