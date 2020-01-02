// pages/user/user.js
import { request } from "../../request/userInfo.js";

Page({
  data: {
    userInfo:{},
    // 被收藏的商品的数量
    collectNums:0,
    result: ""
  },

  onReady(){
    this.judgeLogin();
  },

  onLoad(){
    this.fetchUserInfo();
  },
  onShow(){
    if(!this.data.userInfo){
      this.fetchUserInfo();    
    }
    const collect=wx.getStorageSync("collect")||[];     
    this.setData({collectNums:collect.length});
  },


  judgeLogin: function(){
    const id = wx.getStorageSync('id');
    if(!id){
      wx.navigateTo({
        url: '/pages/login/login',
        success: function(res){
          wx.showToast({
            title: "请先登录",
            icon: "none"
          })
        }
      })
    }
  },

  getScancode: function() {
    var _this = this;
    // 允许从相机和相册扫码
    wx.scanCode({
      success: (res) => {
        var result = res.result;
        _this.setData({
          result: result,
        })
      }
    }) 
  },

   /**
   * @description 获取用户信息
   */
  async fetchUserInfo() {
    const id = wx.getStorageSync('id');
    try {
      const result = await request({
       url: "http://127.0.0.1:7777/userinfo",
       data: {
          id: id 
       }
      })
      this.setData({
        userInfo: result.data
      })
    } catch(e) {
      console.log(e)
    }
  },

  onShareAppMessage: function(){
    
  }
})