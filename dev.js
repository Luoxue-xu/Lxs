const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function() {
    return {
        devtool: 'inline-source-map',
        entry: [
            'react-hot-loader/patch',
            // 开启 React 代码的模块热替换(HMR)

            'webpack-dev-server/client?http://localhost:8016',
            // 为 webpack-dev-server 的环境打包代码
            // 然后连接到指定服务器域名与端口

            'webpack/hot/only-dev-server',
            // 为热替换(HMR)打包好代码
            // only- 意味着只有成功更新运行代码才会执行热替换(HMR)
            './src/app.js'
        ],
        output: {
            path: path.join(__dirname, '/../build'),
            filename: '[name].js',
            publicPath: '/',
            sourceMapFilename: '[name].map',
            chunkFilename: '[id]-[chunkhash].js'
        },
        devServer: {
            contentBase: './build', // 服务器根目录
            historyApiFallback: true, // 返回是否不跳转
            inline: true, // 是否实时刷新
            port: 8016, // 端口号 默认是8080
            hot: true,
            stats: {
                colors: true
            }
        },
        module: {
            rules: [{
                    test: /\.scss$/,
                    use: [
                        'style-loader',
                        {
                            loader: 'css-loader',
                            options: {
                                modules: true,
                                localIdentName: '[name]__[local]-[hash:base64:5]',
                                importLoaders: 1
                            }
                        },
                        'postcss-loader',
                        'sass-loader'
                    ]
                },
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: 'babel-loader'
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
            new webpack.HotModuleReplacementPlugin(), //热加载插件
            new HtmlWebpackPlugin({
                template: './src/template/index.html'
                // chunks: [] // 文件需要引用哪些js文件
            }),
            new webpack.NamedModulesPlugin()
        ]
    };
}
