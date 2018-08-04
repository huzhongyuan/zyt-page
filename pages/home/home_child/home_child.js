// pages/home/home_child/home_child.js
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
    activity:{},
    classId:'',
    sign:'none',
    come:'none',
    upuping:'none',
    asdasdasd:'none',
    imgarray:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var classId = this.data.classId
    classId = options.classid
    var activity = this.data.activity
    var that =this
that.setData({
  classId: classId
})
  },
  // 签到
come:function(e){
  var that = this
  var address = this.data.address
  var classId = this.data.classId
  wx.getLocation({
    type: 'wgs84',
    success: function (res) {
      console.log(res)
      wx.request({
        url: app.globalData.url + '/activity/doSign',
        data:{
          activityId: classId,
          loginId: app.globalData.loginId,
          lat: res.latitude,
          lng: res.longitude
        },
        success: function (res) {
wx.showModal({
  title: '提示',
  content: res.data.msg,
  showCancel:false,
})
          that.baom()
      },
        fail: function (e) {
          console.log(e)
        }
      })
    },
    fail: function (e) {
      console.log(e)
      wx.openSetting({
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
    var classId = this.data.classId
    var activity = this.data.activity
    var that = this
    //活动照片
    var imgarray = this.data.imgarray
    wx.request({
      url: app.globalData.url + '/activityComment/getImagesByActivityId',
      data: {
        activityId: classId,
        pageNo: 1,
        pageSize: 3,
      },
      success: function (res) {
        console.log('活动图片')
        console.log(res)
        imgarray = res.data.result
        that.setData({
          imgarray: imgarray
        })
      },
      fail: function (e) {
        console.log(e)
      }
    })
    // 活动详情
    wx.request({
      url: app.globalData.url + '/activity/getActivityDetail/' + classId,
      success: function (res) {
        console.log(res)
        activity = res.data.result
        activity.beginTime = formatDateTime(res.data.result.beginTime)
        activity.endTime = formatDateTime(res.data.result.endTime)
        that.setData({
          activity: activity,
          classId: classId
        })
      },
      fail: function (e) {
        console.log(e)
      }
    })
    that.baom()
  },
baom:function(){
  var sign = this.data.sign
  var come = this.data.come
  var upuping = this.data.upuping
  var asdasdasd = this.data.asdasdasd
  var classId = this.data.classId  
  var that = this
  // 是否报名
  wx.request({
    url: app.globalData.url + '/activity/haveEntered/' + app.globalData.loginId + '/' + classId,
    success: function (res) {
      console.log(res)
      if (res.data.type == 1) {
        sign = 'flex'
        come = 'none'
        upuping = 'none'
        that.setData({
          sign: sign,
          come: come,
          upuping: upuping
        })
      } else if (res.data.type == 2) {
        sign = 'none'
        come = 'block'
        upuping = 'none'
        asdasdasd = 'block'
        that.setData({
          sign: sign,
          come: come,
          upuping: upuping,
          asdasdasd: asdasdasd
        })
      } else if (res.data.type == 3) {
        sign = 'none'
        come = 'none'
        upuping = 'block'
        asdasdasd = 'block'
        that.setData({
          sign: sign,
          asdasdasd: asdasdasd,
          come: come,
          upuping: upuping
        })
      }
    },
    fail: function (e) {
      console.log(e)
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
  // 去报名
  sign:function(e){
    var classId = this.data.classId    
  wx.navigateTo({
    url: 'sign/sign?classId=' + classId,
  })
  },
  // 报名详情
    to_bosstitle:function(){
      var activity = this.data.activity
      wx.setStorage({
        key: 'members',
        data: activity,
        success:function(){
          wx.navigateTo({
            url: 'signno/signno',
          })
        }
      })
  
    },

    //签到详情
    to_signin:function(){
      var activity = this.data.activity
      wx.setStorage({
        key: 'members',
        data: activity,
        success: function () {
          wx.navigateTo({
            url: 'sign_in/sign_in',
          })
        }
      })

    },
    share:function(){
      var classId = this.data.classId
      wx.navigateTo({
        url: 'share/share?classId='+classId,
      })
    },
    to_photo:function(e){
      var classId = this.data.classId      
      wx.navigateTo({
        url: 'photo/photo?classId=' + classId,
      })
    }
})