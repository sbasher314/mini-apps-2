const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
entry: path.resolve(__dirname) + '/client/index.js',
 output: {
   path: path.join(__dirname, '/public'),
   filename: 'index.bundle.js'
 },
 module: {
   rules: [
     {
       test: /\.(js|jsx)$/,
       exclude: /nodeModules/,
       use: {
         loader: 'babel-loader'
       }
     },
     {
       test: /\.css$/,
       use: ['style-loader', 'css-loader']
     }
   ]
 },
 plugins: [new HtmlWebpackPlugin({ template: './client/index.html' })],
 resolve: {
   extensions: ['.js','.jsx']
 }
}
