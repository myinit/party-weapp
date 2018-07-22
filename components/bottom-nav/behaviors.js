const app = getApp();
module.exports = Behavior({
  data: {
    isShow: true,
    routers: [],
    showNavMenu: false,
    currBottomNavRouter: {}
  },
  ready() {
    this.setData({
      routers: app.globalData.bottomNavConfig.list,
      currBottomNavRouter: app.globalData.currBottomNavPage
    })
  }
})