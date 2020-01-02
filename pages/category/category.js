// pages/category/category.js
import { request } from "../../request/promise";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    category_searchStyle: {
      bgc: "#fff",
      s_bgc: "#f7f7f7"
    },
    // 左侧菜单数据
    leftMenuList: [],
    // 右侧内容数据
    rightContent: [],
     // 被点击的左侧的菜单
     currentIndex: 0,
     // 右侧内容的滚动条距离顶部的距离
     scrollTop: 0
  },
  Cates: [],
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    //缓存分类页面数据
    const Cates = wx.getStorageSync("cates");
    // 2 判断
    if (!Cates) {
      // 不存在  发送请求获取数据
      that.getCategoryList();
    } else {
      // 有旧的数据 定义过期时间  5分钟
      if (Date.now() - Cates.time > 1000 * 60 * 5) {
        // 重新发送请求
        that.getCategoryList();
      } else {
        // 可以使用旧的数据
        that.Cates = Cates.data;
        let leftMenuList = that.Cates.map(v => v.cat_name);
        let rightContent = that.Cates[0].children;
        that.setData({
          leftMenuList,
          rightContent
        })
      }
    }
  },

  //获取分类信息数据
  async getCategoryList() {
    // 发送请求
    const res = await request({ url: "https://api.zbztb.cn/api/public/v1/categories" });
    this.Cates = res;
    // 把接口的数据存入到本地存储中
    wx.setStorageSync("cates", { time: Date.now(), data: this.Cates });
    // 构造左侧的大菜单数据
    let leftMenuList = this.Cates.map(v => v.cat_name);
    // 构造右侧的商品数据
    let rightContent = this.Cates[0].children;
    this.setData({
      leftMenuList,
      rightContent
    })
  },

  // 左侧菜单的点击事件
  handleItemTap(e) {
    // 获取被点击的标题身上的索引
    const { index } = e.currentTarget.dataset;
    // 给data中的currentIndex赋值
    let rightContent = this.Cates[index].children;
    this.setData({
      currentIndex: index,
      rightContent,
      // 重新设置 右侧内容的scroll-view标签的距离顶部的距离
      scrollTop: 0
    })

  }
})