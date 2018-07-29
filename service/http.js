// 请求

var app = getApp();
import Constants from '../utils/constants.js'

//本地测试域名
var root = 'https://party.aitboy.cn/';

function buildParams(data = {}) {
  var app = getApp();
  var userInfo = app.globalData.userInfo;

  return Object.assign(data, {
    platform: Constants.PLATFORM,
    userIdentity: Constants.USER_IDENTITY,
    merchantUuid: Constants.MERCHANT_UUID,
    nickName: userInfo ? userInfo.nickName : '',
  });
}
function userLogin(cb) {
  wx.setStorageSync('peyton_logintoken', '');
  wx.login({
    success: (res) => {
      request({
        type: 'POST',
        url: 'user-login',
        data: { code: res.code },
        success: (requestSuccessRes) => {
          wx.setStorageSync('peyton_logintoken', requestSuccessRes.login_token);
          return typeof cb === "function" && cb();
        },
        fail: (requestFailRes) => {
          wx.showModal({
            title: '重新登录失败',
            content: requestFailRes.info,
            showCancel: false
          })
        }
      })
    }
  })
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
      if (info.code === 0) {
        var success = config.success
        return typeof success === "function" && success(info.data || null, info.extendInfo);
      } else if (info.code === 3004) {
        //未登录或过期
        if (!noLogin) {
          userLogin(() => {
            request(config, true)
          })
        }
      } else {
        var fail = config.fail

        if (typeof fail === "function") {
          fail(info);
        } else {
          wx.showModal({
            title: '提示',
            content: info.info,
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

function login(data, cb) {
  let params = {}
  params.wxuser_info = data || ''
  wx.setStorageSync('peyton_logintoken', '');
  wx.login({
    success: (res) => {
      console.log(res);
      var code = res.code;
      if (code) {
        params.code = code;
        params.need_login = 'y';
        request({
          type: 'POST',
          url: 'user',
          data: params,
          success: (res1) => {
            wx.setStorageSync('peyton_logintoken', res1.login_token);
            return typeof cb === "function" && cb();
          }
        })
      } else {
        wx.showModal({
          title: '获取用户登录态失败',
          content: res.errMsg,
          showCancel: false
        })
      }
    },
    fail: (res) => {
      wx.showModal({
        title: '获取用户微信登录态失败',
        content: res,
        showCancel: false
      })
    }
  });
}

module.exports = {
  buildParams: buildParams,
  request: request,
  login: login
}