//index.js
//获取应用实例

Page({
  data: {
    Qsrc: '../../resource/drawable-hdpi-v4/bulb2.png',
    src: '../../resource/drawable-hdpi-v4/take_photo1.png'
  },

  //事件处理函数
  bindPhotoTap: function() {
      console.log(1);
       wx.chooseImage({
       count: 1, // 默认9
       sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
       sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
       success: function (res) {
    // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
         var tempFilePaths = res.tempFilePaths
         
         wx.setStorage({
            key:"keyP1",
            data:tempFilePaths
         })
      // 将图片路径存入缓存


         wx.navigateTo({
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
  },

  bindQuestionTap: function(){
         wx.navigateTo({
           url: '../question/question'
         })
  },

  onLoad: function () {
    console.log('onLoadIndex')

  },


})
