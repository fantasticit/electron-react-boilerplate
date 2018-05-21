const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: process.env.NODE_ENV === 'development' ? 'http://localhost:8080/' : './'
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'css-hot-loader',
          MiniCssExtractPlugin.loader,
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
