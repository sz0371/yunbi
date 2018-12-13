// pages/personalData/personalData.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    personalArray:['男','女'],
    objectArray: [
      {
        id:0,
        sex: '男'
      },
      {
        id:1,
        sex:'女'
      }
    ],
    sexIndex: 0,
    multiIndex: [0, 0],
    dateIndex: '2018-05-24',
    address: '',
    name: '',
    phone: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({})
    var datas = JSON.parse(wx.getStorageSync("datas"));

    console.log(datas);
    console.log(options)
    var that = this;
    var personalDatas = "";
    that.setData({
      address: options.address,
      name: options.name,
      phone: options.phone,
      personalData: datas
    })
    wx.request({
      url: app.globalData.server + '/interface/user/getaddresslist.json',
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        page: 1,
        rows: 100,
        userId: wx.getStorageSync("userId"),
      },
      success:function(result){
        console.log(result);
        wx.hideLoading()
        if(result.data.msg == 1){
          personalDatas = result.data.data.resultList;
          console.log(personalDatas)
          that.setData({
                     
            personalDatas: personalDatas
          })
        } else if (result.data.msg == -1){
          wx.showToast({
            title: '请求失败，请重试！',
            icon: 'none',
            duration:300
          })
        } else if (result.data.msg == -2){
          wx.showToast({
            title: '请求失败，请重试！',
            icon: 'none',
            duration: 300
          })
        } else if (result.data.msg == -4){
          wx.showToast({
            title: '',
          })
        } else {
          wx.showToast({
            title: '发生了未知的错误',
            icon: 'none',
            duration: 300
          })
        }
      },
      fail:function(){
        wx.showToast({
          title: '发生了未知的错误',
          icon: 'none',
          duration: 300
        })
      },
      complete:function(){
        console.log("加载成功");
      }
    })
    
    
  },
  jumpaddress:function(){
    wx.navigateTo({
      url: '../personalAddress/personalAddress',
    })
  },
  // 保存
  saveText:function(e){
    console.log(e)
    wx.showLoading({ })
    wx.request({
      url: app.globalData.server + '/interface/user/updateuserinfo.json',
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        userId: wx.getStorageSync("userId"),
        sex: e.target.dataset.sex,
        birthDay: e.target.dataset.date,
      },
      success:function(result){
        wx.hideLoading()
        if (result.data.msg == 1){
          wx.showToast({
            title: '保存成功',
            icon: 'none',
            duration: 300,
          })
          console.log("保存成功")
        } else if (result.data.msg == -1) {
          wx.showToast({
            title: '请求失败，请重试！',
            icon: 'none',
            duration: 300
          })
        } else if (result.data.msg == -2) {
          wx.showToast({
            title: '请求失败，请重试！',
            icon: 'none',
            duration: 300
          })

        } else if (result.data.msg == -4) {
          wx.showToast({
            title: '',
          })
        } else {
          wx.showToast({
            title: '发生了未知的错误',
            icon: 'none',
            duration: 300
          })
        }
      },
      fail: function () {
        wx.showToast({
          title: '发生了未知的错误',
          icon: 'none',
          duration: 300
        })
      },
      complete: function () {
        console.log("加载成功");
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
  // 选择男女

  bindPickerChange:function(e){
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      sexIndex: e.detail.value
    })
  },
  // 点击日期组件
  bindDateChange:function(e){
    // console.log(日期)
    this.setData({
      dateIndex: e.detail.value
    })
  },
  // 点击退出
  exitLogin:function(e){
    wx.clearStorageSync("userId");
    wx.clearStorageSync("datas");
    wx.navigateTo({
      url: '../login/login',
    })
  }
})