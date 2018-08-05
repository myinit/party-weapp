//index.js
//获取应用实例
const app = getApp()
import Util from '../../utils/util.js'
Page({
  data: {
    nowDate: Util.DateFormat(new Date().getTime(), 'YYYY-MM-DD HH:mm:ss'),
    party: {
      name: '',
      url: '',
      mark: '',
      tag: '',
    },
    fieldList: [{
        name: '地址',
        field: 'url',
        placeholder: '保存的地址信息'
      },
      {
        name: '标题',
        field: 'name',
        placeholder: '标题'
      },
      {
        name: '备注',
        field: 'mark'
      },
      {
        name: '开始',
        field: 'start',
        type: 'date'
      },
      {
        name: '结束',
        field: 'end',
        type: 'date'
      },
      {
        name: '标签',
        field: 'tag'
      },
    ]
  },
  fieldChange: function (e) {
    let field = e.currentTarget.dataset.field
    let fieldType = e.currentTarget.dataset.type
    let value = fieldType === 'date' ? this.formatArrToTime(e.detail.value) : e.detail.detail.value
    this.setData({
      party: Object.assign({}, this.data.party, {
        [field]: value
      })
    })
  },
  saveParty: function(party) {
    app.Http.request({
      url: 'party',
      data: this.data.party,
      type: 'POST',
      success: res => {
        let routerBackType = res.list_type
        if (routerBackType === -1) {
          app.redirectTo('shopParty')
        } else {
          app.redirectTo('userParty')
        }
      },
      fail: res => {}
    })
  },
  formatArrToTime: function (arr) {
    let arrTime = arr.splice(3,3)
    return new Date(arr.join('-') + ' ' + arrTime.join(':')).getTime()
  },
  onLoad: function(params) {
    this.setData({
      party: params.party ? Object.assign({}, this.data.party, JSON.parse(params.party)) : this.data.party
    })
  }
})