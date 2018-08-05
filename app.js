//app.js

const Http = require('service/http.js');
const Util = require('utils/util.js');//引入util.js
const Constants = require('utils/constants.js')//引入constants.js
const Check = Util.Check;//验证相关方法
const Count = Util.Count;//计算相关方法
const Format = Util.Format;//format相关方法
const Storage = Util.Storage;//数据缓存
import regeneratorRuntime from 'utils/regeneratorRuntime.js'
import { saveUrlToClip, haveUrlInClip } from '/utils/urlHandle.js'
App({
  onLaunch: function () {
    this.getSystemInfo();
    haveUrlInClip();
  },
  //引入
  Constants: Constants,
  Http: Http,
  Check: Check,
  Count: Count,
  Format: Format,
  Storage: Storage,
  //公用方法
  getSystemInfo: function () {
    //获取系统信息
    try {
      var res = wx.getSystemInfoSync()
      this.globalData.statusBarHeight = res.statusBarHeight
    } catch (e) {
      // Do something when catch error
    }
  },
  //公用方法
  async getUserInfo() {
    return new Promise((resolve, reject) => {
      var that = this;
      if (!Check.isUndeFinedOrNullOrEmpty(this.globalData.userInfo)) {
        resolve(this.globalData.userInfo);
      } else {
        wx.getUserInfo({
          withCredentials: false,
          success: function (res) {
            that.globalData.userInfo = res.userInfo;
            resolve(that.globalData.userInfo);
          },
          fail: function (res) {
            console.log(res)
            reject(res);
            wx.showToast({
              title: '请重新授权！',
              icon: 'none'
            })
          }
        })
      }
    })
  },
  updateBottomNavRouter: function (router) {
    this.globalData.currBottomNavPage = router;
  },
  redirectTo: function(routerName) {
    let redirectToRouter = '' 
    this.globalData.bottomNavConfig.list.map(item => {
      if(item.name === routerName){
        redirectToRouter = item
      }
    })
    this.updateBottomNavRouter(redirectToRouter)

    wx.redirectTo({
      url: `/${redirectToRouter.pagePath}`,
      fail: res => {
        wx.showModal({
          content: res,
        })
      }
    })
  },
  globalData: {
    userInfo: null,
    statusBarHeight: 0,
    currBottomNavPage:"",
    bottomNavConfig: {
      color: "#333",
      selectedColor: "#fdb975",
      backgroundColor: "#fff",
      list: [
        {
          "pagePath": "pages/shopPartyList/index",
          "text": "商户",
          "icon": "dianpu",
          "name": "shopParty"
        },
        {
          "pagePath": "",
          "text": "",
          "special": true
        },
        {
          "pagePath": "pages/userPartyList/index",
          "text": "我的",
          "name": "userParty",
          "icon": "yonghu"
        }
      ]
    }
  }
})