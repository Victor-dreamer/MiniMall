// pages/cart/cart.js
import { showModal } from "../../utils/asyncWX.js";
Page({
  data: {
    addtext: "当前无可选地址",
    cart: [],
    allChecked: false,
    totalPrice: 0,
    totalNum: 0
  },

  AddressMess: {},

  onShow: function(){

    const cart = wx.getStorageSync("cart") || [];
    this.setCart(cart);
    this.judgeAddr();
  },

  // 判断是否有地址
  judgeAddr: function(){
    let that = this;
    const addr = wx.getStorageSync('address');
    let addrName = addr.name;
    // console.log(addrName);
    if(addr!=null){
      that.setData({
        addtext: addrName
      });
    }
  },

  // 设置购物车状态同时 重新计算 底部工具栏的数据 全选 总价格 购买的数量
  setCart(cart) {
    let allChecked = true;
    // 1 总价格 总数量
    let totalPrice = 0;
    let totalNum = 0;
    cart.forEach(v => {
      if (v.checked) {
        totalPrice += v.num * v.goods_price;
        totalNum += v.num;
      } else {
        allChecked = false;
      }
    })
    // 判断数组是否为空
    allChecked = cart.length != 0 ? allChecked : false;
    this.setData({
      cart,
      totalPrice, totalNum, allChecked
    });
    wx.setStorageSync("cart", cart);
  },

   // 商品的选中
   handeItemChange(e) {
    // 1 获取被修改的商品的id
    const goods_id = e.currentTarget.dataset.id;
    // 2 获取购物车数组 
    let { cart } = this.data;
    // 3 找到被修改的商品对象
    let index = cart.findIndex(v => v.goods_id === goods_id);
    // 4 选中状态取反
    cart[index].checked = !cart[index].checked;
    this.setCart(cart);
  },

  // 商品全选功能
  handleItemAllCheck() {
    //  获取data中的数据
    let { cart, allChecked } = this.data;
    // 修改值
    allChecked = !allChecked;
    //  循环修改cart数组 中的商品选中状态
    cart.forEach(v => v.checked = allChecked);
    //  把修改后的值 填充回data或者缓存中
    this.setCart(cart);
  },
  // 商品数量的编辑功能
  async handleItemNumEdit(e) {
    //  获取传递过来的参数 
    const { operation, id } = e.currentTarget.dataset;
    //  获取购物车数组
    let { cart } = this.data;
    //  找到需要修改的商品的索引
    const index = cart.findIndex(v => v.goods_id === id);
    // 判断是否要执行删除
    if (cart[index].num === 1 && operation === -1) {
      //  弹窗提示
      const res = await showModal({ content: "您是否要删除？" });
      if (res.confirm) {
        cart.splice(index, 1);
        this.setCart(cart);
      }
    } else {
      //  进行修改数量
      cart[index].num += operation;
      // 设置回缓存和data中
      this.setCart(cart);
    }
  },
  handlePay: function(){
    wx.showToast({
      title: "该功能暂待开发",
      icon: "none"
    })
  } 

  
})