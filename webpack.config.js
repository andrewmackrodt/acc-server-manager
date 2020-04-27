const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const InjectPlugin = require('webpack-inject-plugin').default;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const VueLoader = require('vue-loader');
const path = require('path');
const sharpResponsiveLoader = require('responsive-loader/sharp');
const webpack = require('webpack');

const isDev = (process.env.npm_lifecycle_script || '').indexOf('development') !== -1;

module.exports = {
  entry: path.join(__dirname, '/src/core/main.ts'),
  mode: isDev ? 'development' : 'production',
  optimization: {
    minimizer: [
      new TerserJSPlugin({ cache: true, parallel: true }),
      new OptimizeCSSAssetsPlugin(),
    ],
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        vendors: {
          name: 'vendors',
          test: /[\\/]node_modules[\\/]/,
          priority: 10,
        },
        bootstrap: {
          name: 'bootstrap',
          test: /[\\/]node_modules[\\/](jquery|popper\.js|bootstrap)/,
          priority: 20,
        },
        firebase: {
          name: 'firebase',
          test: /[\\/]node_modules[\\/]@?(firebase|grpc|protobufjs)/,
          priority: 20,
        },
        vue: {
          name: 'vue',
          test: /[\\/]node_modules[\\/]vue/,
          priority: 50,
        },
      },
    },
  },
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'bundles/[name]' + (!isDev ? '.[chunkhash:7]' : '') + '.js',
    chunkFilename: 'bundles/[name]' + (!isDev ? '.[chunkhash:7]' : '') + '.js',
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          appendTsSuffixTo: [/\.vue$/],
        },
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
        exclude: /index\.html$/,
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.s?css$/,
        exclude: path.join(__dirname, '/src'),
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../',
              hmr: isDev,
            },
          },
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.s?css$/,
        include: path.join(__dirname, '/src'),
        oneOf: [
          {
            resourceQuery: /module/,
            use: [
              'vue-style-loader',
              {
                loader: 'css-loader',
                options: {
                  modules: true,
                  localIdentName: '[local]-[hash:base62:5]',
                },
              },
              'postcss-loader',
              'sass-loader',
            ],
          },
          {
            use: [
              'vue-style-loader',
              {
                loader: MiniCssExtractPlugin.loader,
                options: {
                  publicPath: '../',
                  hmr: isDev,
                },
              },
              {
                loader: 'css-loader',
                options: {
                  modules: 'global',
                  localIdentName: '[local]-[hash:base62:5]',
                },
              },
              'postcss-loader',
              'sass-loader',
            ],
          },
        ],
      },
      {
        test: /\.(webp|jpe?g|png)(\?.*)?$/,
        loader: 'responsive-loader',
        options: {
          adapter: function (imagePath) {
            const adapter = sharpResponsiveLoader(imagePath);

            return {
              metadata: function metadata() {
                return adapter.metadata()
              },
              resize: function resize(_ref) {
                if (_ref.width <= 320) _ref.options.quality = 85;
                else if (_ref.width <= 640) _ref.options.quality = 80;
                else _ref.options.quality = 75;

                return adapter.resize(_ref)
              },
            }
          },
          disable: isDev,
          name: '[path][name]' + ( ! isDev ? '-[width]px.[hash:7]' : '') + '.[ext]',
          sizes: [2160, 1080, 640, 320],
        },
      },
      {
        test: /\.svg(\?.*)?$/,
        loader: 'svg-url-loader?noquotes'
            + '&name=[path][name]' + ( ! isDev ? '.[hash:7]' : '') + '.[ext]'
            + '&limit=20000'
            + '&stripdeclarations'
            + '&iesafe',
      },
      {
        test: /\.(gif|ico|eot|ttf|woff)(\?.*)?$/,
        loader: 'file-loader',
        options: {
          name: '[path][name]' + ( ! isDev ? '.[hash:7]' : '') + '.[ext]',
        },
      },
    ],
  },
  devServer: {
    host: '0.0.0.0',
    hot: true,
    historyApiFallback: {
      index: '/index.html'
    },
  },
  resolve: {
    extensions: ['.ts', '.js', '.vue'],
    modules: [
      path.join(__dirname, '/src'),
      __dirname,
      path.join(__dirname, '/node_modules'),
    ],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
    },
  },
  plugins: [
    new webpack.ProvidePlugin({
      '$': 'jquery',
    }),
    new HtmlWebpackPlugin({
      template: 'index.html',
      filename: 'index.html',
      minify: ! isDev,
    }),
    new FaviconsWebpackPlugin({
      logo: path.join(__dirname, '/assets/icons/favicon.svg'),
      prefix: 'assets/icons',
      favicons: {
        appName: 'Assetto Corsa Competizione Server Manager',
        developerName: 'Andrew Mackrodt',
        developerURL: 'https://andrewmackrodt.com',
        icons: {
          appleStartup: false,
          coast: false,
          firefox: false,
          windows: false,
          yandex: false,
        },
      }
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new InjectPlugin(() => {
      const name = process.env.APP_CONFIG || (isDev ? 'dev' : 'prod');
      let filepath = path.resolve(__dirname, `config/${name}.js`);
      if (process.env.APP_CONFIG_OVERRIDE !== '0') {
        const overridePath = filepath.replace(/\.js$/, '.local.js');
        if (fs.existsSync(overridePath)) {
          filepath = overridePath;
        }
      }
      let config = {}
      if (fs.existsSync(filepath)) {
        config = require(filepath);
      }
      return 'window.globals.config = ' + JSON.stringify(config) + ';'
    }),
    new MiniCssExtractPlugin({
      filename: 'bundles/[name]' + (!isDev ? '.[chunkhash:7]' : '') + '.css',
      chunkFilename: 'bundles/[name]' + (!isDev ? '.[chunkhash:7]' : '') + '.css',
    }),
    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: 'defer',
    }),
    new VueLoader.VueLoaderPlugin(),
  ],
};

if (isDev) {
  module.exports.devtool = 'source-map'
} else {
  module.exports.plugins.push(
      new ImageminPlugin({
        test: /\.(png|gif|svg)$/i,
        pngquant: {
          quality: '65-90',
          speed: 4
        },
      }),
  );

  return
}
