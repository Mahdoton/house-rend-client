import config from '../../utils/url.js';
import cache from '../../utils/Cache.js';
import Http from '../../utils/Http.js';
const http = new Http;
Page({
  data: {
    // 地图显示
    markers: [],
    // 房源ID
    id: 0,
    info: {},
    favBtn: 0
  },

  onLoad(options) {
    // 显示取消息还是添加收藏按钮的判断
    // 得到房源信息id
    let id = options.id;
    // 得到是否存在收藏此房源
    let openid = cache.get('openid');
    http.httpReq({
      url: config.addFavs + '/show',
      token: cache.get('token'),
      data: {
        fang_id: id,
        openid
      }
    }).then(({ data }) => {
      this.setData({
        favBtn: data.status
      })
    })
    this.getData(id);
  },
  
  // 取消收藏
  delFavFun() {
    // 得到房源信息id
    let id = this.data.id;
    // 得到是否存在收藏此房源
    let openid = cache.get('openid');
    console.log(id, openid);

    this.setData({
      favBtn: 0
    })
  },

  // 添加收藏
  addFavFun(evt) {
    // 短语运算
    let id = evt.detail.id || this.data.id;
    // 发送请求收藏
    http.httpReq({
      url: config.addFavs,
      token: cache.get('token'),
      method: 'POST',
      data: {
        fang_id: id,
        openid: cache.get('openid')
      }
    }).then(ret => {
      this.setData({
        favBtn: 1
      })
      wx.showToast({
        title: '收藏此房源成功',
        icon: 'success',
        duration: 1500,
        mask: true
      });
    });
  },

  // 请求数据
  getData(id) {
    http.httpReq({
      url: config.fangs + '/' + id,
      token: cache.get('token')
    }).then(({ data }) => {
      this.setData({
        id,
        info: data,
        // 地图显示的中的标识位
        markers: [{
          title: '位置所在',
          iconPath: "https://fang.1314000.cn/zfw/location.png",
          id,
          latitude: data.latitude,
          longitude: data.longitude,
          width: 30,
          height: 30
        }]
      });
    })
  },

  // 自定义分享设置
  onShareAppMessage() {
    return {
      title: this.data.info.fang_name,
      path: '/pages/fang/fang?id=' + this.data.info.id + '&openid=' + cache.get('openid'),
      imageUrl: this.data.info.pic
    };
  }

})