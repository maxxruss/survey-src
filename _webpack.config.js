const path = require("path");



module.exports = (env, argv) => {
    console.log("argv.mode: ", argv.mode)
    const is_prod = argv.mode === "production" ?? false;

    return {
        mode: is_prod ? "production" : "development",
        entry: {
            app: "./resources/js/app.js",
        },
        // devtool: "inline-source-map",
        output: {
            filename: "app.js",
            // publicPath: is_prod ? "/" : "http://localhost:8080/js/",
            path: path.resolve(__dirname, "public/js"),
            clean: true,
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    // use: jsLoaders(),
                },
                // {
                //     test: /\.jsx$/,
                //     exclude: /node_modules/,
                //     use: [
                //         {
                //             loader: "babel-loader",
                //             options: babelOptions(),
                //         },
                //     ],
                // },
            ],
        },
        devServer: {
            // contentBase: path.resolve(__dirname, './public'),
            // static: {
            //     directory: path.join(__dirname, "public"),
            // },
            port: 8080,
            // hot: true,
            // liveReload: false,
            headers: { "Access-Control-Allow-Origin": "*" },
        },
    };
};
