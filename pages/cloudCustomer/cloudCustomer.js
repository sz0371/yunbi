// pages/cloudCustomer/cloudCustomer.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({})
    var that = this;
    wx.request({
      url: app.globalData.server + '/interface/user/getmyclients.json',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        userId: wx.getStorageSync("userId")
      },
      success:function(result){
        wx.hideLoading()
        if(result.data.msg){
          var customerData = result.data.data;
          that.setData({
            customerData: customerData
          })
        }
      }
    })
  },
  // 客户列表信息
  jumpCustomerInfo:function(res){
    wx.navigateTo({
      url: '../cloudCustomerInfo/cloudCustomerInfo?id=' + res.target.id,
    })
  },
  // 转送搜索
  jumpSearchList:function(){
    wx.navigateTo({
      url: '../cloudCustomerSearch/cloudCustomerSearch',
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