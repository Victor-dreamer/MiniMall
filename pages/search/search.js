// pages/search/search.js
import { request } from "../../request/promise";

Page({
  /**
   * 页面的初始数据
   */
  data: {
    nav: {
      bg: "#fff",
      isdisPlayNavTitle: true, //是否显示返回按钮
    },
    statusBarHeight: 0, //状态栏初始化
    titleBarHeight: 0, //标题栏初始化
    hotList: ["苏宁易购","直饮水龙头","奥特曼手办","豪华12磅生日蛋糕"],
    goods:[],
    // 输入框的值
    inpValue:""
  },

  TimeId:-1,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  // 输入框的值改变 就会触发的事件
  handleInput(e){
    // 获取输入框的值
    const {value}=e.detail;
    // 检测合法性
    if(!value.trim()){
      this.setData({
        goods:[],
        isFocus:false
      })
      // 值不合法
      return;
    }
    // 准备发送请求获取数据
    this.setData({
      isFocus:true
    })
    clearTimeout(this.TimeId);
    this.TimeId=setTimeout(() => {
      this.qsearch(value);
    }, 1000);
  },
  // 发送请求获取搜索建议 数据
  async qsearch(query){
    const res=await request({url:"https://api.zbztb.cn/api/public/v1/goods/qsearch",data:{query}});
    console.log(res);
    this.setData({
      goods:res
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        // model设备型号
        // iOS
        // 标题栏高度
        if (res.model.indexOf('iPhone') !== -1) {
          that.setData({
            titleBarHeight: 44 + 'px'
          })
        } else {
          // android
          that.setData({
            titleBarHeight: 48 + 'px'
          })
        }       
        // 状态栏高度
        that.setData({
          statusBarHeight: res.statusBarHeight + 'px'
        })
        // console.log(that.data.statusBarHeight)
      },
    })

  },
  
})