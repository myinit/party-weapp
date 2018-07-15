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

  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleRouterSwitch(event) {
      let path = event.currentTarget.dataset.path
      wx.switchTab({
        url: `/${path}`,
        success: function () {
          // 修改全局变量的状态
          app.setRouterStatus(path)
        }
      })
    }
  }
})
