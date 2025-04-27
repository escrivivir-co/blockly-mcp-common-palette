const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");

// Base config that applies to either development or production mode.
const config = {
    entry: "./src/index.js",
    output: {
        // Compile the source files into a bundle.
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist"),
        clean: true,
    },
    // Enable webpack-dev-server to get hot refresh of the app.
    devServer: {
        static: "./build",
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"], // Asegúrate que algo así exista
            },
            // Monaco también usa fuentes .ttf
            {
                test: /\.ttf$/,
                type: "asset/resource", // O usa 'url-loader'/'file-loader' si usas Webpack 4
            },
        ],
    },
    plugins: [
        // Generate the HTML index page based on our template.
        // This will output the same index page with the bundle we
        // created above added in a script tag.
        new HtmlWebpackPlugin({
            template: "src/index.html",
        }),
        new MonacoWebpackPlugin({
            // Lista de lenguajes a incluir. Para empezar:
            languages: ["javascript"],
            // Puedes añadir más características si las necesitas,
            // pero empieza con lo mínimo para mantener el tamaño bajo.
            // features: ['!gotoSymbol'] // Ejemplo: excluir una característica
        }),
    ],
};

module.exports = (env, argv) => {
    if (argv.mode === "development") {
        // Set the output path to the `build` directory
        // so we don't clobber production builds.
        config.output.path = path.resolve(__dirname, "build");

        // Generate source maps for our code for easier debugging.
        // Not suitable for production builds. If you want source maps in
        // production, choose a different one from https://webpack.js.org/configuration/devtool
        config.devtool = "eval-cheap-module-source-map";

        // Include the source maps for Blockly for easier debugging Blockly code.
        config.module.rules.push({
            test: /(blockly\/.*\.js)$/,
            use: [require.resolve("source-map-loader")],
            enforce: "pre",
        });

        // Ignore spurious warnings from source-map-loader
        // It can't find source maps for some Closure modules and that is expected
        config.ignoreWarnings = [/Failed to parse source map/];
    }
    return config;
};
