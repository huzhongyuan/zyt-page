const app = getApp();
const test = () =>{
  console.log(1);
};
//转到活动详情界面
const to_detail =  (e, that) => {
  //console.log(e.currentTarget.dataset.index);
  let index = parseInt(e.currentTarget.dataset.index);
  let id = that.data.activity_list[index].id;
  wx.navigateTo({
    url: '/pages/to_play/detail_Activity/detail_Activity?id=' + id,
  })
};

//收藏
const change_gone_photo = (res,that) => {
  let index = res.currentTarget.dataset.index.replace(/(^\s*)|(\s*$)/g, "");
  let p = 'activity_list[' + index + '].gone_photo';
  let checkgone = (that.data.activity_list[index].markType == 1) ? true : false;
  let hasgone = 'activity_list[' + index + '].markType';
  if (!checkgone) {
    wx.request({
      url: app.globalData.url + '/placeUser/markPlace',
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      data: {
        placeId: that.data.activity_list[index].id,
        loginId: app.globalData.loginId || 315,
        type: 1
      },
      success: function (json) {
        console.log(json)
         that.setData({
           [p]: '/images/icon/collection.png',
           [hasgone]: 1
         });
      }
    })

  } else {
  }
};


//喜欢
const change_wanted_photo = (res,that) => {
  let index = res.currentTarget.dataset.index.replace(/(^\s*)|(\s*$)/g, "");
  let { checkwanted, haswanted, p } = {};
  checkwanted = that.data.activity_list[index].markType == 2? true: false;
  haswanted = 'activity_list[' + index + '].markType';
  p = 'activity_list[' + index + '].wanted_photo';
  if (!checkwanted) {
    wx.request({
      url: app.globalData.url + '/placeUser/markPlace',
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      data: {
        placeId: that.data.activity_list[index].id,
        loginId: app.globalData.loginId || 315,
        'type': 2
      },
      success: function(json) {
        console.log(json);
        that.setData({
          [p]: '/images/icon/wanted.png',
          [haswanted]: 2
        });
      }
    })
  } else {

  }
};


//用户输入保存文本
const input = (e, that) => {
  that.setData({
    input_text: e.detail.value
  });
  // console.log(that.data.input_text);
};


//搜索
const search = (e, that) => {
  //输入验证不能为空
  // if (that.data.input_text) {
    if(!that.data.input_text) {
      that.setData({
        input_text: ''
      })
    }
    wx.navigateTo({
      url: '/pages/to_play/list_scenic/list_scenic?name=' + that.data.input_text,
    })
  // }
};


//调用地图API
const toMap = (that, rId, rType) => {
  // wx.navigateTo({
  //   url: '/pages/to_play/map/map',
  // })
  console.log('rId=' + rId + ',rType=' + rType);
  wx.request({
    url: app.globalData.url + '/mapAddress/getMapAddress',
    data: {
      rId: rId,
      rType: rType
    },
    success:function(e) {
      console.log(e);
      let latitude = parseFloat(e.data.result.lat);
      let longitude = parseFloat(e.data.result.lng);
      console.log('latitude=' + latitude + ',longitude' + longitude);
      wx.openLocation({
        latitude: latitude,
        longitude: longitude,
        scale: 18
      })
    }
  })
  // wx.getLocation({
  //   type: 'gcj02', //返回可以用于wx.openLocation的经纬度
  //   success: function (res) {
  //     console.log(res);
  //     var latitude = res.latitude
  //     var longitude = res.longitude
  //   }
  // })
};

//分享
const share = (that) => {
  return {
    title: '周游团分享',
    desc: '自定义分享描述',
    path: '/pages/to_play/detail_Activity/detail_Activity?id'
  }
};

//我想去玩
const wanttoplay = (that, placeId) => {
  wx.request({
    url: app.globalData.url + '/placeUser/markPlace',
    data: {
      loginId: app.globalData.loginId || 315,
      placeId: placeId,
      'type': 2
    },
    success:function(json) {
      wx.showToast({
        title: '收藏成功',
        icon: 'succes',
        duration: 1000,
        mask: true
      })
    }
  })
};

//约伴去玩
const playwith = (that, rId, rType, name, address, imgUrl) => {
  wx.request({
    url: app.globalData.url + '/mapAddress/getMapAddress',
    data: {
      rId: rId,
      rType: rType
    },
    success: function (e) {
      console.log(e);
      let latitude = parseFloat(e.data.result.lat);
      let longitude = parseFloat(e.data.result.lng);
      console.log('latitude=' + latitude + ',longitude' + longitude);
      wx.navigateTo({
        url: '/pages/add/add?name=' + name + '&address=' + address + '&latitude=' + latitude + '&longitude=' + longitude + "&imgUrl=" + imgUrl,
      })
    }
  })
};

//图片异常处理
const errorImg = (that, e, imgObject) => {
  var errorImg = {}
  errorImg[imgObject] = "http://manage.watx365.com/img/zwimg.png" //我们构建一个对象
  that.setData(errorImg) //修改数据源对应的数据
};
//图片未传值处理
const noneImg = (that,e) => {
  for (let i in e.data.result) {
    if (!e.data.result[i].show_url) e.data.result[i].show_url = false;
  }
  return e;
};
//时间戳转换时间
const formatDateTime = (inputTime) => {
    var datetimes = inputTime.replace(/\-/g, "/")
    var date = new Date(datetimes);
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
//时间戳转换时间
const formatDateTimeNotReplace = (inputTime) => {
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

//时间戳(日期时间)转换成日期
const formatDate = (inputTime) => {
    var datetimes = inputTime.replace(/\-/g, "/")
    var date = new Date(datetimes);
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    var d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    return y + '-' + m + '-' + d;
};

 module.exports = {
  test: test, //测试
  to_detail: to_detail, //转到活动详情
  change_gone_photo: change_gone_photo, //收藏
  change_wanted_photo: change_wanted_photo, //喜欢
  input: input, //用户输入保存文本
  search: search, //搜索
  share:share,//分享
  toMap: toMap, //地图
  wanttoplay: wanttoplay,//我想去玩
  playwith: playwith,//约伴去玩
  errorImg: errorImg,//图片异常处理
  noneImg: noneImg,//图片未传值处理
  formatDateTime:formatDateTime,//日期时间转换
  formatDate:formatDate,//日期转换
  formatDateTimeNotReplace:formatDateTimeNotReplace,//日期转换
}