// pages/home/home_child/share/share.js
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
  src:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var src = this.data.src
    src = app.globalData.url + '/activity/createEwmCodeUrl?activityId=' + options.classId
    this.setData({
      src:src
    })
  },


onSavePicClick:function(){
  //获取相册授权
  var that =this
  wx.getSetting({
    success(res) {
      if (!res.authSetting['scope.writePhotosAlbum']) {
        wx.authorize({
          scope: 'scope.writePhotosAlbum',
          success() {
            console.log('授权成功')
            //文件下载
            var imgSrc = that.data.src
            wx.downloadFile({
              url: imgSrc,
              success: function (res) {
                console.log(res);
                //图片保存到本地
                wx.saveImageToPhotosAlbum({
                  filePath: res.tempFilePath,
                  success: function (data) {
                    console.log(data);
                  },
                  fail: function (err) {
                    console.log(err);
                    if (err.errMsg === "saveImageToPhotosAlbum:fail auth deny") {
                      console.log("用户一开始拒绝了，我们想再次发起授权")
                      console.log('打开设置窗口')
                      wx.openSetting({
                        success(settingdata) {
                          console.log(settingdata)
                          if (settingdata.authSetting['scope.writePhotosAlbum']) {
                            console.log('获取权限成功，给出再次点击图片保存到相册的提示。')
                          } else {
                            console.log('获取权限失败，给出不给权限就无法正常使用的提示')
                          }
                        }
                      })
                    }
                  }
                })
              }
            })
          }
        })
      }
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