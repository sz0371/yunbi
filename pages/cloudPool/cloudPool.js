// pages/cloudPool/cloudPool.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    poolNum:1
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

  // 事件处理函数
  // 减号
  bindMinus:function(){
    var poolNum = this.data.poolNum;
    if (poolNum>1){
      poolNum--;
    }
    this.setData({
      poolNum:poolNum,
    })
  },
  bindPlus: function () {
    var poolNum = this.data.poolNum;
    poolNum++;
    this.setData({
      poolNum: poolNum
    })
  },
  // 获取水池数量
  getPoolNumber:function(e){
    this.setData({
      poolNumber: e.detail.value
    })
  },
  // 提交水池
  poolOk:function(e){
    // console.log(this.data.poolNum);
    wx.navigateTo({
      url: '../cloudPoolbuy/cloudPoolbuy?type=2' + '&num=' + this.data.poolNum,
    })
  }
})