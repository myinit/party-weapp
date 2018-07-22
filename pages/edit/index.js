//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
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
  fieldChange: function (e) {
    let fieldType = e.currentTarget.dataset.fieldtype
    let value = e.detail.detail.value
    this.setData({
      party: Object.assign({}, this.data.party, { [fieldType]: value })
    })
  },
  saveParty: function(party){
    app.Http.request({
      url: '/party',
      data: this.data.party,
      type: 'POST',
      success: res => {
        console.log('sucess')
        console.log(res)
        console.log('sucess')
      },
      fail: res => {
        console.log('error')
        console.log(res)
        console.log('error')
      }
    })
  },
  onLoad: function (params) {
    this.setData({
      party: params.party ? Object.assign({}, this.data.party, JSON.parse(params.party)) : this.data.party
    })
  }
})