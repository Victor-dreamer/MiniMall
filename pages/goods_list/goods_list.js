// pages/goods_list/goods_list.js
import { request } from "../../request/promise";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods_list_searchStyle: {
      bgc: "#fff",
      s_bgc: "#f7f7f7"
    },
    goodsList: [],
    thisTitle: ""
  },

  // 接口要的参数
  QueryParams: {
    query: "",
    cid: "",
    pagenum: 1,
    pagesize: 10
  },
  // 总页数
  totalPages: 1,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.QueryParams.cid = options.cid || "";
    this.QueryParams.query = options.query || "";
    this.getGoodsList();
    wx.setNavigationBarTitle({
      title: options.titleName ? options.titleName : "商品列表"
    })
  },

  // 获取商品列表数据
  async getGoodsList() {
    const res = await request({ url: "https://api.zbztb.cn/api/public/v1/goods/search", data: this.QueryParams });
    // 获取 总条数
    const total = res.total;
    // 计算总页数
    this.totalPages = Math.ceil(total / this.QueryParams.pagesize);
    // console.log(this.totalPages);
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
    //  1 判断还有没有下一页数据
    if (this.QueryParams.pagenum >= this.totalPages) {
      // 没有下一页数据
      //  console.log('%c'+"没有下一页数据","color:red;font-size:100px;background-image:linear-gradient(to right,#0094ff,pink)");
      wx.showToast({ title: '没有下一页数据' });

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