// pages/to_play/map/map.js
import common from './../util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    reback: false
  },
  onReady: function (e) {
    //this.mapCtx = wx.createMapContext('myMap');
    this.onLoad();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: function (res) {
        console.log(res);
        var latitude = res.latitude
        var longitude = res.longitude
        wx.openLocation({
          latitude: latitude,
          longitude: longitude,
          scale: 18
        })
      }
    })
  },

})