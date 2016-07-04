// var nodeExternals = require('webpack-node-externals');
'use strict' ;

var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CopyWebpackPlugin = require('copy-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var isBuild = false ; // Need to facilitate for building!

module.exports = {
    // context: path.resolve(__dirname, 'app'), // old setting
    entry: {
        app: "./app/app.webpack.js",
        vendors: "./app/vendor.webpack.js"
    },
    watch:true,
    output: {
        path: './app/bundle/',
        filename: isBuild ? '[name].[hash].js' : '[name].bundle.js',
        chunkFilename: isBuild ? '[name].[hash].js' : '[name].bundle.js',
        publicPath: isBuild ? '/' : 'http://localhost:8080/',
    },

    resolve: {
        root: path.join(__dirname, 'node_modules')
    },
    devtool: 'source-map',
    module: {
        loaders: [
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")
            },
            {
                test: /\.css/,
                loader: ExtractTextPlugin.extract('style', 'css?sourceMap')
                // loader: "css-loader"
            },
            {
                test: /\.html/,
                loader: 'html',
            },
            {
                test: /\.(png|gif|jpe?g|svg)$/i,
                loader: 'url',
                query: {
                    limit: 10000,
                }
            },
            {test: /\.(woff|woff2)$/, loader: "url-loader?limit=10000&mimetype=application/font-woff"},
            {test: /\.ttf$/, loader: "file-loader"},
            {test: /\.eot$/, loader: "file-loader"},
            {test: /\.svg$/, loader: "file-loader"}
        ]
    },
    plugins : getPlugins(isBuild),
    // Old setup
    // devServer: {
    //     hot: true,
    //     filename:'./app/bundle/bundle.min.js',
    // },
    devServer: {
        contentBase: './public',
        stats: 'minimal'
    }
};

function getPlugins(isBuild){
    var plugins = [];
        
    if (!isBuild) {
        // Reference: https://github.com/ampedandwired/html-webpack-plugin
        // Render index.html
        plugins.push(new HtmlWebpackPlugin({
            template: './public/index.html',
            inject: 'body'
        }),

        // Reference: https://github.com/webpack/extract-text-webpack-plugin
        // Extract css files
        // Disabled when in test mode or not in build mode
        new ExtractTextPlugin('[name].[hash].css', {disable: !isBuild})
        );
    } else {
        plugins.push(
            // Reference: http://webpack.github.io/docs/list-of-plugins.html#noerrorsplugin
            // Only emit files when there are no errors
            new webpack.NoErrorsPlugin(),

            // Reference: http://webpack.github.io/docs/list-of-plugins.html#dedupeplugin
            // Dedupe modules in the output
            new webpack.optimize.DedupePlugin(),

            // Reference: http://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
            // Minify all javascript, switch loaders to minimizing mode
            new webpack.optimize.UglifyJsPlugin(),

            // Copy assets from the public folder
            // Reference: https://github.com/kevlened/copy-webpack-plugin
            new CopyWebpackPlugin([{
                from: __dirname + '/dist'
            }])
        )
    }

    return plugins;
}