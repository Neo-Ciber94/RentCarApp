const path = require('path');

module.exports = {
  style: {
    postcss: {
      plugins: [
        require('tailwindcss'),
        require('autoprefixer'),
      ],
    },
  },
  webpack: {
    // output: {
    //   publicPath: '/',
    //   path: path.join(__dirname, 'public'),
    //   filename: 'bundle.js'
    // },
    // devServer: {
    //   historyApiFallback: true,
    // }
    output: {
      publicPath: "/",
    },
    devServer: {
      output: {
        publicPath: "/",
      }
    }
  },
  output: {
    publicPath: "/",
  }
}