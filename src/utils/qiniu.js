import * as qiniu from 'qiniu-js'
import { formatTime } from '@/utils'
const token = localStorage.getItem('token')

function _uploadFile (file, name) {
  const config = {
    useCdnDomain: true
  }
  const putExtra = {
    fname: '',
    params: {},
    mimeType: null
  }
  return qiniu.upload(file, name, token, putExtra, config)
}

/**
 * 上传屏幕截图
 * @param {Blob} file 文件
 * @param {String} name 文件名
 */
export function uploadScreenshot (file, name) {
  const now = new Date()
  name = name || formatTime(now, 'yyyyMMddhhmmss')

  // 调用sdk上传接口获得相应的observable，控制上传和暂停
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
    const observable = _uploadFile(file, name + '.png')
    observable.subscribe(observer)
  })
}

export function uploadImage (files) {
  const now = new Date()
  const dateStr = formatTime(now, 'yyyyMMdd')
  let observables = []
  // let name = files[0].name
  // let pointPos = name.lastIndexOf('.')
  // name = name.substring(0, pointPos) + '-' + dateStr + name.substring(pointPos)
  // const observer = {
  //   // 上传进度
  //   next (res) {
  //     let total = res.total
  //     console.log('进度：' + total.percent + '% ')
  //   },
  //   // 上传出错
  //   error (err) {
  //     reject(err)
  //   },
  //   // 上传完成
  //   complete (res) {
  //     resolve(res)
  //   }
  // }
  // const observable = _uploadFile(files[0], name)
  // observable.subscribe(observer)
  files.forEach((file, index) => {
    let name = file.name
    let pointPos = name.lastIndexOf('.')
    name = name.substring(0, pointPos) + '-' + dateStr + name.substring(pointPos)
    let observable = _uploadFile(file.raw, name)
    observables[index] = new Promise((resolve, reject) => {
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
  })
  return Promise.all(observables)
}
