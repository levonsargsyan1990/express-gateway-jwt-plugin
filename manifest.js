module.exports = {
  version: '1.2.0',
  init: function (pluginContext) {
    pluginContext.eventBus.on('hot-reload', function ({ type, newConfig }) {
      // "type" is gateway or system
      // depends on what file was changed
      // newConfig - is newly loaded configuration of ExpressGateway
      console.log('hot-reload', type, newConfig);
    });

    pluginContext.eventBus.on('http-ready', function ({ httpServer }) {
      console.log('http server is ready', httpServer.address());

      // Proxy websockets to localhost:9015
      const httpProxy = require('http-proxy')
      var proxy = new httpProxy.createProxyServer({
        target: {
          host: 'localhost',
          port: 9015
        }
      });

      httpServer.on('upgrade', (req, socket, head) => {
        proxy.ws(req, socket, head);
      });
    });

    pluginContext.eventBus.on('https-ready', function ({ httpsServer }) {
      console.log('https server is ready', httpsServer.address());
    });

    pluginContext.eventBus.on('admin-ready', function ({ adminServer }) {
      console.log('admin server is ready', adminServer.address());
    });
  }
}
