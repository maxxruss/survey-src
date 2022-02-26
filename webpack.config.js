const path = require("path");

const babelOptions = (preset) => {
    const opts = {
        presets: ["@babel/preset-env", "@babel/preset-react"],
        plugins: [
            "@babel/plugin-proposal-class-properties",
            "@babel/plugin-syntax-jsx",
            "@babel/plugin-transform-runtime",
        ],
    };

    if (preset) {
        opts.presets.push(preset);
    }

    return opts;
};

const jsLoaders = () => {
    const loaders = [
        {
            loader: "babel-loader",
            options: babelOptions(),
        },
    ];

    return loaders;
};

module.exports = (env, argv) => {
    const is_prod = argv.mode === "production" ?? false;

    return {
        mode: is_prod ? "production" : "development",
        entry: {
            app: "./resources/js/app.js",
        },
        // entry: ["babel-polyfill", "./resources/js/app.js"],
        devtool: "inline-source-map",
        output: {
            filename: "app.js",
            publicPath: is_prod ? "/" : "http://localhost:8080/js/",
            path: path.resolve(__dirname, "public/js"),
            clean: true,
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: jsLoaders(),
                },
                {
                    test: /\.jsx$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: "babel-loader",
                            options: babelOptions("@babel/preset-react"),
                        },
                    ],
                },
            ],
        },
        devServer: {
            static: {
                directory: path.join(__dirname, "public"),
            },
            // port: 8080,
            hot: true,
            // liveReload: false,
            headers: { 'Access-Control-Allow-Origin': '*' }
        },
    };
};
