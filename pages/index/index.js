//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    // 轮播图配置
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    indicatorDots: true, //是否开启面板只是点。
    indicatorColor: "rgba(0,0,0,.3)", //指示点颜               订单lor: "rgba(133,133,133,.9)", //当前选中的指示点颜色
    autoplay: true,     //是否开启自动切换
    currentIndex: 0,    //当前所在滑块的index
    interval: 5000,     //自动切换时间间隔
    duration: 1000,     //滑动动画时长
    circular: true,     //是否采用衔接滑动
    vertical: false,    //滑块方向是否为纵向
    // 选项卡配置
    winHeight: "",//窗口高度
    cloudIndexTab: 0, //预设当前项的值
    scrollLeft: 0,//tab标题的滚动条位置
    list: '',
    navListC: '',
    id: ''
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
  // 页面加载
  onLoad: function () {
    // 获取系统信息
    wx.getSystemInfo({
      success: res => {
        console.log(res);
        this.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        })
      }
    })
  },
  // 滚动标签
  cloudShoppingBoxChange: function (e) {
    var index = e.detail.current;
    var id = this.data.navListC[index].id;
    this.setData({
      cloudIndexTab: e.detail.current,
      id: id
    });
    console.log(index+":" + id + "值");
    this.checkCor();
    this.getList();
  },
  //判断当前滚动超过一屏时，设置tab标题滚动条。
  checkCor: function () {
    if (this.data.currentTab > 4) {
      this.setData({
        scrollLeft: 300
      })
    } else {
      this.setData({
        scrollLeft: 0
      })
    }
  },
  // 点击标题切换当前页时改变样式
  cloudShoppingTabList: function (e) {
    var cur = e.target.dataset.current;
    var id = e.target.dataset.id;
    if (this.data.cloudIndexTab == cur) { return false; }
    else {
      this.setData({
        cloudIndexTab: cur,
        id: id
      })
    }
    this.getList();
  },
  onLoad: function () {
    var that = this;
    var wepIp = app.globalData.server;
    wx.request({
      url: wepIp + '/interface/product/getcategory.json', //仅为示例，并非真实的接口地址
      data: {
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        var navList = res.data.data;
        that.setData({
          navListC: navList,
          id: res.data.data[0].id
        })
        that.getList();
      }
    })


    var that = this;
    that.getBanner();
    //  高度自适应
    wx.getSystemInfo({
      success: function (res) {
        var clientHeight = res.windowHeight,
          clientWidth = res.windowWidth,
          rpxR = 750 / clientWidth;
        var calc = clientHeight * rpxR - 180;
        console.log(calc)
        that.setData({
          winHeight: calc
        });
      }
    });

  },
  getList: function () {
    wx.showLoading({
      // title: '请选择地点',
    })
    var that = this;
    var wepIp = app.globalData.server;
    wx.request({
      url: wepIp + '/interface/product/productlist.json', //仅为示例，并非真实的接口地址
      data: {
        categoryId: that.data.id
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        wx.hideLoading()
        that.setData({
          list: res.data.data.resultList
        })
      }
    })
  },
  goDetails: function (e) {
    var id = e.currentTarget.dataset.id;
    console.log(id);
    wx.navigateTo({
      url: "/pages/commodityDetails/commodityDetails?id=" + id,
    })

  },
  addCart: function (e) {
    var productID = e.target.dataset.id;
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
  },
  getBanner: function () {
    var that = this;
    wx.request({
      url: app.globalData.server + '/interface/info/adbytypecode.json',
      method: "POST",
      data: {
        typeCode: 'shouye_appshangchengshouyelunbotu'
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (result) {
        if (result.data.msg == 1) {
          var imgData = result.data.data.resultList;
          that.setData({
            imgUrls: imgData
          })
        }
      }
    })
  },
  footerTap: app.footerTap
})
