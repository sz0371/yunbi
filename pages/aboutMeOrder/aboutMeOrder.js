var app = getApp();
Page({
  data: {
    winHeight: "",//窗口高度
    currentTab: 0, //预设当前项的值
    scrollLeft: 0, //tab标题的滚动条位置
    expertList: [{ //假数据
      img: "avatar.png",
      name: "欢顔",
      tag: "知名情感博主",
      answer: 134,
      listen: 2234
    }],
    orderList:'',
    states:''
    // n:0
  },
  // 滚动切换标签样式
  // switchTab: function (e) {
   
  //   this.checkCor();
  //   if (e.detail.current==""){
  //     this.setData({
  //       states: '',
  //       n:0
  //     })
  //     this.getList();
  //   }
  //   if (e.detail.current == -1) {
  //     this.setData({
  //       states: -1,
  //       n:-1
  //     })
  //     this.getList();
  //   }
  //   if (e.detail.current == 1) {
  //     this.setData({
  //       states: 1,
  //       n: 1
  //     })
  //     this.getList();
  //   }
  //   if (e.detail.current == 3) {
  //     this.setData({
  //       states: 3,
  //       n: 3
  //     })
  //     this.getList(e.detail.current);
  //   }
   
  // },
  // 点击标题切换当前页时改变样式
  aboutMeTabNav: function (e) {
    var cur = e.target.dataset.current;
    var num = cur;
    if(cur==0){
      num = ''
    }
    this.setData({
      states:num,
      n: e.target.dataset.current
    })
   
    this.getList(cur);
  },
  //判断当前滚动超过一屏时，设置tab标题滚动条。
  checkCor: function () {
    if (this.data.currentTab > 4) {
      this.setData({
        scrollLeft: 300
      })
    } else {
      this.setData({
        scrollLeft: 0
      })
    }
  },
  onLoad: function (e) {
    
    var that = this;
    
    //  高度自适应
    wx.getSystemInfo({
      success: function (res) {
        var clientHeight = res.windowHeight,
          clientWidth = res.windowWidth,
          rpxR = 750 / clientWidth;
        var calc = clientHeight * rpxR - 240;
        console.log(calc)
        that.setData({
          winHeight: calc
        });
      }
    });
    console.log(e);
    if(e.navId == ""){
      that.setData({
        n: 0
      })
    } else if (e.navId == -1){
      that.setData({
        n: -1
      })
    } else if (e.navId == 1) {
      that.setData({
        n: 1
      })
    } else if (e.navId == 3) {
      that.setData({
        n: 3
      })
    }
    this.getList(e.navId);
  },
  // 点击按钮跳转订单详情
  bindOrderInfo: function (e) {
    console.log(e.target.id);
    wx.navigateTo({
      url: '../orderDetails/orderDetails?id=' + e.target.id,
    })
  },
  // 点击按钮取消支付
  cancelOrder: function (e) {
    console.log(e.target.id);
    var orderId = e.target.id;
    wx.request({
      url: app.globalData.server + '/interface/order/updateorderstate.json',
      method: "POST",
      header: {
        // 'content-type': 'application/x-www-form-urlencoded'
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        id: orderId,
        state: -2,
      },
      success: function (result) {
        if (result.data.msg == 1) {
          wx.showToast({
            title: '取消订单成功',
            icon: 'none',
            duration: 500,
          })
          wx.navigateTo({
            url: '../aboutMeOrder/aboutMeOrder',
          })
        } else if (result.data.msg == -1) {
          wx.showToast({
            title: '失败，请重试！',
            icon: 'none',
            duration: 500,
          })
        } else if (result.data.msg == -2) {
          wx.showToast({
            title: '失败，请重试！',
            icon: 'none',
            duration: 500,
          })
        } else {
          wx.showToast({
            title: '失败操作',
            icon: 'none',
            duration: 500,
          })
        }
      },
      fail: function (e) {
        wx.showToast({
          title: '发生了未知的错误',
          icon: 'none',
          duration: 500,
        })

      },
      complete: function () {
        console.log("加载成功");
      }
    })
  },
  // 点击按钮支付
  payOrder: function (e) {
    var orderId = e.target.id;
    var userId = wx.getStorageSync("userId");
    // console.log(orderId + "订单id" + userId);
    wx.request({
      url: app.globalData.server + '/interface/order/pay.json',
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        id: orderId,
        userId: userId
      },
      success: function (result) {
        if (result.data.msg == 1) {
          wx.showToast({
            title: '订单已支付',
            icon: 'none',
            duration: 500,
          })
          wx.navigateTo({
            url: '../aboutMeOrder/aboutMeOrder',
          })
        } else if (result.data.msg == -1) {
          wx.showToast({
            title: '支付失败，请重试！',
            icon: 'none',
            duration: 500,
          })
        } else if (result.data.msg == -2) {
          wx.showToast({
            title: '支付失败，请重试！',
            icon: 'none',
            duration: 500,
          })
        } else if (result.data.msg == -4) {
          wx.showToast({
            title: '此数据不存在',
            icon: 'none',
            duration: 500,
          })
        } else if (result.data.msg == -9) {
          wx.showToast({
            title: '未登录',
            icon: 'none',
            duration: 500,
          })
        } else if (result.data.msg == -10) {
          wx.showToast({
            title: '没有足够的云币，前去充值',
            icon: 'none',
            duration: 500,
          })
        }
      },
      fail: function () {
        wx.showToast({
          title: '发生了未知的错误',
          icon: 'none',
          duration: 500,
        })
      },
      complete: function () {
        console.log("加载成功");
      }
    })
    // console.log(orderId);
  },
  getStatus: function (value) {
    var a = 1;
  },
  getList:function(state){
    var userId = wx.getStorageSync('userId')
    var that = this
    // console.log(that.data.states);
    wx.showLoading({})
    wx.request({
      url: app.globalData.server + '/interface/order/getorder.json',
      method: 'POST',
      header: {
        // 'content-type': 'application/x-www-form-urlencoded'
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        // state: that.data.states,
        state: state,
        userId: userId
      },
      success: function (res) {
        console.log(res);
        wx.hideLoading();
        // console.log(res.data.data.resultList);
        if (res.data.data== null) {
          wx.showToast({
            title: '没有订单去添加！',
            icon:'none'
          })
          that.setData({
            orderList: ''
          })
        }else{
          console.log("chenggong ");
          that.setData({
            orderList: res.data.data.resultList
          })
        }

      },
      fail: function () {
        console.log("获取失败")
      },
      complete: function (res) {
        console.log("加载成功")
      
      }
    })
  },
  footerTap: app.footerTap
})

