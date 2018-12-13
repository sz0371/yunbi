// pages/shoppingCart/shoppingCart.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    carts: [],               // 购物车列表
    hasList: false,          // 列表是否有数据
    totalPrice: 0,           // 总价，初始为0
    selectAllStatus: true,    // 全选状态，默认全选
    list: '',
    id: '',
    turn: false,
    selID: '2c92983b63dd42810163ddca60e3001c',
    total: 0,
    isChange: '',
    ckall: 0,
    ck: '',
    lengths: ''
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
    this.getList();
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
  getList: function () {
    var that = this;
    var wepIp = app.globalData.server;
    var userId = wx.getStorageSync('userId');
    wx.showLoading({})
    wx.request({
      url: wepIp + '/interface/cart/cartlist.json',
      data: {
        userId: userId
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data.data);
        wx.hideLoading()
        var mynum = 0;
        if (res.data.data == '' || res.data.data == null) {
          that.setData({
            turn: true
          })
        } else {
          var arr = res.data.data.resultList;
          for (var i = 0; i < arr.length; i++) {
            if (arr[i].isChange == 'Y') {
              mynum++
            }
          }
          that.setData({
            turn: false,
            list: res.data.data.resultList,
            total: mynum,
            lengths: arr.length
          })
        }
      }
    })
  },
  del: function (e) {
    var that = this;
    var wepIp = app.globalData.server;
    var userId = wx.getStorageSync('userId');
    var id = e.target.dataset.id;

    wx.request({
      url: wepIp + '/interface/cart/removecart.json',
      data: {
        userId: userId,
        ids: id

      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        wx.showToast({
          title: '删除成功！',
        })
        that.getList();
        that.onShow();
        if (that.data.list.length == 1) {
          that.setData({
            list: ''
          })
        }
      }
    })
  },
  goShopping: function () {
    wx.switchTab({
      url: "/pages/index/index",
    })
  },
  minusCount: function (e) {
    var n = e.target.dataset.num;
    var id = e.target.dataset.id;
    n--;
    if (n <= 0) {
      n = 0
    }
    this.setData({
      productNum: n,
      id: id
    })
    console.log(n);
    this.changeNum();
  },
  addCount: function (e) {
    var m = e.target.dataset.num;
    var id = e.target.dataset.id;
    m++
    this.setData({
      productNum: m,
      id: id
    })
    this.changeNum();
  },
  changeNum: function () {
    var that = this;
    var wepIp = app.globalData.server;
    var userId = wx.getStorageSync('userId');
    wx.request({
      url: wepIp + '/interface/cart/updatecart.json', //获取验证码；
      data: {
        userId: userId,
        productNum: that.data.productNum,
        id: that.data.id
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        that.getList();

      }
    })
  },
  goPay: function () {
    if (this.data.total==0){
      wx.showToast({
        title: '请勾选商品！',
        icon: 'none'
      })
      return
    }
    wx.showLoading({})
    wx.navigateTo({
      url: "/pages/orderCar/orderCar?ck=" + this.data.ck,
    })
  },
  selectList: function (e) {
    console.log(e._requireActive);
    var index = e.target.dataset.index;
    this.setData({
      selID: index
    });
    console.log(index);
  },
  checkboxChange: function (e) {
    console.log(e.detail.value)
    console.log(e.target.dataset.id)
    var ckID = e.detail.value[0];
    console.log(ckID);
    var myID = e.target.dataset.id;
    var m = this.data.total;
    if (ckID == undefined) {
      m--;
      this.setData({
        isChange: 'N',
        myID: myID,
        total: m
      })
    } else {
      m++
      this.setData({
        isChange: 'Y',
        myID: myID,
        total: m
      })

    }
    this.ck();
  },
  ck: function () {
    var that = this;
    var wepIp = app.globalData.server;
    var userId = wx.getStorageSync('userId');
    wx.request({
      url: wepIp + '/interface/cart/updatecart.json',
      data: {
        userId: userId,
        id: that.data.myID,
        isChange: that.data.isChange
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res);
      }
    })
  },
  ckAll: function () {
    //this.getList();
    var n = this.data.lengths;
    console.log(n);
    this.setData({
      ckall: 1,
      ck: 'all',
      total: n
    })

  }

})