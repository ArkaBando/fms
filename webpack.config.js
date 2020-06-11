var HtmlWebpackPlugin = require("html-webpack-plugin");
var webpack = require("webpack");
const autoprefixer = require("autoprefixer");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require("path");

const staticDir = path.resolve(__dirname, "app", "src");
const appRoot = path.resolve(staticDir, "modules");
const distDir = path.resolve(__dirname, "app", "dist");

const DEV_MODE = process.env.WEBPACK_SERVE;

const imageLoaderConfiguration = {
  test: /\.(gif|jpe?g|png|svg)$/,
  use: {
    loader: 'file-loader',
    options: {
      name: '[name].[ext]',
    },
  },
};

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "index_bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.js|jsx$/,
        exclude: /node_modules/,
        use: "babel-loader"
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      imageLoaderConfiguration
    ]
  },
  resolve: {
    extensions: [".js", ".jsx"]
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {
        context: path.resolve(__dirname, "./src"),
        postcss: [autoprefixer]
      }
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      filename: "./index.html"
    }),
    new MiniCssExtractPlugin({
        filename: '[name].[contenthash].css',
      chunkFilename: '[id].[contenthash].css',
      }),
  ]
};

// module.exports = {
//   modules: {
//     entry: 'index.js',
//     output: {
//         path: path.resolve(__dirname, './dist'),
//         filename: 'index_bundle.js'
//       },
//     // rules: [
//     //   {
//     //     test: /\.js|jsx$/,
//     //     exclude: /node_modules/,
//     //     use: {
//     //       loader: "babel-loader"
//     //     }
//     //   }
//     // ]
//   },
//   plugins: [
//     new HtmlWebpackPlugin()
//   ]
// };
