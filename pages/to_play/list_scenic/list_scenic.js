// pages/to_play/list_scenic/list_scenic.js
import common from './../util.js'
const app = getApp();
let [ typeName, focus, charge, name, pageNo ] = [ '', '按人气排序', '免费', '',1];

//加载活动列表
let loadmore = (that) => {
  console.log('name=' + name + 'foucus=' + focus + 'typeName=' + typeName + 'charge=' + charge + 'pageNo=' + pageNo);
  wx.request({
    url: app.globalData.url + '/place/getPlaceListByCondition',
    data: {
      name: name,
      focus: focus,
      typeName: typeName,
      charge: charge,
      loginId: app.globalData.loginId || 1,
      pageNo: pageNo,
      pageSize: 5
    },
    success: function (json) {
      // console.log(json)
      if (json.data.result.length < 5) {
        that.setData({
          bottomer: 'flex'
        })
      }
      if (json.data.result.length == 0) pageNo--;
      let activity_list = that.data.activity_list;
      activity_list.push(...json.data.result);
      that.setData({
        activity_list: activity_list
      });
      pageNo ++;
    },
  })
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false,//控制下拉列表的显示隐藏，false隐藏、true显示
    themeData: '',//下拉列表的数据
    distanceData: ['按人气排序', '按距离排序'],
    typeData: ['免费', '付费'],
    InitialIndex: 0,
    index:[0 ,0 ,0],  //选项卡索引

    //选项卡之后颜色变红
    color: ['#333333', '#333333', '#333333'],
    haszzc: 'none', //遮罩层

    //活动列表
    activity_list: [],
    bottomer: 'none',
    name: '',
    input_text: ''
  },


  onLoad: function(options) {
    //初始化搜索条件
    [typeName, focus, charge, name, pageNo] = ['', '按人气排序', '免费', '', 1];

    //接受主页的传值
    let that = this;
    if (options.typeName) {
      typeName = options.typeName;
    };
    if (options.name) {
      name = options.name;
      that.setData({
        text:name
      })
    }

    //得到主题
    wx.request({
      url: app.globalData.url + '/placeType/getTypeList/1',
      success: function(e) {
        let themeData = ['全部'];
        for (let i  in e.data.result){
          themeData.push(e.data.result[i].name);
        }
        //根据地方分类查询
        let Index = 'index[0]';
        let j = themeData.indexOf(typeName);
        if (j == -1) {j = 0};
        that.setData({
          themeData: themeData,
          [Index]: j
        })
      }
    })
  //加载活动列表
  loadmore(this);
  },
  //下拉刷新
  onPullDownRefresh: function (e) {
    pageNo = 1;
    this.setData({
      activity_list: [],
      bottomer: 'none',
    })
    loadmore(this);
    wx.stopPullDownRefresh()
  },
  //上拉触底事件
  onReachBottom:function(e) {
  loadmore(this);
  },

  //点击改变选项卡颜色
  rcolor: function(that) {
    that.setData({
      color: ['#333333', '#333333', '#333333']
    });
  },


  //改变娱乐类型
  change_theme:function() {
    let that = this;
    that.rcolor(that);
    let selectData = this.data.themeData;
    let nowIndex = 0;
    let color = 'color[' + nowIndex +']';
    if (!this.data.show ) {
      that.setData({
        show: !that.data.show,
        selectData: selectData,
        nowIndex: nowIndex,
        [color]: '#F1793E',
        haszzc: 'block'
      });
    } else {
      that.setData({
        show: !that.data.show,
        selectData: selectData,
        nowIndex: nowIndex,
        [color]: '#333333',
        haszzc: 'none'
      });
    }
  },

  //选择距离远近
  change_distance:function() {
    let that = this;
    that.rcolor(that);
    let selectData = that.data.distanceData;
    let nowIndex = 1;
    let color = 'color[' + nowIndex + ']';
    if (!that.data.show) {
      that.setData({
        show: !that.data.show,
        selectData: selectData,
        nowIndex: 1,
        [color]: '#F1793E',
        haszzc: 'block'
      });
    } else {
      that.setData({
        show: !that.data.show,
        selectData: selectData,
        nowIndex: 1,
        [color]: '#333333',
        haszzc: 'none'
      });
    }
  },

  //选择免费/收费
  change_type: function () {
    let that = this;
    that.rcolor(that);
    let selectData = that.data.typeData; 
    let nowIndex = 2;
    let color = 'color[' + nowIndex + ']';
    if (!that.data.show) {
      that.setData({
        show: !that.data.show,
        selectData: selectData,
        nowIndex: 2,
        [color]: '#F1793E',
        haszzc: 'block'
      });
    } else {
      that.setData({
        show: !that.data.show,
        selectData: selectData,
        nowIndex: 2,
        [color]: '#333333',
        haszzc: 'none'
      });
    }
  },


  // 点击下拉列表
  optionTap(e) {
    let nowIndex = this.data.nowIndex;
    let Index = e.currentTarget.dataset.index;//获取点击的下拉列表的下标
    if(nowIndex == 0) {
      if(Index == 0) {
        typeName = '';
      } else {
        typeName = this.data.themeData[Index];
      }
    } else if(nowIndex == 1) {
      focus = this.data.distanceData[Index]
      console.log(focus);
    } else if(nowIndex == 2) {
      charge = this.data.typeData[Index];
      console.log(charge);
    }
    //数据加载
    this.setData({
      activity_list: [],
      bottomer:'none'
    })
    pageNo = 1;
    loadmore(this);
   
    let index = 'index[' + nowIndex +']';
    let color = 'color[' + nowIndex + ']';
    this.setData({
      [index]: Index,
      show: !this.data.show,
      haszzc: 'none',
      [color]: '#333333'
    });
  },

  //点击遮罩层
  closezzc:function() {
    console.log(1);
    let nowIndex = this.data.nowIndex;
    let color = 'color[' + nowIndex + ']';
    this.setData({
      haszzc: 'none',
      show: !this.data.show,
      [color]: '#333333'
    })
  },

  //用户输入
  input: function (e) {
    common.input(e, this);
  },

  //搜索功能
  search: function (e) {
    [typeName, focus, charge, pageNo] = ['', '按人气排序', '免费', 1];
    let input_text = this.data.input_text;
    name = this.data.input_text;
    this.setData({
      index: [0,0,0],
      activity_list: []
    })
    loadmore(this);
  },
  
  //收藏
  change_gone_photo: function (res) {
    common.change_gone_photo(res, this);
  },

  //喜欢
  change_wanted_photo: function (res) {
    common.change_wanted_photo(res, this);
  },
  //约伴去玩
  play_with: function (e) {
    let index = parseInt(e.currentTarget.dataset.index);
    let rId = this.data.activity_list[index].id;
    let name = this.data.activity_list[index].name;
    let address = this.data.activity_list[index].address;
    common.playwith(this, rId, 2, name, address);
  },
  //转到活动详情界面
  to_detail: function (res) {
    common.to_detail(res, this);
  },
  //活动图片加载异常处理
  errImg: function (e) {
    var errorImgIndex = e.target.dataset.errorimg //获取循环的下标
    var imgObject = "activity_list[" + errorImgIndex + "].show_url" //carlistData为数据源，对象数组
    common.errorImg(this, e, imgObject);
  }
})