// pages/to_play/detail_Activity/detail_Activity.js
import common from './../util.js'
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

    //活动详情数据
    detail: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.mapCtx = wx.createMapContext('myMap');
    //console.log(options.id);
    let that = this;
    wx.request({
      url: app.globalData.url + '/place/getPlaceDetail/'+ (options.id || 7),
      success: function (json) {
        //console.log(json);
        that.setData({
          detail: json.data.result[0]
        })
      }
    })

    wx.request({
      url: app.globalData.url + '/placeProject/getProjectByPlaceId/6',
      success: function(e) {
        //console.log(e.data.result);
        let item_list = [];
        item_list.push(...e.data.result);
        console.log(item_list);
        that.setData({
          item_list: item_list
        })
      }
    })
  },


  //转到地图界面
  toMap: function (e) {
    common.toMap();
  },
  //转到可以去玩的项目
  to_detail:function(e) {
    let that = this;
    let index = parseInt(e.currentTarget.dataset.index);
    let id = that.data.item_list[index].id;
    wx.navigateTo({
      url: '/pages/to_play/detail_item/detail_item?id=' + id,
    })
  },
  //我想去玩
  want_play: function(e) {
    let id = this.data.detail.id;
    common.wanttoplay(this, id);
  },
  //约伴去玩
  play_with: function(e) {
    common.playwith(this);
  },
  //分享功能
  onShareAppMessage: function () {
    common.share(this);
  }

})