const config = require('./server/config.json')
const host = config.Host || 'http://localhost'

module.exports = {
  publicPath: '/qiniu',
  devServer: {
    proxy: host + ':' + config.Port
  }
}
