const CompressionPlugin = require('compression-webpack-plugin');
module.exports = {
  chainWebpack(config) {
    config.plugins.delete('prefetch');
    
    // and this line 
    config.plugin('CompressionPlugin').use(CompressionPlugin);
  },
  //...
  // devServer: {
  //   allowedHosts: [
  //     '.local'
  //   ],
  //   port: 8000,
  //   proxy: 'http://localhost:8000'
  // }
  runtimeCompiler: true,
  configureWebpack:{
  }, 
  devServer:{
    host: 'node.local',
    allowedHosts: [
		'.local'
    ],
    // public: true,
    // hot:true,
    // port: 8000,  
    // open: 'Chrome',
    proxy: { //https://cli.vuejs.org/guide/html-and-static-assets.html#disable-index-generation
        '/api*':{ //everything from api
            target: 'http://localhost:8001',
            secure: false,
            ws: false,
        },
        '/logout': { 
            target: 'http://localhost:8001',
            secure: false,
            ws: false
        },
        '/sockjs-node/*': { //web sockets
            target: 'http://localhost:8001',
            secure: false,
            ws: true
        },
      // public: true
      // '/ws/': { //web sockets
      //   target: 'http://localhost:8001',
      //   secure: false,
      //   ws: true
      // },
      // '!/':{ //except root, which is served by webpack's devserver, to faciliate instant updates
      //   target: 'http://localhost:8001/',
      //   secure: false,
      //   ws: false
      // },
    }
  }
};