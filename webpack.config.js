const path = require('path')
// webpack 4.0 用 extract-text-webpack-plugin 会报错 https://www.npmjs.com/package/mini-css-extract-plugin
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
// 压缩css
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")
// 压缩js
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const autoprefixer = require('autoprefixer')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const devServer = require('webpack-dev-server')

let config = {
    entry: {
        admin: './src/admin.js',
        app: './src/index.js'
    },
    // 必须是一个对象
    output: {
        // 不配置则默认为main.js
        filename: 'js/[name].js',
        // 不配置则默认为dist文件夹
        path: path.resolve(__dirname, './dist'),
        // 非入口文件的命名规则
        chunkFilename: 'assets/[name]_[hash].js',
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
    }
}

module.exports = (env, argv) => {

    if (argv.mode === 'production') {
        // 生产环境
        config = {
            ...config, ...{
                // 必须是一个对象
                output: {
                    // 不配置则默认为main.js
                    filename: 'js/[name].[chunkhash:8].js',
                    // 不配置则默认为dist文件夹
                    path: path.resolve(__dirname, './dist'),
                    // 非入口文件的命名规则
                    chunkFilename: 'assets/[name]_[hash].js',
                    // 该选项的值是以 runtime(运行时) 或 loader(载入时) 所创建的每个 URL 为前缀
                    // publicPath: ''
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
                                // minimize: true
                            }
                        }
                    }]
                },
                optimization: {
                    minimizer: [
                        // new UglifyJsPlugin(),
                        new OptimizeCSSAssetsPlugin()
                    ],
                    runtimeChunk: {
                        name: 'assets/manifest'
                    },
                    splitChunks: {
                        cacheGroups: {
                            common: {
                                name: 'common',
                                chunks: 'initial',
                                priority: 2,
                                minChunks: 2
                            }
                        }
                    }
                },
                plugins: [
                    // 提取单独的CSS文件
                    new MiniCssExtractPlugin({
                        // 提取出来的文件名
                        filename: '[name]_[contenthash:8].css'
                    }),
                    new HtmlWebpackPlugin({
                        template: 'src/index.html',
                        hash: true
                    })
                ]
            }
        }

    } else if (argv.mode === 'development') {
        // 开发环境
        config = {
            ...config, ...{
                devtool: 'source-map',
                devServer: {
                    contentBase: path.join(__dirname, 'dist'),
                    port: 9000,
                    open: true
                },
                module: {
                    rules: [{
                        test: /\.(scss|css)$/,
                        // 提取单独的css文件
                        use: ['style-loader', 'css-loader', {
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
                        exclude: /(node_modules|bower_components)/,
                        // 8.0版本安装方式 npm install babel-loader@8.0.0-beta.0 @babel/core @babel/preset-env webpack
                        use: {
                            loader: 'babel-loader',
                            options: {
                                presets: ['@babel/preset-env', ['@babel/preset-react', {
                                    development: argv.mode === 'development'
                                }]],
                                plugins: ['@babel/plugin-syntax-dynamic-import', '@babel/plugin-proposal-class-properties', ['@babel/plugin-transform-runtime', {
                                    'corejs': false,
                                    'helpers': false,
                                    'regenerator': true,
                                    'useESModules': false
                                }]]
                            }
                        }
                    }, {
                        test: /\.html$/,
                        use: ['html-loader']
                    }]
                }
            },
            plugins: [
                new HtmlWebpackPlugin({
                    template: 'src/index.html',
                    hash: true
                })
            ]
        }
    }

    return config
}