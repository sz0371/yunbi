// pages/aboutMe/aboutMe.js
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
    var that = this
    var userId = wx.getStorageSync('userId');
    // console.log(app.globalData.server);
    wx.request({
      url: app.globalData.server + '/interface/user/getuserinfo.json',
      // url:'http://www.yunbikeji.com/skycurrency2/area/getdata.json',
      method: 'POST',
      data: {
        userId: userId,
      },
      header:{
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (result) {
        wx.hideLoading();
        if (result.data.msg == 1) {
          that.setData({
            getuserheader: result.data.data.headImg,
            getusername: result.data.data.name,
            getusercode: result.data.data.inviteCode
          })
        } else if (result.data.msg == -1) {
          wx.showToast({
            title: '请求失败，请重试',
            icon: 'none',
            duration: 500,
          })
        } else {
          wx.showToast({
            title: '未知错误，请重新加载',
          })
        }
      },
      fail: function (res) {
        console.log('submit fail');
      },
      complete: function (res) {
        console.log('加载成功');
      }
    })
  },
  // 跳转订单列表
  jumpWholOrder:function(){
    var navId = "";
    wx.navigateTo({
      url: '../aboutMeOrder/aboutMeOrder?navId=' + navId,
    })
  },
  // 跳转待付款
  jumpWaitOrder:function(){
    var navId = -1;
    wx.navigateTo({
      url: '../aboutMeOrder/aboutMeOrder?navId=' + navId,
    })
  },
  // 跳转到配送中
  jumpGiveOrder:function(){
    var navId = 1;
    wx.navigateTo({
      url: '../aboutMeOrder/aboutMeOrder?navId=' + navId,
    })
  },
  // 跳转到已签收
  jumpSigntOrder: function () {
    var navId = 3;
    wx.navigateTo({
      url: '../aboutMeOrder/aboutMeOrder?navId=' + navId,
    })
  },  
  // 跳转个人信息
  jumpPersonal:function(){
    wx.navigateTo({
      url: '../personalData/personalData',
    })
  },
  // 跳转到企业账户信息
  jumpAccountIfo: function () {
    wx.navigateTo({
      url: '../aboutAccount/aboutAccount',
    })
  },
  jumpAccount: function () {
    wx.navigateTo({
      url: '../cloudAccount/cloudAccount',
    })
  },
  // 跳转到我的客户列表
  jumpcomList:function(){
    wx.navigateTo({
      url: '../cloudCustomer/cloudCustomer',
    })
  },
  // 认购水池
  jumpMyPool:function(){
    wx.navigateTo({
      url: '../cloudPool/cloudPool',
    })
  },
   // 跳转到
  jumpCloudApply:function(){
    wx.navigateTo({
      url: '../cloudApply/cloudApply',
    })
  },
  // 跳转到我的二维码
  jumpCode:function(){
    wx.navigateTo({
      url: '../aboutMeCode/aboutMeCode',
    })
  },
  // 我的公益
  jumpWelfare:function(){
    wx.showToast({
      title: '此功能暂未开放',
      icon:'none',
      duration:500,
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