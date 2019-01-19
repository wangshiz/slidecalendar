// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  formSubmit(e){
    var datas = e.detail.value;
    console.log(datas.uname)
    wx.request({
      url: 'http://192.168.18.109:8080/weixintest/weixinselvlet',
      method: "post",
      header: {
        //'content-type': 'text/html; charset=UTF-8;' // 默认值
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        uname: datas.uname,
        pwd: datas.pwd
      },
      success: res => {
        console.log(res.data)
        if (res.data.status[0] == "0") {
          
          wx.showToast({
            title: res.data.msg[0],
            icon: 'none',
            duration: 2000
          })
          return
        }

        if (res.data.status[0] == "1") {
          let jsonStr = JSON.stringify(res.data)
          wx.navigateTo({
            url: '../repage/repage?jsonStr='+jsonStr,
            success: function (res) {
              // success
            },
            fail: function () {
              // fail
            },
            complete: function () {
              // complete
            }
          })
          return
        }
      }

    })
  }
})