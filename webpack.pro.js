const path = require('path')
const webpack = require('webpack')
// webpack 4.0 用 extract-text-webpack-plugin 会报错 https://www.npmjs.com/package/mini-css-extract-plugin
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
// 压缩css
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")
// 压缩js
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const autoprefixer = require('autoprefixer')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
// 把runtime代码插入到页面中
const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin')

module.exports = {
    mode: 'production',
    entry: {
        app: './src/index.js',
        admin: './src/admin.js'
    },
    // 必须是一个对象
    output: {
        // 不配置则默认为main.js
        filename: 'js/[name].[chunkhash].js',
        // 非入口文件的命名规则
        chunkFilename: 'js/[name].chunk.js',
        // 不配置则默认为dist文件夹
        path: path.resolve(__dirname, './dist'),
        // 该选项的值是以 runtime(运行时) 或 loader(载入时) 所创建的每个 URL 为前缀
        // publicPath: ''
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
            components: path.resolve(__dirname, 'src/components'), // 配置公共组件别名，其实通过 modules 配置好了寻找目录，这个可以不用配置，但是也支持
            containers: path.resolve(__dirname, 'src/containers'), // 配置业务组件别名
            csses: path.resolve(__dirname, 'src/css') // 配置样式别名
        },
        // 如果导入的模块未配置后缀，则根据以下顺序匹配后缀，所有后缀找不到对应文件则报错
        extensions: ['.js', '.json', '.jsx', '.css'],
        // 配置 Webpack 去哪些目录下寻找第三方模块，包括自己写的公共组件，从左到右匹配，就可以用简写啦，import Button from 'Button'
        modules: [path.resolve(__dirname, 'src/components'), 'node_modules']
    },
    // 不需要打包进去的第三方模块可以在这里配置
    externals: {
        react: 'React',
        'react-dom': 'ReactDOM'
    },
    module: {
        rules: [{
            test: /\.(scss|css)$/,
            // 从后往前执行
            use: [MiniCssExtractPlugin.loader, 'css-loader', {
                loader: 'postcss-loader',
                options: {
                    plugins: [
                        autoprefixer({
                            browsers: ['last 2 versions', 'Android >= 4.0', 'iOS 7'],
                            remove: true
                        })
                    ]
                }
            }, 'sass-loader']
        }, {
            test: /\.(js|jsx)$/,
            include: [path.resolve(__dirname, 'src')],
            exclude: /(node_modules|bower_components)/,
            // 8.0版本安装方式 npm install babel-loader@8.0.0-beta.0 @babel/core @babel/preset-env webpack
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env', '@babel/preset-react'],
                    plugins: ['@babel/plugin-syntax-dynamic-import', ['@babel/plugin-transform-runtime', {
                        'corejs': false,
                        'helpers': false,
                        'regenerator': true,
                        'useESModules': false
                    }]]
                }
            }
        }, {
            test: /\.html$/,
            use: {
                loader: 'html-loader',
                options: {
                    minimize: true
                }
            }
        }, {
            // 图片
            test: /\.(png|jpe?g|gif|svg|webp)(\?.*)?$/,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 8192,
                    name: 'images/[name].[hash:8].[ext]'
                }
            }]
        }, {
            // 字体
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
            loader: 'url-loader',
            options: {
                limit: 3000,
                name: 'fonts/[name].[hash:8].[ext]'
            }
        }, {
            // 视频
            test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
            loader: 'url-loader',
            options: {
                limit: 3000,
                name: 'medias/[name].[hash:8].[ext]'
            }
        }]
    },
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                parallel: true,
                extractComments: false
            }),
            new OptimizeCSSAssetsPlugin({
                disable: true
            })
        ],
        runtimeChunk: {
            name: 'runtime'
        },
        splitChunks: {
            cacheGroups: {
                // 第三方组件
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    chunks: 'initial',
                    priority: 20, // 该配置项是设置处理的优先级，数值越大越优先处理
                },
                // 公共组件
                commons: {
                    test: /[\\/](components)|(containers)|(utils)[\\/]/,
                    name: 'commons',
                    chunks: 'initial',
                    priority: 10,
                    minChunks: 2,
                    reuseExistingChunk: true // 这个配置允许我们使用已经存在的代码块
                }
            }
        }
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        // 提取单独的CSS文件
        new MiniCssExtractPlugin({
            filename: 'css/[name]_[contenthash:8].css'
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/index.html',
            chunks: ['runtime', 'app', 'vendor', 'commons'],
            hash: true
        }),
        new HtmlWebpackPlugin({
            filename: 'admin.html',
            template: 'src/index.html',
            chunks: ['runtime', 'admin', 'vendor', 'commons'],
            hash: true
        }),
        // 文件名缓存处理
        new webpack.HashedModuleIdsPlugin(),
        // new InlineManifestWebpackPlugin('runtime'),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        })
    ]
}