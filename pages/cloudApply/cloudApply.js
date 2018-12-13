// pages/cloudApply/cloudApply.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    num:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  selectApply:function(e){
      console.log(e);
      this.setData({
        num: e.target.dataset.num
      })
  },
  sumberBtn:function(e){
    var typeNum = e.target.dataset.id;
    if (typeNum == 1){
      this.applyRequst(typeNum, 1);
    } else if (typeNum == 2){
      var poolNoPassed = JSON.parse(wx.getStorageSync("datas")).poolNoPassed;
      this.applyRequst(typeNum, poolNoPassed);
    } else {
      wx.showToast({
        title: '糟糕出现问题',
        icon: 'none',
        duration:800,
      })
    }
  },
  applyRequst: function (typeNum, poolNoPassed){
    wx.showLoading({})
    wx.request({
      url: app.globalData.server + '/interface/user/adduserpooldraw.json',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        userId: wx.getStorageSync("userId"),
        poolNum: poolNoPassed,
        type: typeNum,
      },
      success:function(result){
        wx.hideLoading()
        if(result.data.msg == 1){
          wx.showToast({
            title: '您的退订申请成功。我们会在三个工作日之内于您联系，请保持电话畅通。',
            icon: 'none',
            duration: 2000,
          })
        } else if (result.data.msg == -1){
          wx.showToast({
            title: '请求失败，请重试！',
            icon: 'none',
            duration: 800,
          })
        } else if (result.data.msg == -4) {
          wx.showToast({
            title: '水池不足或用户不存在',
            icon: 'none',
            duration: 800,
          })
        } else {
          wx.showToast({
            title: '发生了未知的错误' + result.data.msg,
            icon: 'none',
            duration: 800,
          })
        }
      },
      fail:function(res){
        wx.showToast({
          title: '发生了未知的错误',
          icon:'none',
          duration:800,
        })
      },
      complete:function(res){
        console.log("加载完成" + res);
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