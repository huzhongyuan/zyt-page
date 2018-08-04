// pages/home/home_child/photo/photo.js
var app = getApp()
function formatDateTime(inputTime) {
  var date = new Date(inputTime);
  var y = date.getFullYear();
  var m = date.getMonth() + 1;
  m = m < 10 ? ('0' + m) : m;
  var d = date.getDate();
  d = d < 10 ? ('0' + d) : d;
  var h = date.getHours();
  h = h < 10 ? ('0' + h) : h;
  var minute = date.getMinutes();
  var second = date.getSeconds();
  minute = minute < 10 ? ('0' + minute) : minute;
  second = second < 10 ? ('0' + second) : second;
  return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
};
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classId: '',
    asd:{},
    asdasd:'none'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  // 添加图片
  addimagssss: function (res) {
    var classId = this.data.classId
    var that = this
    var img = this.data.img
    // console.log(i)
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        console.log(res)
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        // 上传至服务器
        wx.uploadFile({
          url: app.globalData.url + '/attachment/uploadImages',
          filePath: res.tempFilePaths[0],
          name: 'file',
          formData: {
            'user': 'test'
          },
          success: function (e) {
            console.log(e)
            // console.log(e.data)
            // console.log(e.data.result[0].attachemId)


            var jsonStr = e.data;
            jsonStr = jsonStr.replace(" ", "");
            if (typeof jsonStr != 'object') {
              jsonStr = jsonStr.replace(/\ufeff/g, "");
              var jj = JSON.parse(jsonStr);
              e.data = jj;
              console.log(e.data.result[0].attachemId)
              wx.request({
                url: app.globalData.url + '/attachment/saveActivityImages',
                data: {
                  ids: e.data.result[0].attachemId,
                  activityId: classId,
                  loginId: app.globalData.loginId
                },
                success: function (res) {
                  console.log(res)

                },
                fail: function (res) {
                  console.log(res)
                }
              })
            }

          }
        })
        img = res.tempFilePaths[0]
        // console.log(img[i])
        that.setData({
          img: img
        })
      }
    })

  },
  onLoad: function (options) {
    var asdasd = this.data.asdasd
    console.log(options)
    var that = this
    var classId = this.data.classId
    var asd = this.data.asd
    asd = options
    classId = options.classid
    this.setData({
      classId: classId,
      asd: asd
    })
    if (options.loginid == app.globalData.loginId){
      asdasd= 'block'
      that.setData({
        asdasd: asdasd
      })
    }
    //活动照片
    var imgarray = this.data.imgarray
    wx.request({
      url: app.globalData.url + '/activityComment/getImagesByActivityId',
      data: {
        activityId: options.classid,
        loginId: options.loginid,
        pageNo: 1,
        pageSize: 5,
      },
      success: function (res) {
        console.log('活动图片')
        console.log(res)
        for(var a = 0 ;a<res.data.result.length;a++){
          res.data.result[a].gmt_create = formatDateTime(res.data.result[a].gmt_create)
        }
        imgarray = res.data.result
        that.setData({
          imgarray: imgarray
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
  delall:function(e){
    var asd = this.data.asd
    var that =this
    console.log(e)
    wx.showModal({
      title: '提示',
      content: '确认删除？',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.request({
            url: app.globalData.url + '/activityComment/deleteActivityComment/' + e.currentTarget.id,
            success: function (res) {
              console.log(res)
              that.onLoad(asd)
            },
            fail: function (e) {
              console.log(e)
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })

  },
  delone:function(e){
    var asd = this.data.asd
    var that = this
    console.log(e)
    if (asd.loginid == app.globalData.loginId) {
      wx.showModal({
        title: '提示',
        content: '确认删除？',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
            wx.request({
              url: app.globalData.url + '/activityComment/deleteImage/' + e.currentTarget.id,
              success: function (res) {
                console.log(res)
                that.onLoad(asd)
              },
              fail: function (e) {
                console.log(e)
              }
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }

  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  },
  praise: function (e) {
    var classId = this.data.classId
    var imgarray = this.data.imgarray
    var that = this
    wx.request({
      url: app.globalData.url + '/activityPraise/praise/' + e.currentTarget.id + '/' + classId + '/' + app.globalData.loginId,
      success: function (res) {
        console.log(res)
        if (res.data.msg == "点赞成功") {
          for (var t = 0; t < imgarray.length; t++) {
            if (imgarray[t].id == e.currentTarget.id) {
              imgarray[t].praise += 1
              that.setData({
                imgarray: imgarray
              })
            }
          }
        }
      },
      fail: function (e) {
        console.log(e)
      }
    })
  }
})