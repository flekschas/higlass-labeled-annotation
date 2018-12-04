const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const HtmlWebPackPlugin = require('html-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const UnminifiedWebpackPlugin = require('unminified-webpack-plugin');
const postcssFlexbugsFixes = require('postcss-flexbugs-fixes');

const { VERSION, DEPENDENCIES } = require('./globals.js');

module.exports = (envs, argv) => ({
  output: {
    filename: 'higlass-labeled-annotation.min.js',
    library: 'higlass-labeled-annotation',
    libraryTarget: 'umd',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    contentBase: [
      path.join(__dirname, 'node_modules/higlass/dist'),
      path.join(__dirname, 'node_modules/higlass-image/dist')
    ],
    watchContentBase: true
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: false
      }),
      new OptimizeCssAssetsPlugin({})
    ],
    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'index',
          test: /\.css$/,
          chunks: 'all',
          enforce: true
        }
      }
    }
  },
  module: {
    rules: [
      // Run ESLint first
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'eslint-loader'
        }
      },
      // Transpile the ES6 files to ES5
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      // Convert SASS to CSS, postprocess it, and bundle it
      {
        test: /\.s?css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              minimize: { safe: true },
              url: false
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [
                postcssFlexbugsFixes,
                autoprefixer({
                  browsers: [
                    '>1%',
                    'last 4 versions',
                    'Firefox ESR',
                    'not ie < 9'
                  ],
                  flexbox: 'no-2009'
                })
              ]
            }
          },
          'sass-loader' // compiles Sass to CSS
        ]
      },
      {
        test: /.*\.(gif|png|jpe?g|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'images/[name].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      VERSION,
      DEPENDENCIES
    }),
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: './index.html',
      isProduction: argv.mode === 'production'
    }),
    new UnminifiedWebpackPlugin()
    // new BundleAnalyzerPlugin(),
  ]
});
