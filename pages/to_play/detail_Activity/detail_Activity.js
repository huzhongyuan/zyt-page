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
    //创建地图
    this.mapCtx = wx.createMapContext('myMap');
    let that = this;

    //获取活动详情
    wx.request({
      url: app.globalData.url + '/place/getPlaceDetail/'+ (options.id || 7),
      success: function (json) {
        console.log(json);
        json = common.noneImg(that, json);
        that.setData({
          detail: json.data.result[0]
        })
      }
    })

    //获取项目列表
    wx.request({
      url: app.globalData.url + '/placeProject/getProjectByPlaceId/6',
      success: function(e) {
        console.log(e.data.result);
        let item_list = [];
        item_list.push(...e.data.result);
        // console.log(item_list);
        that.setData({
          item_list: item_list
        })
        for (let i in that.data.item_list) {
          let url = that.data.item_list[i].show_url;
          if (!url) {
            let src = 'item_list['+ i + '].show_url';
            that.setData({
              [src]: '1.png'
            })
          }
        }
 
        // that.setData({
        //   [src]: '1.png'
        // })
      }
    })
  },


  //转到地图界面
  toMap: function (e) {
    common.toMap(this, this.data.detail.id, 2);
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
    console.log(this.data.detail);
    let rId = this.data.detail.id;
    let name = this.data.detail.name;
    let address = this.data.detail.address;
    common.playwith(this, rId, 2, name, address);
  },
  //分享功能
  onShareAppMessage: function () {
    common.share(this);
  },
  //背景图片加载异常处理
  errImg: function (e) {
    var imgObject = "detail.show_url" //carlistData为数据源，对象数组
    common.errorImg(this, e, imgObject);
  },
  //活动图片加载异常处理
  errImg1: function (e) {
    var errorImgIndex = e.target.dataset.errorimg //获取循环的下标
    var imgObject = "item_list[" + errorImgIndex + "].show_url" //carlistData为数据源，对象数组
    common.errorImg(this, e, imgObject);
  }
})