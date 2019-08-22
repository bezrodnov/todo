const path = require('path');
const FlowWebpackPlugin = require('flow-webpack-plugin');

const BUILD_DIR = path.resolve(__dirname, 'public');
const SOURCE_DIR = path.resolve(__dirname, 'src');

module.exports = {
  mode: 'development',
  entry: SOURCE_DIR + '/index.jsx',
  devtool: 'source-map',
  output: {
    filename: 'bundle.js',
    path: BUILD_DIR,
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [new FlowWebpackPlugin()],
  devServer: {
    host: '0.0.0.0',
    contentBase: BUILD_DIR,
    compress: true,
    port: 9000,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-flow', '@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader', // creates style nodes from JS strings
          'css-loader', // translates CSS into CommonJS
          'sass-loader', // compiles Sass to CSS, using Node Sass by default
        ],
      },
    ],
  },
};
