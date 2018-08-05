// pages/list/list.js
import Util from '../../utils/util.js'
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    lastParty:'',
    pageSize: 6,
    list: '',
    total:0,
    scrollY: false,
    isScrollViewTap: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.updateBottomNavRouter({
      name: 'userParty'
    })
    this.refresh()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  refresh: function () {
    this.getPartyList(this.data.pageSize,'', result => {
      let list = result.res
      if (list && list.length > 0) {
        this.setData({
          list: list,
          lastParty: list[list.length - 1]
        })
        wx.stopPullDownRefresh()
      }
    })
   },
  loadMore:function(){
    let { list, total, pageSize, lastParty} = this.data
    if (list.length >= total){
      return false
    }
    this.getPartyList(pageSize, lastParty._id, result => {
      let resultList = result.res
      if (resultList && resultList.length>0) {
        this.setData({
          list: list.concat(resultList),
          lastParty: resultList[resultList.length - 1]
        })
      }
    })
  },
  getPartyList:function(pageSize, lastId, cb){
    app.Http.request({
      url: 'party',
      type: 'GET',
      data: {
        list_type: 0,
        page_size: pageSize || 1,
        last_party_id: lastId || '',
      },
      success: res => {
        this.setData({
          total: res.count
        })
        res.res.map(item => {
          item.regdate = Util.DateFormat(item.regdate, 'YYYY-MM-DD HH:mm')
          return item
        })
        cb && cb(res)
      }
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
    this.refresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.loadMore()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  onScrollEvent: function (e) {
    // this.setData({
    //   scrollY: e.detail.scrollY
    // })
  },
  onViewtTouchStart: function (e) {
    this.setData({
      isScrollViewTap: true
    })
  },
  onViewtTouchEnd: function () {
    this.setData({
      isScrollViewTap: false
    })
  }
  /**
   * 列表元素滑动相关
   */
})