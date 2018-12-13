// pages/personalAddress/personalAddress.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pay: '',
    id:''

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    console.log(options.pay);
    if (options.pay != undefined) {
      this.setData({
        pay: options.pay,
        id:options.id
      })
    }
    var that = this;
    wx.showLoading({})
    wx.request({
      url: app.globalData.server + '/interface/user/getaddresslist.json',
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        page: 1,
        rows: 100,
        userId: wx.getStorageSync("userId")
      },
      success: function (result) {
        console.log(result)
        wx.hideLoading()
        if (result.data.msg == 1) {
          var addressdata = result.data.data.resultList
          console.log(addressdata);
          that.setData({
            addressList: addressdata,
          })
        } else if (result.data.msg == -1) {
          wx.showToast({
            title: '请求失败，请重试！',
            icon: 'none',
            duration: 500,
          })
        } else if (result.data.msg == -2) {
          wx.showToast({
            title: '请求失败，请重试！',
            icon: 'none',
            duration: 500,
          })
        } else if (result.data.msg == -4) {
          wx.showToast({
            title: '还没有地址信息，赶快去添加吧！',
            icon: 'none',
            duration: 1000,
          })
        }
      },
      fail: function () {
        wx.showToast({
          title: '发生了未知的错误',
          icon: 'none',
          duration: 500,
        })
      },
      complete: function () {
        console.log("加载成功")
      }
    })
  },
  selectAddress: function (e) {
    var address = e.target.dataset.address;
    var name = e.target.dataset.name;
    var phone = e.target.dataset.phone;
    var addressID = e.currentTarget.dataset.id;
    var _url = '';
    var isChange = this.data.pay;
    console.log(this.data.pay + 'ck');
    if (this.data.pay == 'Y') {
      _url = '/pages/orderCar/orderCar?address=' + address + "&name=" + name + "&phone=" + phone + "&addressID=" + addressID + "&isChange=" + isChange +"&id="+this.data.id;
      wx.redirectTo({
        url: _url
      })
    } else {
      _url = '../personalData/personalData?address=' + address + "&name=" + name + "&phone=" + phone + "&isChange=" + isChange;
      wx.redirectTo({
        url: _url
      })
    }
    
  },
  // 修改按钮
  modifyaddress:function(e){
    console.log(e);
    var that =this;
    var name = e.dataset.name;
    var sex =e;
    var phone = e.dataset.phone;
    var city = e.dataset.address;
    var detaile = e
    console.log(this);
    console.log(e)
    // wx.navigateTo({
    //   url: '../personalModifyAddress/personalModifyAddress',
    // })
  },
  addAdress:function(){
    console.log(this.data.pay);
    wx:wx.navigateTo({
      url: '../personalModifyAddress/personalModifyAddress?pay='+this.data.pay,
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