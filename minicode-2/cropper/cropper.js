const app = getApp()
Page({
   data: {
      src: '',
      width: 350,//裁剪框宽度
      height: 350,//裁剪框高度
      img_width: 400,//图片宽
      img_height: 400,//图片高
      disable_rotate: true,//是否禁用旋转
      disable_ratio: false,//锁定比例
      limit_move: true,//是否限制移动
      disable_height: true,//是否固定裁剪高
      disable_width: true,//是否固定裁剪宽
   },
   onLoad: function (options) {
      var width = wx.getSystemInfoSync().windowWidth - 50
      //获取屏幕高度
      this.setData({
         width: width,
         height: width * options.height / options.width,
      })
      console.log(options)
      setTimeout(() => {
         this.setData({
            key: options.key || '',
            page: options.page || '',
            showCropper: true
         });
         this.cropper = this.selectComponent("#image-cropper");
      }, 500)
      setTimeout(() => {
         this.setData({
            src: options.pic || '',
         })
      }, 1000)
      // this.cropper.upload();//上传图片
   },
   cropperload(e) {
      console.log('cropper加载完成');
   },
   loadimage(e) {
      wx.hideLoading();
      console.log('图片');
      this.cropper.imgReset();
   },
   clickcut(e) {
      console.log(e.detail);
      //图片预览
      wx.previewImage({
         current: e.detail.url, // 当前显示图片的http链接
         urls: [e.detail.url] // 需要预览的图片http链接列表
      })
   },
   //上传
   upload() {
      let that = this;
      wx.chooseImage({
         count: 1,
         sizeType: ['original', 'compressed'],
         sourceType: ['album', 'camera'],
         success(res) {
            wx.showLoading({
               title: '加载中',
            })
            const tempFilePaths = res.tempFilePaths[0];
            //重置图片角度、缩放、位置
            that.cropper.imgReset();
            that.setData({
               src: tempFilePaths
            });
         }
      })
   },
   //设置剪裁框宽度
   setWidth(e) {
      this.setData({
         width: e.detail.value < 10 ? 10 : e.detail.value
      });
      this.setData({
         cut_left: this.cropper.data.cut_left
      });
   },
   //设置剪裁框高度
   setHeight(e) {
      this.setData({
         height: e.detail.value < 10 ? 10 : e.detail.value
      });
      this.setData({
         cut_top: this.cropper.data.cut_top
      });
   },
   submit() {
      // this.setData({
      //    disabled: true
      // })
      this.cropper.getImg((obj) => {
         console.log(obj)
      });
   }
})
