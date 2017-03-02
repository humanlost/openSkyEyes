Page({
  data:{
     src:"../../resource/title.png"
  },

  onLoad: function () {
    console.log('loadingFlash...');
  },

  onReady: function(){
    console.log('FlashReady...');
    var app = getApp();
    app.wait(2000);
        wx.navigateTo({
           url: '../index/index'
        })
  },
})