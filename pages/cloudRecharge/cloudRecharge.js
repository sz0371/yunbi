//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    motto: 'Hello World',
    name: '作者，请看好',
    // 轮播图配置
    // imgUrls: [
    //   'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
    //   'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
    //   'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    // ],
    indicatorDots: true, //是否开启面板只是点。
    indicatorColor: "rgba(0,0,0,.3)", //指示点颜色
    //indeicatorActcolor: "rgba(133,133,133,.9)", //当前选中的指示点颜色
    autoplay: true,     //是否开启自动切换
    currentIndex: 0,    //当前所在滑块的index
    interval: 5000,     //自动切换时间间隔
    duration: 1000,     //滑动动画时长
    circular: true,     //是否采用衔接滑动
    vertical: false,    //滑块方向是否为纵向
    // 选项卡配置
    cloudIndexTab: 0,
    winWidth: 0,
    winHeight: 0,

    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    selectRecharger:0, //默认选择
    otherHidden:true,
  },
  // 滚动图片
  changeIndicatorDots: function (e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  changeAutoplay: function (e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  intervalChange: function (e) {
    this.setData({
      interval: e.detail.value
    })
  },
  durationChange: function (e) {
    this.setData({
      duration: e.detail.value
    })
  },
  onLoad: function (options){
      var that = this;
      that.getBanner();
      wx.showLoading({})
      wx.request({
        url: app.globalData.server + '/interface/user/getrule.json',
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        data: {},
        success:function(result){
          wx.hideLoading()
          if (result.data.msg == 1){
            var rule = result.data.data.rule;
            var ruleData = JSON.parse(rule);
            wx.setStorageSync('ruleData', ruleData);
            var payment = result.data.data;

            


            that.setData({
              ruleList: ruleData,
              payment: payment,
            })
          } else if (result.data.msg == -1){
            wx.showToast({
              title: '请求失败，请重试！',
              icon: 'none',
              duration: 800,
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
            icon:'none',
            duration:800,
          })
        }
      })
  },
  chooseCatalog:function(data){
    var that = this;
    console.log(data)
    that.setData({
      selectRecharger: data.currentTarget.dataset.select,
      givenum:data.target.dataset.give
    })
  },
  // 其它金额
  otherMoney:function(e){
    var that        = this
    var othervalue  = e.detail.value;
    var ruleData    = wx.getStorageSync('ruleData');
    var percent     = '0';
    for(var index=0; index<ruleData.length; ++index){
      if (othervalue < (ruleData[index].max * 1 + 1) && othervalue > (ruleData[index].min*1-1)){
        percent = (ruleData[index].denominator / ruleData[index].numerator)
      }
    }
    if (percent == '0') {
      percent = ((ruleData[ruleData.length - 1].denominator) / (ruleData[ruleData.length - 1].numerator));
    }
    if (parseInt(othervalue * percent) !=0){
      that.setData({
        otherNumber: parseInt(othervalue * percent),
        givenum: parseInt(othervalue * percent),
        selectRecharger: othervalue,

      })
    }
    console.log(ruleData)
    if (e.detail.value){
      if(e.detail.value>=10){
        that.setData({
          otherHidden: false,
          givenum: parseInt(othervalue * percent),
          selectRecharger: e.detail.value
        })
      } else {
        that.setData({
          otherHidden: true,
          givenum: parseInt(othervalue * percent),
          selectRecharger: 0,
        })
      }
      // that.setData({
        
      // })
    }
    
  },
  equityBtn:function(e){
    // console.log(e);
    wx.showLoading({})
    var givenum = e.target.dataset.givenum;
    var money   = e.target.dataset.money;
    var sky     = e.target.dataset.sky
    this.equityBtnRequest(givenum,money,sky)
  },
  equityBtnRequest: function (givenum,money,sky){
    var that = this;
    wx.request({
      url: app.globalData.server + '/interface/order/topuppay.json',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        givenum: givenum,
        skynum: sky,
        payprice: money,
        userId: wx.getStorageSync("userId"),
      }, 
      success:function(result){
        if(result.data.msg == 1){
          that.weixinPay(result.data.data.id)
        } else if (result.data.msg == -1){
          wx.showToast({
            title: '请求失败，请重试！',
            icon:'none',
            duration:1000,
          })
        } else {
          wx.showToast({
            title: '发生了未知的错误' + result.data.msg,
            icon: 'none',
            duration: 1000,
          })
        }
      },
      fail:function(){
        wx.showToast({
          title: '发生了未知的错误',
          icon: 'none',
          duration: 1000,
        })
      },
      complete:function(){
        console.log("加载完成")
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
        userId: wx.getStorageSync("userId"),
      }, 
      success:function(result){
        if(result.data.msg == 1){
          that.weixinPayAPI(result.data.data.orderPayWeixinVO);
        } else if (result.data.msg == -1){
          wx.showToast({
            title: '请求失败，请重试！',
            icon: 'none',
            duration: 1000,
          })
        } else {
          wx.showToast({
            title: '发生了未知的错误' + result.data.msg,
            icon: 'none',
            duration: 1000,
          })
        }
      },
      fail: function () {
        wx.showToast({
          title: '发生了未知的错误',
          icon: 'none',
          duration: 1000,
        })
      },
      complete: function () {
        console.log("加载完成")
      }
    })
  },
  weixinPayAPI: function (orderPayWeixinVO) {
    wx.requestPayment({
      timeStamp: orderPayWeixinVO.timeStamp, //当前时间
      nonceStr: orderPayWeixinVO.nonceStr,   //随机字符串
      package: orderPayWeixinVO.packageValue, //
      signType: 'MD5', //签名类型MD5
      paySign: orderPayWeixinVO.sign,  //签名
      success: function (result) {
        console.log("成功" + result);
        wx.hideLoading()
        wx.navigateBack({
          delta: 1,
          success: function (result) {
            wx.showToast({
              title: '支付成功',
              icon: 'success',
              duration: 1000,
            })
          },
        })
      },
      fail: function (res) {
        wx.showToast({
          title: '支付失败',
          icon: 'none',
          duration: 1000,
        })
      },
      complete: function (res) {
        console.log("支付加载成功")
      }
    })
  },
  getBanner:function(){
    var that = this
    wx.request({
      url: app.globalData.server + '/interface/info/adbytypecode.json',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        typeCode: 'shouye_appshangchengshouyelunbotu',
      }, 
      success:function(result){
        if(result.data.msg == 1){
          var imgData = result.data.data.resultList;
          that.setData({
            imgUrls: imgData,
          })
        }
      }
    })
  }
})
