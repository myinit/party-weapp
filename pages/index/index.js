import { saveUrlToClip, haveUrlInClip } from '../../utils/urlHandle.js'
import {
  isUrl
} from '../../utils/util.js'
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
    navList: [
      { name: '开始', iconName: 'scan', to: '/pages/edit/index', handleClick:'scan' },
      { name: '活动', iconName: 'party', to: '/pages/list/list', handleClick: 'navigateTo' },
      { name: '历史', iconName: 'history', to: '/pages/list/list', handleClick: 'navigateTo' },
      { name: '我的', iconName: 'people', to: '/pages/mine/mine', handleClick: 'navigateTo' },
      { name: '反馈', iconName: 'contact', to: '/pages/edit/index', handleClick: 'navigateTo' },
      { name: '帮助', iconName: 'help', to: '/pages/edit/index', handleClick: 'navigateTo' }
    ]
  },
  onLoad: function () {
    // haveUrlInClip()
  },
  // todo 入参序列化
  navigateTo: function (e){
    let data = e.currentTarget.dataset
    wx.navigateTo({
      url: data.tourl
    })
  },
  scan: function (){
    wx.scanCode({
      success: (res) => {
        console.log(res)
        if (isUrl(res.result)) {
          let party = {
            url: res.result
          }
          wx.navigateTo({
            url: '/pages/edit/index?party=' + JSON.stringify(party),
          })
        }else{
          wx.showToast({
            title: '扫描结果不是URL请重新扫描',
          })
        }
      },
      fail: (res) => {
        wx.showToast({
          title: '扫描图片不是二维码图片！',
        })
      }
    })
  }
})