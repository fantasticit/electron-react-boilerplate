const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../dist'),
    publicPath:
      process.env.NODE_ENV === 'development' ? 'http://localhost:8080/' : './'
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'css-hot-loader',
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../'
            }
          },
          'css-loader?importLoaders=1',
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true
            }
          },
          'sass-loader'
        ]
      },

      {
        test: /\.jsx?$/,
        use: [
          'cache-loader',
          'thread-loader',
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true
            }
          }
        ],
        exclude: /node_modules/
      },

      {
        test: /\.tsx?$/,
        use: [
          'cache-loader',
          'thread-loader',
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true
            }
          },
          {
            loader: 'ts-loader',
            options: {
              happyPackMode: true,
              transpileOnly: true
            }
          }
        ],
        exclude: /node_modules/
      },

      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'img/[name].[hash:7].[ext]'
        }
      },

      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'media/[name]--[folder].[ext]'
        }
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].css'
    })
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json', '.scss'],
    alias: {
      '@': path.resolve(__dirname, '../src')
    }
  },
  node: {
    __dirname: process.env.NODE_ENV !== 'production',
    __filename: process.env.NODE_ENV !== 'production'
  }
}
