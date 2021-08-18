// 引入一个包
const path = require('path')
// 引入html插件
const HTMLWebpackPlugin = require('html-webpack-plugin');
// 引入clean插件
const {CleanWebpackPlugin}= require('clean-webpack-plugin')
// webpack 中的所有的配置信息都应该写在module.exports 
module.exports = {
    // 指定入口文件
    entry: "./src/index.ts",
    // 指定打包文件所在的目录
    output: {
        // 指定打包文件的目录
        path: path.resolve(__dirname, 'dist'),
        // 打包后文件的文件
        filename: 'bundle.js',
        // environment：告诉webpack不使用箭头函数
        environment: {
            arrowFunction: false,
            const:false  
        }
    },
    // 指定webpack打包时要用的模块
    module: {
        // 指定要加载的规则
        rules: [
            {
                // test:指定规则生效的文件
                test: /\.ts$/,  //制定ts文件
                use: [
                    // 配置babel
                    {
                        // 指定加载器
                        loader: 'babel-loader',
                        // 设置babel
                        options: {
                            // 设置环境
                            presets: [
                                ['@babel/preset-env',
                                // 配置信息
                                {
                                    targets: {
                                        // 要兼容的浏览器
                                        "chrome": '58',
                                        'ie':'11'
                                    },
                                    // 指定corejs的版本
                                    "corejs": '3',
                                    //使用corejs的方式 usage:按需加载
                                    'useBuiltIns':'usage'
                                }]
                            ]
                        }
                    },'ts-loader'], //要使用的loader
                exclude: /node-modules/ //排除的文件
            },
            // 设置less文件的处理
            {
                test: /\.less$/,
                use: [
                    "style-loader",
                    'css-loader',
                    //引入postcss
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [
                                        "postcss-preset-env", {
                                            browsers:'last 2 versions'
                                        }
                                    ]
                                ]
                            }
                        }
                    },
                    "less-loader",
                ]
            }
        ]
    },
    // 配置webpack的插件
    plugins: [
        new CleanWebpackPlugin(),
        new HTMLWebpackPlugin({
            template: "./src/index.html"
        }
        ),
    ],
    // 用来设置引用模块
    resolve: {
        extensions:['.ts','.js']
    }
};