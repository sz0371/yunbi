// pages/cloudRecharge/cloudRecharge.js
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
    var that = this;
    wx.showLoading({})
    wx.request({
      url: app.globalData.server + '/interface/user/getuserinfo.json',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data:{
        userId: wx.getStorageSync("userId")
      },
      success:function(result){
        wx.hideLoading()
        if(result.data.msg == 1){
          var cloudAcData = result.data.data;
          that.setData({
            cloudAcData:cloudAcData
          })
        } else if (result.data.msg == -1){

        } else {
          wx.showToast({
            title: '发生了未知的错误',
            icon:'none',
            duration:500,
          })
        }
      },
      fail:function(){
        wx.showToast({
          title: '发生了未知的错误',
          icon: 'none',
          duration: 500,
        })
      },
      complete:function(){
        console.log("加载成功");
      }
    })
    this.getCloudDetail()
  },
  getCloudDetail: function () {
    var that = this;
    wx.request({
      url: app.globalData.server + '/interface/user/getpaymentdetaillist.json',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        page: 1,
        rows: 100,
        userId: wx.getStorageSync("userId")
      },
      success: function(result){
        if(result.data.msg == 1){
          var detailData = result.data.data.resultList;
          that.setData({
            detailedList: detailData,
          })

        } else if (result.data.msg == -1){
          wx.showToast({
            title: '请求失败，请重试！',
            icon: 'none',
            duration: 500,
          })
        } else if (result.data.msg == -4){
          wx.showToast({
            title: '请求失败，请重试！',
            icon: 'none',
            duration: 500,
          })
        } else {
          wx.showToast({
            title: '发生了未知的错误',
            icon: 'none',
            duration: 500,
          })
        }
      },
      fail:function(){
        wx.showToast({
          title: '发生了未知的错误',
          icon: 'none',
          duration: 500,
        })
      },
      complete:function(){
        console.log("加载成功");
      }
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
  
  },
  // 点击购买云朵
  buyCloud:function(){
    wx.navigateTo({
      url: '../cloudRecharge/cloudRecharge',
    })
  },
  // 转送
  transfar:function(){
    wx.navigateTo({
      url: '../cloudCustomer/cloudCustomer',
    })
  }
})