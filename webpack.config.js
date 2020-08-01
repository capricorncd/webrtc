/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-07-30 22:31
 */
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin-webpack4')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const path = require('path')
const rawArgs = process.argv.slice(2)

console.log(rawArgs)

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

let isDev = rawArgs[1] !== 'production'

module.exports = {
  mode: isDev ? 'development' : 'production',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
    library: 'ZXWebRTC',
    libraryTarget: 'umd'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        use: [
          'babel-loader'
        ]
      },
      {
        test: /\.(scss|sass)$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: './static/[name].[hash:7].[ext]'
        }
      },
      // https://www.npmjs.com/package/webp-loader
      {
        test: /\.webp$/,
        use: [
          'file-loader',
          'webp-loader'
        ]
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: './static/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: './static/[name].[hash:7].[ext]'
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: './index.html',
    })
  ]
}
