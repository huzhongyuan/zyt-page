const app = getApp()
var Util = require('../../utils/util.js');
Page({
  data: {
    phonenumber: '关联微信手机',
    inputValue: '',
    inputwacat: '',
    Inputnumber:'',
    img:'../../images/addbci.png',
    date: '',
    time: '08:00',
    time2: '18:00',
    date2: '',
    address:{'name':'选择地址'},
    userinfo:{},
    payMethod:[],
    payMethodd:0,
    classkind:[],
    classid:[],
    classkindd:0,
    details:{'name':'填写详情','btn':'to_details'},
    imagesid:'',
    open: ''
  },
  to_details:function(){
      wx.navigateTo({
        url: 'add_details/add_details',
      })
  },
  bindpayMethodChange: function (e) {
    var payMethodd = this.data.payMethodd
    var payMethod = this.data.payMethod
    // console.log('居住地发送选择改变，携带值为', e.detail.value)
    this.setData({
      payMethodd: e.detail.value
    })
    console.log(payMethod[e.detail.value])
  },
  bindpayclasskind: function (e) {
    var classkind = this.data.classkind
    var classkindd = this.data.classkindd
    // console.log('居住地发送选择改变，携带值为', e.detail.value)
    this.setData({
      classkindd: e.detail.value
    })
    console.log(classkindd[e.detail.value])
  },
  bindKeyInput: function (e) {
    var inputValue = this.data.inputValue
    this.setData({
      inputValue: e.detail.value
    })
    // console.log(inputValue)
  },
  Inputnumber: function(e) {
    var Inputnumber = this.data.Inputnumber
    this.setData({
      Inputnumber: e.detail.value
    })
    // console.log(inputValue)
  },
  bindTimeChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      time: e.detail.value
    })
  },

  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  bindTimeChange2: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      time2: e.detail.value
    })
  },
  bindDateChange2: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date2: e.detail.value
    })
  },
  choisemap: function (e) {
    var that = this;
    var address = this.data.address;
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userLocation']) {
          that.setData({
            open: ''
          })
          wx.chooseLocation({
            success: function (res) {
              console.log(res)
              address.name = res.name
              address.address = res.address
              address.latitude = res.latitude
              address.longitude = res.longitude
              that.setData({
                address: address
              });

            },
            fail: function (e) {
            }
          })
        } else {
          wx.authorize({
            scope: 'scope.userLocation',
            success() {
              that.setData({
                open: ''
              })
              // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
              wx.chooseLocation({
                success: function (res) {
                  console.log(res)
                  address.name = res.name
                  address.address = res.address
                  address.latitude = res.latitude
                  address.longitude = res.longitude
                  that.setData({
                    address: address
                  });
                },
                fail: function (e) {
                  console.log(e)
                }
              })
            },
            fail:function(e) {
              that.setData({
                open: 'openSetting'
              })
            }
          })
        }
      }
    })

  },
  openset:function(e) {
    console.log(e);
    let that = this;
    var address = this.data.address;
    if (e.detail.authSetting['scope.userLocation']){
      that.setData({
        open: ''
      })
      wx.chooseLocation({
        success: function (res) {
          console.log(res)
          address.name = res.name
          address.address = res.address
          address.latitude = res.latitude
          address.longitude = res.longitude
          that.setData({
            address: address
          });
        },
        fail: function (e) {
          console.log(e)
        }
      })
    }
  },
  onShow: function () {
    var that = this
    var userinfo = this.data.userinfo
    var details = this.data.details
    wx.request({
      url: app.globalData.url + '/wxAuthUser/userInfo',
      data: {
        loginId: app.globalData.loginId
      },
      success: function (res) {
        console.log(res)
        userinfo = res.data.result
        that.setData({
          userinfo:userinfo
        })
      },
      fail: function (e) {
        console.log(e)
      }
    })

    wx.getStorage({
      key: 'details',
      success: function(res) {
        console.log(res)
        if(res.data.text != ''){
          details.name = '修改'
        }
        that.setData({
          details: details
        })
      },fail:function(){
          details.name = '填写详情'
        that.setData({
          details: details
        })
      }
    })
  },
  getUserInfo: function (e) {
    var userinfo = this.data.userinfo
    var inputValue = this.data.inputValue
    var address = this.data.address
    var img = this.data.img
    var details = this.data.details    
    var that = this
    console.log(e)
    if (e.detail.errMsg == 'getUserInfo:fail auth deny'){

    } else {
      console.log(e);
      if (!userinfo.email) {
        wx.navigateTo({
          url: '../my/my_info/my_info',
        })
      }
    } 
  },
  getPhoneNumber: function (e) {
    var that = this
    console.log(e)
    console.log(app.globalData.session_key)
    console.log(e.detail.iv)
    console.log(e.detail.encryptedData)
    var iv = e.detail.iv
    var encryptedData = e.detail.encryptedData
    wx.request({
      url: app.globalData.url + '/wxAuthUser/getPhone',
      // header: { "Content-Type": "application/x-www-form-urlencoded" },
      // method: "POST",
      data: {
        encryptData: encryptedData,
        iv: iv,
        sessionKey: app.globalData.session_key,
      },
      success: function (res) {
        // console.log(res)
        var phonenumber = that.data.phonenumber
        phonenumber = res.data
        that.setData({
          phonenumber: phonenumber
        })
      },
      fail: function (e) {
        console.log(e)
      }
    })
  },

  // 添加图片
  add_img: function (res) {
    var imagesid = this.data.imagesid
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
 
        img = res.tempFilePaths[0]
        // console.log(img[i])
that.setData({
  img:img
})
      }
    })

  },
  asdk:function(){
    // 上传至服务器
    var imagesid = this.data.imagesid

    
    var userinfo = this.data.userinfo
    var inputValue = this.data.inputValue
    var address = this.data.address
    var img = this.data.img
    var details = this.data.details
    var Inputnumber = this.data.Inputnumber 
    var payMethodd = this.data.payMethodd
    var that = this
    var adsasdasdas = ''
    var address = that.data.address
    var classkind = this.data.classkind
    var classkindd = this.data.classkindd
    var classid = this.data.classid
    if (inputValue == '') {
      wx.showToast({
        title: '标题不能为空',
        duration: 2000
      })
    } else if (img == '../../images/addbci.png') {
      wx.showToast({
        title: '没有活动图片',
        duration: 2000
      })
    } else if (Inputnumber == '') {
      wx.showToast({
        title: '请输入活动人数',
        duration: 2000
      })
    } else if (address.name == '选择地址') {
      wx.showToast({
        title: '还没有选择地址哦',
        duration: 2000
      })
    } else if (details.name == '填写详情') {
      wx.showToast({
        title: '还没有填写详情哦',
        duration: 2000
      })
    } else  if (userinfo.email == '') {
      wx.navigateTo({
        url: '../my/my_info/my_info',
      })
    } else if (classkind[classkindd] == '未选择') {
      wx.showToast({
        title: '未选择活动类别',
        duration: 2000
      })
    }
     else {
    wx.showLoading({
      title: '上传中',
    })
      wx.uploadFile({
        url: app.globalData.url + '/attachment/uploadImages',
        filePath: img,
        name: 'file',
        formData: {
          'user': 'test'
        },
        success: function (res) {
          res.data = res.data.replace(/\ufeff/g, "");
          res.data = JSON.parse(res.data);
          console.log(typeof (res.data));
          console.log(res.data.success);
          if (res.data.success == true){
            console.log(111111111111111111111111111111111);
              imagesid = res.data.result[0].attachemId

              //上传活动
              wx.getStorage({
                key: 'details',
                success: function (res) {
                  adsasdasdas = res.data.text
                  var serviceRecord = {}
                  serviceRecord.beginTime = that.data.date + ' ' + that.data.time + ':00'
                  serviceRecord.endTime = that.data.date2 + ' ' + that.data.time2 + ':00'
                  serviceRecord.maleLimit = that.data.Inputnumber
                  serviceRecord.title = that.data.inputValue
                  serviceRecord.place = that.data.address.address
                  serviceRecord.charge = that.data.payMethod[payMethodd]
                  serviceRecord.details = adsasdasdas
                  serviceRecord.imgId = imagesid
                  serviceRecord.classId = classid[classkindd]
                  wx.request({
                    url: app.globalData.url + '/activity/createActivity/' + app.globalData.loginId + '/' + address.latitude + '/' + address.longitude,
                    data: serviceRecord,
                    method: "POST",
                    success: function (res) {
                      if(res.data.success == true) {
                        console.log(res)
                        wx.hideLoading()
                        wx.showModal({
                          title: '提示',
                          content: res.data.msg,
                          showCancel: false,
                          success: function () {
                            wx.navigateBack({ changed: true });//返回上一页
                          }
                        })
                      } else {
                        wx.hideLoading()
                        wx.showModal({
                          title: '提示',
                          content: res.data.msg,
                          showCancel: false,
                        })
                      }

                    },
                    fail: function (res) {
                      wx.hideLoading();
                      wx.showModal({
                        title: '提示',
                        content: res.data.msg,
                        showCancel: false,
                      })
                      console.log(res)
                    }
                  })
                }
              })
          } else{
            wx.hideLoading()
            console.log(res)
            wx.showModal({
              title: '提示',
              content: res.data.msg,
              showCancel:false,
            })
         
          }
       
        }
      })

   
    }
  },
  onLoad:function(options){
    console.log('1111111111' + options.name + options.address + options.latitude + options.longitude);
    if(options.name) {
      let address = {};
      address.name = options.name;
      address.address = options.address;
      address.latitude = options.latitude;
      address.longitude = options.longitude;
      this.setData({
        address: address
      })
    }
    var date = this.data.date
    var date2 = this.data.date2
    var timestamp = Date.parse(new Date());
    timestamp = timestamp / 1000;
    console.log("当前时间戳为：" + timestamp);
    //获取当前时间  
    var n = timestamp * 1000;
    var date = new Date(n);
    //年  
    var Y = date.getFullYear();
    //月  
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    //日  
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    //时  
    var h = date.getHours();
    //分  
    var m = date.getMinutes();
    //秒  
    var s = date.getSeconds();
    console.log("当前时间：" + Y + '-' + M+'-' + D );  
    date = Y + '-' + M + '-' + D
    date2 = Y + '-' + M + '-' + D
    this.setData({
      date:date,
      date2:date2
    })
    // 加载费用方式
    var payMethod = this.data.payMethod
    var that =this
    wx.request({
      url: app.globalData.url + '/sysDictionary/getDicByKeytable',
      data: {
        Keytable: 'payMethod',
      },
      success: function (res) {
        console.log(res)
        for (var v = 0; v < res.data.length; v++) {
          if (res.data[v].keyTable == 'payMethod') {
            var some = payMethod.length
            payMethod[some] = res.data[v].keyValue
          }
        }
        that.setData({
          payMethod: payMethod,
        })
      },
      fail: function (res) {
        console.log(res)
      }
    })
    // 加载活动类别
    var classkind = this.data.classkind
    var classid = this.data.classid
    wx.request({
      url: app.globalData.url + '/activityCalss/getActClass',
      success: function (res) {
        console.log(res)
        classkind[0] = '未选择'       
        for (var v = 0; v < res.data.result.length; v++) {
            var some = classkind.length
            classkind[some] = res.data.result[v].name
            classid[some] = res.data.result[v].id
        }
        that.setData({
          classkind: classkind,
          classid: classid
        })
      },
      fail: function (res) {
        console.log(res)
      }
    })
  }

})