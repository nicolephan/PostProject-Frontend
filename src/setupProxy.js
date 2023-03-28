const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use('/api', createProxyMiddleware({ 
      target: 'https://postoffice-api.herokuapp.com/', 
      changeOrigin: true,
      onProxyRes: function (proxyRes, req, res) {
        res.header('Access-Control-Allow-Origin', '*');
      }
    }));
  };