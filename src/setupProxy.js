const proxy = require('http-proxy-middleware');
module.exports = function(app) {
  app.use(
    '/uc/oauth2.0/**',
    proxy({
      target: 'http://zwdtuser.sh.gov.cn/'
    })
  );
};
