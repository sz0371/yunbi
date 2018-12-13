// pages/cloudCustomerSearch/cloudCustomerSearch.js
var app = getApp()
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
  // wxSerchFocus: function (e) {
  //   var that = this
  //   console.log("点击获取")
  // },
  wxSearchBlur:function(e){ 
    var that  = this;
    var phone = e.detail.value;
    wx.request({
      url: app.globalData.server + '/interface/user/getuserbyphone.json',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data:{
        phone:phone,
      },
      success:function(result){
        if(result.data.msg == 1){
          var serchListData = result.data.data
          console.log(serchListData.id)
          that.setData({
            serchListData: serchListData
          })
        } else if (result.data.msg == -1){
          wx.showToast({
            title: '请求失败，请重试！',
            icon: 'none',
            duration: 500,
          })
        } else if (result.data.msg == -4){
          wx.showToast({
            title: '没有该用户信息',
            icon: 'none',
            duration: 500,
          })
        }
      },
      fail:function(){
        wx.showToast({
          title: '发生了未知的错误',
          icon: 'none',
          duration:500,
        })
      },
      complete:function(){
        console.log("加载成功");
      }
    })
  },
  customerInfo:function(e){
    console.log(e.target.id)
    wx.navigateTo({
      url: '../cloudCustomerInfo/cloudCustomerInfo?id='+e.target.id,
    })
  }
})