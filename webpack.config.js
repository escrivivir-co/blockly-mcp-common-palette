const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");

// Base config that applies to either development or production mode.
const config = {
    entry: "./src/index.js",
    output: {
        // Compile the source files into a bundle.
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist"), // Base path (production)
        clean: true,
        publicPath: "/", // Serve assets from root
    },
    // Enable webpack-dev-server to get hot refresh of the app.
    devServer: {
        // static: "./build", // <<-- Comenta o elimina esta línea
        // Configuración más explícita para servir desde 'build' en desarrollo
        static: {
            directory: path.resolve(__dirname, "build"),
            publicPath: "/", // Mantener consistente con MonacoEnvironment
        },
        // Asegúrate que el dev server observe los cambios en la carpeta de salida
        // por si el plugin escribe directamente al disco en lugar de memoria (poco probable pero posible)
        watchFiles: [path.resolve(__dirname, "build")],
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.ttf$/,
                type: "asset/resource",
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "src/index.html",
        }),
        new MonacoWebpackPlugin({
            languages: ["javascript", "typescript"], // Añadir typescript explícitamente
            filename: "[name].worker.bundle.js",
            publicPath: "/", // Usar ruta absoluta para los workers
        }),
    ],
};

module.exports = (env, argv) => {
    if (argv.mode === "development") {
        // Set the output path to the `build` directory for development builds
        config.output.path = path.resolve(__dirname, "build"); // <<-- Asegúrate que esto sigue aquí

        config.devtool = "eval-cheap-module-source-map";

        config.module.rules.push({
            test: /(blockly\/.*\.js)$/,
            use: [require.resolve("source-map-loader")],
            enforce: "pre",
        });

        config.ignoreWarnings = [/Failed to parse source map/];

        console.log(`Output path: ${config.output.path}`);
    }
    // Para producción, output.path se queda como 'dist' (definido en la config base)
    return config;
};
