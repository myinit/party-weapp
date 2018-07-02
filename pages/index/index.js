import { saveUrlToClip, haveUrlInClip } from '../../utils/urlHandle.js'
//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    hotPartyList: [{
      shopName: '海底捞',
      partyName: '周末半价抢鲜购',
      saveTime: '2018-06-07',
      endTime: '2018-08-31',
      remainTime: '3天12小时',
      addr: '中潭路地铁站',
      background: 'http://img.zcool.cn/community/01989f58ad6b9ba801219c779368cd.jpg'
    }, {
      shopName: '海底捞',
      partyName: '周末半价抢鲜购',
      saveTime: '2018-06-07',
      endTime: '2018-08-31',
      addr: '中潭路地铁站',
      remainTime: '3天12小时',
      background: 'http://img.zcool.cn/community/01989f58ad6b9ba801219c779368cd.jpg'
    }],
    partyBannerList: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    indicatorDots: false,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    themeList: [{
      name: '主题家电',
      img: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg',
    }, {
      name: '主题家电',
      img: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
    }, {
      name: '主题家电',
      img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
    }, {
      name: '主题家电',
      img: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
    }, {
      name: '主题家电',
      img: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg',
    }],
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  touchstart: function (e) {
    this.setData({
      touchstartY: e.touches[0].pageY
    })
    console.log(e.touches[0].pageY)
  },
  touchmove: function (e) {
    let satrtY = this.data.touchstartY
    let endY = e.touches[0].pageY
    if (endY > satrtY) {
      this.setData({
        touchmoveY: endY - satrtY
      })
    }
  },
  touchend: function (e) {
    console.log(e)
  },
  onLoad: function () {
    haveUrlInClip()
  }
})