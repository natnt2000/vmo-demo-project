const path = require('path')
const nodeExternals = require('webpack-node-externals')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
    entry: {
        app: './app.js'
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, "./dist"),
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    },
    target: 'node',
    externals: [nodeExternals()],
    plugins: [
        new CleanWebpackPlugin()
    ]
}