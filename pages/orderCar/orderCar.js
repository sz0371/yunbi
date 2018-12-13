// pages/orderCar/orderCar.js
var util = require('../../utils/util.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: null,
    state: '',
    turn: '',
    list: '',
    productNum: 1,
    pid: '',
    region: ['广东省', '广州市', '海珠区'],
    // time: '12:01',
    array: [
      { "1": "2", "2": "3" },
      { "1": "2", "2": "3" }
    ],
    ids: '',
    address: '',
    name: '',
    phone: '',
    inputValue: '',
    addressID: '',
    multiIndex: [0, 0],
    ck: '',
    isChange: 'Y'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    if (options.ck != '') {
      var isChange = "";
      if (options.isChange) {
        this.setData({
          ck: options.ck,
          isChange: options.isChange
        });
      } else {
        this.setData({
          ck: options.ck,
          isChange: isChange
        });
      } 
      
    }
    console.log(options.ck);
    // 调用函数时，传入new Date()参数，返回值是日期和时间  
    var time = util.formatTime(new Date());
    // 获取动态picker
    var hours = ['8:00-10:00', '10:00-12:00', '12:00-14:00', '14:00-16:00', '16:00-18:00', '18:00-20:00'];
    var multiArray = new Array();
    var myDate = new Date();
    var year = myDate.getFullYear();   //获取完整的年份(4位,1970-????)  
    var month = myDate.getMonth() + 1;    //获取当前月份(0-11,0代表1月)  
    month = month < 10 ? "0" + month : month;
    var date = myDate.getDate();       //获取当前日(1-31)  
    var today = year + "-" + month + "-" + date;
    var secondDate = year + "-" + month + "-" + (date + 1);
    var thirdDate = year + "-" + month + "-" + (date + 2);
    var dates = [today, secondDate, thirdDate];
    multiArray.push(dates);
    multiArray.push(hours);
    // 再通过setData更改Page()里面的data，动态更新页面的数据  
    this.setData({
      // time: time,
      multiArray: multiArray
    });


    console.log(options);
    console.log(options.id);
    var ids = options.id + '_' + 1;
    console.log(ids);
    if (options.name != undefined) {
      this.setData({
        address: options.address,
        name: options.name,
        phone: options.phone,
        addressID: options.addressID
      });
    }
    if (options.id == null || options.id == 'null') {
      console.log("购物车支付");
      this.setData({
        state: 2
      });
      this.getList();
    } else {
      console.log("直接车支付");      
      this.setData({
        id: options.id,
        state: options.state,
        ids: ids
      })
      this.getPayList();
    }

  },
  bindMultiPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为bindMultiPickerChange', e.detail.value)
    this.setData({
      multiIndex: e.detail.value
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

  },
  getPayList: function () {  //直接购买
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
        var arr = [];
        arr.push(res.data.data);
        console.log(res);
        console.log(res.data.data);
        that.setData({
          list: arr,
        })
      }
    })
  },
  getList: function () {  //购物车列表；
    var that = this;
    var wepIp = app.globalData.server;
    var userId = wx.getStorageSync('userId');
    wx.showLoading({})
    wx.request({
      url: wepIp + '/interface/cart/cartlist.json',
      data: {
        userId: userId,
        isChange: that.data.isChange
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data.data);
        console.log(res);
        wx.hideLoading()
        if (res.data.data == '' || res.data.data == null) {
          that.setData({
            turn: true
          })
        } else {
          var arr = res.data.data.resultList;
          console.log(arr);
          var ids = '';
          for (var i = 0; i < arr.length; i++) {
            ids += arr[i].productId + "_" + arr[i].productNum + ",";
          }
          console.log(ids);
          that.setData({
            turn: false,
            list: arr,
            ids: ids
          })
        }
      }
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
      pid: id
    })
    if (this.data.state == 2) {
      this.changeNum();
    }
    if (this.data.state == 1) {
      var ids = this.data.id + "_" + n;
      console.log(ids);
      this.setData({
        ids: ids
      })
    }

  },
  addCount: function (e) {
    var m = e.target.dataset.num;
    var id = e.target.dataset.id;
    m++
    this.setData({
      productNum: m,
      pid: id
    })
    if (this.data.state == 2) {
      this.changeNum();
    }
    if (this.data.state == 1) {
      var ids = this.data.id + "_" + m;
      console.log(ids);
      this.setData({
        ids: ids
      })
    }
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
        id: that.data.pid
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        that.getList();

      }
    })
  },
  address: function () {
    wx.navigateTo({
      url: "/pages/personalAddress/personalAddress?pay=Y&id="+this.data.id,
    })
  },
  chooseTime: function () {
    console.log("选择时间");
  },
  submitBtn: function (e) {
    var that = this;
    var wepIp = app.globalData.server;
    var userId = wx.getStorageSync('userId');
    if (that.data.addressID == '' || that.data.addressID == undefined){
      wx.showToast({
        title: '请添加地址!',
        icon: 'none'
      })
      return
    }
    // console.log(e.target.dataset.time);
    wx.showLoading({
      title: '正在提交订单',
    })
    wx.request({
      url: wepIp + '/interface/order/buy.json',
      data: {
        userId: userId,
        ids: that.data.ids,
        invoiceName: that.data.inputValue,
        expectedTime: e.target.dataset.time,
        addressId: that.data.addressID

      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        wx.hideLoading()
        console.log(res);
        var id = res.data.data.id;
        wx.navigateTo({
          url: "/pages/orderDetails/orderDetails?id=" + id,
        })

      }
    })

  },
  bindTimeChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      time: e.detail.value
    })
  },
  bindKeyInput: function (e) {
    this.setData({
      inputValue: e.detail.value
    })
  }


})