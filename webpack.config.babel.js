import path from 'path';
import webpack from 'webpack';
import BundleTracker from 'webpack-bundle-tracker';

export default {
  context: __dirname,
  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    './assets/src/index',
  ],

  output: {
    path: path.resolve('assets/build/'),
    filename: '[name]-[hash].js',
    publicPath: 'http://localhost:8080/assets/build/', // Tell django to use this URL to load packages and not use STATIC_URL + bundle_name
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(), // don't reload if there is an error
    new BundleTracker({ filename: './webpack-stats.json' }),
  ],

  module: {
    rules: [
      // .js(x) loading
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            query: {
              // Ignore the .babelrc at the root of our project-- that's only
              // used to compile our webpack settings, NOT for bundling
              babelrc: false,
              presets: [
                ['env', {
                  // Enable tree-shaking by disabling commonJS transformation
                  modules: false,
                  // Exclude default regenerator-- we want to enable async/await
                  // so we'll do that with a dedicated plugin
                  exclude: ['transform-regenerator'],
                  useBuiltIns: 'usage',
                }],
                // Transpile JSX code
                'react',
              ],
              plugins: [
                'transform-object-rest-spread',
                'transform-class-properties',
                'transform-decorators-legacy',
                ['styled-components', {
                  ssr: false,
                  preprocess: false,
                }],
              ],
            },
          },
        ],
      },
      // CSS
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
          },
        ],
      },
    ],
  },

  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.jsx'],
  },
};
