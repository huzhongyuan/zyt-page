// pages/my/my.js
var app= getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userinfo:'',
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

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
     var userinfo = this.data.userinfo
     userinfo = app.globalData.userInfo
     this.setData({
       userinfo: userinfo
     })
    //  console.log(app.globalData.userInfo)


     wx.request({
       url: app.globalData.url + '/message/haveUnreadMessage/' + app.globalData.loginId,

       success: function (res) {
         console.log(res)
         if (res.data.msg == "没有未读消息") {
             wx.hideTabBarRedDot({
               index: 2,
             })
           } else {
           wx.showTabBarRedDot({
             index: 2,
           })
           }
       },
       fail: function (res) {
         console.log(res)
       }
     })
    
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
  to_child:function(e){
    wx.navigateTo({
      url: 'my_child/my_child?id=' + e.currentTarget.id,
    })
  },
  to_news: function (e) {
    wx.navigateTo({
      url: 'my_news/my_news?id=',
    })
  },
  to_myinfo:function(){
    wx.navigateTo({
      url: 'my_info/my_info',
    })
  },
  
})