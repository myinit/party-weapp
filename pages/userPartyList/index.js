// pages/list/list.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [{
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
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.updateBottomNavRouter({
      name: 'shopParty'
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  scanCode: function () {
    wx.scanCode({
      success: (res) => {
        wx.showToast({
          title: res.result,
        })
      }
    })
  },

  previewImage: function (e) {
    wx.previewImage({
      urls: ['http://simg01.gaodunwangxiao.com/uploadimgs/tmp/upload/201806/10/be944_20180610110616.png']
      // 需要预览的图片http链接  使用split把字符串转数组。不然会报错  
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})