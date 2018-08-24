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
    let that = this;
    wx.request({
      url: app.globalData.url + '/placeProject/getProjectDetailById/'+ (options.id || 4),
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (json) {
        // console.log(json.data);
        that.setData({
          detail: json.data.result[0]
        })
        if(!that.data.detail.show_url) {
          let url = 'detail.show_url';
          that.setData({
            [url]: '1.png'
          })
        }
        //详情转换为富文本
        let article = json.data.result[0].description;
        WxParse.wxParse('article', 'html', article, that, 5);
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
    common.toMap(this, this.data.detail.id, 1);
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
    console.log(this.data.detail);
    let rId = this.data.detail.id;
    let name = this.data.detail.name;
    let address = this.data.address;
    common.playwith(this, rId, 2, name, address);
  },
  //背景图片加载异常处理
  errImg: function (e) {
    var imgObject = "detail.show_url" //carlistData为数据源，对象数组
    common.errorImg(this, e, imgObject);
  },
})