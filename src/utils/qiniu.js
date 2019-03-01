import * as qiniu from 'qiniu-js'
import { formatTime } from '@/utils'

/**
 * 上传屏幕截图
 * @param {String} token upload token
 * @param {Blob} file 文件
 * @param {String} name 文件名
 */
export function uploadScreenshot (token, file, name) {
  const config = {
    useCdnDomain: true
  }
  const putExtra = {
    fname: '',
    params: {},
    mimeType: null
  }
  const now = new Date()
  name = name || formatTime(now, 'yyyyMMddhhmmss')

  // 调用sdk上传接口获得相应的observable，控制上传和暂停
  let observable = qiniu.upload(file, name + '.png', token, putExtra, config)
  return new Promise((resolve, reject) => {
    const observer = {
      // 上传进度
      next (res) {
        let total = res.total
        console.log('进度：' + total.percent + '% ')
      },
      // 上传出错
      error (err) {
        reject(err)
      },
      // 上传完成
      complete (res) {
        resolve(res)
      }
    }
    observable.subscribe(observer)
  })
}
