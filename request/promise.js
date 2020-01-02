
// 同时发送异步代码的次数
let ajaxTimes=0;
export const request=(params)=>{
  ajaxTimes++;
  // 显示加载中 效果
  wx.showLoading({
    title: "加载中",
    mask: true
  });
    
  return new Promise((resolve,reject)=>{
    wx.request({
     ...params,
     success:(result)=>{
       resolve(result.data.message);
     },
     fail:(err)=>{
       reject(err);
     },
     complete:()=>{
      ajaxTimes--;
      if(ajaxTimes===0){
        //  关闭正在等待的图标
        wx.hideLoading();
      }
     }
    });
  })
}