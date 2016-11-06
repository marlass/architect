var express = require('express');
var express_handlebars  = require('express-handlebars');

var app = express();

app.use('/static', express.static('public',{
  etag: true
}));

app.engine('handlebars', express_handlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

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
