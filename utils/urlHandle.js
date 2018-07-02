import Dialog from '../modules/zanui/dialog/dialog.js'
import { isUrl, ellipsisString } from '/util.js'
const saveUrlToClip = url => {
  wx.setClipboardData({
    data: url,
    success: function (res) {
      wx.showToast({
        title: '已复制URL到剪切板，可到浏览器打开',
        icon: 'none',
        duration: 2000
      })
    }
  })
}
//需要在页面配置id  为have-url-dialog
const haveUrlInClip = () => {
  wx.getClipboardData({
    success: function (res) {
      if (isUrl(res.data)) {
        Dialog({
          title: '',
          message: '粘贴板已有url:\n' + ellipsisString(25, res.data) + '\n' + '是否添加到收藏夹?',
          selector: '#have-url-dialog',
          buttons: [{
            // 按钮文案
            text: '确定',
            // 按钮文字颜色
            color: '#1AAD16',
            // 按钮类型，用于在 then 中接受点击事件时，判断是哪一个按钮被点击
            type: 'confirm'
          }, {
            text: '取消',
            type: 'cancel'
          }]
        }).then((res) => {
          let handleButtonType = res.type
          if (handleButtonType === 'confirm') {
            wx.showToast({
              title: '保存成功',
              icon: 'success',
              duration: 2000
            })
          }
          if (handleButtonType === 'cancel') {
            wx.showToast({
              title: '已经取消保存',
              icon: 'none',
              duration: 1000
            })
          }
        })
      }
    }
  })
}

module.exports = {
  saveUrlToClip: saveUrlToClip,
  haveUrlInClip: haveUrlInClip
}