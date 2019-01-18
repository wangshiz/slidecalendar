// pages/calender/calender.js
const GetPeriod = require("../../utils/getperiod.js");
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
    swiperIndex: 1,
    swiperMap: ['first', 'second', 'third', 'fourth'],
  },

 

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // const date = new Date()
    // let month = date.getMonth() + 1, year = date.getYear(), day = date.getDate(), year_month = this.formatYearMonth(date), weekday = date.getDay()
    // console.log(new Date().getDay())
    // const date2 = new Date(2019, 0, 20)
    // console.log(date2.getDay());
//,
    // const date = new Date()
    // let month = date.getMonth() + 1, year = date.getYear(), day = date.getDate(), year_month = this.formatYearMonth(date), weekday = date.getDay()
    // console.log(new Date().getDay())
    // const date2 = new Date(2019, 0, 20)
    // console.log(date2.getDay());
    const date = new GetPeriod()
    let month = date.nowMonth + 1, year = date.nowYear, day = date.nowDay, year_month = this.formatYearMonth(year, month), weekday = date.nowDayOfWeek, firstDay = date.getWeekStartDate(), endDay = date.getWeekEndDate(), zeroTime = date.getZeroTime();
    console.log(zeroTime)
    console.log(firstDay)
    let firstDayNum = Date.parse(firstDay), zeroTimeNum = Date.parse(zeroTime)

    this.initWeekData(firstDayNum, zeroTimeNum)

    console.log(this.data.daysArr)
    console.log(this.data.daysArr.first)
    console.log(this.data.daysArr.second)
    this.setData({
      year: year,   //年
      month: month,  //月
      nowday: day,    //日
      checkday: day,
      year_month: year_month,
      daysArr: this.data.daysArr
    })
    
  },

  initWeekData: function (firstDayNum, zeroTimeNum) {
    let days = []
    console.log(firstDayNum)
    for(var i = 0; i < 7; i++) {
      var newDay = new Date(firstDayNum)
      days.push({
        date: newDay,
        year: newDay.getFullYear(),
        month: newDay.getMonth(),
        day: newDay.getDate(),
      })
      firstDayNum += (24 * 60 * 60 * 1000)
      
    }

    this.data.daysArr.second = days
  },


  changearr: function () {
    
  },

  formatYearMonth: function(year, month) {
    return year + "年" + month + "月"
  },

  //获取当前时间下，本周的时间的数据，以及本周上周的数据。以及本周下周的数据
  getLastweekAndNextweekAndThisweekWithNowDay() {

    var nowweek_first_day = this.getWeekStartDate();

  }

})