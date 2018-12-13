// pages/personalModifyAddress/personalModifyAddress.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    region:["北京市","市辖区","东城区"],
    select:2,
    pay:''
  },
  bindCityChange:function(e){
    this.setData({ region:e.detail.value});
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    var that =this;
    if (options.length){
      that.setData({
        wxusername: options.name,
        wxuserphone: options.phone,
        region: options.address,
        pay: options.pay
      })
    }
  },
  selectSex:function(e){
    this.setData({
      select: e.target.dataset.select
    })
  },
  // 绑定
  userName:function(e){
    this.setData({
      userName: e.detail.value
    })
  },
  userphone:function(e){
    this.setData({
      userphone: e.detail.value
    })
  },
  userText:function(e){
    this.setData({
      userText: e.detail.value
    })
  },
  // 提交表单
  sumberNews:function(e){
    var _this = this;
    var userName = this.data.userName;
    var userphone = this.data.userphone;
    var userText = this.data.userText;
    var userSex = e.target.dataset.sex;
    var userCity = e.target.dataset.city;
    if (!userName){
      wx.showToast({
        title: '联系人不能为空',
        icon:'none',
        duration:800,
      })
      return false;
    }
    if (!userphone) {
      wx.showToast({
        title: '联系电话不能为空',
        icon: 'none',
        duration: 800,
      })
      return false;
    }
    if (!userText) {
      wx.showToast({
        title: '详细地址不能为空',
        icon: 'none',
        duration: 800,
      })
      return false;
    }
    wx.request({
      url: app.globalData.server + '/interface/user/addaddress.json',
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        id: '',
        userId: wx.getStorageSync("userId"),
        phone: userphone,
        name: userName,
        cityArea: userCity,
        address: userText,
        sex: userSex,
      },
      success:function(result){
        if(result.data.msg == 1){
          wx.showToast({
            title: '成功，即将跳转到地址列表',
            icon:'none',
            duration:800,
          })
          wx.redirectTo({
            url: '../personalAddress/personalAddress?pay='+_this.data.pay
          })
        } else if (result.data.msg == -1){
          wx.showToast({
            title: '请求失败，请重试！',
            icon:'none',
            duration:800,
          })
        } else {
          wx.showToast({
            title: '发生了未知的错误' + result.data.msg,
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