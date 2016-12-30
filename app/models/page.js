var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Page', new Schema({ 
    pageUrl: String,
    title: String,
    lang: String
}));
