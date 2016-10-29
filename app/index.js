var express = require('express');
var express_handlebars  = require('express-handlebars');

var app = express();

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

app.get('/realizacje', function (req, res) {
    res.render('realizacje');
});

app.get('/o-nas', function (req, res) {
    res.render('o-nas');
});

app.get('/oferta', function (req, res) {
    res.render('oferta');
});

app.get('/kontakt', function (req, res) {
    res.render('kontakt');
});

app.listen(3000, function () {
    console.log('Architect page listening on 3000');
});
