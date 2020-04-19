"use strict";

const path = require("path");

module.exports = {
  context: path.join(__dirname, "/src/client"),
  entry: ["@babel/polyfill", "./main.js"],
  mode: "development",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "public/js")
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      },
      {
        test: /\.(jpg|png)$/,
        use: {
          loader: 'url-loader',
        },
      },
    ]
  }
};
