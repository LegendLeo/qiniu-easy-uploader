# 七牛易传 / qiniu-easy-uploader
七牛易传——七牛云图床上传助手，最大的特点是可以**上传截图**、多图同时上传、有pwa配置

项目地址：[https://tools.huqing.site/qiniu/](https://tools.huqing.site/qiniu/)


如果你将我的项目拷贝下来了，记得复制一份`server`文件夹下的`config.json.example`文件，并改名为`config.json`，然后修改里面的七牛云配置（要删除注释，json不支持注释），然后`npm run serve`开启获取秘钥服务。

因为七牛云不允许纯前端获取上传秘钥（upload token，这也是为了安全考虑），所以一定要开启这里的获取秘钥服务的命令。

如果对此项目感兴趣，给个Star吧，有任何意见和建议欢迎PR或者与我交流[:e-mail:hqyx45@gmail.com](mailto:hqyx45@gmail.com)，感谢使用，感谢支持

## 安装依赖 / Project setup
```
npm install
```

### 获取秘钥服务 / Start server for getting upload token
```
npm run serve
```

### 开发编译 / Compiles and hot-reloads for development
```
npm run dev
```

### 构建生产环境代码 / Compiles and minifies for production
```
npm run build
```

### 修复eslint警告 / Lints and fixes files
```
npm run lint
```

## 功能描述

### 已经实现的功能

- [x] 截图粘贴上传
- [x] 选择图片上传
- [x] 多个图片同时上传
- [x] 上传成功后返回图片地址
- [x] 点击按钮复制图片链接

### 待实现和待完善的功能

- [ ] 界面美化
- [ ] 客户端填写七牛云配置
