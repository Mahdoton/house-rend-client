import config from '../../utils/url.js';
import cache from '../../utils/Cache.js';
import Http from '../../utils/Http.js';
const http = new Http;
Page({

  data: {
    // 数据结果
    datalist: []
  },
  onLoad(options) {

  },
  // 搜索
  dosearch(evt) {
    // 表单中的数据
    let kw = evt.detail.value.kw;
    // 发起网络请求
    http.httpReq({
      url: config.esfangs,
      token: cache.get('token'),
      data: { kw }
    }).then(({ data }) => {
      if (data.status) {
        wx.showToast({
          title: '没有查询到此关键词的房源',
          icon: 'none',
          duration: 1500,
          mask: true
        });
      } else {
        this.setData({
          datalist: data
        })
      }
    })


  }
})