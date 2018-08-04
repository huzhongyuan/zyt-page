// pages/add/add_details/add_details.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

    bindTextAreaBlur: '',

  },

  bindTextAreaBlur: function (e) {
    var bindTextAreaBlur = this.data.bindTextAreaBlur
    this.setData({
      bindTextAreaBlur: e.detail.value
    })
    // console.log(bindTextAreaBlur)
  },
  asdk:function(){
    var bindTextAreaBlur = this.data.bindTextAreaBlur    
        wx.setStorage({
          key: 'details',
          data: { text: bindTextAreaBlur},
          success:function(){
            wx.navigateBack({
              
            })
          }
        })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that =this
    var bindTextAreaBlur = this.data.bindTextAreaBlur
    wx.getStorage({
      key: 'details',
      success: function (res) {
        console.log(res)
        if (res.data.text != '') {
          bindTextAreaBlur = res.data.text
        }else{
          bindTextAreaBlur = '请输入活动详情'
        }
        that.setData({
          bindTextAreaBlur: bindTextAreaBlur
        })
      },fail:function(){
        bindTextAreaBlur = '请输入活动详情'
        that.setData({
          bindTextAreaBlur: bindTextAreaBlur
        })
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
  
  }
})