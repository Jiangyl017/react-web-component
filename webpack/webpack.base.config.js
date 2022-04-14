const path = require("path");

const resolvePath = _path => path.resolve(__dirname, _path); //相对路径转绝对路径

const HtmlWebpackPlugin = require('html-webpack-plugin'); //创建模板

const MiniCssExtractPlugin = require("mini-css-extract-plugin"); //分离css

const baseConfig = {
    entry: resolvePath("../src/index.js"),
    output: {
        path: resolvePath('../build'),
        filename: 'js/[name].bundle.js',
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],//从右往左执行
            },
            {
                test: /\.less$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'less-loader']
            },
            {
                test: /\.(js|jsx)$/,
                //使用include来指定编译文件夹
                include: path.resolve(__dirname, '../src'),
                //使用exclude排除指定文件夹
                exclude: /node_modules/,
                use: [
                    'cache-loader',
                    'thread-loader',
                    'babel-loader',
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg|webp)$/,
                type: 'asset',
                parser: {
                    // 转base64的条件
                    dataUrlCondition: {
                        maxSize: 25 * 1024, // 25kb
                    }
                },
                generator: {
                    // 打包到 image 文件下
                    filename: 'images/[contenthash][ext][query]',
                },
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin(
            {
                template: resolvePath('../public/index.html'),
                filename: 'index.html',
                title: 'Webpack搭建React 18'
            }
        ),
        new MiniCssExtractPlugin({
            filename: '[name].[hash:8].css'
        }),
    ],
}

module.exports = {
    resolvePath,
    baseConfig
}