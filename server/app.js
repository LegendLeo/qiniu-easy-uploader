const qiniu = require('qiniu')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const fs = require('fs')
const path = require('path')
const dir = path.join(__dirname, '/config.json')
let config, option
let PORT = 9000

// 为了接收post传参需要用bodyParser
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }))

// 判断是否有config.json配置
fs.access(dir, function (err) {
  if (!err) {
    config = require('./config.json')
    if (config.port) {
      PORT = config.port
    }
    option = getOption(config)
  }
  // 确定服务端口后开启服务
  app.listen(PORT, function () {
    console.log('服务已在' + PORT + '端口启动')
  })
})

/**
 * 获取生成秘钥的选项
 * @param {Object} config 七牛云配置（包含accessKey、secretKey、domain、bucket选项）
 */
function getOption (config) {
  const mac = new qiniu.auth.digest.Mac(config.accessKey, config.secretKey)
  const options = {
    scope: config.bucket,
    returnBody:
      `{"key":"$(key)","hash":"$(etag)","size":$(fsize),"bucket":"$(bucket)","uri":"${config.domain}/$(key)"}`
  }
  const putPolicy = new qiniu.rs.PutPolicy(options)
  return {
    mac,
    putPolicy
  }
}

// 获取配置状态（是否在服务端配置过）
app.get('/api/getconfig', function (req, res) {
  res.json({
    hasConfig: Boolean(config)
  })
})

// 获取token（服务端没有配置项的时候，客户端上传配置请求此路由）
app.post('/api/posttoken', function (req, res) {
  let newConfig = req.body
  let newOption = getOption(req.body)
  const token = newOption.putPolicy.uploadToken(newOption.mac)
  res.header('Cache-Control', 'max-age=0, private, must-revalidate')
  res.header('Pragma', 'no-cache')
  res.header('Expires', 0)
  if (token) {
    res.json({
      uptoken: token,
      domain: newConfig.domain
    })
  }
})

// 获取token（服务端有配置项的时候会请求此路由）
app.get('/api/gettoken', function (req, res) {
  const token = option.putPolicy.uploadToken(option.mac)
  res.header('Cache-Control', 'max-age=0, private, must-revalidate')
  res.header('Pragma', 'no-cache')
  res.header('Expires', 0)
  if (token) {
    res.json({
      uptoken: token,
      domain: config.domain
    })
  }
})
