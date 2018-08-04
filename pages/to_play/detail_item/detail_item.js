// pages/to_play/detail_Activity/detail_Activity.js
import common from './../util.js';
const app = getApp();
var WxParse = require('./../../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //项目详情数据
    detail: '',
    address: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //创建地图
    this.mapCtx = wx.createMapContext('myMap');
    
    console.log(options.id)
    let that = this;
    wx.request({
      url: app.globalData.url + '/placeProject/getProjectDetailById/'+ (options.id || 4),
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (json) {
        console.log(json.data);
        that.setData({
          detail: json.data.result[0]
        })
        let article = json.data.result[0].description;
        WxParse.wxParse('article', 'html', article, that, 5);
        // WxParse.wxParse('article', 'html', json.data.result[0], that, 5)
        //查询地点
        let place_id = json.data.result[0].place_id;
        wx.request({
          url: app.globalData.url + '/place/getPlaceDetail/'+ place_id,
          success: function(e) {
            that.setData({
              address: e.data.result[0].address
            })
          }
        })

      }
    })
  },

  //转到地图界面
  toMap: function (e) {
    common.toMap();
  },

  //分享功能
  onShareAppMessage: function () {
    common.share(this);
  },
  
  //我想去玩
  want_play: function (e) {
    let place_id = this.data.detail.place_id;
    common.wanttoplay(this, place_id);
  },
  //约伴去玩
  play_with: function (e) {
    common.playwith(this);
  }
})