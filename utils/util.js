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

const formatMonth = date => {
  return date.getMonth()
}

const formatYear = date => {
  return date.getFullYear()
}

const formatYearMonth = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  return year + "年" + month + "月"
}

const formatDay = date => {
  return date.getDate()
}

module.exports = {
  formatTime: formatTime,
  formatDay: formatDay
}
