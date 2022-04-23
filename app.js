import cache from './utils/Cache.js';
import Http from './utils/Http.js';
const http = new Http;

App({
  // 生命周期 它是小程序中第1个执行方法
  onLaunch() {

    // api登录
    this.apilogin();

    // 登录
    if (!cache.has('openid')) {
      if (!cache.get('token')) {
        this.apilogin();
      }else{
        this.wxlogin(cache.get('token'));
      }
    }


    //if (!cache.has('openid')) {
    /*  wx.login({
       timeout: 2000,
       success: ({ code }) => {
         // 发起网络请求
         http.httpReq({
           url: 'http://www.zfw.com/api/v1/wxlogin',
           method:'POST',
           data: { code },
           token: token
         }).then(ret => {
           console.log(ret);
         })
       }
     });
  */
    //}

    /* if (!cache.has('openid')) { // 判断缓存中是否存在,不存在才请求
      // 登录请求
      wx.login({
        timeout: 2000,
        success: ({ code }) => {
          // code有效期是5分钟
          console.log(code);
          // 发起request请求到自己的服务器
          wx.request({
            url: 'http://www.zfw.com/api/v1/wxlogin',
            data: { code },
            header: {
              'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImM0MjY2NDBmNWRlNjdkNWJkZjY5Yzc3ZjAxNzM0Y2YyYTEzNWE2NWNmNjc3NDFjOTMyY2JkOTAwZmUzZWQ2MWE4OTNlYWNkNzhmMDY0ZTAwIn0.eyJhdWQiOiIxIiwianRpIjoiYzQyNjY0MGY1ZGU2N2Q1YmRmNjljNzdmMDE3MzRjZjJhMTM1YTY1Y2Y2Nzc0MWM5MzJjYmQ5MDBmZTNlZDYxYTg5M2VhY2Q3OGYwNjRlMDAiLCJpYXQiOjE1Njc0OTI0NzIsIm5iZiI6MTU2NzQ5MjQ3MiwiZXhwIjoxNTk5MTE0ODcyLCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.sHMe7GH7922Q-wyyoCcgl3o7bW3lbIj85x4y0Q-5CwkpOcxt8QXubM7oCBPytvAEpr6Ua_AYFyRRz3z4OYl3j4n0LoR1AcBY6nJy2H59U68lbkqM3WiiPx7U2X5y9XPZx1igKLmqE4xyTr_IrXtXieDAM84-5m7Ja5PIf1KWw37833t7G4p_ke_lORCPiKMzLCjRHXJ9OjnTkqujq7ngJQgToFGEIQH59zk-CPhZbf2Xuhvghtbk4FmHO5hq_EENNzAPE16qVYNXPWIrih56M46JRmWTL6nPCBGCSfcA0uFVBnWQBsmmr6oxgmKmYGBcR_tIlSTLhAUFqIsGjXK9V78Vq8gOl5ZYH3pv42q2-Z1gl2WfvG_1n36mAvp2ZJcf3wU-jWb136OiPdm_nmOKt1CSxVRXBjJe1UOfPpYwtMzPoV6tqZEQkZHuMZ3tg4mJU0D1Yqw6a82v1KLl3oDw5OihtVAMXgycpGSbzIvexBbX7K-3G-ax0w66XG4DIP0xUpP83sLRHNP4UxyEL32n7x1DJH_kEU0gB6uh86dfrpG4HMjyQFeJdforHaNvi99jXkjFVpAY8yaNFXIvfDZhJgjDEXDKfjuqvOeS3Xs2102hbm6H_SXub6Bl4WAdkOVJrj5_RyUqFOCXdjdmn2Vzr-tF_HtoOa5fqE38BEZc1Eg'
            },
            method: 'POST',
            success: ret => {
              // 写入到缓存中
              cache.forever('openid', ret.data.openid);
            }
          })
        }
      })
    } */
  },
  // 接口登录
  apilogin() {
    // api接口登录
    if (!cache.has('token')) {
      http.httpReq({
        url: 'http://www.zfw.com/api/login',
        method: 'POST',
        data: { 'username': 'admin', 'password': 'admin888' }
      }).then(ret => {
        // 把token写入到缓存中
        cache.set('token', ret.data.token);
        if (!cache.has('openid')) {
          // 登录
          this.wxlogin(ret.data.token)
        }
      })
    }
  },
  // 小程序登录
  wxlogin(token) {
    wx.login({
      timeout: 2000,
      success: ({ code }) => {
        // 发起网络请求
        http.httpReq({
          url: 'http://www.zfw.com/api/v1/wxlogin',
          method: 'POST',
          data: { code },
          token
        }).then(ret => {
          cache.forever('openid', ret.data.openid);
        })
      }
    });
  }
})