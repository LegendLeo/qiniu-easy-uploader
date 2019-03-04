const config = require('./server/config.json')
const host = config.Host || 'http://localhost'

module.exports = {
  publicPath: './',
  devServer: {
    proxy: host + ':' + config.Port
  }
}
