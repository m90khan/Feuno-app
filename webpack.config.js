const path = require("path");
const webpack = require("webpack");

const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");

const IS_DEVELOPMENT = process.env.NODE_ENV === "dev";

const dirApp = path.join(__dirname, "app");
const dirAssets = path.join(__dirname, "assets");
const dirStyles = path.join(__dirname, "styles");
const dirNode = "node_modules";

module.exports = {
  entry: [path.join(dirApp, "index.js"), path.join(dirStyles, "index.scss")],
  // resolve the paths
  resolve: {
    modules: [dirApp, dirAssets, dirStyles, dirNode],
  },

  plugins: [
    new webpack.DefinePlugin({
      IS_DEVELOPMENT,
    }),

    new webpack.ProvidePlugin({}),

    new CopyWebpackPlugin({
      patterns: [
        // {
        //   from: "./app/service-worker.js",
        //   to: "",
        // },
        // {
        //   from: "./offline.html",
        //   to: "",
        // },
        {
          from: "./shared",
          to: "",
        },
      ],
    }),
    new ImageMinimizerPlugin({
      minimizer: {
        options: {
          // Lossless optimization with custom option
          // Feel free to experiment with options for better result for you
          plugins: [
            ["gifsicle", { interlaced: true }],
            ["jpegtran", { progressive: true }],
            ["optipng", { optimizationLevel: 8 }],
          ],
        },
      },
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css",
    }),
  ],
  // run module based on the extension
  module: {
    rules: [
      {
        test: /\.pug$/,
        use: ["pug-loader"],
      },

      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
        },
      },

      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: "",
            },
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: false,
            },
          },
          {
            loader: "postcss-loader",
            options: {
              sourceMap: false,
            },
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: false,
            },
          },
        ],
      },

      {
        test: /\.(jpe?g|png|gif|svg|woff2?|fnt|webp)$/,
        loader: "file-loader",
        options: {
          name(file) {
            return "[hash].[ext]";
          },
        },
      },

      {
        test: /\.(glsl|frag|vert)$/,
        loader: "raw-loader",
        exclude: /node_modules/,
      },

      {
        test: /\.(glsl|frag|vert)$/,
        loader: "glslify-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(jpe?g|png|gif|svg|webp)$/i,
        use: [
          {
            loader: ImageMinimizerPlugin.loader,
            // enforce: "pre",
            // options: {
            //   minimizer: {
            //     implementation: ImageMinimizerPlugin.imageminMinify,
            //     options: {
            //       plugins: [
            //         "imagemin-gifsicle",
            //         "imagemin-mozjpeg",
            //         "imagemin-pngquant",
            //         "imagemin-svgo",
            //       ],
            //     },
            //   },
            // },
          },
        ],
      },
    ],
  },
};
