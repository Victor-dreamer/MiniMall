// pages/login/login.js
import { request } from "../../request/userInfo.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },
  /**
 * @description 获取用户信息
 */

  backToLast: function () {
    var pages = getCurrentPages()
    wx.navigateBack({
      delta: 1, // 回退前 delta(默认为1) 页面
      success: function (res) {
        wx.showToast({
          title: "登陆成功！",
          icon: "none"
        })
        pages[pages.length -2 ].onLoad()
      }
    })
  },

  login: function () {
    const _this = this;
    wx.login({
      success(res) {
        if (res.code) {
          // 向后台服务器发送code
          wx.request({
            url: 'http://127.0.0.1:7777/code',
            data: {
              "code": res.code,
            },
            success: (res) => {
              // console.log(res)
              // 存储登录状态
              wx.setStorageSync("id", res.data.data.id)
              wx.setStorageSync("expire", res.data.data.expire)
              wx.setStorageSync("tag", res.data.data.tag)
              const tag = res.data.data.tag;
              wx.getUserInfo({
                success: function (res) {
                  // 新用户更新基本信息
                  if (tag) {
                    wx.request({
                      url: "http://127.0.0.1:7777/userinfo",
                      method: "POST",
                      data: {
                        id: wx.getStorageSync("id"),
                        userinfo: {
                          nickname: res.userInfo.nickName,
                          sex: res.userInfo.gender,
                          avatar: res.userInfo.avatarUrl,
                        },
                      },
                      success: function () {
                        _this.setData({
                          userInfo: {
                            ..._this.data.userInfo,
                            avatar: res.userInfo.avatarUrl
                          }
                        })
                       _this.backToLast()
                      }
                    })
                  } else {
                    _this.backToLast();
                  }
                }
              })
            }
          })
        }
      },
      fail(e) {
        console.log(e)
      }
    })
  }
})