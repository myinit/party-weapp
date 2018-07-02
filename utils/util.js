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

module.exports = {
  getRondomColor: getRondomColor,
  ellipsisString: ellipsisString,
  isUrl: isUrl,
  formatTime: formatTime
}