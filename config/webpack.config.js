const path = require('path');
const extend = require('util')._extend;
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const CleanWebpackPlugin = require("clean-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
//const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const IS_DEV = process.env.NODE_ENV === 'dev';

module.exports = {
    target: 'web',
    mode: IS_DEV ? 'development' : 'production',
    context: path.resolve(__dirname, '..'),
    devtool: IS_DEV ? 'eval' : 'source-map',
    devServer: {
        historyApiFallback: true,
        hot: true,
        open: false,
        inline: true,
        progress: true,
        contentBase: path.join(__dirname, "src"),
        port: 7000
    },
    entry: {
        main: './src/index.js',
        login: './src/containers/Login/index.js',
        dashboard: './src/containers/Dashboard/index.js'
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, '..', 'dist'),
        chunkFilename: '[name].chunk.js'
    },
    module: {
        rules: [
            {
                enforce: "pre",
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "eslint-loader"
            },
            {
                test: /\.js[x]?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['env', 'react', 'stage-0']
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                include: [
                    path.resolve(__dirname, '..', 'assets/css'),
                    '/node_modules/bootstrap/dist/css/bootstrap.min.css',
                    '/node_modules/font-awesome/css/font-awesome.min.css'
                ],
                use: ExtractTextPlugin.extract("style-loader", "css-loader")
            },
            {
                test: /\.css$/,
                exclude: [
                    path.resolve(__dirname, '..', 'assets/css'),
                    /node_modules/
                ],
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader",
                        query: {
                            modules: true,
                            localIdentName: '[name]__[local]___[hash:base64:5]',
                            minimize: true
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'url-loader',
                options: {
                    limit: 1024 * 5,
                    outputPath: 'assets/images'
                }
            },
            {
                test: /\.(ttf|eot|woff)/,
                loader: 'file-loader'
            }
        ]
    },
    node: {
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
        dns: 'empty'
    },
    resolve: {
        modules: [
            path.resolve(__dirname, '..', 'src'),
            'node_modules'
        ],
        alias: {
            configureStore: path.resolve(__dirname, '..', 'src/store/configureStore'),
            components: path.resolve(__dirname, '..', 'src/components'),
            containers: path.resolve(__dirname, '..', 'src/containers'),
            middleware: path.resolve(__dirname, '..', 'src/middleware'),
            actions: path.resolve(__dirname, '..', 'src/actions'),
            reducers: path.resolve(__dirname, '..', 'src/reducers'),
            shared: path.resolve(__dirname, '..', 'src/shared'),
            routes: path.resolve(__dirname, '..', 'src/routes'),
            assets: path.resolve(__dirname, '..', 'src/assets')
        },
        extensions: ['.js', '.json']
    },
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                uglifyOptions: {
                    compress: false,
                    ecma: 6,
                    mangle: true
                },
                sourceMap: true
            })
        ],
        splitChunks: {
            chunks: "async",
            minSize: 30000,
            minChunks: 1,
            maxAsyncRequests: 10,
            maxInitialRequests: 5,
            name: true,
            cacheGroups: {
                vendors: {
                    name: 'vendors',
                    chunks: 'all',
                    reuseExistingChunk: true,
                    priority: 1,
                    enforce: true,
                    test: /[\\/]node_modules[\\/]/
                },
                login: {
                    name: 'login',
                    chunks: 'all',
                    priority: 2,
                    enforce: true,
                    reuseExistingChunk: true,
                    test(module, chunks) {
                        return chunks.some(chunk => chunk.name === 'login');
                    }
                },
                dashboard: {
                    name: 'dashboard',
                    chunks: 'all',
                    priority: 3,
                    enforce: true,
                    reuseExistingChunk: true,
                    test(module, chunks) {
                        return chunks.some(chunk => chunk.name === 'dashboard');
                    }
                }
            }
        }
    },
    plugins: [
        //new BundleAnalyzerPlugin(),
        new CleanWebpackPlugin(['dist']),
        new DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        }),
        new webpack.HotModuleReplacementPlugin(),
        new HTMLWebpackPlugin({
            template: "./src/index.tpl.html",
            inject: 'body',
            filename: "index.html"
        }),
        new CompressionPlugin({
            test: /\.js/,
            cache: !IS_DEV
        })
    ],
    externals: {
        config: JSON.stringify(extend(require('./default.json'), require(`./${process.env.NODE_ENV}.json`)))
    }
};