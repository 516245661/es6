
var path = require('path')
var webpack = require('webpack')

module.exports = {
    entry: './src/main.js', //入口文件
    output: { //出口文件
        path: path.resolve(__dirname, './dist'),
        publicPath: '/dist/',
        filename: 'build.js'
    },
    module: { //组件 ， 模块
        rules: [ //规则
            {
                test: /\.vue$/,
                loader: 'vue',
                options: {
                    // vue-loader options go here
                }
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url',
                query: {
                    limit: 10000

                }
            },

            {
                test: /\.scss$/,
                exclude: /node_modules/,
                loaders: ["style", "css", "sass"]
            },
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file',
                options: {
                    name: '[name].[ext]?[hash]'
                }
            }
        ]
    },
    
    resolve: { //解析
        extensions: ['.js', '.vue','.scss'], //解析范围
        alias: { //解析的文件
            'vue$': 'vue/dist/vue.js',
            'vuex$': 'vuex/dist/vuex.js',
            'vueRouter$': 'vue-router/dist/vue-router.js',
            'vueResource$': 'vue-resource/dist/vue-resource.js',
            'axios$': 'axios/dist/axios.min.js'
        }

    },
    devServer: {
        historyApiFallback: true,
        noInfo: true
    },
    devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
    module.exports.devtool = '#source-map'
    // http://vue-loader.vuejs.org/en/workflow/production.html
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        })
    ])
}
