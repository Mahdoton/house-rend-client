const WxParse = require('../../wxParse/wxParse.js');
import config from '../../utils/url.js';
import cache from '../../utils/Cache.js';
import Http from '../../utils/Http.js';
const http = new Http;

Page({
  data: {
    // 显示数据
    info: {},
  },

  onLoad(options) {
    // 资讯ID
    let id = options.id;
    // 发起网络请求
    http.httpReq({
      url: config.news + '/' + id,
      token: cache.get('token')
    }).then(ret => {
      // 富文本的显示
      WxParse.wxParse('body', 'html', ret.data.body, this, 5);
      // 更新数据
      this.setData({
        info: ret.data
      })
    });

    // 统计用户访问
    this.newscount(id);
  },
  // 统计用户访问资讯信息
  newscount(art_id) {
    http.httpReq({
      url: config.news + '/' + art_id,
      data: { openid: cache.get('openid') },
      token: cache.get('token'),
      method: 'POST'
    });
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {
    return {
      title: this.data.info.title,
      path: '/pages/newsdetail/newsdetail?id=' + this.data.info.id,
      imageUrl: this.data.info.pic
    };
  }

})