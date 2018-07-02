// pages/scan/findurl.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  canSee : true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.scanCode({
      success: (res) => {
        setTimeout(() => {
          this.setData({
            canSee: true
          })
        }, 500); 
        wx.showToast({
          title: res.result,
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // if (this.data.canSee){
      // wx.showToast({
      //   title: '1213',
      // })
      if (this.data.canSee) {
        
        wx.scanCode({
          success: (res) => {
            setTimeout(() => {
          this.setData({
            canSee: true
          })
        }, 500); 
            // wx.navigateTo({
            //   url: 'pages/scan/scanres',
            // })
            wx.showToast({
              title: res.result,
            })
          }
        })
        this.setData({
          canSee: false
        })
      }
      
    // }
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

    wx.switchTab({
      url: './scanres'
    })
    // this.data.canSee = false
    // wx.navigateTo({
    //   url: 'pages/scan/scanres',
    // })
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