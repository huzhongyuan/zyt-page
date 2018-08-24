// pages/my/my_info/my_info.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userinfo:{},
    inputValue: '',
    inputphone: '',
    authUser:{},
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
    console.log(this.data.inputphone);
    //console.log(inputphone.length)
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
    var userinfo = this.data.userinfo
    var inputphone = this.data.inputphone
    userinfo = app.globalData.userInfo
    this.setData({
      userinfo: userinfo
    })
    wx.request({
      url: app.globalData.url + '/wxAuthUser/userInfo',
      data: {
        loginId: app.globalData.loginId
      },
      success: function (res) {
console.log(res); 
if (res.data.result.email== ''){
            userinfo.phone = '填写联系方式'
        }else{
  inputphone = res.data.result.email;
  userinfo.phone = res.data.result.email;
        }
userinfo.nickname = res.data.result.nickname;
        //app.globalData.userInfo.nickname = res.data.result.nickname;
that.setData({
  userinfo: userinfo,
  inputphone: inputphone
})
      },
      fail: function (e) {
        console.log(e)
      }
    })
  },
  upup: function () {
    var that = this
    var inputphone = this.data.inputphone
    var inputValue = this.data.inputValue
    var authUser = this.data.authUser
    console.log(inputValue);
    if (!inputphone) {
      wx.showToast({
        title: '未进行修改',
        duration: 2000,
        success:function() {
          setTimeout(function(){
            wx.navigateBack({}) 
          },2000)    
        }
      })
    } else {
      if (inputphone.length != 11) {
        wx.showToast({
          title: '联系方式错误',
          icon: 'none',
          duration: 2000
        })
      } else {
        if (this.data.inputValue == '') {
          //console.log('空');
          this.setData({
            inputValue: that.data.userinfo.nickname
          })
          //console.log(this.data.inputValue);
        }
        console.log(app.globalData.loginId)
        authUser.id = app.globalData.loginId
        authUser.nickname = this.data.inputValue
        authUser.email = this.data.inputphone
        wx.request({
          url: app.globalData.url + '/wxAuthUser/updateUserInfo',
          method: "POST",
          data: authUser,
          success: function (res) {
            var datas = res.data;
            console.log(res)
            if (res.data.success == true) {
              wx.showToast({
                title: '保存成功',
                duration: 2000,
                success: function () {
                  setTimeout(function () {
                    wx.navigateBack({})
                  }, 2000)
                }
              })
            } else {
              wx.showModal({
                title: '提示',
                content: res.data.msg,
              })
            }


          },
          fail: function (res) {
            console.log(res)
          }
        })
      }
    }
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