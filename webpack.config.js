const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
//该插件将为您生成一个HTML5文件，其中会使用script标签将您的所有Webpack生成的bundle包括在内。
module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: __dirname + "/src/index.js",
  output: {
    path: __dirname + "/dist",
    filename: "bundle.js"
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    historyApiFallback: true, //不跳转
    compress: true,
    port: 3000,
    hot:true
  },
  module: {
    rules: [{
      test: /(\.jsx|\.js)$/,
      use: {
        loader: "babel-loader",
      },
      exclude: /node_modules/
    }, {
      test: /\.css$/,
      use: [{
        loader: "style-loader"}, {
        loader: "css-loader"}, {
        loader: "postcss-loader"
      }],
      options:{
        modules:true
      }
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: __dirname + "/dist/index.html"
    })
  ]
}