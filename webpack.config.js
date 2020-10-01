const webpack = require(`webpack`); //webpack本体
const path = require(`path`); // 安全にパスを解決する
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin'); //cssを取り出す
const FixStyleOnlyEntriesPlugin = require("webpack-fix-style-only-entries"); //不要なjsファイルを生成しない


module.exports = (env, argv) => {
  const MODE = argv.mode;
  const IS_DEVELOPMENT = argv.mode === `development`; //開発中
  const IS_PRODUCTION = argv.mode === `production`; //本番
  return {
    mode: MODE,
    devtool: IS_DEVELOPMENT ? `inline-source-map` : `none`,
    entry: {
      "js/main": "./src/js/main",
      "css/style": "./src/scss/style",
    },
    output: {
      filename: `[name].js`,
      path: path.join(__dirname, "dist")
    },
    resolve: {
      extensions: [`.ts`, `.js`, `.scss`],
    },
    module: {
      rules: [{
          test: /\.js$/,
          exclude: /node_modules\/(?!(dom7|ssr-window|swiper)\/).*/,
          loader: 'babel-loader',
        },
        {
          test: /\.(scss)$/,
          exclude: /node_modules/,
          use: [{
              // cssを取り除く
              loader: ExtractCssChunks.loader,
            },
            {
              loader: 'css-loader',
              options: {
                url: false,
                sourceMap: false,
              }
            },
            {
              loader: 'postcss-loader',
            },
            {
              loader: 'sass-loader',
            },
            {
              loader: 'import-glob-loader'
            },
          ]
        },
      ]
    },
    plugins: [
      new FixStyleOnlyEntriesPlugin(),
      new ExtractCssChunks({
        filename: '[name].css',
        chunkFilename: '[id].css',
      }),
    ]
  }
};