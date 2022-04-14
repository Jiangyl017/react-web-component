const { merge } = require('webpack-merge');

const {
    resolvePath,
    baseConfig
} = require('./webpack.base.config')

module.exports = merge(baseConfig, {
    mode: 'development', //开发环境
    devtool: 'inline-source-map',
    devServer: {
        host: 'localhost',
        port: 3000,
        hot: true,
        open: true
    },
})