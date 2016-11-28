module.exports = function (app) {
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
}
