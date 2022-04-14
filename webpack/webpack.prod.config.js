const { merge } = require('webpack-merge');

const {
    resolvePath,
    baseConfig
} = require('./webpack.base.config');

const CssMinimizerPlugin = require("css-minimizer-webpack-plugin"); //压缩css代码

const TerserPlugin = require('terser-webpack-plugin'); //压缩js

const {
    BundleAnalyzerPlugin
} = require('webpack-bundle-analyzer')

const CompressionPlugin = require('compression-webpack-plugin')

module.exports = merge(baseConfig, {
    mode: 'production', //生产环境
    optimization: {
        minimizer: [
            new CssMinimizerPlugin(),
            new TerserPlugin({
                terserOptions: {
                    compress: {
                        drop_console: true, // 去除console
                    },
                },
            }),
        ],
    },
    plugins: [
        new BundleAnalyzerPlugin(),
        new CompressionPlugin({
            algorithm: 'gzip',
            threshold: 10240,
            minRatio: 0.8
        })
    ]
})