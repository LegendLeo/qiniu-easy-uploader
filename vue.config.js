const config = require('./server/config.json')

module.exports = {
  devServer: {
    proxy: config.Host + ':' + config.Port
  }
}
