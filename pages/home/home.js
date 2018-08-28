// pages/home/home.js
var app = getApp()
var pageNo = 1
import com from '../to_play/util.js'
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
  return y + '-' + m + '-' + d ;
};
var classId = ''
var pageNo = 1
Page({

  /**
   * 页面的初始数据
   */
  data: {
        imgUrls: [
      '../../images/lbt.png',
      '../../images/lbt.png',
      '../../images/lbt.png'
    ],
        null1: '',
        activity:[],
        array:[],
        classkind: [{ id: '', name: "全部", class: 'redd', class2: 'c_reeed', }],
        news:'',
        isbottom: false,
  },
  onLaunch: function (options) {

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
  },
  // showLoading() {
  //   this.setData({
  //     $loading: {
  //       isShow: true
  //     }
  //   })
  //   setTimeout(() => {
  //     this.setData({
  //       $loading: {
  //         isShow: false
  //       }
  //     })
  //   }, 1000)}
  //   ,
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */

  jiaz:function(){
    var activity = this.data.activity
    var null1 = this.data.null1
    var that = this
    if(!that.data.isbottom) {
      wx.showLoading({
        title: '加载中',
      })
    }
    wx.request({
      url: app.globalData.url + '/activity/getActivityList',
      data: {
        title: '',
        classId:classId,
        pageNo: pageNo,
        pageSize: 5,
      },
      success: function (res) {
        // console.log(res)
        if (res.data.result == '') {
          null1 = 'block';
          pageNo--;//下拉加载的时候没有数据了页码需要减一
          that.setData({
            isbottom: true
          })
        } else {
          null1 = 'none'
        }
        for (var t = 0; t < res.data.result.length; t++) {
          var y = activity.length
          activity[y] = res.data.result[t]
          activity[y].beginTime = formatDateTime(res.data.result[t].beginTime)
          activity[y].endTime = formatDateTime(res.data.result[t].endTime)
        }
         //console.log(activity)
        that.setData({
          activity: activity,
          null1:null1

        })
        wx.hideLoading()
      },
      fail: function (e) {
        console.log(e);
        wx.hideLoading()
      }
    })
  },
  onShow: function () {
    wx.showLoading({
      title: '加载中',
    })
    pageNo = 1
    var that = this
    var array = that.data.array
    array = []
    var activity = that.data.activity
    activity = []
    that.setData({
      activity: activity
    })
    that.jiaz()

    //获取轮播图
    wx.request({
      url: app.globalData.url + '/banner/getBannerList',
      success: function (res) {
        //console.log(res)
        that.setData({
          imgUrls: res.data.result
        })
      },
      fail: function (e) {
        console.log(e)
      }
    })

    // 进行中活动
    wx.request({
      url: app.globalData.url + '/activity/getActivityByUserId',
data:{
  loginId:app.globalData.loginId,
  type:0,
  status:1
},
      success: function (res) {
        console.log(res);
        array = res.data.result
        that.setData({
          array: array
        })
      },
      fail: function (e) {
        console.log(e)
      }
    })
    // 系统消息
    var news = this.data.news
    wx.request({
      url: app.globalData.url + '/message/getSysMessageList',
      success: function (res) {
        console.log(res);
        news = res.data.result;
        that.setData({
          news: news
        })
      },
      fail: function (e) {
        console.log(e)
      }
    })
    var classkind = this.data.classkind
    classkind = [{ id: '', name: "全部", class: 'redd', class2: 'c_reeed', }]
    wx.request({
      url: app.globalData.url + '/activityCalss/getActClass',
      success: function (res) {
        console.log(res)
        for (var v = 0; v < res.data.result.length; v++) {
          var some = classkind.length
          classkind[some] = res.data.result[v]
        }
        that.setData({
          classkind: classkind,
        })
      },
      fail: function (res) {
        console.log(res)
      }
    })
// 消息
    wx.request({
      url: app.globalData.url + '/message/haveUnreadMessage/' + app.globalData.loginId,

      success: function (res) {
       // console.log(res);
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
  choisekind:function(e){
    this.setData({
      isbottom:false
    })
    wx.showLoading({
      title: '加载中',
    })
    pageNo = 1
    // console.log(e.currentTarget.id)
    var that = this
    var classkind = this.data.classkind
    classId = e.currentTarget.id
    for(var a = 0;a< classkind.length;a++){
      if (e.currentTarget.id == classkind[a].id ){
        classkind[a].class = 'redd'
        classkind[a].class2 = 'c_reeed'
      }else{
        classkind[a].class = ''
        classkind[a].class2 = ''
      }
      that.setData({
        classkind: classkind
      })
    }
    var activity = this.data.activity
    activity = []
    that.setData({
      activity: activity
    })
    that.jiaz()    
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
    wx.showLoading({
      title: '加载中',
    })
    var activity = this.data.activity
    var that = this    
    activity = []    
    that.setData({
      activity: activity
    })
    pageNo = 1
    that.jiaz()
    console.log('下拉加载第' + pageNo + '页')  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that  =this
  pageNo++
  that.jiaz()  
  console.log('上拉加载第' + pageNo+'页')  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
  ,
  to_child:function(e){
    // console.log(e.currentTarget.id)
wx.navigateTo({
  url: 'home_child/home_child?classid=' + e.currentTarget.id,
})
  },
  to_childing:function(){
    wx.navigateTo({
      url: 'ongoing/ongoing',
    })
  },
  //图片加载异常处理
  errImg: function (e) {
    var errorImgIndex = e.target.dataset.errorimg //获取循环的下标
    var imgObject = "activity[" + errorImgIndex + "].coverImg" //carlistData为数据源，对象数组
    com.errorImg(this, e, imgObject);
  }
})