const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const path = require('path');


module.exports = {
    "mode": "none",
    "entry": "./src/index.js",
    "output": {
        "path": __dirname + '/dist',
        "filename": "bundle.js",
    },
    "devServer": {
        "host": 'localhost', // specify the host
        "port": 3000, // specify the port
        // other devServer options if needed
    },
    "module": {
        "rules": [
            {
                test: /\.s[ac]ss$/i,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader",
                ],
            },
            {
                test: /\.(png|jpe?g|gif|mp3|ico)$/i,
                use: [
                    {
                        loader: 'file-loader',
                    },
                ],
            },
            {
                "test": /\.js$/,
                "exclude": /node_modules/,
                "use": {
                    "loader": "babel-loader",
                    "options": {
                        "presets": [
                            "@babel/preset-env"
                        ]
                    }
                }
            },
        ]
    },
    "plugins": [
        new CleanWebpackPlugin(),
        // new CopyPlugin({
        //     patterns: [
        //         { from: "public/audio", to: "assets/audio" },
        //         { from: "public/img", to: "assets/img" },
        //     ],
        // }),
        new HtmlWebpackPlugin({
            title: 'Flappy bird',
            filename: 'index.html',
            template: 'public/index.html'
        }),
    ]
}