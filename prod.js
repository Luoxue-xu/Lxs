const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = function() {
    return {
        entry: {
            index: './src/app.js',
            user: './src/user.js'
        },
        output: {
            path: path.join(__dirname, '/dist'),
            filename: '[name].[chunkhash].js',
            chunkFilename: '[name]-[chunkhash].js',
            publicPath: './'
        },
        devServer: {
            contentBase: './dist', // 服务器根目录
            historyApiFallback: true, // 返回是否不跳转
            inline: true, // 是否实时刷新
            port: 8019, // 端口号 默认是8080
            hot: true,
            stats: {
                colors: true
            }
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
        externals: {
            'react': 'React',
            'react-dom': 'ReactDOM'
        },
        plugins: [
            new CleanWebpackPlugin(['dist']),
            new ExtractTextPlugin({
                filename: '[name].[contenthash:8].bundle.css',
                allChunks: true,
            }),
            new webpack.optimize.CommonsChunkPlugin({ // 打包公共库
                names: ['vendor'],
                minChunks: 4 // 满足多少个模块代码之后才会提取公共代码
            }),
            new HtmlWebpackPlugin({
                template: './src/template/index.html',
                title: '首页',
                hash: true,
                filename: 'index.html',
                chunks: ['vendor', 'index']
            }),
            new HtmlWebpackPlugin({
                template: './src/template/index.html',
                title: '会员中心',
                hash: true,
                filename: 'user.html',
                chunks: ['vendor', 'user']
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
                minimize: true,
                mangle: {
                    screw_ie8: true,
                    keep_fnames: true
                },
                compress: {
                    screw_ie8: true,
                    warnings: false
                },
                comments: false
            })
        ]
    };
}
