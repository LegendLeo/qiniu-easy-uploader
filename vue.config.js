const config = require('./server/config.json')
const host = config.Host || 'http://localhost'

module.exports = {
  devServer: {
    proxy: host + ':' + config.Port
  }
}
