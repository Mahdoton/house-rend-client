import config from '../../utils/url.js';
import cache from '../../utils/Cache.js';
import Http from '../../utils/Http.js';
const http = new Http;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: ['', '', '', ''],
    showflag: [false, false, false, false],
    arrows: ['icon-xiangxia', 'icon-xiangxia', 'icon-xiangxia', 'icon-xiangxia'],
    // 房源数据
    fangs: [],
    // 页码数
    page: 1,
    // 回到顶部
    to_show: '',
    // 滚动条默认位置
    top: 0,
    // 房源属性
    attrs: [],
  },

  onLoad(options) {
    // 房源
    this.fangs(options);
    // 房源属性
    this.attrsFun();
  },
  // 房源属性
  attrsFun() {
    // 发起网络请求
    http.httpReq({
      url: config.fangattr,
      token: cache.get('token')
    }).then(({ data }) => {
      this.setData({
        attrs: data
      })
    })
  },
  // 房源列表
  fangs(options) {
    // 加载提示显示
    wx.showLoading({
      title: '数据加载中...',
      mask: true
    });
    // 页码
    let page = this.data.page;
    // 搜索属性字段名
    let fieldname = options.attr || '';
    // 搜索属性字段值
    let fieldvalue = options.attr_id || null;
    // 网络请求
    http.httpReq({
      url: config.fangs,
      token: cache.get('token'),
      data: { page, fieldname, fieldvalue }
    }).then(({ data }) => {
      // 隐藏加载提示
      wx.hideLoading();
      // 是否有数据的判断
      if (data.data.length > 0) {
        // 页码向后添加
        page++;
        this.setData({
          // 加载更多所用，追加 数据的展开
          fangs: [...this.data.fangs, ...data.data],
          page
        })
      } else {
        // 没有数据
        wx.showToast({
          title: '已经没有更多新数据了',
          icon: 'none',
          duration: 1500,
          mask: true
        });
      }
    });
  },
  // 滚动事件
  fangscroll(evt) {
    if (evt.detail.scrollTop >= 300) {
      this.setData({
        to_show: 'go_now'
      })
    } else {
      this.setData({
        to_show: ''
      })
    }
  },
  // 回动顶部
  gototop() {
    this.setData({
      top: 0
    })
  },








  // 遮罩
  onShadeDiv(evt) {
    let index = evt.currentTarget.dataset.index;
    let show = this.data.show;
    let showflag = this.data.showflag;
    let arrows = this.data.arrows;

    if (showflag[index]) { // 已显示，再次点击隐藏起来
      show[index] = '';
      showflag[index] = false;
      arrows[index] = 'icon-xiangxia';
    } else {
      for (let key in show) {
        if (key == index) {
          show[key] = 'now';
          showflag[key] = true;
          arrows[key] = 'icon-xiangshang';
        } else {
          show[key] = '';
          showflag[key] = false;
          arrows[key] = 'icon-xiangxia';
        }
      }
    }
    this.setData({
      show,
      showflag,
      arrows
    })
  }

})