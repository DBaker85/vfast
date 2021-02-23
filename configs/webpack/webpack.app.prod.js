const { merge } = require("webpack-merge");
const { resolve } = require("path");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const commonProdConfig = require("./common/webpack.prod");

module.exports = merge(commonProdConfig, {
  context: resolve(__dirname, "..", "..", "src"),
  entry: ["./Index.tsx", "./config/theme-config.json"],
  output: {
    filename: "bundle.[hash].min.js",
    path: resolve(__dirname, "..", "..", "theme", "astern"),
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[hash].[ext]",
            outputPath: "/",
          },
        },
      },

      {
        test: /\.json/,
        type: "asset/resource",
        generator: {
          filename: "[name].[ext]",
        },
      },
    ],
  },

  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: "static",
      reportFilename: resolve(
        __dirname,
        "..",
        "..",
        "reports",
        "app-analysis-report.html"
      ),
      openAnalyzer: false,
    }),
  ],
  resolve: {
    alias: {
      react: "preact/compat",
      "react-dom/test-utils": "preact/test-utils",
      "react-dom": "preact/compat",
    },
  },
});