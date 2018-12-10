//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    img: '',
    list:['咖啡时光','暖饮轻食','鲜果果茶']
  },
  getImg() {
    wx.request({
      url: 'http://127.0.0.1:3003/imagelists',
      success: res => {
        this.setData({ img: res.data[18].img_url})
         console.log(res.data[18])
      }
    })
  },
  onLoad: function () {
    this.getImg();
  }
})
