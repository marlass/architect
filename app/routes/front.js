const Page = require('../models/page');
const express_handlebars  = require('express-handlebars');
const page = require('../pages/home');
const footer = require('../pages/footer');
const header = require('../pages/header');
const md = require("node-markdown").Markdown;

module.exports = function (app) {

    function findPage (req, res, next) {
        console.log(req.path)
        let adminRegexp = /^\/admin\/.*$/;
        let loginRegexp = /^\/login\/?.*$/;
        let url = req.path;

        if (!adminRegexp.test(url) && !loginRegexp.test(url)) {
            Page.findOne({"pageUrl": req.path}).lean().exec(function(err, pages) {
                if (pages && pages.content) {
                    pages.content.forEach(function(item,key){
                        if(item.sectionType === 'text'){
                            pages.content[key].content.text = md(pages.content[key].content.text);
                        }
                    })
                }
                res.render('front',{page: pages,header: header,footer: footer,
                    layout: 'empty'});
            })
        } else {
            next();
        }        
    }

    app.get('/*', findPage, function(req, res, next){
        next();
    });


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
