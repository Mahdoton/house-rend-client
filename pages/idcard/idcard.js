import config from '../../utils/url.js';
import cache from '../../utils/Cache.js';
import Http from '../../utils/Http.js';
const http = new Http;

Page({
  data: {
    // 上传的图片
    upfile: [],
    // 用户信息
    userinfo: {}
  },
  onLoad(options) {
    // 获取用户的基本信息在自己服务中
    http.httpReq({
      url: config.userinfo,
      data: {
        openid: cache.get('openid')
      },
      token: cache.get('token')
    }).then(ret => {
      this.setData({
        userinfo: ret.data,
        upfile:ret.data.card_img
      })
    })
  },
  // 上传图片
  upfile() {
    // 选择图片或打开照像机
    wx.chooseImage({
      // 可以选择的图片数量
      count: 3,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      // 选择成功
      success: ret => {
        // 遍历
        ret.tempFilePaths.map(filepath => {
          // 文件上传
          wx.uploadFile({
            url: config.upfile,
            filePath: filepath,
            name: 'file',
            header: {
              'Authorization': 'Bearer ' + cache.get('token')
            },
            formData: {
              openid: cache.get('openid')
            },
            success: res => {
              // json字符串转为json对象
              let json = JSON.parse(res.data);
              this.setData({
                // ...参数的展开
                upfile: [...this.data.upfile, json]
              })
            }
          })
        })
      }
    });
  },
  // 表单提交
  dopost(evt) {
    let formData = evt.detail.value;
    let arr = [];
    this.data.upfile.map(item => {
      arr.push(item.pic);
    });
    formData.card_img = arr.join('#');
    formData.openid = cache.get('openid');

    http.httpReq({
      url: config.userinfo,
      data: formData,
      method: 'POST',
      token: cache.get('token')
    }).then(ret => {
      this.setData({
        userinfo: ret.data.data,
        upfile:ret.data.data.card_img
      });
      wx.showToast({
        title: '提交身份验证信息成功！',
        icon:'none',
        duration: 1500,
        mask: true
      });
    })
  }


})