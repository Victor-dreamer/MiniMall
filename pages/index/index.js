//index.js
//获取应用实例
const app = getApp()

//引入请求文件
import { request } from "../../request/promise";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 搜索框样式
    searchStyle: {
      bgc: "#ba1907",
      s_bgc: "#fff"
    },
    // 轮播图数据
    swiperList: [],
    cateList: [],
    goodsList: []
  },

  // 接口要的参数
  QueryParams: {
    query: "",
    cid: "74",
    pagenum: 1,
    pagesize: 10
  },
  // 总页数
  totalPages: 1,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    // 请求轮播图数据
    this.getSwiperList();
    this.getCateList();
    this.getGoodsList();
  },

  // 获取轮播图数据
  getSwiperList() {
    request({ url: 'https://api.zbztb.cn/api/public/v1/home/swiperdata' })
      .then(result => {
        const list = result;
        // 修改api路径字符串
        for (var i = 0; i < list.length; i++) {
          // console.log(list[i].navigator_url)
          let url = list[i].navigator_url.replace('index', 'goods_detail');
          list[i].navigator_url = url;
          // console.log(list[i].navigator_url)
        }
        // console.log(list);
        this.setData({
          swiperList: list
        })
      })
  },

  // 获取分类列表数据
  getCateList() {
    request({ url: 'https://api.zbztb.cn/api/public/v1/home/catitems' })
      .then(result => {
        this.setData({
          cateList: result
        })
      })
  },

  // 获取商品列表数据
  async getGoodsList() {
    const res = await request({ url: "https://api.zbztb.cn/api/public/v1/goods/search", data: this.QueryParams });
    // 获取 总条数
    const total = res.total;
    // 计算总页数
    this.totalPages = Math.ceil(total / this.QueryParams.pagesize);
    this.setData({
      // 拼接了数组
      goodsList: [...this.data.goodsList, ...res.goods]
    })
    // 关闭下拉刷新的窗口 如果没有调用下拉刷新的窗口 直接关闭也不会报错  
    wx.stopPullDownRefresh();

  },

  /**
    * 页面上拉触底事件的处理函数
    */
  onReachBottom() {
    //  判断还有没有下一页数据
    if (this.QueryParams.pagenum >= this.totalPages) {
      // 没有下一页数据
      wx.showToast({ title: '没有更多了' });

    } else {
      // 还有下一页数据
      this.QueryParams.pagenum++;
      this.getGoodsList();
    }
  },

  // 下拉刷新事件 
  onPullDownRefresh() {
    // 1 重置数组
    this.setData({
      goodsList: []
    })
    // 2 重置页码
    this.QueryParams.pagenum = 1;
    // 3 发送请求
    this.getGoodsList();
  }

})
