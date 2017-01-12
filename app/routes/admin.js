const passport = require('passport');
const User = require('../models/user');
const Page = require('../models/page');
const Footer = require('../models/footer');
const Header = require('../models/header');
const bcrypt = require('bcrypt-nodejs');
const config = require('../config');
const mime = require('mime');
const header = require('../pages/header');
const footer = require('../pages/footer');

const multer  = require('multer');

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __dirname + '/../public/uploads/'+req.body.catalog);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname + '-' + file.fieldname + '-' + Date.now() + '.' + mime.extension(file.mimetype));
    }
});

let upload = multer({storage: storage});

const fs = require('fs');
const path = require('path');

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
        const type = req.query.type || 'success';
        if (req.query.status) {
            res.render('changePassword', {layout: 'admin', status: req.query.status, type});
        } else {
            res.render('changePassword', {layout: 'admin'});
        }
        
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
                if (err) { res.redirect('/admin/changePassword?status=U%C5%BCytkownik%20nie%20istnieje&type=error') }
                isValidPassword(user.password,oldPassword,function (err, match) {
                    if (err)
                    res.redirect('/admin/changePassword?status=Niepoprawne%20has%C5%82o&type=error')
                    if (match) {
                        var salt = bcrypt.genSaltSync(10);
                        bcrypt.hash(newPasswort, salt, null, function(err, hash) {
                            user.password = hash;

                            user.save(function(err) {
                                if (err) {
                                    res.redirect('/admin/changePassword?status=Spr%C3%B3buj%20ponownie&type=error')
                                } else {
                                    res.redirect('/admin/changePassword?status=Zmieniono%20has%C5%82o&type=success')
                                }
                            });
                        }); 
                    } else {
                        res.redirect('/admin/changePassword?status=Niepoprawne%20has%C5%82o&type=error')
                    }
                });      
            });
        } else {
            res.redirect('/admin/changePassword?status=Has%C5%82a%20si%C4%99%20nie%20zgadzaj%C4%85&type=error')
        }
    });

    app.get('/admin/newPage', function(req, res) {
        const dirs = getDirectories(__dirname + '/../public/uploads/');
        let catalogs = [];
        dirs.forEach(function(a){
            const files = getFilesInDir(__dirname + '/../public/uploads/' + a);
            let fileList = [];
            files.forEach(function(b){
                fileList.push({path: b});
            })
            catalogs.push({path: a,photos: fileList});
        })
        let team = getFilesInDir(__dirname + '/../public/uploads/team/');
        let masthead = getFilesInDir(__dirname + '/../public/uploads/masthead/');
        Page.find({}, function(err, result) {
            let pages = [];
            result.forEach(function(page) {
                pages.push(page.pageUrl);
            });
            res.render('newPage', {layout: 'admin',catalogs, team, masthead, pages});
        });
        
    });

    app.post('/admin/savePage', function(req, res) {
        Page.update( { pageUrl : req.body.pageUrl }, req.body, { upsert : true, strict: false }, function(err) {
            if (err) { 
                res.json({status: false});
            }
            res.json({status: true});
        });
    });

    function getDirectories(srcpath) {
        return fs.readdirSync(srcpath).filter(function(file) {
            return fs.statSync(path.join(srcpath, file)).isDirectory();
        });
    }

    function getFilesInDir(srcpath) {
        return fs.readdirSync(srcpath).filter(function(file) {
            return fs.statSync(path.join(srcpath, file)).isFile();
        });
    }

    app.get('/admin/managePhotos', function(req, res) {
        const dirs = getDirectories(__dirname + '/../public/uploads/');
        let catalogs = [];
        dirs.forEach(function(a){
            const files = getFilesInDir(__dirname + '/../public/uploads/' + a);
            let fileList = [];
            files.forEach(function(b){
                fileList.push({path: b});
            })
            catalogs.push({path: a,photos: fileList});
        })
        if (req.query.status) {
            res.render('managePhotos', {layout: 'admin', catalogs, status: req.query.status});
        } else {
            res.render('managePhotos', {layout: 'admin', catalogs});
        }
    });

    app.post('/admin/getPhotos', function(req, res) {
        const dir = req.body.dir || '';
        res.json(getFilesInDir(__dirname + '/../public/uploads/' + dir));
    })

    app.post('/admin/addCatalog', function (req, res) {
        let catalog = req.body.catalog;
        let CatalogRegexp = /^[A-Za-z]{1,}[A-Za-z0-9]*$/;
        let path = __dirname + '/../public/uploads/'+catalog;
        if (CatalogRegexp.test(catalog) && !fs.existsSync(path)) {
            fs.mkdirSync(path,0744);
        }
        res.redirect('/admin/managePhotos?status=Katalog%20dodany');
    });

    app.post('/admin/uploadPhotos', upload.array('photos'), function(req, res) {
        console.log('error before multiple upload');
        res.redirect('/admin/managePhotos?status=Dodano%20obrazy');
    });

    app.post('/admin/deletePhoto', function (req, res) {
        let photo = req.body.photo;
        let path = __dirname + '/../public/uploads/'+photo;
        fs.unlinkSync(path);
        let path200 = __dirname + '/../public/uploads_resized_200/'+photo;
        fs.unlinkSync(path200);
        let path320 = __dirname + '/../public/uploads_resized_320/'+photo;
        fs.unlinkSync(path320);
        let path640 = __dirname + '/../public/uploads_resized_640/'+photo;
        fs.unlinkSync(path640);
        let path960 = __dirname + '/../public/uploads_resized_960/'+photo;
        fs.unlinkSync(path960);
        let path1024 = __dirname + '/../public/uploads_resized_1024/'+photo;
        fs.unlinkSync(path1024);
        let path1280 = __dirname + '/../public/uploads_resized_1280/'+photo;
        fs.unlinkSync(path1280);
        let path1600 = __dirname + '/../public/uploads_resized_1600/'+photo;
        fs.unlinkSync(path1600);
        let path1920 = __dirname + '/../public/uploads_resized_1920/'+photo;
        fs.unlinkSync(path1920);
        let path3840 = __dirname + '/../public/uploads_resized_3840/'+photo;
        fs.unlinkSync(path3840);
        res.redirect('/admin/managePhotos?status=Usuni%C4%99to%20obraz');
    });

    function deleteFolderRecursive(path) {
        if( fs.existsSync(path) ) {
            fs.readdirSync(path).forEach(function(file,index){
                var curPath = path + "/" + file;
                if(fs.lstatSync(curPath).isDirectory()) {
                    deleteFolderRecursive(curPath);
                } else {
                    fs.unlinkSync(curPath);
                }
            });
            fs.rmdirSync(path);
        }
    };

    app.post('/admin/deleteCatalog', function (req, res) {
        let catalog = req.body.catalog;
        let path = __dirname + '/../public/uploads/' + catalog;
        deleteFolderRecursive(path);
        let path200 = __dirname + '/../public/uploads_resized_200/' + catalog;
        deleteFolderRecursive(path200);
        let path320 = __dirname + '/../public/uploads_resized_320/' + catalog;
        deleteFolderRecursive(path320);
        let path640 = __dirname + '/../public/uploads_resized_640/' + catalog;
        deleteFolderRecursive(path640);
        let path960 = __dirname + '/../public/uploads_resized_960/' + catalog;
        deleteFolderRecursive(path960);
        let path1024 = __dirname + '/../public/uploads_resized_1024/' + catalog;
        deleteFolderRecursive(path1024);
        let path1280 = __dirname + '/../public/uploads_resized_1280/' + catalog;
        deleteFolderRecursive(path1280);
        let path1600 = __dirname + '/../public/uploads_resized_1600/' + catalog;
        deleteFolderRecursive(path1600);
        let path1920 = __dirname + '/../public/uploads_resized_1920/' + catalog;
        deleteFolderRecursive(path1920);
        let path3840 = __dirname + '/../public/uploads_resized_3840/' + catalog;
        deleteFolderRecursive(path3840);
        res.redirect('/admin/managePhotos?status=Usuni%C4%99to%20katalog');
    });

    app.get('/admin/manageHeader', function(req, res) {
        Header.findOne({}).lean().exec(function(err, header) {
            Footer.findOne({}).lean().exec(function(err, footer) {
                res.render('manageHeader', {layout: 'admin', header, footer});
            });
        });        
    });

    app.post('/admin/saveHeader', function(req, res) {
        Header.update( {}, req.body.header, { upsert : true, strict: false }, function(err) {
            if (err) {
                res.json({status: false});
            }
            Footer.update( {}, req.body.footer, { upsert : true, strict: false }, function(err) {
                if (err) {
                    res.json({status: false});
                }
                res.json({status: true});
            });
        });
    });

    /* init header */
    app.get('/admin/setHeader', function(req, res) {
        Header.update( {}, header, { upsert : true, strict: false }, function(err) {
            if (err) {
                res.json({status: false});
            }
            Footer.update( {}, footer, { upsert : true, strict: false }, function(err) {
                if (err) {
                    res.json({status: false});
                }
                res.json({status: true});
            });
        });
    });

    app.get('/admin/pageList', function(req, res) {
        Page.find({}, function(err, result) {
            let pages = [];
            result.forEach(function(row){
                pages.push(row.pageUrl);
            })
            const type = req.query.type || 'success';
            if (req.query.status) {
                res.render('listPage', {layout: 'admin',pages, status: req.query.status, type});
            } else {
                res.render('listPage', {layout: 'admin', pages});
            }
        })
    });

    app.post('/admin/deletePage', function(req, res) {
        if (!req.body.page) {
            Page.findOneAndRemove({pageUrl: null},function(err,result){
                res.redirect('/admin/pageList?status=Usuni%C4%99to%20stron%C4%99&type=success');
            });
        } else {
            Page.findOneAndRemove({pageUrl: req.body.page}, function(err, resul) {
                res.redirect('/admin/pageList?status=Usuni%C4%99to%20stron%C4%99&type=success');
            })
        }
    });

    app.post('/admin/editPage', function(req, res) {
        const dirs = getDirectories(__dirname + '/../public/uploads/');
        let catalogs = [];
        dirs.forEach(function(a){
            const files = getFilesInDir(__dirname + '/../public/uploads/' + a);
            let fileList = [];
            files.forEach(function(b){
                fileList.push({path: b});
            })
            catalogs.push({path: a,photos: fileList});
        })
        let team = getFilesInDir(__dirname + '/../public/uploads/team/');
        let masthead = getFilesInDir(__dirname + '/../public/uploads/masthead/');
        let pages = [];
        let page = {};
        Page.find({}, function(err, result) {
            result.forEach(function(page) {
                pages.push(page.pageUrl);
            });
            if (!req.body.page) {
                Page.findOne({pageUrl: null}).lean().exec(function(err,result2){
                    page = result2;
                    res.render('editPage', {layout: 'admin', catalogs, team, masthead, pages, page});
                });
            } else {
                Page.findOne({pageUrl: req.body.page}).lean().exec(function(err, result2) {
                    page = result2;
                    res.render('editPage', {layout: 'admin', catalogs, team, masthead, pages, page});
                });
            }
        });        
    })
}
