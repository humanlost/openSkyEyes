Page({
    data: {
      OKsrc: '../../resource/534965.png',
      agsrc: '../../resource/534889.png'

    },

  onLoad: function () {
  },

  onReady: function(){
    var phoneModel,PMresult,src;
    var amapFile = require('../../libs/amap-wx.js');
    var amap = new amapFile.AMapWX({key:'d2dc5e8dc823451c9105f09a6b5c83e4'});

    PMresult='0';

    console.log('onLoadResult');
    
    //获取照片路径
    src=wx.getStorageSync('keyP1')[0];
    console.log(src);
    wx.getImageInfo({
        src: src,
        success: function (res) {
          console.log(res.width)
          console.log(res.height)
        }
    })

    //用canvas压缩图片
     const cc = wx.createCanvasContext('CCanvas');
     cc.drawImage(src,0,0,255,255);
     cc.draw();
     cc.save();
     var app = getApp();
     app.wait(500);
     wx.canvasToTempFilePath({
        canvasId: 'CCanvas',
        success(res) {
          src=res.tempFilePath;
          console.log('success')
          console.log(res.tempFilePath);
          wx.getImageInfo({
            src: src,
            success: function (res) {
             console.log(res.width)
             console.log(res.height)
           }
          })
        },
        fail(info) {
          console.log('ccerror');
          console.log(info);
        },
        compplete(){
          console.log('yasuojieshu');

        }
     })

    //在画布上显示图片
    const ctx = wx.createCanvasContext('myCanvas');
    ctx.drawImage(src, 0,0 , 375, 527);
    ctx.draw();
   
    //获取手机版本信息
    wx.getSystemInfo({
      success: function(res) {
        console.log(res.model);
        phoneModel=res.model;
      }
    })

   //高德地图 若成功则进行上传并显示pm2.5

  amap.getRegeo({
    success:function (data){
      console.log(1);
      console.log(data);
      var location = data[0];
      var latitude = location.latitude;
      var longitude = location.longitude;
      var address = location.name;
      var area = '001';
      var city = '131';

          if (address[0]=='海' && address[1]=='淀') {area='00101';}
          if (address[0]=='石' && address[1]=='景') {area='00102';}
          if (address[0]=='丰' && address[1]=='台') {area='00103';}
          if (address[0]=='朝' && address[1]=='阳') {area='00105';}
          if (address[0]=='西' && address[1]=='城') {area='00106';}
          if (address[0]=='东' && address[1]=='城') {area='00107';}
          if (address[0]=='大' && address[1]=='兴') {area='00108';}
          if (address[0]=='通' && address[1]=='州') {area='00109';}
          if (address[0]=='顺' && address[1]=='义') {area='00110';}
          if (address[0]=='昌' && address[1]=='平') {area='00111';}
          if (address[0]=='门' && address[1]=='头') {area='00112';}
          if (address[0]=='平' && address[1]=='谷') {area='00113';}
          if (address[0]=='怀' && address[1]=='柔') {area='00114';}
          if (address[0]=='密' && address[1]=='云') {area='00115';}
          if (address[0]=='延' && address[1]=='庆') {area='00116';}
          if (address[0]=='房' && address[1]=='山') {area='00104';}
      
      console.log(area);

      //上传数据到服务器
      wx.uploadFile({
            url: 'http://10.103.240.143:8181/pm25/pm25/upload', 
            filePath: src,
            name: 'file1',
            formData:{
              'phoneType': phoneModel,
              'lat': latitude,
              'lon': longitude,
              'areaCode': area,
              'cityCode': city

             },
              success: function(res){
                   //do something
                  var data=JSON.parse(res.data);
                  console.log(data);
                  PMresult=data.content;
                  console.log(3);
                  console.log(res);
                  console.log(PMresult);

                  //显示pm2.5
                   wx.showModal({
                      title: 'pm2.5指数',
                      content: '             '+PMresult,
                      success: function(res) {
                          if (res.confirm) {
                              console.log('用户点击确定')
                          }
                  }
      })
                  
              },

              complete: function(){
                  console.log('upload complete');
              }
          })

    },
      fail: function(info){
        console.log(3);
        console.log(info);
        wx.showModal({
          title: 'error',
          content: '获取地理信息失败，可能您的网络连接有问题',
          success: function(res) {
              if (res.confirm) {
               console.log('用户点击确定')
              }
          }
        })
      }
  })

},


// 确认并返回
  bindOKTap: function(){
         wx.redirectTo({
           url: '../index/index'
         })
  },

//重新拍照
  bindAgTap: function(){
    wx.chooseImage({
       count: 1, // 默认9
       sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
       sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
       success: function (res) {
    // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
         var tempFilePaths = res.tempFilePaths
         wx.setStorage({
            key:"keyP1",
            data:tempFilePaths
         })
      // 将图片路径存入缓存
         wx.showToast({
           title:'图片载入成功',
           icon: 'success',
           duration:2000
         })
    /// 提示框
         wx.redirectTo({
           url: '../result/result'
         })
    //跳转界面
       },
       fail: function(){
         wx.showToast({  
           title:'图片载入失败',
           duration:2000
         })
       },
       complete: function(){ }
}) 
  }

})