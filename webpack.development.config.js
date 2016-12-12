const path = require('path');
const nib = require('nib');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer')
const Webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

var config = module.exports = {
  context: __dirname,
  entry: [
    'webpack-dev-server/client?http://localhost:8080/',
    'webpack/hot/dev-server',
    path.join(__dirname, './app/client/entry.js')
  ],
  output: {
    path: path.join(__dirname),
    filename: '[name].js',
    publicPath: 'http://localhost:8080/'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['es2015'],
        plugins: ['transform-runtime']
      }
    }, {
      test: /\.styl$/,
      loader: 'style-loader!css-loader!stylus-loader'
    }],
    resolve: {
      extensions: ['', '.js', '.jsx', '.css', '.styl'],
      modulesDirectories: [
        'node_modules'
      ]
    }
  },
  stylus: {
    use: [nib()]
  }  
};

config.output = {
  path: path.join(__dirname, 'app', 'assets', 'javascripts'),
  filename: 'bundle.js',
  publicPath: 'http://localhost:8080/'
};


config.plugins = [
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin()
];

const compiler = Webpack(config);
const server = new WebpackDevServer(compiler, {
  hot: true,
  compress: true,
  headers: {
    'Access-Control-Allow-Origin': '*'
  }
});

server.listen(8080, () => {
  console.log('Webpack dev server listening at http://localhost:8080');
});