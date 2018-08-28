// pages/my/my_news/my_news.js
var app =getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array3:[],
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
    var that = this
    var array3 = this.data.array3
    wx.request({
      url: app.globalData.url + '/message/getUserMessageList/' + app.globalData.loginId,
      success: function (res) {
        console.log(res)
        // console.log(res.data.messageVos.length)
        var value = res.data.result.length
        for (var t = 0; t < value; t++) {
          array3[t] = res.data.result[t]
          array3[t].headImgUrl = 'http://watx-wehcat.oss-cn-beijing.aliyuncs.com/img/2018/5/841ab2b5-6c2b-47ca-81c2-ece5a177b5e4.jpg'
          array3[t].name = '系统消息';
          var d = new Date(res.data.result[t].gmtCreate).toLocaleDateString();
          array3[t].time = d;
          array3[t].to = 'to_child2';
          array3[t].answer = res.data.result[t].content;
          if (res.data.result[t].status == 1) {
            array3[t].display = 'none';
            // console.log(array1)
          }else{
            wx.request({
              url: app.globalData.url + '/message/markRead/' + app.globalData.loginId,
              success: function (res) {
                console.log(res);
              },
              fail: function (res) {
                console.log(res);
              }
            })
          }
        }
        that.setData({
          array3: array3,
          array: array3
        })
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
  
  }
})