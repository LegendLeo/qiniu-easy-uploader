const qiniu = require('qiniu')
const express = require('express')
const app = express()
const config = require('./config.json')

const mac = new qiniu.auth.digest.Mac(config.AccessKey, config.SecretKey)
const options = {
  scope: config.Bucket,
  deleteAfterDays: 1,
  returnBody:
    `{"key":"$(key)","hash":"$(etag)","size":$(fsize),"bucket":"$(bucket)","url":"${config.Domain}/$(key)"}`
}

var putPolicy = new qiniu.rs.PutPolicy(options)

app.get('/api/uptoken', function (req, res, next) {
  var token = putPolicy.uploadToken(mac)
  res.header('Cache-Control', 'max-age=0, private, must-revalidate')
  res.header('Pragma', 'no-cache')
  res.header('Expires', 0)
  if (token) {
    res.json({
      uptoken: token,
      domain: config.Domain
    })
  }
})

app.listen(config.Port, function () {
  console.log('Listening on port %d\n', config.Port)
  console.log('▽ ▽ ▽ ▽ ▽ ▽ ▽ ▽ ▽ ▽ ▽ ▽ ▽ ▽ ▽ ▽ ▽ ▽ ▽ ▽ ▽ ▽ ▽ ▽ ▽ ▽ ▽ ▽ ▽ ▽')
  console.log('△ △ △ △ △ △ △ △ △ △ △ △ △ △ △ △ △ △ △ △ △ △ △ △ △ △ △ △ △ △\n')
})
