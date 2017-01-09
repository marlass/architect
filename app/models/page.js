const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.model('Page', new Schema({ 
    pageUrl: String,
    title: String,
    lang: String
}));
