// pages/commodityDetails/commodityDetails.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    list: '',
    photoAlbums: '',
    nodes: [{
      name: 'div',
      attrs: {
        class: 'div_class',
        style: 'line-height: 60px; color: red;'
      },
      children: [{
        type: 'text',
        text: 'Hello&nbsp;World!'
      }]
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    wx.showLoading({})
    this.setData({
      id: options.id
    })
    this.getList()
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
  listenSwiper: function (e) {
  },
  getList: function () {
    var that = this;
    var wepIp = app.globalData.server;
    wx.request({
      url: wepIp + '/interface/product/productdetail.json', //仅为示例，并非真实的接口地址
      data: {
        id: that.data.id
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        wx.hideLoading()
        console.log(res);
        var list = res.data.data.detail.replace(/\<img/gi, '<img style="max-width:100%;height:auto" ');
        var photoAlbums = [];
        if (res.data.data.photoAlbums != '' && res.data.data.photoAlbums != null) {
          if (res.data.data.photoAlbums.indexOf(",") == -1) {
            photoAlbums = res.data.data.photoAlbums;
          } else {
            photoAlbums = res.data.data.photoAlbums.split(",");
          }
        } else {
          photoAlbums = "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1528207380006&di=cd6d0e9864db43fdb89201c5ff44d745&imgtype=0&src=http%3A%2F%2Fsangeng.org%2FUploads%2FPicture%2F2017-10-26%2F59f1fe410dadc_300_300.png";
        }
        // console.log(that.data.nodes[0].children[0].text);
        that.data.nodes[0].children[0].text = 12356
        //console.log(list);
        that.setData({
          list: list,
          photoAlbums: photoAlbums
        })
      }
    })
  },
  goPay: function () {
    console.log(1234);
    wx.navigateTo({
      url: "/pages/orderCar/orderCar?id="+this.data.id,
    })
  },
  addCart: function () {
    var productID = this.data.id;
    var that = this;
    var wepIp = app.globalData.server;
    var userId = wx.getStorageSync('userId');
    wx.showLoading({})
    wx.request({
      url: wepIp + '/interface/cart/addshoppingcart.json ',
      data: {
        productId: productID,
        productNum: 1,
        userId: userId
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        wx.hideLoading();
        wx.showToast({
          title: '添加成功！',
        })
      }
    })
  }

})