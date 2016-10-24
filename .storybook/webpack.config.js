const path = require('path');
const webpack = require('webpack');


module.exports = {

  cache: true,
  devtool: 'eval',

  stats: {
    colors: true,
  },

  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: [
          require('autoprefixer'),
          require('postcss-nested'),
          require('postcss-simple-vars'),
        ],
        cssLoader: {
          executeAfterCSSModule(pipeline) {
            pipeline.use(require('postcss-calc'));
          },
        },
      }
    }),
  ],

  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: 'style!css!postcss'
      },
      {
        test: /\.svg$/,
        loader: 'url',
        query: {
          limit: 10000,
          mimetype: 'image/svg+xml',
        }
      }
    ],
  },

  resolve: {
    modules: [
      'src',
      'node_modules'
    ],
  }
};

