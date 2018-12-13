// pages/register/register.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: '请选择日期',
    fun_id: 2,
    time: '获取验证码', //倒计时 
    currentTime: 61,
    inputValue: '',
    mycode: '',
    pwd: '',
    pwdRe: '',
    code: '',
    encryptedData: '',
    iv: ''
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
  bindKeyInput: function (e) {
    this.setData({
      inputValue: e.detail.value  //手机号码
    })
  },
  bindKeyInputCode: function (e) {
    this.setData({
      mycode: e.detail.value
    })
  },
  bindKeyInputPwd: function (e) {
    this.setData({
      pwd: e.detail.value  //手机号码
    })
  },
  bindKeyInputpwdRe: function (e) {
    this.setData({
      pwdRe: e.detail.value  //手机号码
    })
  },
  getCode: function (options) {
    var that = this;
    var currentTime = that.data.currentTime
    var interval = setInterval(function () {
      currentTime--;
      that.setData({
        time: currentTime + '秒'
      })
      if (currentTime <= 0) {
        clearInterval(interval)
        that.setData({
          time: '重新发送',
          currentTime: 61,
          disabled: false
        })
      }
    }, 1000)
  },
  getVerificationCode: function () {
    var that = this
    var val = that.data.inputValue;
    var reg = /^1\d{10}$/;
    if (!reg.test(val)) {
      wx.showToast({
        title: '请输入正确的手机号！',
        icon: 'none',
        duration: 3000,
        mask: true,
      })
    } else {
      this.getList();  //获取验证码！
      this.getCode();
      that.setData({
        disabled: true
      })
    }
  },
  //最终供外面调用的方法
  login: function () {
    console.log('logining..........');
    var that = this;
    //调用登录接口
    wx.login({
      success: function (e) {
        console.log('wxlogin successd........');
        var code = e.code;
        console.log(code);
        wx.getUserInfo({
          success: function (res) {
            console.log('wxgetUserInfo successd........');
            //var encryptedData = encodeURIComponent(res.encryptedData);
            var encryptedData = (res.encryptedData);
            var iv = res.iv;
            that.setData({
              code: code,
              encryptedData: encryptedData,
              iv: iv
            })
            //thirdLogin(code, encryptedData, res.iv);//调用服务器api
            if (that.data.pwd != that.data.pwdRe) {
              wx.showToast({
                title: '密码不一致请核对！',
                icon: 'none',
                duration: 3000,
                mask: true,
              })
            } else {
              that.subBtn();
            }

          }
        })
      }
    });
  },
  getList: function () {
    var that = this;
    var wepIp = app.globalData.server;
    wx.request({
      url: wepIp + '/interface/user/sentsms.json ', //获取验证码；
      data: {
        phone: that.data.inputValue
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res);
      }
    })
  },
  subBtn: function () {
    wx.showLoading({})
    var that = this;
    var wepIp = app.globalData.server;
    wx.request({
      url: wepIp + '/interface/user/reg.json',
      data: {
        phone: that.data.inputValue,
        randomcode: that.data.mycode,
        pwd: that.data.pwd,
        code: that.data.code,
        encryptedData: that.data.encryptedData,
        iv: that.data.iv
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        wx.hideLoading()
        console.log(res);
        console.log(res.data.success);
        if (res.data.success == true) {
          wx.showToast({
            title: '注册成功！',
            icon: 'none',
            duration: 3000,
          })
          setTimeout(function () {
            wx.navigateTo({
              url: "/pages/login/login",
            })
          }, 3000)
        } else {
          wx.showToast({
            title: '用户名已经存在！',
            icon: 'none',
            duration: 3000,
          })
          wx.navigateTo({
            url: "/pages/login/login",
          })
        }

      }
    })
  }





})