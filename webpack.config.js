'use strict';

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { DefinePlugin } = require('webpack');
const dotenv = require('dotenv');
dotenv.config();

const production = process.env.production;

module.exports = function (env, argv) {
    return {
        mode: production
            ? 'production'
            : 'development',

        devtool: production
            ? 'source-map'
            : 'cheap-module-eval-source-map',

        entry: {
            app: './src/index.js'
        },

        output: {
            path: path.resolve(__dirname, '../dist'),
            filename: production
                ? 'app.min.js'
                : 'app.js'
        },

        optimization: production
            ? {
                minimizer: [
                    new UglifyJsPlugin({
                        cache: true,
                        parallel: true,
                        sourceMap: true,
                        uglifyOptions: {
                            toplevel: true, //
                            compress: {
                                passes: 2, // better for mangle
                                toplevel: true // better for mangle
                            },
                            output: {
                                beautify: false
                            },
                            mangle: {
                                toplevel: true
                            }
                        }
                    }),
                    new OptimizeCssAssetsPlugin({})
                ]
            }
            : {},

        plugins: production
            ? [
                new HtmlWebpackPlugin({
                    template: 'index.html',
                    filename: 'index.html',
                    minify: {
                        removeComments: true,
                        collapseWhitespace: true,
                        collapseInlineTagWhitespace: true,
                        removeAttributeQuotes: true,
                        removeRedundantAttributes: true
                    }
                }),
                new CopyWebpackPlugin([{
                    from: path.resolve(__dirname, '../static'),
                    to: 'static'
                }])
            ]
            : [
                new HtmlWebpackPlugin({
                    template: 'index.html',
                    filename: 'index.html',
                    minify: false
                }),
                new DefinePlugin({
                    "process.env": JSON.stringify(dotenv.config().parsed)
                })
            ],

        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                [ '@babel/preset-env', { targets: ['> 1%', 'last 2 versions', 'not ie <= 8', 'not dead'] } ]
                            ]
                        }
                    }
                },
                {
                    test: /\.html$/,
                    exclude: /node_modules/,
                    use: [
                        'html-loader'
                    ]
                }
            ]
        },

        stats: {
            colors: true,
            chunks: false,
            modules: false
        },

        devServer: production
            ? {
                compress: true,
                contentBase: path.join(__dirname, 'dist'),
                open: false,
                stats: {
                    colors: true,
                    chunks: false,
                    modules: false
                },
                watchContentBase: true
            }
            : {}
    };
};
