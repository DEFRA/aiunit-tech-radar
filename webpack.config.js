const path = require('path')

module.exports = {
  entry: {
    bootstrap: './app/frontend/js/bootstrap.js'
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
  }
}
