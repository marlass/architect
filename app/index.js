const express = require('express');
const express_handlebars  = require('express-handlebars');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

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

/* Login and user stuff */
app.get('/setup', function(req, res) {
    const nick = new User({
        name: 'Nick Cerminara',
        password: 'passwrod'
    })

    nick.save(function(err) {
        if (err) throw err;
        console.log('User saved successfully');
        res.json({ success: true });
    })
})

app.get('/users', function(req, res) {
    User.find({}, function (err, users) {
        res.json(users);
    })
})

app.post('/login', function(req, res) {
    User.findOne({
        name: req.body.name
    }, function (err, user) {
        if (err) throw err;
        if (!user) {
            res.json({ success: false, message: 'Authentication failed. User not found.' });
        } else if (user) {

        // check if password matches
        if (user.password != req.body.password) {
            res.json({ success: false, message: 'Authentication failed. Wrong password.' });
        } else {

            // if user is found and password is right
            // create a token
            let token = jwt.sign(user, app.get('superSecret'), {
                expiresIn: '24h' // expires in 24 hours
            });

            // return the information including token as JSON
            res.json({
                success: true,
                message: 'Enjoy your token!',
                token: token
                });
            }
        }
    })
})

const apiRoutes = express.Router(); 

// route middleware to verify a token
apiRoutes.use(function(req, res, next) {

  // check header or url parameters or post parameters for token
  let token = req.body.token || req.query.token || req.headers['x-access-token'];

  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, app.get('superSecret'), function(err, decoded) {      
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });    
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;    
        next();
      }
    });

  } else {

    // if there is no token
    // return an error
    return res.status(403).send({ 
        success: false, 
        message: 'No token provided.' 
    });
    
  }
});


// apply the routes to our application with the prefix /api
app.use('/admin', apiRoutes);

app.get('/admin/contact', function (req, res) {
    User.find({}, function (err, users) {
        res.json(users);
    })
})


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
