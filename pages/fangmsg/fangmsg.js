import config from '../../utils/url.js';
import cache from '../../utils/Cache.js';
import Http from '../../utils/Http.js';
const http = new Http;

Page({

  data: {
    // 数据列表
    datalist: []
  },

  onLoad(options) {
    this.getList();
  },
  // 获取数据
  getList() {

    http.httpReq({
      url: config.fangmsg,
      data: { openid: cache.get('openid') },
      token: cache.get('token')
    }).then(ret => {
      this.setData({
        datalist: ret.data
      })
    })

  },
  // 拨打电话
  callphone(evt) {
    // 获取电话号码
    let phoneNumber = evt.target.dataset.phone;
    wx.makePhoneCall({ phoneNumber })
  }



})