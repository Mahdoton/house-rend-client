// 接口请求域名
const domain = 'http://www.zfw.com/api/v1';

export default {
  // 用户授权地址
  userinfo: `${domain}/user/userinfo`,
  // 上传图片
  upfile: `${domain}/user/upfile`,
  // 看房通知
  fangmsg: `${domain}/notices`,
  // 资讯列表
  news: `${domain}/news`,
  // 房源推荐
  recommend: `${domain}/fangs/recommend`,
  // 租房小组
  attr: `${domain}/fangs/attr`,
  // 房源列表
  fangs: `${domain}/fangs`,
  // 房源属性快搜
  fangattr: `${domain}/fangattrs`,
  // es的搜索
  esfangs: `${domain}/esfangs`,
  // 添加收藏
  addFavs: `${domain}/favs`,
}



