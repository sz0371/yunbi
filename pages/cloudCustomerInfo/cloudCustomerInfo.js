// pages/cloudCustomerInfo/cloudCustomerInfo.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hiddenmodalput:true,
    hiddenmodalputPool:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setStorageSync('userIDs', options.id);
    var that = this;
    wx.request({
      url: app.globalData.server + '/interface/user/getuserinfo.json',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        userId: options.id
      },
      success:function(result){
        if(result.data.msg == 1){
          var infoData = result.data.data;
          that.setData({
            infoData:infoData,
          })
        } else if (result.data.msg == -1){
          wx.showToast({
            title: '请求失败，请重试！',
            icon: 'none',
            duration: 500,
          })
        } else{
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
        console.log("加载完成")
      }
    })
  },
  // 获取输入框输入个数
  textNum:function(res){
    this.setData({
      textNumber:res.detail.value
    })
  },
  textNums: function (res) {
    this.setData({
      textNumbers: res.detail.value
    })
  },
  // 点击转送云朵
  buttonSky:function(){
    this.setData({
      hiddenmodalput: !this.data.hiddenmodalput
    }) 
  },
  // 点击转送水池
  buttonPool:function(){
    this.setData({
      hiddenmodalputPool: !this.data.hiddenmodalputPool
    })
  },
  //取消按钮  
  cancel: function () {
    this.setData({
      hiddenmodalput: true
    });
  },
  cancels: function(){
    this.setData({
      hiddenmodalputPool: true
    });
  },
  //确认  
  confirm: function (res) {
    // console.log(this.data.textNumber);
    var num = this.data.textNumber
    this.transfer(num,1)
    this.setData({
      hiddenmodalput: true
    })
  },
  confirms: function (res) {
    // console.log(this.data.textNumber);
    var num = this.data.textNumbers
    this.transferPool(num)
    this.setData({
      hiddenmodalputPool: true
    })
  }, 
  // 获取转送云朵
  transfer:function(num,type){
    wx.request({
      url: app.globalData.server + '/interface/user/transfer.json',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        num: num,
        receiverId: wx.getStorageSync("userIDs"),
        type: type,
        userId: wx.getStorageSync("userId")
      },
      success:function(result){
        if(result.data.msg == 1){
          if(type == 1){
            wx.showToast({
              title: '成功转送'+ num + '个云朵',
              icon: 'none',
              duration:1000,
            })
          } else {
            wx.showToast({
              title: '成功转送' + num + '个云币',
              icon: 'none',
              duration: 1000,
            })
          }
        } else if (result.data.msg == -1){
          wx.showToast({
            title: '请求失败，请重试！',
            icon:'none',
            duration:800,
          })
        } else if (result.data.msg == -2) {
          wx.showToast({
            title: '参数错误，请重试！',
            icon: 'none',
            duration: 800,
          })
        } else if (result.data.msg == -4) {
          wx.showToast({
            title: '无数据',
            icon: 'none',
            duration: 800,
          })
        } else if (result.data.msg == -6) {
          wx.showToast({
            title: '云朵不足',
            icon: 'none',
            duration: 800,
          })
        } else {
          wx.showToast({
            title: '发生了未知的错误',
            icon: 'none',
            duration: 800,
          })
        }
      },
      fail:function(){
        wx.showToast({
          title: '发生了未知的错误',
          icon: 'none',
          duration: 800,
        })
      },
      complete:function(){
        console.log("加载完成")
      }
    })
  },
  // 获取转送水池
  transferPool: function (num) {
    var poolSkyNum = num *160;
    wx.request({
      url: app.globalData.server + '/interface/user/transferpool.json ',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        poolNum: num,
        receiverId: wx.getStorageSync("userIDs"),
        poolSkyNum: num*160,
        userId: wx.getStorageSync("userId")
      },
      success: function (result) {
        if (result.data.msg == 1) {
          wx.showToast({
            title: '成功转送' + num + '个水池',
            icon: 'none',
            duration: 1000,
          })
        } else if (result.data.msg == -1) {
          wx.showToast({
            title: '请求失败，请重试！',
            icon: 'none',
            duration: 800,
          })
        } else if (result.data.msg == -2) {
          wx.showToast({
            title: '参数错误，请重试！',
            icon: 'none',
            duration: 800,
          })
        } else if (result.data.msg == -4) {
          wx.showToast({
            title: '无数据',
            icon: 'none',
            duration: 800,
          })
        } else if (result.data.msg == -5) {
          wx.showToast({
            title: '水池不足',
            icon: 'none',
            duration: 800,
          })
        } else if (result.data.msg == -6) {
          wx.showToast({
            title: '云朵不足',
            icon: 'none',
            duration: 800,
          })
        } else {
          wx.showToast({
            title: '发生了未知的错误',
            icon: 'none',
            duration: 800,
          })
        }
      },
      fail: function () {
        wx.showToast({
          title: '发生了未知的错误',
          icon: 'none',
          duration: 800,
        })
      },
      complete: function () {
        console.log("加载完成")
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
  
  }
})