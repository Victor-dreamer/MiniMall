// pages/address/address.js
var QQMapWX = require('../../lib/qqmap-wx-jssdk.js');
var qqmapsdk;
Page({
  data: {
    latitude: 0,//地图初次加载时的纬度坐标
    longitude: 0, //地图初次加载时的经度坐标
    name: "" //选择的位置名称
  },
  onLoad: function () {
    // 实例化API核心类
    qqmapsdk = new QQMapWX({
      key: 'BS2BZ-2FJA4-FJCUD-XTZ5I-I2D53-2AFW4'
    });
    this.moveToLocation();
  },
  //移动选点
  moveToLocation: function () {
    var that = this;
    // 调用位置API
    wx.chooseLocation({
      success: function (res) {
        wx.setStorageSync("address", {
          latitude: res.latitude,
          longitude: res.longitude,
          name: res.name
        });
        //选择地点之后返回到购物车页面
        wx.switchTab({
          url: "/pages/cart/cart"
        });
      },
      fail: function (err) {
        // 直接返回提示
        wx.switchTab({
          url: '/pages/cart/cart',
          success: function (res) {
            wx.showToast({
              title: '你没有选择地址',
              icon: 'none',
            });
          },
          fail: function (err) {
            console.log(err);
          },
        })
      }
    });
  }
});