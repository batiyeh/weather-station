var path = require('path');
var webpack = require('webpack');
    
module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'app.bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react'],
                    plugins: ['transform-class-properties']
                }
            },
            { test: /\.css$/, loader: 'style-loader!css-loader' },
            {
                test: /\.(png|jpg|gif)$/,
                use: [ 'file-loader' ]
            }
        ]
    },
    stats: {
        colors: true
    },
    node: {
        fs: 'empty'
    },
    devtool: 'source-map'
};