// pages/login/login.js
var app = getApp();
// 获取url
function formatUrlSearch(){
  var param = {};
  var pages = getCurrentPages();
  var currentPage = pages[pages.length-1];
  var url = currentPage.route;
  console.log(url);
}
// 跳转页面
function naviewGateTo(){
  wx.navigateTo({
    url: '../index/index',
  })
}
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    code: '',
    encryptedData: '',
    iv: ''
  },
  // 获取表单信息
  formSubmitLogin:function(e){
    // console.log(e.detail.value);
    // console.log(e.detail.value.cloudPhoneNumber);
    // console.log(e.detail.value.cloudPassword);
    // console.log(app.globalData.server +"/interface/user/loginapp.json")
    // 'http://www.yunbikeji.com/skycurrency2/interface/user/loginapp.json'
    var that = this;
    var phone = e.detail.value.cloudPhoneNumber;
    var password = e.detail.value.cloudPassword;
    if(phone.length != '11'){
      wx.showToast({
        title: '请填写正确的手机号',
        icon: 'none',
        duration: 500
      });
    }
    if (password == '0'){
      wx.showToast({
        title: '密码不能为空',
        icon:'none',
        duration:500
      });
      return false;
    }
    wx.showLoading({})
    wx.request({
      url: app.globalData.server+'/interface/user/loginapp.json',
      method: "POST",
      data:{
        phone: phone,
        pwd: password,
        code: that.data.code,
        encryptedData: that.data.encryptedData,
        iv: that.data.iv
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success:function(result){
        wx.hideLoading();
        if(result.data.msg == 1){
          var datasJson = result.data.data;
          var datas = wx.setStorageSync('datas', JSON.stringify(datasJson));
          var userId = wx.setStorageSync('userId', result.data.data.id);
          wx.navigateTo({
            url: '../setup/setup',
          })
        } else if(result.data.msg == -1){
          wx.showToast({
            title: '登录失败，请重试！',
            icon: 'none',
            duration: 500,
          })
        } else if(result.data.msg == -2){
          wx.showToast({
            title: '密码错误',
            icon: 'none',
            duration: 500,
          })
        } else if(result.data.msg == -4){
          wx.showToast({
            title: '用户不存在',
            icon: 'none',
            duration: 500,
          })
        } else {
          wx.showToast({
            title: '未知错误~',
            icon: 'none',
            duration:500,
          })
        }
      },
      fail: function(result){
        wx.showToast({
          title: '登录失败，稍后登录',
          icon: 'none',
          duration: 500,
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.login();
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
        //console.log(code);
        wx.getUserInfo({
          success: function (res) {
            console.log('wxgetUserInfo successd........');
            //var encryptedData = encodeURIComponent(res.encryptedData);
            var encryptedData = (res.encryptedData);
            var iv = res.iv;
            //console.log(iv);
            //console.log(encryptedData);
            that.setData({
              code: code,
              encryptedData: encryptedData,
              iv: iv
            })
            //thirdLogin(code, encryptedData, res.iv);//调用服务器api
          }
        })
      }
    });
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