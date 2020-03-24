'use strict';

const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = function(env) {
    const production = env.production;

    return {
        mode: production
            ? 'production'
            : 'development',

        devtool: production
            ? 'source-map'
            : 'cheap-module-eval-source-map',

        entry: {
            'arjs-studio-backend': './src/index.js',
            'arjs-studio-backend.min': './src/index.js',
        },

        output: {
            path: path.resolve(__dirname, './dist'),
            filename: '[name].js',
            library: 'ARjsStudioBackend',
            libraryTarget: 'umd',
        },

        optimization: production
            ? {
                minimize: true,
                minimizer: [
                    new TerserPlugin({
                        include: /\.min\.js$/,
                        sourceMap: true,
                        extractComments: false,
                        /*terserOptions: {
                            module: true
                        }*/
                    }),
                ],
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
                                [ '@babel/preset-env', { targets: ['> 1%', 'last 2 versions', 'not ie <= 8', 'not dead'] } ],
                            ],
                            plugins: ['@babel/plugin-transform-runtime'],
                        },
                    },
                },
                {
                    test: /\.handlebars$/,
                    loader: 'handlebars-loader',
                },
            ],
        },

        stats: {
            colors: true,
            chunks: false,
            modules: false,
        },
    };
};
