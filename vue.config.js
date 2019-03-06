let PORT = 9000
try {
  let config = require('./server/config.json')
  PORT = config.port
} catch (error) {}

module.exports = {
  publicPath: './',
  devServer: {
    proxy: 'http://localhost:' + PORT
  }
}
