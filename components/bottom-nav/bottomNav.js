// component/bottom-nav/bottomNav.js
const app = getApp();
const bottomNavBehavior = require('../bottom-nav/behaviors.js')
Component({
  behaviors: [bottomNavBehavior],
  
  /**
   * 组件的属性列表
   */
  properties: {
    auth: {
      type: Number,
      value: 1
    }
  },


  /**
   * 组件的方法列表
   */
  methods: {
    handleRouterSwitch(event) {
      let router = event.currentTarget.dataset.router
      app.redirectTo(router)
    },
    targgleNavMenu: function() {
      this.setData({
        showNavMenu: !this.data.showNavMenu
      })
    },
    navigateToEdit: function() {
      wx.navigateTo({
        url: '/pages/edit/index',
      })
    },
    navigateToCopy: function () {
      wx.navigateTo({
        url: '/pages/edit/index',
      })
    },
    scanHandle: function () {
      wx.scanCode({
        success: res => {
          let party = {
            url: res.result
          }
          wx.navigateTo({
            url: '/pages/edit/index?party=' + JSON.stringify(party),
          })
        },
        fail: res => {
          wx.showToast({
            title: '芽儿哟，没扫描出来！',
          })
        }
      })
    },
  }
})
