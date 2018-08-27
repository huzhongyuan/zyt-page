// pages/my/my_child/my_child.js
var app =getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
  array :'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this 
    that.jias(options.id)

  },
    jias:function(e){
      var array = this.data.array
      var that =this
      wx.request({
        url: app.globalData.url + '/activity/getActivityByUserId',
        data: {
          loginId: app.globalData.loginId,
          type:e,
        },
        success: function (res) {
          console.log(res)
          array = res.data.result
          for (let i in array) {
            array[i].beginTime = array[i].beginTime.slice(0,16);
            array[i].endTime = array[i].endTime.slice(0, 16);
          }
          console.log(array[0].beginTime);
          that.setData({
            array: array
          })
        },
        fail: function (e) {
          console.log(e)
        }
      })
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
  
  },

    to_child: function (e) {
    // console.log(e.currentTarget.id)
    wx.navigateTo({
      url: '../../home/home_child/home_child?classid=' + e.currentTarget.id,
    })
  },
})