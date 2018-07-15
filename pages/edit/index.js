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
    fieldList: [
      {
        name: '地址',
        type: 'url',
        placeholder:'保存的地址信息'
      },
      {
        name: '标题',
        type: 'name',
        placeholder: '标题'
      },
      {
        name: '备注',
        type: 'mark'
      },
      {
        name: '开始',
        type: 'start'
      },
      {
        name: '结束',
        type: 'end'
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