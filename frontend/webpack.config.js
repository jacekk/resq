var path = require('path'),
    webpack = require('webpack'),
    environment = process.env.NODE_ENV,
    plugins, config, distPath;

distPath = path.resolve(__dirname, 'dist');

plugins = [
    new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),
    new webpack.HotModuleReplacementPlugin()
];

if (environment === 'production') {
    plugins.push(new webpack.optimize.UglifyJsPlugin({
        minimize: true
    }));
}

config = {
    entry: {
        app: path.resolve(__dirname, 'src/main.jsx'),
        vendors: ['react', 'react-dom']
    },
    resolve: {
        extensions: ['', '.webpack.js', '.js', '.jsx', '.less']
    },
    output: {
        path: distPath,
        publicPath: 'dist',
        filename: '[name].js'
    },
    devtool: 'source-map',
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel'
            },
            {
                test: /\.less?$/,
                loader: "style!css!less"
            },
            { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&minetype=application/font-woff" },
            { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" }
        ]
    },
    plugins: plugins
};

module.exports = config;
