// pages/calender/calender.js
const GetPeriod = require("../../utils/getperiod.js");
const oneDayMillisecond = 86400000  //一天毫秒数  24 * 60 * 60 * 1000
Page({
  /**
   * 页面的初始数据
   */
  data: {
    week:["一", "二", "三", "四", "五", "六", "日"],
    year: null,   //年
    month: null,  //月
    day: null,    //日
    checkdate: null,  //选中值
    year_month: null,
    start_year_month: "2018-05",
    now_year_month: null, //当前月份，固定值
    today: null, //当前年月日，固定值
    daysArr: {
      first: [],
      second: [],
      third: [],
      fourth: []
    },       //天数数组，固定21个
    daysArrLength: 4,
    daycount: null,  //当前月份
    indicatordots: false,
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
      checkdate: year_month_day,
      year_month: year_month,
      now_year_month:year_month,
      today: year_month_day
    })

    console.log(this.data.today)
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
      if (swiperIndex == 0){
        this.data.daysArr[this.data.swiperMap[this.data.daysArrLength - 1]] = firstdays
        this.data.daysArr[this.data.swiperMap[swiperIndex]] = seconddays
        this.data.daysArr[this.data.swiperMap[swiperIndex + 1]] = thirddays
      } else if (swiperIndex == 3){
        this.data.daysArr[this.data.swiperMap[swiperIndex - 1]] = firstdays
        this.data.daysArr[this.data.swiperMap[swiperIndex]] = seconddays
        this.data.daysArr[this.data.swiperMap[0]] = thirddays
      } else {
        this.data.daysArr[this.data.swiperMap[swiperIndex - 1]] = firstdays
        this.data.daysArr[this.data.swiperMap[swiperIndex]] = seconddays
        this.data.daysArr[this.data.swiperMap[swiperIndex + 1]] = thirddays
      }
    }

    var that = this.data.daysArr
    var current = swiperIndex == null? this.data.swiperIndex : swiperIndex
    this.setData({
      daysArr: that,
      swiperIndex: current
    })
  },

  //修改数组结构
  changearr: function(e) {
    if (e.detail.source != "touch") {
      return
    }
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
    var changeArr = this.data.daysArr[changeIndex]
      , date = new Date(nowArr[0].date)
      , nowDateNum = Date.parse(date)
      , changeDateNum
      , realNextDate

    if (nowIndex == 0 && lastIndex == 3) {
      lastIndex = -1
    }

    if (nowIndex == 3 && lastIndex == 0) {
      nowIndex = -1
    }
    // 往右滑
    if (lastIndex > nowIndex){
      changeDateNum = nowDateNum - (oneDayMillisecond * 7) 
      realNextDate = new Date(this.data.year, this.data.month, this.data.day - 7)
    }
    // 往左滑
    if (lastIndex < nowIndex){
      changeDateNum = nowDateNum + (oneDayMillisecond * 7)
      realNextDate = new Date(this.data.year, this.data.month, this.data.day + 7)
    }

    var newDays = this.buildNewWeek(changeDateNum)
    var that = this.data.daysArr
    that[changeIndex] = newDays

    //处理头部的年月
    // let year = nowArr[0].year
    //   , month = nowArr[0].month
    //   , year_month = [year, month + 1].map(this.formatNumber).join('-');

    //处理data里的年月日
    console.log("realNextDate:"+realNextDate)
    var realYear = realNextDate.getFullYear()
      , realMonth = realNextDate.getMonth()
      , realDay = realNextDate.getDate();

    this.setData({
      year: realYear,
      month: realMonth,
      day: realDay,
      swiperIndex: e.detail.current,
      year_month: [realYear, realMonth + 1].map(this.formatNumber).join('-'),
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

  //获取某月的天数
  changeMonth(e) {
    var monthStartDate, monthEndDate, days, changeIndex

    if (e.target.dataset.direction == "prev") {
      monthEndDate = new Date(this.data.year, this.data.month - 1, 1);
      monthStartDate = new Date(this.data.year, this.data.month, 1);
      changeIndex = this.data.swiperIndex > 0 ? this.data.swiperIndex - 1 : this.data.daysArrLength - 1
    }

    if (e.target.dataset.direction == "next") {
      monthEndDate = new Date(this.data.year, this.data.month + 1, 1);
      monthStartDate = new Date(this.data.year, this.data.month, 1);
      changeIndex = this.data.swiperIndex < this.data.daysArrLength - 1 ? this.data.swiperIndex + 1 : 0
    }
    days = (monthEndDate - monthStartDate) / (1000 * 60 * 60 * 24);
   
    this.restructuringdaysArr(days, changeIndex)

  },


  //重新编排数据
  restructuringdaysArr(days, changeIndex){
    // 新建一个月份
    var changeDay = new GetPeriod(this.data.year, this.data.month, this.data.day + days)
    console.log("changeDay:" + changeDay)
    var firstDay = changeDay.getWeekStartDate()
    console.log("firstday:"+firstDay)
    let firstDayNum = Date.parse(firstDay)
    console.log("changeIndex:"+changeIndex)
    //初始化数据
    this.initWeekData(firstDayNum, changeIndex)

    var realNextYear = changeDay.nowYear
      , realNextMonth = changeDay.nowMonth
      , realNextDay = changeDay.nowDay

    this.setData({
      year: realNextYear,
      month: realNextMonth,
      day: realNextDay,
      year_month: changeDay.getNowYearMonth()
    })

    console.log(realNextYear + "/" + realNextMonth + "/" + realNextDay)
  },

  //直接选择月份
  bindDateChange(e) {
    var arr = e.detail.value.split("-")
    var date = new GetPeriod(arr[0], parseInt(arr[1]) - 1, "01")
    var firstdayNum = date.getWeekStartDate().getTime()
    var swiperIndex = this.data.swiperIndex
    console.log(swiperIndex)
    this.initWeekData(firstdayNum, swiperIndex)

    this.setData({
      year: date.nowYear,
      month: date.nowMonth,
      day: date.nowDay,
      year_month: date.getNowYearMonth()
    })

  },

  //选择日期
  selectdate(e) {
    this.setData({
      checkdate: e.currentTarget.dataset.date
    })
  },

  //处理数据
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
})
