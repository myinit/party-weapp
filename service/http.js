// 请求

var app = getApp();
import Constants from '../utils/constants.js'

//本地测试域名
var root = 'http://localhost:7001/';

function buildParams(data = {}) {
  var app = getApp();
  var userInfo = app.globalData.userInfo;

  return Object.assign(data, {
    platform: Constants.PLATFORM,
    userIdentity: Constants.USER_IDENTITY,
    merchantUuid: Constants.MERCHANT_UUID,
    nickName: userInfo ? userInfo.nickName : '',
  }) ;
}

function request(config, noLogin) {
  var logintoken = wx.getStorageSync('peyton_logintoken');
  var header = logintoken ? { 'content-type': 'application/json', 'logintoken': logintoken } : { 'content-type': 'application/json' };

  if (!config.notLoading) wx.showLoading({ title: '加载中...' })

  wx.request({
    method: config.type || 'POST',
    url: root + config.url,
    data: config.data || {},
    header: header,
    success: (res) => {
      var info = res.data || {}
      if (info.errorCode === 0) {
        var success = config.success
        return typeof success === "function" && success(info.data || null, info.extendInfo);
      } else if (info.errorCode === 100) {
        //未登录或过期
        if (!noLogin) {
          login(() => {
            request(config, true)
          })
        }
      } else {
        var fail = config.fail

        if (typeof fail === "function") {
          fail(info);
        } else {
          console.log(info);
          console.log(Constants);
          wx.showModal({
            title: '提示',
            content: info || Constants.serviceErrorTip,
            showCancel: false
          })
        }
      }
    },
    fail: () => {
      wx.showModal({
        title: '提示',
        content: '网络异常',
        showCancel: false
      })
    },
    complete: () => {
      var complete = config.complete
      if (!config.notLoading) wx.hideLoading()
      return typeof complete === "function" && complete()
    }
  })
}

function login(cb) {
  var params = buildParams();

  wx.setStorageSync('peyton_logintoken', '');
  wx.login({
    success: (res) => {
      var code = res.code;
      if (code) {
        params.code = code;

        request({
          type: 'POST',
          url: 'user-login',
          data: params,
          success: (res1) => {
            console.log(res1)
            wx.setStorageSync('peyton_logintoken', res1);
            return typeof cb === "function" && cb();
          }
        })
      } else {
        wx.showModal({
          title: '获取用户登录态失败',
          content: 'res.errMsg',
          showCancel: false
        })
      }
    }
  });
}

module.exports = {
  buildParams: buildParams,
  request: request,
  login: login
}