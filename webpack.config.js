const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');


const copyImages = new CopyWebpackPlugin([
  {
    from: 'src/img',
    to: 'img'
  }
]);

const config = {
  entry: "./src/js/index.ts",
  output: {
    filename: "js/index.js",
    path: path.resolve(__dirname, 'build')
  },
  resolve: {
    extensions: ['.js', '.json', '.ts', '.hbs'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          appendTsSuffixTo: [/\.vue$/]
        }
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.s?[ac]ss$/,
        use: [
          MiniCssExtractPlugin.loader,
            { loader: 'css-loader', options: { url: false, sourceMap: true } },
            { loader: 'sass-loader', options: { sourceMap: true } }
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 1000,
          name: '[name].[ext]',
          outputPath: 'fonts/',
          publicPath: '../'
        },
        exclude: [path.resolve(__dirname, 'img')]
      },
      {
        test: /\.(jpg|jpeg|gif|png|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 1000,
          name: '[name].[ext]',
          outputPath: 'img/',
          publicPath: '../'
        },
        exclude: [path.resolve(__dirname, 'fonts')]
      },
      {
        test: /\.(hbs|handlebars)$/,
        loader: 'handlebars-loader'
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      }
    ]
  },
  plugins: [
    copyImages,
    new MiniCssExtractPlugin({
      filename: "css/index.css"
    }),
    new webpack.ProvidePlugin({
           $: "jquery",
           jQuery: "jquery",
           Popper: ['popper.js', 'default']
   })
  ]
};

if (process.env.NODE_ENV === 'development') {

  config.devServer = {
    hot: true,
    publicPath: '/build/'
  };

  config.plugins.push(
    new webpack.HotModuleReplacementPlugin()
  );
}

module.exports = config;
