//path モジュールの読み込み
const wpFlag = false
const themeName = 'obl-develop'
const version = 1
const devUrl = 'http://localhost:3001'
const THEME_NAME = `${themeName}`

const enabledSourceMap = process.env.NODE_ENV !== 'production'
const path = require('path')
const glob = require('glob')
const CopyFilePlugin = require('copy-webpack-plugin')
// const WriteFilePlugin = require("write-file-webpack-plugin")
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackPugPlugin = require('html-webpack-pug-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const StylelintPlugin = require('stylelint-webpack-plugin')
const FixStyleOnlyEntries = require('webpack-fix-style-only-entries')
const ESLintPlugin = require('eslint-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

const distPass = wpFlag ? `wp-content/themes/` : ''

const src = {
  root: `./src/`,
  html: `./src/`,
  php: `./src/`,
  css: `./src/assets/css`,
  js: `./src/assets/js`,
  json: `./src/assets/json`,
  img: `./src/assets/img`,
}

const dest = {
  root: `dist/${distPass}`,
  html: `dist/${distPass}/`,
  php: `dist/${distPass}/`,
  css: `dist/${distPass}/assets/css`,
  js: `dist/${distPass}/assets/js`,
  json: `dist/${distPass}/assets/json`,
  img: `dist/${distPass}/assets/img`,
}

/**
 * ファイル名のみ抽出する
 * @param path
 * @returns {*}
 */
const getFileName = function(path) {
  return path.replace(/\.[^/.]+$/, '')
}

/**
 * webpack setting
 */

const app = {
  entry: {
    [`/assets/css/styles`]: `${src.css}/styles.scss`,
  },
  output: {
    filename: `[name].js`,
    path: path.resolve(__dirname, dest.html),
    publicPath: '',
  },
  resolve: {
    extensions: ['.js'],
  },
  devServer: {
    //webpack-dev-server setting
    host: '0.0.0.0',
    contentBase: path.join(__dirname, 'dist'),
    open: true,
  },
  module: {
    rules: [
      // {
      //   enforce: 'pre',
      //   test: /\.js$/,
      //   exclude: /node_modules/,
      //   use: 'eslint-loader',
      // },
      {
        test: /\.js$/,
        // exclude: /node_modules\/(?!(dom7|ssr-window|swiper)\/).*/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          // Babel のオプションを指定する
          options: {
            presets: [
              // プリセットを指定することで、ES2020 を ES5 に変換
              '@babel/preset-env',
            ],
          },
        },
      },
      {
        test: /\.scss$/,
        use: [
          // MiniCssExtractPlugin
          {
            loader: MiniCssExtractPlugin.loader,
          },
          // CSS Bundle
          {
            loader: 'css-loader',
            options: {
              url: false,
              sourceMap: enabledSourceMap,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: enabledSourceMap,
              postcssOptions: {
                plugins: ['autoprefixer'],
              },
            },
          },
          // Sass を CSS へ変換するローダー
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass'),
              sassOptions: {
                fiber: false,
                outputStyle: 'expanded',
              },
              sourceMap: enabledSourceMap,
            },
          },
        ],
      },
      {
        test: /\.pug$/,
        use: [
          {
            loader: 'pug-loader',
            options: {
              pretty: true,
              root: path.resolve(__dirname, 'src'),
            },
          },
        ],
      },
    ],
  },
  // plugin setting
  plugins: [
    // ...pugTemplates,
    // new HtmlWebpackPugPlugin(),
    new FixStyleOnlyEntries(),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      ignoreOrder: true,
    }),
    new StylelintPlugin({
      files: `${src.css}/**/*.scss`,
      // syntax: 'scss',
      customSyntax: 'postcss-scss',
    }),
    new ESLintPlugin({
      extensions: ['.js'],
      exclude: 'node_modules',
    }),
    new CopyFilePlugin({
      patterns: [
        {
          context: src.root,
          from: '**/!(_)*.{png,jpg,jpeg,gif,pdf,svg,ico,json,cur,css,htaccess,ttf,eot,woff,woff2,html,php,txt,icon,webm,mp4,mov}',
          to: path.resolve(__dirname, dest.html),
        },
        {
          context: src.root,
          from: 'assets/js/app.js',
          to: path.resolve(__dirname, dest.js),
        }
      ],
    }),
    // new WriteFilePlugin(),
  ],
  //source-map
  devtool: 'source-map',

  // node_modules を監視（watch）対象から除外
  watchOptions: {
    ignored: /node_modules/,
  },
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin({
        exclude: `style.css`,
      }),
    ],
  },
}

module.exports = app
