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



//点击收藏/喜欢数据请求
// const rq = (that ,id, url) => {
//   wx.request({
//     url: url,
//     data: {
//       id: id
//     },
//     dataType: 'get',
//     header: {
//       'content-type': 'application/json' // 默认值
//     },
//     success: function(json) {
//       console.log('success');
//     }
//   })
// };


//收藏
const change_gone_photo = (res,that) => {
  let index = res.currentTarget.dataset.index.replace(/(^\s*)|(\s*$)/g, "");
  let p = 'activity_list[' + index + '].gone_photo';
  let checkgone = (that.data.activity_list[index].markType == 1) ? true : false;
  console.log(checkgone)
  let hasgone = 'activity_list[' + index + '].markType';
  console.log(that.data.activity_list[index].id);
  //console.log(app.globalData.loginId);
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
    // wx.request({
    //   url: app.globalData.url + '/placeUser/markPlace',
    //   method: 'GET',
    //   header: {
    //     'content-type': 'application/json' // 默认值
    //   },
    //   data: {
    //     placeId: that.data.activity_list[index].id,
    //     loginId: app.globalData.loginId || 315,
    //     type: ''
    //   },
    //   success: function (json) {
    //     console.log(json);
    //     if (json.data.success) {
    //       that.setData({
    //         [p]: '/images/icon/uncollection.png',
    //         [hasgone]: ''
    //       });
    //     }
    //   }
    // })
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
    // wx.request({
    //   url: app.globalData.url + '/placeUser/markPlace',
    //   method: 'GET',
    //   header: {
    //     'content-type': 'application/json' // 默认值
    //   },
    //   data: {
    //     placeId: that.data.activity_list[index].id,
    //     loginId: app.globalData.loginId,
    //     'type': ''
    //   },
    //   success: function (json) {
    //     console.log(json.data.data);
    //     that.setData({
    //       [p]: '/images/icon/want.png',
    //       [haswanted]: false
    //     })
    //   }
    // })

  }
};


//用户输入保存文本
const input = (e, that) => {
  that.setData({
    input_text: e.detail.value
  });
  console.log(that.data.input_text);
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
    wx.redirectTo({
      url: '/pages/to_play/list_scenic/list_scenic?name=' + that.data.input_text,
    })
  // }
};

//调用地图API
const toMap = (that) => {
  // wx.navigateTo({
  //   url: '/pages/to_play/map/map',
  // })
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
const playwith = (that) => {
  wx.navigateTo({
    url: '/pages/add/add',
  })
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
}