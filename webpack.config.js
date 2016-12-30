var webpack = require('webpack'),
    path = require('path');
 
module.exports = {
    //debug: true,
    entry: {
        admin: ['./src/js/admin.js']
    },
    output: {
        path: path.join(__dirname, 'app/public/js'),
        publicPath: '/app/public/js/',
        filename: '[name].js'
    },
    devtool: 'source-map',
    module: {
        rules: [
            { test: /\.js$/, exclude: /node_modules/, loader: "eslint-loader", enforce: "pre"},
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader", query: {
                    presets: [["es2015", {"modules": false}]]
                }
            }            
        ]
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.AggressiveMergingPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                unused: true,
                dead_code: true,
                warnings: false,
                screw_ie8: true
            }
        })
    ],
    watch: true
};
