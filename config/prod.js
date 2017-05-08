const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function() {
    return {
        entry: {
            index: './src/app.js',
            vendors: ['react', 'react-dom']
        },
        output: {
            path: path.join(__dirname, '/../dist'),
            filename: '[name].[chunkhash].js',
            chunkFilename: '[id]-[chunkhash].js'
        },
        module: {
            rules: [{
                    test: /\.scss$/,
                    use: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: [{
                                loader: 'css-loader',
                                options: {
                                    modules: true,
                                    importLoaders: 1
                                }
                            },
                            'postcss-loader',
                            'sass-loader'
                        ]
                    })
                },
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: [{
                        loader: 'babel-loader'
                    }]
                },
                {
                    test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
                    loader: 'url-loader',
                    options: {
                        limit: 10000
                    }
                }
            ]
        },
        plugins: [
            new ExtractTextPlugin('styles.css'),
            new webpack.optimize.CommonsChunkPlugin({ // 打包公共库
                names: ['vendor'],
                minChunks: 4 // 满足多少个模块代码之后才会提取公共代码
            }),
            new HtmlWebpackPlugin({
                template: './src/template/index.html'
                // chunks: [] // 文件需要引用哪些js文件
            }),
            new webpack.LoaderOptionsPlugin({
                minimize: true,
                debug: false
            }),
            new webpack.DefinePlugin({
                'process.env': {
                    'NODE_ENV': JSON.stringify('production')
                }
            }),
            new webpack.optimize.UglifyJsPlugin({
                beautify: false,
                mangle: {
                    screw_ie8: true,
                    keep_fnames: true
                },
                compress: {
                    screw_ie8: true
                },
                comments: false
            })
        ]
    };
}
