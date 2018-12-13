// pages/aboutMeCode/aboutMeCode.js
var QRCode = require('../../utils/weapp-qrcode.js');
var qrcode;

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
    var codeData = JSON.parse(wx.getStorageSync("datas"));
    console.log(codeData);

    var pages = getCurrentPages();
    var currentPage = pages[pages.length-1];
    
    console.log(currentPage)

    qrcode = new QRCode('canvas', {
      // usingIn: this,
      //text: "https://ybxcx.naiba168.com/skyxcx/register.html?inviteCode="+codeData.inviteCode,
      text: "http://www.yunbikeji.com/skycurrencyweb2/register.html?inviteCode=" + codeData.inviteCode,
      // image: '/images/bg.jpg',
      width: 260,
      height: 260,
      colorDark: "#000000",
      colorLight: "white",
      correctLevel: QRCode.CorrectLevel.H,
    })
    this.setData({
      codeData: codeData
    })
  },
  save: function () {
    console.log('save')
    wx.showActionSheet({
      itemList: ['保存图片'],
      success: function (res) {
        console.log(res.tapIndex)
        if (res.tapIndex == 0) {
          qrcode.exportImage(function (path) {
            wx.saveImageToPhotosAlbum({
              filePath: path,
            })
          })
        }
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