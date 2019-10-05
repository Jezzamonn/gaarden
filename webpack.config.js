const path = require('path');
const webpack = require('webpack');

module.exports = [
    {
        module: {
            loaders: [
                {
                    test: /\.js$/,
                    loader: 'babel-loader',
                    query: {
                        presets: ['env']
                    }
                }
            ]
        },
        stats: {
            colors: true
        },
        entry: './src/js/main.js',
        output: {
            path: path.resolve(__dirname, 'build/web/js'),
            filename: 'main.bundle.js'
        },
        devtool: 'source-map'
    },
];