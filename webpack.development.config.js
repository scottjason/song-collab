const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer')
const Webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

var config = module.exports = {
  context: __dirname,
  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/dev-server',
     path.join(__dirname, './app/client/entry.js')
  ],
  output: {
    path: path.join(__dirname),
    filename: '[name].js',
    publicPath: '/'
  },  
};

config.output = {
  path: path.join(__dirname, 'app', 'assets', 'javascripts'),
  filename: 'bundle.js',
  publicPath: 'http://localhost:8080/'
};

config.resolve = {
  extensions: ['', '.js'],
  modulesDirectories: ['node_modules'],
};

config.plugins = [
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin()
];

const compiler = Webpack(config);
const server = new WebpackDevServer(compiler,
  { hot: true,
    compress: true,
    headers: { 'Access-Control-Allow-Origin': '*' }
  }
);

server.listen(8080, () => {
  console.log('Webpack dev server listening at http://localhost:8080');
});
