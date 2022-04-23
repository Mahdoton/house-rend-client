import config from '../../utils/url.js';
import cache from '../../utils/Cache.js';
import Http from '../../utils/Http.js';
const http = new Http;
Page({

  data: {
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
      // 修改头像
      this.setData({
        userinfo: ret.data
      })
    })
  },
  // 表单提交
  dopost(evt) {
    // 表单数据
    let formData = evt.detail.value;
    // openid
    formData.openid = cache.get('openid');
    // 发送消息给服务器
    http.httpReq({
      url: config.userinfo,
      method: 'POST',
      data: formData,
      token: cache.get('token')
    }).then(ret => {
      this.setData({
        userinfo: ret.data.data
      })
    });
  }

})