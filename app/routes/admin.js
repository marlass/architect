const passport = require('passport');
const User = require('../models/user');
const Page = require('../models/page');
const bcrypt = require('bcrypt-nodejs');
const config = require('../config');

module.exports = function(app) {

    function ensureAuthenticated(req, res, next) {
        if (req.isAuthenticated()) { return next(); }
        res.redirect('/login')
    }

    app.post('/login', 
        passport.authenticate('local',
            { successRedirect: '/admin/',
            failureRedirect: '/' })
    );

    /* Login route */
    app.get('/login', function (req, res) {
        res.render('login');
    });

    /* Admin routes */
    /* Disable authenticatet routes for development */
    /*app.all('/admin/*', ensureAuthenticated, function(req, res, next){
        next();
    });*/

    /* Logout */
    app.get('/admin/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    /* For creating user */
    app.get('/setup', function(req, res) {
        var salt = bcrypt.genSaltSync(10);
        bcrypt.hash(config.adminDefaultPassword, salt, null, function(err, hash) {
            let nick = new User({ 
                username: config.admin, 
                password: hash
            });

            nick.save(function(err) {
                if (err) throw err;
                res.json({ success: true });
            });
        });        
    });

    /* Clear admin accounts */
    app.get('/clearUsers', function(req, res) {
        User.findOneAndRemove({username: config.admin}, function(err, user) {
            res.json({deleted: user});
        })
    });

    /* List users */
    app.get('/users', function(req, res) {
        User.find({}, function(err, users) {
            res.json(users);
        })
    })

    app.get('/pages', function(req, res) {
        Page.find({}, function(err, pages) {
            res.json(pages);
        })
    })

    /* Clear pages*/
    app.get('/clearPages', function(req, res) {
        Page.findOneAndRemove({}, function(err, user) {
            res.json({deleted: user});
        })
    });

    /* Change password view */
    app.get('/admin/changePassword', function(req, res) {
        res.render('changePassword');
    });

    /* Change password logic */
    app.post('/admin/changePassword', function(req, res) {
        var oldPassword = req.body.oldPassword
        var newPasswort = req.body.newPassword
        var newPasswortRepeat = req.body.newPasswordRepeat

        function isValidPassword (savedPassword, password, callback){
            bcrypt.compare(password, savedPassword, callback)
        };

        if (newPasswort === newPasswortRepeat) {
            User.findOne({ username: config.admin }, function (err, user) {
                if (err) { res.json({success: false, message: 'User not found'}) }
                isValidPassword(user.password,oldPassword,function (err, match) {
                    if (err)
                    res.json({status: false, message: 'Wrong password'});
                    if (match) {
                        var salt = bcrypt.genSaltSync(10);
                        bcrypt.hash(newPasswort, salt, null, function(err, hash) {
                            user.password = hash;

                            user.save(function(err) {
                                if (err) {
                                    res.json({success: false, message: 'Saving problem'});
                                } else {
                                    res.json({ success: true });
                                }
                            });
                        }); 
                    } else {
                        res.json({status: false, message: 'Wrong password'});
                    }
                });      
            });
        } else {
            res.json({success: false, message: 'Passwords do not match'});
        }
    });

    app.get('/admin/newPage', function(req, res) {
        res.render('newPage', {layout: 'admin'});
    });

    app.post('/admin/savePage', function(req, res) {
        Page.update( { pageUrl : req.body.pageUrl }, req.body, { upsert : true, strict: false }, function(err) {
            if (err) throw err;
            res.json(req.body);
        });
    })
}
