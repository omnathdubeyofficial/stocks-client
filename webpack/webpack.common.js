const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const copyWebpackPlugin = require('copy-webpack-plugin')
const isDevelopment = process.env.NODE_ENV !== 'prod';
module.exports = {
  entry: path.resolve(__dirname, '..', './src/index.tsx'),
  resolve: {
    extensions: ['.tsx', '.ts', '.js','.svg'],
    alias : {
      '@material-ui/core' : '@material-ui/core/es'
    }
  },
  devServer: {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
    },
    proxy: {
      '/': 'http://localhost:7501/',
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: 'asset/inline',
      },
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        use: [
          // ... other loaders
          {
            loader: require.resolve('babel-loader'),
            options: {
              // ... other options
              // plugins: [
              //   // ... other plugins
              //   isDevelopment &&   require.resolve('react-refresh/babel'),
              // ].filter(Boolean),
            },
          },
        ],
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, '..', './build'),
    filename: 'bundle.js',
  },
  
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '..', './src/index.html'),
    }),
    // new  copyWebpackPlugin({
    //   patterns:[{from:'source',to:"dest"}]
    // })
  ],
  stats: 'errors-only',
}