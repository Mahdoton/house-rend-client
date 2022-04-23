import config from '../../utils/url.js';
import cache from '../../utils/Cache.js';
import Http from '../../utils/Http.js';
const http = new Http;

Page({

  data: {
    // 头像
    home_icon: 'https://fang.1314000.cn/zfw/page-myIcon.png'
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
        home_icon: ret.data.avatar
      })
    })

  },
  // 获取用户信息
  userinfoFun(evt) {
    // 得到用户基本信息
    let userinfo = evt.detail.userInfo;

    // 更新个人中心的昵称、头像
    this.setData({
      home_icon: userinfo.avatarUrl
    });

    // 发送消息给服务器
    http.httpReq({
      url: config.userinfo,
      method: 'POST',
      data: {
        openid: cache.get('openid'),
        avatar: userinfo.avatarUrl,
        nickname: userinfo.nickName,
        sex: userinfo.gender == 1 ? '男' : '女'
      },
      token: cache.get('token')
    });
  }

})