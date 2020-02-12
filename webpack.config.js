'use strict';

const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = function (env, argv) {
    const production = env.production;

    return {
        mode: production
            ? 'production'
            : 'development',

        devtool: production
            ? 'source-map'
            : 'cheap-module-eval-source-map',

        entry: './src/index.js',

        output: {
            path: path.resolve(__dirname, './dist'),
            filename: production
                ? 'arjs-studio-backend.min.js'
                : 'arjs-studio-backend.js',
            library: 'ARjsStudioBackend',
            libraryTarget: 'umd'
        },

        optimization: production
            ? {
                minimize: true,
                minimizer: [
                    new TerserPlugin({
                        sourceMap: true,
                        extractComments: false
                        /*terserOptions: {
                            module: true
                        }*/
                    })
                ]
            }
            : {},

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
                }
            ]
        },

        stats: {
            colors: true,
            chunks: false,
            modules: false
        }
    };
};
