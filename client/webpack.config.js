// Import necessary modules and plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = () => {
  return {
    // Setting the mode to development for more readable output and easier debugging
    mode: 'development',

    // Entry points for various JavaScript files
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js',
      database: './src/js/database.js',
      editor: './src/js/editor.js',
      header: './src/js/header.js',
    },

    // Output configuration
    output: {
      filename: '[name].bundle.js', // Naming convention for output files
      path: path.resolve(__dirname, 'dist'), // Output directory
    },

    // Plugins used in this configuration
    plugins: [
      // Generates an HTML file from a template and injects scripts
      new HtmlWebpackPlugin({
        template: './index.html', // Source template file
        title: 'JATE' // Title of the application
      }),

      // Configures the service worker using Workbox's InjectManifest plugin
      new InjectManifest({
        swSrc: './src-sw.js', // Source service worker file
        swDest: 'src-sw.js', // Destination for the injected service worker
      }),

      // Generates a manifest file for the PWA
      new WebpackPwaManifest({
        fingerprints: false, // Disables fingerprints in filenames
        inject: true, // Automatically injects the manifest into the HTML
        name: 'Just Another Text Editor', // Name of the PWA
        short_name: 'JATE', // Short name of the PWA
        description: 'Just Another Text Editor', // Description of the PWA
        background_color: '#225ca3', // Background color
        theme_color: '#225ca3', // Theme color
        start_url: './', // Start URL when launched
        publicPath: './', // Public path for assets
        icons: [ // Array of icons for different resolutions
          {
            src: path.resolve('src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512], // Icon sizes
            destination: path.join('assets', 'icons'), // Destination for icons
          }
        ]
      })
    ],

    // Module rules for handling different file types
    module: {
      rules: [
        // Rule for CSS files
        {
          test: /\.css\$/i, // Regex to match CSS files
          exclude: /node_modules/, // Excluding node_modules
          use: {
            loader: 'babel-loader', // Using Babel loader for transpiling
            options: {
              presets: ['@babel/preset-env'], // Preset for latest JavaScript features
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
            },
          },
        },
      ],
    },
  };
};
