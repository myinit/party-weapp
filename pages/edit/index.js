//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    statusBarHeight: app.globalData.statusBarHeight,
    party: {
      name: '',
      url: '',
      mark: '',
      tag: '',
    },
    fieldList: [{
      name: '活动名称',
      type: 'name'
    },
    {
      name: '活动链接',
      type: 'url'
    },
    {
      name: '备注',
      type: 'mark'
    },
    {
      name: '标签',
      type: 'tag'
    },
    ]
  },
  saveParty: function (e) {
    let party = this.data.party
    console.log(party);
    // wx.request({
    //   url: 'party.aitboy.cn', //仅为示例，并非真实的接口地址
    //   method: 'POST',
    //   data: party,
    //   header: {
    //     'content-type': 'application/json' // 默认值
    //   },
    //   success: function (res) {
    //     console.log(res.data)
    //   }
    // })
  },
  back: function (e) {
    wx.navigateBack({

    })
  },
  fieldChange: function (e) {
    let fieldType = e.currentTarget.dataset.fieldtype
    let value = e.detail.detail.value
    this.setData({
      party: Object.assign({}, this.data.party, { [fieldType]: value })
    })
  },
  onLoad: function (params) {
    this.setData({
      party: params.party ? Object.assign({}, this.data.party, JSON.parse(params.party)) : this.data.party
    })
  }
})