import {
  isUrl,
  ellipsisString
} from '/util.js'
const saveUrlToClip = url => {
  wx.setClipboardData({
    data: url,
    success: function(res) {
      wx.showToast({
        title: '已复制URL到剪切板，可到浏览器打开',
        icon: 'none',
        duration: 2000
      })
    }
  })
}
const haveUrlInClip = () => {
  wx.getClipboardData({
    success: function(res) {
      if (isUrl(res.data)) {
        wx.showModal({
          title: '提示',
          content: '粘贴板已有url:\n' + ellipsisString(25, res.data) + '\n' + '是否添加到收藏夹?',
          success: function (modelRes) {
            if (modelRes.confirm) {
              let party = {
                url: res.data
              }
              wx.navigateTo({
                url: '/pages/edit/index?party=' + JSON.stringify(party),
              })
            } else if (res.cancel) {
              wx.showToast({
                title: '已经取消保存',
                icon: 'none',
                duration: 1000
              })
            }
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