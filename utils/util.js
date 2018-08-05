const COLOR_LIST = ['#01d5c2', '#4b98e8', '#52c8ee', '#8fd849', '#fed038', '#fea023', '#c4d084', '#f8798f', '#bed44a']

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
const DateFormat = (time, fmt) => {
  let date = new Date(time)
  var o = {
    "M+": date.getMonth() + 1,                 //月份 
    "D+": date.getDate(),                    //日 
    "H+": date.getHours(),                   //小时 
    "m+": date.getMinutes(),                 //分 
    "s+": date.getSeconds(),                 //秒 
    "q+": Math.floor((date.getMonth() + 3) / 3), //季度 
    "S": date.getMilliseconds()             //毫秒 
  };
  if (/(Y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    }
  }
  return fmt;
}  
const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}


const getRondomColor = () => {
  let rondom = parseInt(Math.random() * 10) % COLOR_LIST.length
  return COLOR_LIST[rondom]
}

const isUrl = (urlString) => {
  if (urlString != "") {
    var reg = /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/;
    if (reg.test(urlString)) {
      return true;
    }else{
      return false;
    }
  }
}

const ellipsisString = (length,waitEllipsisString) => {
  return waitEllipsisString.substr(0,length) + '...'
}
//工具类方法

//format相关方法
var Format = {
  formatTime(date) {
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()

    var hour = date.getHours()
    var minute = date.getMinutes()
    var second = date.getSeconds()


    return [year, month, day].map(this.formatNumber).join('/') + ' ' + [hour, minute, second].map(this.formatNumber).join(':')
  },
  formatCountDown(interval) {
    var maxInterval = 1800000 //不超过30分钟
    var surplus = maxInterval - interval
    var minute = parseInt(surplus / 60000, 10)
    var seconds = Math.ceil((surplus % 60000) / 1000)

    return surplus >= 0 ? minute + '分' + seconds + '秒' : false
  },
  formatNumber(n) {
    n = n.toString()
    return n[1] ? n : '0' + n
  }
}

//验证相关方法
var Check = {
  isUndeFinedOrNull(obj) {
    return obj == undefined || obj == null;
  },
  isUndeFinedOrNullOrBlank(str) {
    return this.isUndeFinedOrNull(str) || (typeof str === 'string' && str.trim() == "");
  },
  isUndeFinedOrNullOrEmpty(obj) {
    return this.isUndeFinedOrNullOrBlank(obj) || JSON.stringify(obj) === '{}';
  },
}

//数字计算相关方法
var Count = {
  //四舍五入到num后面的n位
  round(num, n) {
    return Math.round(num * Math.pow(10, n)) / Math.pow(10, n);
  },
  /**
   * 带小数数字的加法运算
   * @param arg1 加数1
   * @param arg2 加数2
   * @param fractionalDigits 保留的小数位数
   */
  decimalAdd(arg1, arg2, fractionalDigits) {
    arg1 = Check.isUndeFinedOrNullOrBlank(arg1) ? 0.0 : arg1;
    arg2 = Check.isUndeFinedOrNullOrBlank(arg2) ? 0.0 : arg2;
    fractionalDigits = Check.isUndeFinedOrNullOrBlank(fractionalDigits) ? 0 : fractionalDigits;

    return this.round(Number(arg1) + Number(arg2), fractionalDigits);
  },
  /**
   * 带小数数字的减法运算
   * @param arg1 减数1
   * @param arg2 减数2
   * @param fractionalDigits 保留的小数位数
   */
  decimalSubtract(arg1, arg2, fractionalDigits) {
    arg1 = Check.isUndeFinedOrNullOrBlank(arg1) ? 0.0 : arg1;
    arg2 = Check.isUndeFinedOrNullOrBlank(arg2) ? 0.0 : arg2;
    fractionalDigits = Check.isUndeFinedOrNullOrBlank(fractionalDigits) ? 0 : fractionalDigits;

    return this.round(Number(arg1) - Number(arg2), fractionalDigits);
  },
  /**
   * 带小数数字的乘法运算
   * @param arg1 乘数1
   * @param arg2 乘数2
   * @param fractionalDigits 保留的小数位数
   */
  decimalMultiply(arg1, arg2, fractionalDigits) {
    arg1 = Check.isUndeFinedOrNullOrBlank(arg1) ? 0.0 : arg1;
    arg2 = Check.isUndeFinedOrNullOrBlank(arg2) ? 0.0 : arg2;
    fractionalDigits = Check.isUndeFinedOrNullOrBlank(fractionalDigits) ? 0 : fractionalDigits;

    return this.round(Number(arg1) * Number(arg2), fractionalDigits);
  },
  /**
   * @param arg1 被除数
   * @param arg2 除数
   * @param fractionalDigits 保留小数位数
   */
  decimalDivide(arg1, arg2, fractionalDigits) {
    arg1 = Check.isUndeFinedOrNullOrBlank(arg1) ? 0.0 : arg1;
    arg2 = Check.isUndeFinedOrNullOrBlank(arg2) ? 1.0 : arg2;
    fractionalDigits = Check.isUndeFinedOrNullOrBlank(fractionalDigits) ? 0 : fractionalDigits;

    return this.round(arg1 / arg2, fractionalDigits);
  },
}

//数据缓存相关方法
var Storage = {
  setStorageSync(key, value, msg) {
    msg = msg || '无法缓存数据'
    try {
      wx.setStorageSync(key, value)
    } catch (e) {
      wx.showModal({ title: '提示', confirmColor: '#ea4242', content: msg, showCancel: false })
    }
  },
  getStorageSync(key, msg) {
    msg = msg || '无法获取缓存数据'
    try {
      var value = wx.getStorageSync(key)
      if (value) {
        return value
      }
    } catch (e) {
      wx.showModal({ title: '提示', confirmColor: '#ea4242', content: msg, showCancel: false })
    }
  },
  removeStorageSync(key, msg) {
    msg = msg || '无法移除缓存数据'
    try {
      wx.removeStorageSync(key)
    } catch (e) {
      wx.showModal({ title: '提示', confirmColor: '#ea4242', content: msg, showCancel: false })
    }
  },
  clearStorageSync(key, msg) {
    msg = msg || '无法清除缓存数据'
    try {
      wx.clearStorageSync(key)
    } catch (e) {
      wx.showModal({ title: '提示', confirmColor: '#ea4242', content: msg, showCancel: false })
    }
  },
}
module.exports = {
  DateFormat: DateFormat,
  Format: Format,
  Check: Check,
  Count: Count,
  Storage: Storage,
  getRondomColor: getRondomColor,
  ellipsisString: ellipsisString,
  isUrl: isUrl,
  formatTime: formatTime
}