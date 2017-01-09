const Page = require('../models/page');
const Footer = require('../models/footer');
const Header = require('../models/header');
const express_handlebars  = require('express-handlebars');
const page = require('../pages/home');
const footer = require('../pages/footer');
const header = require('../pages/header');
const md = require("node-markdown").Markdown;

module.exports = function (app) {

    function findPage (req, res, next) {
        let adminRegexp = /^\/admin\/.*$/;
        let loginRegexp = /^\/login\/?.*$/;
        let url = req.path;

        if (!adminRegexp.test(url) && !loginRegexp.test(url)) {
            Header.findOne({}).lean().exec(function(err, header) {
                Footer.findOne({}).lean().exec(function(err, footer) {
                    Page.findOne({"pageUrl": req.path}).lean().exec(function(err, pages) {
                        if (pages && pages.content) {
                            pages.content.forEach(function(item,key){
                                if(item.sectionType === 'text'){
                                    pages.content[key].content.text = md(pages.content[key].content.text);
                                }
                            });
                        }
                        res.render('front',{page: pages, header, footer, layout: 'empty'});
                    });
                });
            });
        } else {
            next();
        }        
    }

    app.get('/*', findPage, function(req, res, next){
        next();
    });
}
