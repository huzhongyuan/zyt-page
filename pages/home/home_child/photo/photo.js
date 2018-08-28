// pages/home/home_child/photo/photo.js
var app = getApp()
import com from '../../../../pages/to_play/util.js'
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
    classId:'',
    imagesid:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  // 添加图片
  addimagssss: function(res) {
    let that = this;
    let classId = that.data.classId;

    new Promise((resolve, reject) => {
      // 是否报名
      wx.request({
        url: app.globalData.url + '/activity/haveEntered/' + app.globalData.loginId + '/' + classId,
        success: function (res) {
          console.log(res);
          if (res.data.success == false) {
            wx.showModal({
              title: '提示',
              content: res.data.msg,
              showCancel: false
            })
          } else {
            resolve(1);
          }
        },
        fail: function (e) {
          console.log(e)
        }
      })
    }).then((r) => {
      var imagesid = this.data.imagesid
      var img = this.data.img
      // console.log(i)
      wx.chooseImage({
        count: 9, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
          console.log(res)
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          var tempFilePaths = res.tempFilePaths
          wx.showLoading({
            title: '上传中',
            duration: 1000,
          })
          // 上传至服务器\
          var asd = ''
          for (var t = 0; t < res.tempFilePaths.length; t++) {
            asd = res.tempFilePaths[t]
            wx.uploadFile({
              url: app.globalData.url + '/attachment/uploadImages',
              filePath: asd,
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
                jsonStr = jsonStr.replace(/\ufeff/g, "");
                var jj = JSON.parse(jsonStr);
                e.data = jj;
                if (e.data.success == true) {
                  imagesid = imagesid + ',' + e.data.result[0].attachemId;
                  console.log(imagesid);
                  that.setData({
                    imagesid: imagesid,
                  })
                  img = res.tempFilePaths[0]
                  // console.log(img[i])
                  that.setData({
                    img: img,
                  })
                  setTimeout(function () {
                    that.asdaasda()
                  }, 1000);
                } else {
                  wx.hideLoading();
                  console.log(res.data.msg);
                  wx.showModal({
                    title: '提示',
                    content: e.data.msg,
                    showCancel: false
                  })

                }
              },
              fail: function (res) {
                console.log(res);
                console.log(res.data.msg);
              }
            })
          }

        }
      })
    })



    console.log('upload');



  },

  asdaasda:function(e){
    var imagesid = this.data.imagesid
    var classId = this.data.classId
    var classid = this.data.classid
    imagesid = imagesid.replace(',', '')
    console.log(imagesid);
    imagesid = parseInt(imagesid);
    console.log(typeof (imagesid));
    wx.request({
      url: app.globalData.url + '/activityComment/saveActivityCommentImages',
      data: {
        ids: imagesid,
        activityId: classId,
        loginId: app.globalData.loginId
      },
      success: function (res) {
        console.log(typeof(res.data))
        if(res.data.success == true) {
          console.log(res);
          wx.hideLoading()
          wx.navigateBack({})
        } else {
          console.log(res.data.msg);
          wx.showModal({
            title: '提示',
            content: res.data.msg,
            showCancel: false
          })
        }

      },
      fail: function (res) {
        console.log(res)
        wx.showModal({
          title: '提示',
          content: res.data.msg,
          showCancel: false,
        })
      }
    })
  },
  to_child:function(e){
    var classId = this.data.classId    
    console.log(e.currentTarget.id)
    wx.navigateTo({
      url: 'photo_child/photo_child?loginid=' + e.currentTarget.id + '&classid=' + classId,
    })
  },
  onLoad: function (options) {
    var that= this
    var classId = this.data.classId;
    classId = options.classId
    this.setData({
      classId: classId
    })
    //活动照片
    var imgarray = this.data.imgarray
    wx.request({
      url: app.globalData.url + '/activityComment/getImagesByActivityId',
      data: {
        activityId: options.classId,
        pageNo: 1,
        pageSize: 5,
      },
      success: function (res) {
        console.log('活动图片')
        console.log(res)
        for (var a = 0; a < res.data.result.length; a++) {
          res.data.result[a].gmt_create = formatDateTime(res.data.result[a].gmt_create)
        }
        imgarray = res.data.result
        console.log(imgarray);
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  praise:function(e){
    var classId = this.data.classId    
    var imgarray = this.data.imgarray
    var that = this
    wx.request({
      url: app.globalData.url + '/activityPraise/praise/' + e.currentTarget.id + '/' + classId + '/' + app.globalData.loginId,
      success: function (res) {
        console.log(res)
        if(res.data.msg == "点赞成功"){
          for (var t = 0; t < imgarray.length;t++){
            if (imgarray[t].id == e.currentTarget.id ){
              imgarray[t].praise +=1
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
  },
  //图片异常处理
  errImg: function (e) {
    var errorImgIndex = e.target.dataset.errorimg //获取循环的下标
    var imgObject = "imgarray[" + errorImgIndex + "].show_url" //carlistData为数据源，对象数组
    com.errorImg(this, e, imgObject);
  }
})