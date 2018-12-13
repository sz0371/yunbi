// pages/cloudPoolbuy/cloudPoolbuy.js
var util = require('../../utils/util.js');
var app  = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cloudPoolbuyHidden:false,
    hiddenInfo:true,
    hiddenpay:false,
    cloudPoolLawhidden: true,
    userName: '',
    userAddress: '',
    userPhone: '',
    userIDCar: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.num)
    var that = this;
    var time = util.formatTime(new Date());
    that.setData({
      poolNum: options.num,
      formatTime: time
    })
  },
  radioChange:function(res){
    console.log(res.detail.value)
    var values = res.detail.value;
    this.setData({
      payType: values,
    })
  },
  // 确定选择付款方式
  payOk:function(res){
    // console.log(res.target.id)
    var wxOpenId = JSON.parse(wx.getStorageSync("datas")).weixinOpenid;
    var poolNumber = this.data.poolNum;
    if (res.target.id){
      if (res.target.id == 1){
        // console.log(wxOpenId);
        if (wxOpenId){
          this.getOrderId(poolNumber,res.target.id)
        } else {
          wx.showToast({
            title: '只能在微信内支付',
          })
        }
      } else {
        // this.getOrderId(poolNumber, res.target.id)
        this.setData({
          hiddenpay: true,
          hiddenInfo: false,
        })
      }
    } else {
      wx.showToast({
        title: '请选择支付方式',
        icon: 'none',
        duration: 800,
      })
    }
  },
  // 获取用户输入的用户信息
  userNameInput:function(e){
    this.setData({
      userName: e.detail.value
    })
  },
  userAddressInput: function (e) {
    this.setData({
      userAddress: e.detail.value
    })
  },
  userPhoneInput: function (e) {
    this.setData({
      userPhone: e.detail.value
    })
  },
  userIDCarInput: function (e) {
    this.setData({
      userIDCar: e.detail.value
    })
  },
  // 身份证验证
  userIDCarFocus:function(e){
    console.log(this.data.userIDCar);
  },
  cloudbuy:function(e){
    var userNames   = this.data.userName;
    var userAddress = this.data.userAddress;
    var userPhone   = this.data.userPhone;
    var userIDCar   = this.data.userIDCar
    if (!userNames){
      wx.showToast({
        title: '用户名不能为空',
        icon:'none',
        duration:500,
      })
      return false;
    }
    if (!userAddress){
      wx.showToast({
        title: '地址不能为空',
        icon: 'none',
        duration: 500,
      })
      return false;
    }
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    if (!userPhone) {
      wx.showToast({
        title: '手机号不能为空',
        icon: 'none',
        duration: 500,
      })
      return false;
    } else if (!myreg.test(userPhone)) {
      wx.showToast({
        title: '手机号格式错误',
        icon: 'none',
        duration: 500,
      })
      return false;
    } else if (userPhone.length !== 11){
      wx.showToast({
        title: '手机号长度有误',
        icon: 'none',
        duration: 500,
      })
      return false;
    }
    var mycard = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
    if (!userIDCar) {
      wx.showToast({
        title: '身份证号码不能为空',
        icon: 'none',
        duration: 500,
      })
      return false;
    } else if (!mycard.test(userIDCar)){
      wx.showToast({
        title: '请填写正确的身份证号码',
        icon: 'none',
        duration: 500,
      })
      return false;
    }
    this.setData({
      cloudPoolbuyHidden: true,
      cloudPoolLawhidden: false,
      
    })
  },
  // 同意法律声明
  agreeNext:function(e){
    var poolNumber = this.data.poolNum;
    var poolPayType = e.currentTarget.dataset.type;
    console.log(e.currentTarget.dataset.type);
    // console.log(JSON.parse(wx.getStorageSync("datas")).name);
    this.agreesSubmit(poolNumber, poolPayType);
    this.getOrderId01(poolNumber,2);
  },
  getOrderId01: function (poolNumber, payType) {
    var that = this;
    wx.request({
      url: app.globalData.server + '/interface/order/buypool.json',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        poolSkyNum: poolNumber * (0.01 + 0),
        poolNum: poolNumber,
        userId: wx.getStorageSync("userId"),
        payType: payType
      },
      success: function (result) {
        if (result.data.msg == 1) {
          //that.weixinPay(result.data.data.id);
          // wx.showToast({
          //   title: '下单成功',
          //   icon: 'none',
          //   duration: 800,
          // })
        } else if (result.data.msg == -2) {
          wx.showToast({
            title: '没有该用户',
            icon: 'none',
            duration: 800,
          })
        } else {
          wx.showToast({
            title: '未知错误' + result.data.msg,
            icon: 'none',
            duration: 800,
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
  agreesSubmit: function (poolNumber, poolPayType){

    wx.request({
      url: app.globalData.server + '/interface/user/addcontract.json',
      method:'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data:{
        poolSkyNum: poolNumber *(160+0),
        poolNum: poolNumber,
        IdNo: this.data.userIDCar,
        phone: this.data.userPhone,
        address: this.data.userAddress,
        name: this.data.userName,
        userId: JSON.parse(wx.getStorageSync("datas")).name,
        payType: poolPayType,
      },
      success:function(result){
        if(result.data.msg == 1){
             wx.showToast({
               title: '订购成功,感谢您的支持！我們会在24小时内确认，并与您联系.客服电话：400-8877-129',
               icon: 'none',
               duration: 800,
             })
             setTimeout(function(){
              //  poolPayType ==2线下支付
              if (poolPayType == 2){
                console.log(poolPayType)
                wx.navigateTo({
                  url: '../aboutAccount/aboutAccount',
                })
              } else if (poolPayType == 1){
                wx.navigateTo({
                  url: '../cloudAccount/cloudAccount',
                })
              } else{
                wx.showToast({
                  title: '未明确，请稍后',
                  icon: 'none',
                  duration: 800,
                })
              }
            },1000)

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
  // 不同意
  notNext:function(){
      wx.navigateBack({
        url:'../cloudPool/cloudPool'
      })
  },
  // 微信支付
  getOrderId: function (poolNumber,payType) {
    var that = this;
    wx.request({
      url: app.globalData.server + '/interface/order/buypool.json',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        poolSkyNum: poolNumber * (0.01 + 0),
        poolNum: poolNumber,
        userId: wx.getStorageSync("userId"),
        payType: payType
      },
      success: function (result) {
        if (result.data.msg == 1) {
          that.weixinPay(result.data.data.id);
        } else if (result.data.msg == -2){
          wx.showToast({
            title: '没有该用户',
            icon: 'none',
            duration: 800,
          })
        } else {
          wx.showToast({
            title: '未知错误' + result.data.msg,
            icon: 'none',
            duration: 800,
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
  weixinPay:function(id){
    
    var that = this;
    wx.request({
      url: app.globalData.server + '/interface/order/payapp.json',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        id:id,
        userId: wx.getStorageSync("userId")
      }, 
      success: function (result) {
        if (result.data.msg == 1) {
          that.weixinPayAPI(result.data.data.orderPayWeixinVO);
        } else if (result.data.msg == -1){
          wx.showToast({
            title: '请求失败，请重试！',
            icon: 'none',
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
      fail: function (res) {
        wx.showToast({
          title: '发生了未知的错误',
          icon: 'none',
          duration: 800,
        })
      },
      complete: function (res) {
        console.log('加载成功');
      }
    })
  },
  weixinPayAPI: function (orderPayWeixinVO){
    wx.showLoading({})
      wx.requestPayment({
        timeStamp: orderPayWeixinVO.timeStamp, //当前时间
        nonceStr: orderPayWeixinVO.nonceStr,   //随机字符串
        package: orderPayWeixinVO.packageValue, //
        signType: 'MD5', //签名类型MD5
        paySign: orderPayWeixinVO.sign,  //签名
        success:function(result){
          wx.hideLoading();
          console.log("成功"+ result);
          wx.navigateBack({
            delta: 1,
            success:function(result){
              wx.showToast({
                title: '支付成功',
                icon: 'success',
                duration: 1000,
              })
            },
          })
        },
        fail:function(res){
          wx.showToast({
            title: '支付失败',
            icon: 'none',
            duration: 1000,
          })
        },
        complete:function(res){
          console.log("支付加载成功")
        }
      })
  }
})