//Konfiguracja Webpack


var path = require("path");

module.exports = {
    entry:"./js/index.jsx",
    output: { filename: "out.js", path: path.resolve(__dirname, "dist") },
    mode: "production", watch: true,
    module: {
        rules: [{
            test: /\.jsx$/,
            exclude: /node_modules/,
            use: {
                loader: "babel-loader",
                options: {
                    presets: ["es2015", "stage-2", "react"]
                }
            }
        },
            {
                test:/\.css$/,
                use:['style-loader','css-loader']
            },
            {
                test: /\.(jpg|png)$/,
                use: {
                    loader: "url-loader",
                    options: {
                        limit: 25000,
                    },
                },
            },

        ]
    }
}