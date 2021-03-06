import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import config from './config/webpack.local.babel.js';

const PORT = process.env.PORT || 8888;
const HOST = process.env.HOST || 'localhost';
const serverOptions = {
  contentBase: './src',
  hot: true,
  quiet: false,
  noInfo: false,
  stats: {
    colors: true,
    chunkModules: false,
  },
};

new WebpackDevServer(webpack(config), serverOptions).listen(PORT, HOST, err => {
  if (err) {
    console.error('[ERROR] Failed to launch webpack dev server:', err);
    return;
  }

  console.log(`Listening at ${ HOST }:${ PORT }`);
});
