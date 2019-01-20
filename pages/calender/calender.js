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
    checkday: null,    //日
  //  checkdate: null,  //当前时间
    nowday: null,  //当前日期
    year_month: null,
    daysArr: {
      first: [],
      second: [],
      third: [],
      fourth: []
    },       //天数数组，固定21个
    daycount: null,  //当前月份
    indicatordots: true,
    autoplay: false,
    circular: true,
    duration: 500,
    swiperIndex: 1, //初始页数
    lastCurrent: 1,  //当前页数
    swiperMap: ['first', 'second', 'third', 'fourth'],
  },

 

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const date = new GetPeriod()
        //月
    let month = date.nowMonth + 1,
        //年
        year = date.nowYear, 
        //日
        day = date.nowDay,
        //年_月
        year_month = this.formatYearMonth(year, month),
        //星期
        weekday = date.nowDayOfWeek, 
        //第一天
        firstDay = date.getWeekStartDate(), 
        //最后一天
        endDay = date.getWeekEndDate(); 
        
        //zeroTime = date.getZeroTime();
    //console.log(zeroTime)
    console.log(firstDay)
    let firstDayNum = Date.parse(firstDay)

    //初始化数据
    this.initWeekData(firstDayNum)

    console.log(this.data.daysArr)
    console.log(this.data.daysArr.first)
    console.log(this.data.daysArr.second)
    console.log(this.data.daysArr.third)
    this.setData({
      year: year,   //年
      month: month,  //月
      nowday: day,    //日
      checkday: day,
      year_month: year_month,
      daysArr: this.data.daysArr
    })
    
  },

  initWeekData: function (secondDayNum) {
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
        date: firstnewDay,
        year: firstnewDay.getFullYear(),
        month: firstnewDay.getMonth(),
        day: firstnewDay.getDate(),
      })
      seconddays.push({
        date: secondnewDay,
        year: secondnewDay.getFullYear(),
        month: secondnewDay.getMonth(),
        day: secondnewDay.getDate(),
      })
      thirddays.push({
        date: thirdnewDay,
        year: thirdnewDay.getFullYear(),
        month: thirdnewDay.getMonth(),
        day: thirdnewDay.getDate(),
      })
      firstDayNum += oneDayMillisecond
      secondDayNum += oneDayMillisecond
      thirdDayNum += oneDayMillisecond
    }

    this.data.daysArr.first = firstdays
    this.data.daysArr.second = seconddays
    this.data.daysArr.third = thirddays
  },


  changearr: function(e) {
    let nowIndex = e.detail.current
      , lastIndex = this.data.lastCurrent
      , changeIndex;
    
      console.log(nowIndex)
      console.log(lastIndex)

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

    //写个判断  实际要不要无所谓
    if (changeIndex != null) {
      let nowArr = this.data.daysArr[this.data.swiperMap[nowIndex]]
        console.log(nowArr)
      console.log(changeArr)
      console.log("nowIndex:"+nowIndex)
      console.log("lastIndex:"+lastIndex)
      console.log("changeIndex:"+changeIndex)

      var changeArr = this.data.daysArr[changeIndex]
        , date = nowArr[0].date
        , nowDateNum = Date.parse(date)
        , changeDateNum

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

      this.setData({
        lastCurrent: e.detail.current,
        daysArr: that
      })
    }
  },

  //生成新的周数
  buildNewWeek(dateNum) {
    let newWeek = new Array()
    for (var i = 0; i < 7; i++) {
      var changeDay = new Date(dateNum)
      newWeek.push({
        date: changeDay,
        year: changeDay.getFullYear(),
        month: changeDay.getMonth(),
        day: changeDay.getDate(),
      })
      dateNum += oneDayMillisecond
    }
    return newWeek
  },

  formatYearMonth: function(year, month) {
    return year + "年" + month + "月"
  },

  //获取当前时间下，本周的时间的数据，以及本周上周的数据。以及本周下周的数据
  getLastweekAndNextweekAndThisweekWithNowDay() {

    var nowweek_first_day = this.getWeekStartDate();

  }

})