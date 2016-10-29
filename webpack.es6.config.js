var webpack = require('webpack'),
    path = require('path');
 
module.exports = {
    debug: true,
    entry: {
        index: ['./src/js/index.js'],
        about: ['./src/js/about.js'],
        contact: ['./src/js/contact.js'],
        common: ['./src/js/common.js'],
        offer: ['./src/js/offer.js'],
        portfolio: ['./src/js/portfolio.js'],
        portfolio_item: ['./src/js/portfolio-item.js'],
        main: ['./src/js/main.js']
    },
    output: {
        path: path.join(__dirname, 'dist/js/es6'),
        filename: '[name].js'
    },
    eslint: {
    configFile: './.eslintrc.json'
    },
    devtool: 'source-map',
    module: {
        loaders: [
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"}            
        ]
    },
    watch: true
};