const express = require('express');
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

app.engine('handlebars', express_handlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.set('superSecret', config.secret);

mongoose.connect(config.database);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(morgan('dev'));

function isValidPassword (user, password){
  return bCrypt.compareSync(password, user.password);
}

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!isValidPassword(user,password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
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

app.use(cookie());
app.use(session({secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());

/* Admin routes */
require('./routes/admin.js')(app);

/* Normal routes */
require('./routes/front.js')(app);


app.listen(3000, function () {
    console.log('Architect page listening on 3000');
});
