const pack = require('./package.json')
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const version = pack.version;
const filename = 'iptv-key-'+version+'.js'
module.exports =
    {
        entry: './index.js',
        output: {
            path: path.resolve(__dirname, './dist'),
            filename: filename,
            //控制 library 如何以不同方式暴露的选项。 
            /**
             * var：作为一个全局变量，通过 script 标签来访问（libraryTarget:'var'）。
             * this：通过 this 对象访问（libraryTarget:'this'）。
             * window：通过 window 对象访问，在浏览器中（libraryTarget:'window'）。
             * umd：在 AMD 或 CommonJS 的 require 之后可访问（libraryTarget:'umd'）。
             */
            libraryTarget: 'umd',// 定义打包方式Universal Module Definition,同时支持在CommonJS、AMD和全局变量使用
            globalObject: 'this',// 定义全局变量,兼容node和浏览器运行，避免出现"window is not defined"的情况
            //libraryExport: 'default',// 对外暴露default属性，如果写上这个配置，就会导致打包的文件内，对外只能读取到default变量，其他使用export导出的变量就无法访问到
            //暴露 library
            library: 'iptv'// 指定类库名,主要用于直接引用的方式(比如使用script 标签)
        },
        externals: {
            'morgan-iptv-core': {
                commonjs: 'morgan-iptv-core',
                commonjs2: 'morgan-iptv-core',
                amd: 'morgan-iptv-core',
                root: 'iptv'
            }
        },
        module: {
            rules: [
                {
                    test: /\.(js)$/,
                    exclude: /(node_modules|bower_components)/,
                    use: 'babel-loader'
                }
            ]
        },
        plugins: [
            new CleanWebpackPlugin(['dist']),
            //该插件可以显示出编译之前的文件和编译之后的文件的映射
            new HtmlWebpackPlugin({
                title: filename
            })
        ],
    };