module.exports = {
    entry: './src/util/client.js',
    mode: 'development',
    output: {
        filename: 'client.js',
        path: __dirname + '/src/public/js', 
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-react'],
                    },
                },
            },
        ],
    },
};
