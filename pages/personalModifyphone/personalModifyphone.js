// pages/personalModifyphone/personalModifyhone.js
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
  
  },
  modifyPhone:function(e){
    // console.log(e.detail.value);
    var that = this;
    var phones = e.detail.value;
    if (phones.length != 11){
      wx.showToast({
        title: '手机号格式不正确',
        icon:'none',
        duration:500,
      })
    }
    that.setData({
      phones: phones
    })
  },
  getCode:function(e){
    var mobile = e.target.dataset.phone;
    wx.request({
      url: app.globalData.server +'/interface/user/sentsms.json',
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        phone:mobile
      },
      success:function(result){
        if(result.data.msg == 1){
          wx.showToast({
            title: '短信已发送，请接收',
            icon:'none',
            duration:1500,
          })
        } else if (result.data.msg == -1){
          wx.showToast({
            title: '发送失败，请重试！',
            icon: 'none',
            duration: 1500,
          })
        } else if (result.data.msg == -2){
          wx.showToast({
            title: '手机号为空',
            icon: 'none',
            duration: 1000,
          })
        }
      },
      fail:function(e){
        wx.showToast({
          title: '发生了未知的错误',
          icon: 'none',
          duration: 1500,
        })
      },
      complete:function(){
        console.log("加载成功");
      }
    })
  },
  
  modifyCode:function(e){
    console.log(e.detail.value);
    var that = this;
    that.setData({
      sumcode: e.detail.value
    })
  },
  sumbitPhone:function(e){
    var newPhone = e.target.dataset.subphone;
    var newCode = e.target.dataset.code;
    if (!newPhone){
      wx.showToast({
        title: '手机号不能为空',
        icon: 'none',
        duration: 1500,
      })
      return false;
    }
    if (!newCode) {
      wx.showToast({
        title: '验证码不能为空',
        icon: 'none',
        duration: 1500,
      })
      return false;
    }
    wx.request({
      url: app.globalData.server + '/interface/user/resetphone.json',
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        phone: newPhone,
        randomcode: newCode,
        userId: wx.getStorageSync("userId"),
      },
      success: function (result) {
        if (result.data.msg == 1) {
          wx.showToast({
            title: '修改成功！',
            icon: 'none',
            duration: 1500,
          })
          // wx.setStorageSync("datas", JSON.stringify())
        } else if (result.data.msg == -1) {
          wx.showToast({
            title: '发送失败，请重试！',
            icon: 'none',
            duration: 1500,
          })
        } else if (result.data.msg == -3) {
          wx.showToast({
            title: '验证码错误或失效',
            icon: 'none',
            duration: 1000,
          })
        } else if (result.data.msg == -4) {
          wx.showToast({
            title: '手机号已存在',
            icon: 'none',
            duration: 1000,
          })
        }
      },
      fail: function (e) {
        wx.showToast({
          title: '发生了未知的错误',
          icon: 'none',
          duration: 1500,
        })
      },
      complete: function () {
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
  
  }
})