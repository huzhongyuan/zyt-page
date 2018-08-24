//index.js
//获取应用实例
const app = getApp()
var Util = require('../../utils/util.js');
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    sign: 1,
    openid: '',
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function (options) {
    // wx.getSetting({
    //   success(res) {
    //     if (!res.authSetting['scope.userInfo']) {
    //       wx.authorize({
    //         scope: 'scope.userInfo',
    //         success() {
    //           // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
    //           wx.getUserInfo();
    //         }
    //       })
    //     }
    //   }
    // })
    // wx.switchTab({
    //   url: '../home/home',
    // })
    // options 中的 scene 需要使用 decodeURIComponent 才能获取到生成二维码时传入的 scene
    if (options) {
      var scene = decodeURIComponent(options.scene)
      app.globalData.scene = options.scene
    }
    var sign = this.data.sign
    var code = this.data.code
    var that = this
    var access_token = this.data.access_token
    var openid = this.data.openid
    var code = this.data.code
    var access_token = this.data.access_token
    wx.login({
      success: function (res) {
        code = res.code;
        console.log(app.globalData.url);
        console.log(code);
        wx.request({
          url: app.globalData.url + '/wechat/login',
          data: {
            code: code
          },
          success: function (res) {
            //console.log('用户信息openid，sessionKey')
            console.log(res)
            if (!res.data.success) {
              wx.showToast({
                title: res.data.msg,
                icon: 'none',
                duration: 2000
              })
            }
            app.globalData.session_key = res.data.sessionKey
            app.globalData.openid = res.data.openid
            app.globalData.unionid = res.data.unionid
            that.setData({
              openid: res.data.openid
            })
            // console.log(openid)
            //openid = app.globalData.openid
            console.log(app.globalData.openid);
            wx.request({
              url: app.globalData.url + '/wxAuthUser/index',
              data: { openid: app.globalData.openid },
              success: function (res) {
                console.log(typeof(res.data.success))
                if (res.data.success == false){
                  console.log('false');
                  that.setData({
                    hasUserInfo: false
                  })
                } else if (res.data.success == true){
                  console.log('true');
                  app.globalData.loginId = res.data.loginId
                  wx.getSetting({
                    success(res) {
                      console.log(res);
                      if (res.authSetting['scope.userInfo']) {
                        wx.switchTab({
                          url: '../home/home',
                        })
                      } else {
                        that.setData({
                          hasUserInfo: false
                        })
                      }
                    }
                  })

                }
              },
              fail: function (res) {
                console.log(res)
              }
            })
          },
          fail: function (res) {
            console.log(res)
          }
        })
      }
    })

    //获取微信信息
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
//获取授权
  getUserInfo: function(e) {
    var that =this
    console.log(e)
    if (e.detail.errMsg != "getUserInfo:fail auth deny"){
      app.globalData.userInfo = e.detail.userInfo
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })
      that.createUser(e);
    } else {
      // wx.switchTab({
      //   url: '../home/home',
      // })
    }
   
  },
  //创建用户
  createUser: function (e) {
    console.log(e);
    var that = this
      var oneuserinfo = {}
      oneuserinfo.wauNickname = e.detail.userInfo.nickName
      oneuserinfo.wauSex = e.detail.userInfo.gender
      oneuserinfo.wauLanguage = e.detail.userInfo.language
      oneuserinfo.wauCity = e.detail.userInfo.city
      oneuserinfo.wauProvince = e.detail.userInfo.province
      oneuserinfo.wauCountry = e.detail.userInfo.country
      oneuserinfo.wauHeadimgurl = e.detail.userInfo.avatarUrl
      oneuserinfo.wauOpenid = app.globalData.openid
      oneuserinfo.wauUnionid = app.globalData.unionid
      oneuserinfo.wauWxType = 1
      wx.request({
        url: app.globalData.url + '/wxAuthUser/createUser',
        method: 'POST',
        data: oneuserinfo,
        success: function (res) {
          console.info(res)
          app.globalData.loginId = res.data.loginId
          that.onLoad()
        }
      })
  },
})
