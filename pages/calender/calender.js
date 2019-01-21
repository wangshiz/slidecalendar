// pages/calender/calender.js
const GetPeriod = require("../../utils/getperiod.js");
const oneDayMillisecond = 86400000  //一天毫秒数  24 * 60 * 60 * 1000
Page({
  /**
   * 页面的初始数据
   */
  data: {
    week:[1, 2, 3, 4, 5, 6, 7],
    year: null,   //年
    month: null,  //月
    day: null,    //日
    checkdate: null,  //当前时间
    year_month: null,
    daysArr: {
      first: [],
      second: [],
      third: [],
      fourth: []
    },       //天数数组，固定21个
    daysArrLength: 4,
    daycount: null,  //当前月份
    indicatordots: true,
    autoplay: false,
    circular: true,
    duration: 500,
    swiperIndex: 1, //初始页数
    swiperMap: ['first', 'second', 'third', 'fourth'],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const date = new GetPeriod()
        //月
    let month = date.nowMonth
        //年
      , year = date.nowYear
        //日
      , day = date.nowDay
        //星期
      , weekday = date.nowDayOfWeek
        //第一天
      , firstDay = date.getWeekStartDate()
        //最后一天
      , endDay = date.getWeekEndDate()

    //格式化年月
    let year_month = date.getNowYearMonth()

    //格式化年月日
      , year_month_day = date.getNowDate()
        
    console.log("year_month_day:"+year_month_day)
    let firstDayNum = Date.parse(firstDay)

    //初始化数据
    this.initWeekData(firstDayNum)

    this.setData({
      year: year,   //年
      month: month,  //月
      day: day,    //日
      checkday: year_month_day,
      year_month: year_month
    })
  },

  initWeekData: function (secondDayNum, swiperIndex) {
    //建立三个数组
    let firstdays = [], seconddays = [] , thirddays = []
    console.log(secondDayNum)
    let firstDayNum = secondDayNum - oneDayMillisecond * 7
    , thirdDayNum = secondDayNum + oneDayMillisecond * 7

    for(var i = 0; i < 7; i++) {
      var firstnewDay = new Date(firstDayNum)
        , secondnewDay = new Date(secondDayNum)
        , thirdnewDay = new Date(thirdDayNum)
      firstdays.push({
        date: this.formatDate(firstnewDay),
        year: firstnewDay.getFullYear(),
        month: firstnewDay.getMonth(),
        day: firstnewDay.getDate(),
      })
      seconddays.push({
        date: this.formatDate(secondnewDay),
        year: secondnewDay.getFullYear(),
        month: secondnewDay.getMonth(),
        day: secondnewDay.getDate(),
      })
      thirddays.push({
        date: this.formatDate(thirdnewDay),
        year: thirdnewDay.getFullYear(),
        month: thirdnewDay.getMonth(),
        day: thirdnewDay.getDate(),
      })
      firstDayNum += oneDayMillisecond
      secondDayNum += oneDayMillisecond
      thirdDayNum += oneDayMillisecond
    }

    if (swiperIndex == null) {
      this.data.daysArr.first = firstdays
      this.data.daysArr.second = seconddays
      this.data.daysArr.third = thirddays
    } else {

    }

    var that = this.data.daysArr
    this.setData({
      daysArr: that
    })
  },

  changearr: function(e) {
    let nowIndex = e.detail.current
      , lastIndex = this.data.swiperIndex
      , changeIndex;

    switch (nowIndex) {
      case 0:
        changeIndex = lastIndex == 1 ? this.data.swiperMap[3] : lastIndex == 3 ? this.data.swiperMap[1] : null
        break
      case 1:
        changeIndex = lastIndex == 0 ? this.data.swiperMap[2] : lastIndex == 2 ? this.data.swiperMap[0] : null
        break
      case 2:
        changeIndex = lastIndex == 3 ? this.data.swiperMap[1] : lastIndex == 1 ? this.data.swiperMap[3] : null
        break
      case 3:
        changeIndex = lastIndex == 2 ? this.data.swiperMap[0] : lastIndex == 0 ? this.data.swiperMap[2] : null
        break
    }

    let nowArr = this.data.daysArr[this.data.swiperMap[nowIndex]]
    console.log("nowArr:"+nowArr)
    var changeArr = this.data.daysArr[changeIndex]
      , date = new Date(nowArr[0].date)
      , nowDateNum = Date.parse(date)
      , changeDateNum
    console.log("date："+date)

    if (nowIndex == 0 && lastIndex == 3) {
      lastIndex = -1
    }

    if (nowIndex == 3 && lastIndex == 0) {
      nowIndex = -1
    }

    if (lastIndex > nowIndex){
      changeDateNum = nowDateNum - (oneDayMillisecond * 7) 
    }
    // 往左滑
    if (lastIndex < nowIndex){
      changeDateNum = nowDateNum + (oneDayMillisecond * 7)
    }

    var newDays = this.buildNewWeek(changeDateNum)
    var that = this.data.daysArr
    that[changeIndex] = newDays

    //处理头部的年月
    let year = nowArr[0].year
      , month = nowArr[0].month
      , day = nowArr[0].day
      , year_month = [year, month + 1].map(this.formatNumber).join('-');

    console.log(year+"/"+month+"/"+day)
    this.setData({
      year: year,
      month: month,
      day: day,
      swiperIndex: e.detail.current,
      year_month: year_month,
      daysArr: that
    })
    
  },

  //生成新的周数
  buildNewWeek(dateNum) {
    let newWeek = new Array()
    for (var i = 0; i < 7; i++) {
      var changeDay = new Date(dateNum)
      newWeek.push({
        date: this.formatDate(changeDay),
        year: changeDay.getFullYear(),
        month: changeDay.getMonth(),
        day: changeDay.getDate(),
      })
      dateNum += oneDayMillisecond
    }
    return newWeek
  },

  prevMonth() {
    var current = this.data.swiperIndex > 0 ? this.data.swiperIndex - 1 : this.data.daysArrLength - 1
    console.log(current)
    //当月天数
    let monthSum = this.getMonthDays("prev")
    this.setData({
      swiperIndex: current
    })
  },
  nextMonth() {
  
    var current = this.data.swiperIndex < this.data.daysArrLength - 1 ? this.data.swiperIndex + 1 : 0
    console.log(current)
    let monthSum = this.getMonthDays("next")
    this.setData({
      swiperIndex: current
    })
  },

  formatDate(date) {
    let myyear = date.getFullYear();
    let mymonth = date.getMonth() + 1;
    let myweekday = date.getDate();
    return [myyear, mymonth, myweekday].map(this.formatNumber).join('-');
  },

  formatNumber(n) {
    n = n.toString()
    return n[1] ? n : '0' + n
  },

  //获取某月的天数
  getMonthDays(direction) {
    var monthStartDate, monthEndDate, days

    if (direction == "prev") {
      monthStartDate = new Date(this.data.year, this.data.month - 1, 1);
      monthEndDate = new Date(this.data.year, this.data.month, 1);
    }

    if (direction == "next") {
      monthStartDate = new Date(this.data.year, this.data.month, 1);
      monthEndDate = new Date(this.data.year, this.data.month + 1, 1);
    }
    days = (monthEndDate - monthStartDate) / (1000 * 60 * 60 * 24);
   
    console.log("111111111"+new Date(2019, 0, 32))
    console.log(days)
    return days;
  }

})
