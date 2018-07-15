const app = getApp();
module.exports = Behavior({
  data: {
    isShow: true,
    routers: []
  },
  ready() {
    console.log(app.globalData.bottomNavConfig)
    this.setData({
      routers: app.globalData.bottomNavConfig.list
    })
  }
})