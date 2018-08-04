// pages/activity/activity_Child/activity_sure/activity_sure.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activitycont: '',
    inputValue: '',
    inputphone: '',
    authUser: {},
    inputadult:'',
    inputchild:'',
    classid : '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
    var classid = this.data.classid
    classid = options.classId
this.setData({
  classid: classid
})
  },

  inputValue: function (e) {
    var inputValue = this.data.inputValue
    this.setData({
      inputValue: e.detail.value
    })
    console.log(e.detail.value)
  },
  inputphone: function (e) {
    var inputphone = this.data.inputphone
    this.setData({
      inputphone: e.detail.value
    })
    console.log(inputphone.length)
  },
  inputadult: function (e) {
    var inputadult = this.data.inputadult
    this.setData({
      inputadult: e.detail.value
    })
    console.log(e.detail.value)
  },
  inputchild: function (e) {
    var inputchild = this.data.inputchild
    this.setData({
      inputchild: e.detail.value
    })
    console.log(e.detail.value)
  },
  upup: function () {
    var that = this
    var inputphone = this.data.inputphone
    var inputValue = this.data.inputValue
    var inputchild = this.data.inputchild
    var inputadult = this.data.inputadult    
    var classid = this.data.classid    
    var authUser = this.data.authUser
    console.log(inputValue)
    if (inputValue == '') {
      wx.showToast({
        title: '姓名不能为空',
        icon: 'none',
        duration: 2000
      })
    } else if (inputphone.length != 11) {
      wx.showToast({
        title: '联系方式错误',
        icon: 'none',
        duration: 2000
      })
    } else if (inputadult == '') {
      wx.showToast({
        title: '大人人数不能为空',
        icon: 'none',
        duration: 2000
      })
    } else if (inputchild == '') {
      wx.showToast({
        title: '小孩人数不能为空',
        icon: 'none',
        duration: 2000
      })
    }else {
      //报名活动
          var serviceRecord = {}
          serviceRecord.activityId = classid
          serviceRecord.adult = that.data.inputadult
          serviceRecord.child = that.data.inputchild
          serviceRecord.enterName = that.data.inputValue
          serviceRecord.enterPhone = that.data.inputphone
          serviceRecord.loginId = app.globalData.loginId
          wx.request({
            url: app.globalData.url + '/activity/enterActivity',
            data: serviceRecord,
            method: "POST",
            success: function (res) {
              console.log(res)
              wx.showModal({
                title: '提示',
                content: res.data.msg,
                showCancel: false,
                success: function () {
                  wx.navigateBack({
                  })
                }
              })
            },
            fail: function (res) {
              console.log(res)
            }
          })
       
    
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})