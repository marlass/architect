var webpack = require('webpack'),
    path = require('path');
 
module.exports = {
    //debug: true,
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
        path: path.join(__dirname, 'dist/js'),
        publicPath: path.join(__dirname, "/dist/js/"),
        filename: '[name].js'
    },
    devtool: 'source-map',
    module: {
        rules: [
            { test: /\.js$/, exclude: /node_modules/, loader: "eslint-loader", enforce: "pre"},
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader", query: {
                    presets: [["es2015", {"modules": false}]],
                    plugins: ["transform-async-to-generator"]
                }
            }            
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery"
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.AggressiveMergingPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                unused: true,
                dead_code: true,
                warnings: false,
                screw_ie8: true
            }
        }),
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: "common",
        //     minChunks: 2
        // })
    ],
    watch: true
};