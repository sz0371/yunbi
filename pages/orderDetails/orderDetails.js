// pages/orderDetails/orderDetails.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderInfoData:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.id)
    var that = this
    wx.showLoading({})
    wx.request({
      url: app.globalData.server + '/interface/order/orderdetail.json',
      method: "POST",
      data:{
        id: options.id
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (result){
        console.log(result);
        wx.hideLoading()
        if(result.data.msg == 1){
          var listData = result.data.data;
          var detailsData = listData.tjOrderDetailModelList;
          that.setData({
            orderInfoData: listData,
            orderDetailsList: detailsData,
            state:3
          })
          console.log(listData)
        } else if(result.data.msg == -1){
          wx.showToast({
            title: '失败，请重试',
            icon:'none',
            duration:500
          })
        }
      },
      fail:function(){
        console.log("页面加载失败")
      },
      complete:function(){
        console.log("加载完成")
      }
    })
  },
  // 取消订单
  closeOrder:function(e){
    wx.showLoading({
      title: '正在取消',
    })
    var orderId = this.options.id;
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
          wx.hideLoading();
          wx.showToast({
            title: '取消订单成功',
            icon: 'none',
            duration: 500,
          })
          var navId = "";
          wx.redirectTo({
            url: '../aboutMeOrder/aboutMeOrder?navId=' + navId,
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
  // 提交订单
  payOrder:function(){
   // console.log(wx.getStorageSync("userId"));
   // return;
    wx.showLoading({
      title: '正在支付',
    })
    var orderId = this.options.id;
    wx.request({
      url: app.globalData.server + '/interface/order/pay.json',
      data: {
        id: orderId,
        userId: wx.getStorageSync("userId")
      },
      header: {
        // 'content-type': 'application/x-www-form-urlencoded'
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: function (result) {
        wx.hideLoading();
        var navId = "";
        if (result.data.msg == 1){
          wx.showToast({
            title: '支付成功',
            duration: 300,
          })
          var navId = "";
          // wx.navigateTo({
          //   url: '../aboutMeOrder/aboutMeOrder?navId=' + navId,
          // })
          var navId = "";
          wx.redirectTo({
            url: '../aboutMeOrder/aboutMeOrder?navId=' + navId,
          })
        } else if (result.data.msg == -1){
          wx.showToast({
            title: '支付失败，请重试！',
            icon: 'none',
            duration: 500,
          })
        } else if (result.data.msg == -2){
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
            duration: 300,
          })
          wx.navigateTo({
            url: '../login/login',
          })
        } else if (result.data.msg == -10) {
          wx.showToast({
            title: '没有足够的云币，前去充值',
            icon: 'none',
            duration: 300,
          })
        }
      },
      fail: function(res) {
        wx.showToast({
          title: '发生了未知的错误',
          icon: 'none',
          duration: 500,
        })

      },
      complete: function(res) {
        console.log("加载完成");
      },
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})