//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据

  },

  wait: function (numberMillis) {
    var now = new Date();
    var exitTime = now.getTime() + numberMillis;
    while (true) {
        now = new Date();
       if (now.getTime() > exitTime)
            return;
     }
    },
    
  globalData:{
     
  }
})