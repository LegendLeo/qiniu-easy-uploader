const config = require('./server/config.json')

module.exports = {
  publicPath: './',
  devServer: {
    proxy: 'http://localhost:' + config.Port
  }
}
