// pages/to_play/to_play.js
const app = getApp();
import common from './util.js'
let pageNo = 1; // 主页页数
let name = '推荐';
let loadmore = (that) => {
  console.log('页数'+pageNo  + ' ' + name);
  wx.request({
    url: app.globalData.url + '/place/getPlaceListByCondition',
    data: {
      loginId: app.globalData.loginId || 1,
      pageNo: pageNo,
      pageSize: 5,
      name: name
    },
    success: function (e) {
      if(e.data.result.length < 5) {
        that.setData({
          bottomer: 'flex'
        })
      }
      let activity_list = that.data.activity_list;
      activity_list.push(...e.data.result);
      that.setData({
        activity_list: activity_list
      });
      pageNo++;
    }
  })
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    animation: 1,
    bottom: '20rpx',
    bottomer: 'none',
    activity_list: []
  //搜索框文本数据
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {  
    let that = this;
    pageNo = 1;
    //得到地方分类
    wx.request({
      url: app.globalData.url + '/placeType/getTypeList/1',
      success:function (e) {
        that.setData({
          all_theme: e.data.result
        })
      }
    })
    //查询候选词条
    wx.request({
      url: app.globalData.url + '/place/getPreSearchList',
      success:function(e) {
        that.setData({
          hot_list:e.data.result
        })
      }
    })

    //根据父级ID得到标签
    wx.request({
      url: app.globalData.url + '/tag/getTagListByParent/5',
      success: function(e) {
        that.setData({
          content_nav: e.data.result
        })
      }
    })
    //得到游玩列表
    console.log()
    loadmore(this);
    // wx.request({
    //   url: 'https://easy-mock.com/mock/5b51d3d69ce5fe26a0a30475/to_play',
    //   method: 'GET',
    //   header: {
    //     'content-type': 'application/json' // 默认值
    //   },
    //   success: function(json) {
    //     //console.log(json);
    //     that.setData({
    //       // all_theme: json.data.all_theme,
    //       //hot_list: json.data.hot_list,
    //       //content_nav: json.data.content_nav,
    //       //activity_list: json.data.activity_list
    //     })
    //   }
    // });
  },
  //上拉触底事件: 
  onReachBottom:function(e) {
    // console.log(1);
    // let that = this;
    // wx.request({
    //   url: app.globalData.url + '/place/getPlaceListByCondition',
    //   data: {
    //     loginId: app.globalData.loginId || 1,
    //     pageNo: pageNo,
    //     pageSize: 5,
    //     name: name
    //   },
    //   success: function (e) {
    //     if (e.data.result.length < 5) {
    //       that.setData({
    //         bottomer: 'flex'
    //       })
    //     }
    //     let activity_list = that.data.activity_list;
    //     activity_list.push(...e.data.result);
    //     that.setData({
    //       activity_list: activity_list
    //     });
    //     pageNo ++;
    //   }
    // })
    loadmore(this);
  },
    //转到项目详情
  to_item: function(e) {
    let index = parseInt(e.currentTarget.dataset.index);
    wx.navigateTo({
      url: './list_scenic/list_scenic?typeName=' + this.data.all_theme[index].name
    })
  },

  //用户输入
  input: function(e) {
    common.input(e,this);
  },

  //搜索功能
  search: function(e) {
    common.search(e, this);
  },
  //收藏
  change_gone_photo: function (res) {
    common.change_gone_photo(res,this);
  },

  //喜欢
  change_wanted_photo: function (res) {
    common.change_wanted_photo(res,this);
  },

  //转到活动详情界面
  to_detail: function(res) {
    common.to_detail(res,this);
  },
  //约伴去玩
  play_with: function (e) {
    common.playwith(this);
  },
  //转到某一热门景点
  to_hot_item: function(e) {
    let that = this;
    let index = parseInt(e.currentTarget.dataset.index);
    wx.navigateTo({
      url: '/pages/to_play/list_scenic/list_scenic?name=' + this.data.hot_list[index].name
    })
  },

  //推荐景点
  to_content_nav: function(e) {
    //console.log(e.currentTarget.dataset.index);
    pageNo = 1;
    let that = this;
    that.setData({
      bottomer: 'none',
      activity_list: []  
    })
    let index = parseInt(e.currentTarget.dataset.index);
    name = that.data.content_nav[index].name;
    //console.log(index + name);
    loadmore(this);
    // wx.request({
    //   url: app.globalData.url + '/place/getPlaceListByCondition',
    //   method: 'GET',
    //   header: {
    //     'content-type': 'application/json' // 默认值
    //   },
    //   data: {
    //     loginId: app.globalData.loginId || 315,
    //     pageNo: pageNo,
    //     pageSize: 5,
    //     name: name
    //   },
    //   success: function (json) {
    //     if( json.data.result.length < 5) {
    //       that.setData({
    //         bottomer: 'flex'
    //       })
    //     }
    //     that.setData({
    //       activity_list: json.data.result
    //     })
    //   }
    // })
  },

  //淡入淡出动画效果
  creat: function(e) {
    // console.log(1);
    //   let Fadeflag = true;
    //   let num = 10;
    //   let bt = 20;
    //   let that =  this;
    //   if (Fadeflag) {
    //     var st = setInterval(function () {
    //       num--;
    //       bt = bt - 2;
    //       Fadeflag = false;
    //       that.setData({
    //         animation: (num / 10),
    //         bottom: bt + 'rpx'
    //       })
    //       if (num <= 0) {
    //         clearInterval(st);
    //         Fadeflag = true;
    //       }
    //     }, 30);
    //   }
      wx.navigateTo({
        url: './../add/add',
      })
  },

  //淡出效果
  // out:function(e) {
  //   let Fadeflag = true;
  //   let num = 0;
  //   let bt = 0;
  //   let that = this;
  //   if (Fadeflag) {
  //     var st = setInterval(function () {
  //       num++;
  //       bt = bt + 2;
  //       Fadeflag = false;
  //       that.setData({
  //         animation: (num / 10),
  //         bottom: bt + 'rpx'
  //       })
  //       if (num >= 10) {
  //         clearInterval(st);
  //         Fadeflag = true;
  //       }
  //     }, 30);
  //   }
  // }
})