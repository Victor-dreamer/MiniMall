Component({
  properties:{
    nav:{
      type:Object
    }
  },
  data:{
    statusBarHeight: 0, //状态栏初始化
    titleBarHeight: 0, //标题栏初始化
  },

  ready: function () {
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
  methods: {
    // 返回上一级页面
    backToLast: function() {
      wx.navigateBack({
        delta: 1, // 回退前 delta(默认为1)页面
      })
    }
  }


})