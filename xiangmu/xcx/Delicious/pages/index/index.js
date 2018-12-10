//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
   list0:[],
   list1: [],
   list2: [],
  },
  //事件处理函数
  getImg(){
    wx.request({
      url: 'http://127.0.0.1:3003/imagelist',
      success: res => {
        var res0=[],res1=[],res2=[]
        for (let i=0;i<2;i++){
            res0.push(res.data[i])
        }
        for (let i = 2; i < 4; i++) {
          res1.push(res.data[i])
        }
        for (let i = 4; i < 8; i++) {
          res2.push(res.data[i])
        }
        this.setData({
          list0: res0,
          list1: res1,
          list2: res2,
        })
      }
    })
  },
  onLoad: function () {
     this.getImg();
   
  } 

})
