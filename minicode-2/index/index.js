const app = getApp()

const component = Page({
    data: {

    },
    async onLoad() {
        function changeColor(pdata, beforeColor, afterColor) {
            for (var j = 0; j < pdata.length; j += 4) {
                if (pdata[j] === beforeColor[0]) pdata[j] = afterColor[0];
                if (pdata[j + 1] === beforeColor[1]) pdata[j + 1] = afterColor[1];
                if (pdata[j + 2] === beforeColor[2]) pdata[j + 2] = afterColor[2];
            }
        }

        const IMAGE_URL = '/images/icons/brand2.png';

        // 创建离屏 2D canvas 实例
        const canvas = wx.createOffscreenCanvas({
            type: '2d',
            width: 64,
            height: 64,
        })
        // 获取 context。注意这里必须要与创建时的 type 一致
        const context = canvas.getContext('2d')

        // 创建一个图片
        const image = canvas.createImage()
        // 等待图片加载
        await new Promise(resolve => {
            image.onload = resolve
            image.src = IMAGE_URL // 要加载的图片 url
        })

        // 把图片画到离屏 canvas 上
        context.clearRect(0, 0, 64, 64)
        context.drawImage(image, 0, 0, 64, 64)

        // 获取画完后的数据
        const imgData = context.getImageData(0, 0, 64, 64)
        console.log('imgData', imgData)

        // 改变颜色
        changeColor(imgData.data, [0,0,0], [0, 255, 0]);

        context.putImageData(imgData, 0, 0);

        wx.canvasToTempFilePath({
            x: 0,
            y: 0,
            width: 64,
            height: 64,
            destWidth: 128,
            destHeight: 128,
            canvas,
            success(res) {
              console.log('canvasToTempFilePath res',res.tempFilePath)

              // 更新tabbar item
              wx.setTabBarItem({
                index: 0,
                text: "商家",
                iconPath: "/images/icons/brand2.png",
                selectedIconPath: res.tempFilePath
              });
              wx.setTabBarStyle({
                selectedColor: '#00ff00'
              })
            }
          })
    },

    //选择图片
    chooseImage(e) {
        wx.chooseImage({
            count: 1,
            success: (res) => {
                var pic = res.tempFilePaths[0];
                wx.navigateTo({
                    url: `/cropper/cropper?pic=${pic}&width=500&height=500`,
                })
            },
        })
    }
})