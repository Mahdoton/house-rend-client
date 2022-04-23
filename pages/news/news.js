import config from '../../utils/url.js';
import cache from '../../utils/Cache.js';
import Http from '../../utils/Http.js';
const http = new Http;

Page({
  data: {
    // 资讯源数据
    news: [],
    // 页码
    page: 1
  },
  onLoad(options) {
    this.getList();
  },
  // 获取数据
  getList() {
    // 页码
    let page = this.data.page;
    http.httpReq({
      url: config.news,
      data: { page },
      token: cache.get('token')
    }).then(ret => {
      // 判断是否有数据返回
      if (ret.data.data.length > 0) {
        page++;
        this.setData({
          news: ret.data.data,
          page
        });
      }
    });
  }

})