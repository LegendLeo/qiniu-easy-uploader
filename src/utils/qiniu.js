import * as qiniu from 'qiniu-js'
import { formatTime } from '@/utils'

let now = new Date()
let datestr = formatTime(now, 'yyyy-MM-dd')
let str = 'screenshot' + datestr

export const uploadFile = (token, file, name = str) => {
  let config = {
    useCdnDomain: true,
    region: qiniu.region.z2
  }
  let putExtra = {
    fname: '',
    params: {},
    mimeType: null
  }

  // 添加上传dom面板
  let next = response => {
    let total = response.total
    console.log('进度：' + total.percent + '% ')
  }

  // 调用sdk上传接口获得相应的observable，控制上传和暂停
  let observable = qiniu.upload(file, name, token, putExtra, config)
  observable.subscribe(next)
}
