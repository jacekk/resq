module.exports = {
    entry: './src/main.jsx',
    output: {
        path: './dist/',
        filename: 'index.js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel'
            }
        ]
    },
    resolve: {
      extensions: ['', '.js', '.jsx']
    }
}
