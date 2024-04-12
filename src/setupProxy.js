// const { createProxyMiddleware } = require('http-proxy-middleware');
// module.exports = function(app) {
//   app.use('/gqlapi',createProxyMiddleware({target: 'http://localhost:7501',changeOrigin: true,}));
//   app.use('/md',createProxyMiddleware({target: 'http://localhost:7501',changeOrigin: true,}));
// };

const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
  app.use('/gqlapi',createProxyMiddleware({target: 'http://localhost:7501',changeOrigin: true,}));
  app.use('/md',createProxyMiddleware({target: 'http://localhost:7501',changeOrigin: true,}));
  app.use('/uploadfile',createProxyMiddleware({target: 'http://localhost:7501',changeOrigin: true,}));
  app.use('/getfile',createProxyMiddleware({target: 'http://localhost:7501',changeOrigin: true,}));
  app.use('/deletefile',createProxyMiddleware({target: 'http://localhost:7501',changeOrigin: true,}));
  app.use('/savedocument',createProxyMiddleware({target: 'http://localhost:7501',changeOrigin: true,}));
  app.use('/deletedocument',createProxyMiddleware({target: 'http://localhost:7501',changeOrigin: true,}));
  app.use('/publishnotification',createProxyMiddleware({target: 'http://localhost:7501',changeOrigin: true,}));
};
