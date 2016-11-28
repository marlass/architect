const passport = require('passport');

module.exports = function(app) {

    function ensureAuthenticated(req, res, next) {
        if (req.isAuthenticated()) { return next(); }
        res.redirect('/login')
    }

    app.post('/login', 
        passport.authenticate('local',
            { successRedirect: '/admin/',
            failureRedirect: '/login' })
    );

    /* Login route */
    app.get('/login', function (req, res) {
        res.render('login');
    });

    /* Logout */
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    /* Admin routes */
    app.all('/admin/*', ensureAuthenticated, function(req, res, next){
        next();
    });

    /* For creating user */
    app.get('/setup', function(req, res) {
        let nick = new User({ 
            username: 'admin', 
            password: 'admin',
            admin: true 
        });

        nick.save(function(err) {
            if (err) throw err;
            res.json({ success: true });
        });
    });


    app.get('/admin/home', function(req, res) {
        res.render('home', {layout: 'admin'});
    });

    app.post('/admin/home', function(req, res) {
    });

    app.get('/admin/offer', function(req, res) {
        res.render('offer', {layout: 'admin'});
    });

    app.post('/admin/offer', function(req, res) {
    });

    app.get('/admin/contact', function(req, res) {
        res.render('contact', {layout: 'admin'});
    });

    app.post('/admin/contact', function(req, res) {

    });

    app.get('/admin/about', function(req, res) {
        res.render('about', {layout: 'admin'});
    });

    app.post('/admin/about', function(req, res) {

    });

    app.get('/admin/portfolio', function(req, res) {
        res.render('portfolio', {layout: 'admin'});
    });

    app.post('/admin/portfolio', function(req, res) {

    });

    app.get('/admin/glowna', function(req, res) {
        res.render('home', {layout: 'admin'});
    });

    app.post('/admin/glowna', function(req, res) {

    });

    app.get('/admin/oferta', function(req, res) {
        res.render('offer', {layout: 'admin'});
    });

    app.post('/admin/oferta', function(req, res) {

    });

    app.get('/admin/kontakt', function(req, res) {
        res.render('contact', {layout: 'admin'});
    });

    app.post('/admin/kontakt', function(req, res) {

    });

    app.get('/admin/realizacje', function(req, res) {
        res.render('portfolio', {layout: 'admin'});
    });

    app.post('/admin/realizacje', function(req, res) {

    });

    app.get('/admin/o-nas', function(req, res) {
        res.render('about', {layout: 'admin'});
    });

    app.post('/admin/o-nas', function(req, res) {

    });
}
