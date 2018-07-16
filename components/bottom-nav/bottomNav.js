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
   * 组件的初始数据
   */
  data: {
    showNavMenu: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleRouterSwitch(event) {
      console.log(1111221);
      let path = event.currentTarget.dataset.path
      wx.navigateTo({
        url: `/${path}`,
        success: function () {
          // 修改全局变量的状态
          // app.setRouterStatus(path)
        }
      })
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
