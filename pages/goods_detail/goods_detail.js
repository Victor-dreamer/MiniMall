// pages/goos_detail/goods_detail.js
import { request } from "../../request/promise";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsDetail:{},
    isCollect:"",
    goodsID: ""
  },

  GoodsInfo: {},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const goodsid = options
    this.setData({
      goodsID: goodsid
    })
    this.getGoodsDetail(goodsid);
  },

  async getGoodsDetail(id) {
     // 发送请求
     const res = await request({ url: "https://api.zbztb.cn/api/public/v1/goods/detail", data: id });
     this.GoodsInfo = res;
     this.setData({
       goodsDetail: res
     });
  },

  handleBuy() {
    this.handleCartAdd();
    wx.switchTab({
      url: '/pages/cart/cart'
    })
  },

   // 点击 加入购物车
   handleCartAdd() {
    //获取缓存中的购物车 数组
    let cart = wx.getStorageSync("cart") || [];
    // 判断 商品对象是否存在于购物车数组中
    let index = cart.findIndex(v => v.goods_id === this.GoodsInfo.goods_id);
    if (index === -1) {
      // 第一次添加
      this.GoodsInfo.num = 1;
      this.GoodsInfo.checked = true;
      cart.push(this.GoodsInfo);
    } else {
      // 已经存在购物车数据 执行 num++
      cart[index].num++;
    }
    // 把购物车重新添加回缓存中
    wx.setStorageSync("cart", cart);
    // 弹窗提示
    wx.showToast({
      title: '加入成功',
      icon: 'success',
      mask: true
    });
  },


  // 点击 商品收藏图标
  handleCollect(){
    let isCollect=false;
    // 1 获取缓存中的商品收藏数组
    let collect=wx.getStorageSync("collect")||[];
    // 2 判断该商品是否被收藏过
    let index=collect.findIndex(v=>v.goods_id===this.GoodsInfo.goods_id);
    // 3 当index！=-1表示 已经收藏过 
    if(index!==-1){
      // 能找到 已经收藏过了  在数组中删除该商品
      collect.splice(index,1);
      isCollect=false;
      wx.showToast({
        title: '取消成功',
        icon: 'success',
        mask: true
      });
        
    }else{
      // 没有收藏过
      collect.push(this.GoodsInfo);
      isCollect=true;
      wx.showToast({
        title: '收藏成功',
        icon: 'success',
        mask: true
      });
    }
    // 4 把数组存入到缓存中
    wx.setStorageSync("collect", collect);
    // 5 修改data中的属性  isCollect
    this.setData({
      isCollect
    })     
  }


})