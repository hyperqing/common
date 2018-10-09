const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const VueLoaderPlugin = require('vue-loader/lib/plugin');


// 发布目录
const publicPath = 'public/dist';

module.exports = {
    mode: "development",
    entry: {
        speech_template: './assets/speech_template_entry.js',
        ticket: './assets/ticket_entry.js',
        ticket_event: './assets/ticket_event_entry.js',
        ticket_form: './assets/ticket_form_entry.js',
        index: './assets/index_entry.js',
    },
    output: {
        filename: "[name].bundle.js",
        publicPath: "/",
        path: path.resolve(__dirname, publicPath),
    },
    plugins: [
        new CleanWebpackPlugin([publicPath]),
        new VueLoaderPlugin(),
    ],
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            'Component': path.resolve(__dirname, 'assets/component'),
        },
        extensions: ['.js', '.json', '.vue', '.scss', '.css'] // import时省略后缀
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
            },
            {
                test: /\.vue$/,
                use: [
                    'vue-loader'
                ]
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                ]
            }, {
                test: /\.(png|jpg|jpeg|gif|webp)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[path][name].[ext]?[hash]',
                            publicPath: "/dist/"
                        }
                    }
                ]
            }, {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: '[path][name].[ext]',
                            publicPath: "/dist/"
                        }
                    }
                ]
            }
        ]
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
            name: 'common'
        }
    },
    // 隐藏性能优化提示
    performance: {
        hints: false
    }
};

