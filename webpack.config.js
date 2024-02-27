const path = require('path')
const { ProvidePlugin } = require('webpack')

module.exports = {
  entry: {
    bootstrap: './app/frontend/js/bootstrap.js',
    radar: './app/frontend/js/radar.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'app/dist')
  },
  module: {
    rules: [
      {
        test: /\.(scss)$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: () => [
                  require('autoprefixer')
                ]
              }
            }
          },
          {
            loader: 'sass-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    new ProvidePlugin({
      d3: path.resolve(__dirname, './app/frontend/lib/d3.v4.min.js'),
      radar: path.resolve(__dirname, './app/frontend/lib/radar-0.8.js')
    })
  ]
}
