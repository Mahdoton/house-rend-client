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
  }
})