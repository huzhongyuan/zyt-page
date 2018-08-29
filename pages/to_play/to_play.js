// pages/to_play/to_play.js
const app = getApp();
import common from './util.js'
let pageNo = 1; // 主页页数
let name = '推荐';

//加载活动数据
let loadmore = (that) => {
  if (!that.data.isbottom) {
    wx.showLoading({
      title: '加载中',
    })
  }

  wx.request({
    url: app.globalData.url + '/place/getPlaceListByCondition',
    data: {
      loginId: app.globalData.loginId || 1,
      pageNo: pageNo,
      pageSize: 5,
      name: name,
      input_text: ' '
    },
    success: function (e) {
      e = common.noneImg(that,e)
      console.log(e.data.result);
      if(e.data.result.length < 5) {
        that.setData({
          bottomer: 'flex',
            isbottom: true
        })
      }

      if(e.data.result.length == 0 ){
        pageNo--;

      }


      let activity_list = that.data.activity_list;
      activity_list.push(...e.data.result);
      that.setData({
        activity_list: activity_list
      });
      pageNo++;
      wx.hideLoading();
    }
  })
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bottom: '0rpx',
    bottomer: 'none',
    activity_list: [],
    isbottom: false
  //搜索框文本数据
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
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
  },
  onShow:function() {
    // wx.showLoading({
    //   title: '加载中',
    // })
  },
  //下拉刷新
  onPullDownRefresh:function(e){
        wx.showLoading({
      title: '加载中',
    })
    pageNo = 1;
    this.setData({
      activity_list: [],
      bottomer: 'none',
    })
    loadmore(this);
    wx.stopPullDownRefresh()
  },
  //上拉触底事件: 
  onReachBottom:function(e) {
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
    let index = parseInt(e.currentTarget.dataset.index);
    console.log(index);
    let rId = this.data.activity_list[index].id;
    let name = this.data.activity_list[index].name;
    let address = this.data.activity_list[index].address;
    common.playwith(this, rId, 2, name, address);
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
      activity_list: [],
      isbottom:false
    })
    let index = parseInt(e.currentTarget.dataset.index);
    name = that.data.content_nav[index].name;
    loadmore(this);
  },

  //创建活动
  creat: function(e) {
      wx.navigateTo({
        url: './../add/add',
      })
  },

  //主题活动图片加载异常处理
  errImg1: function (e) {
    var errorImgIndex = e.target.dataset.errorimg //获取循环的下标
    var imgObject = "all_theme[" + errorImgIndex + "].imgUrl" //carlistData为数据源，对象数组
    common.errorImg(this, e, imgObject);
  },
  //活动图片加载异常处理
  errImg: function (e) {
    var errorImgIndex = e.target.dataset.errorimg //获取循环的下标
    var imgObject = "activity_list[" + errorImgIndex + "].show_url" //carlistData为数据源，对象数组
    common.errorImg(this, e, imgObject);
  }
})