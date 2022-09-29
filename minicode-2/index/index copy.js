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
            return pdata
        }

        const ctx = wx.createCanvasContext('myCanvas');
        await ctx.drawImage('/images/icons/brand2.png', 0, 0)
        await ctx.draw()

        const cfg = {
            x: 0,
            y: 0,
            width: 64,
            height: 64,
        }
        setTimeout(async () => {
            await wx.canvasGetImageData({
                canvasId: 'myCanvas',
                ...cfg,
                success: (res) => {
                    console.log('res/data', res)
                    const data = changeColor(res.data, [0, 0, 0], [0, 0, 255])
                    wx.canvasPutImageData({
                        canvasId: 'myCanvas',
                        data,
                        ...cfg,
                        success: (res) => {
                            console.log(res)
                        },
                        fail: (err) => {
                            console.error(err)
                        }
                    }) 
                },
                fail: (err) => {
                    console.error(err)
                }
            });
        }, 200);

        // wx.setTabBarItem({
        //   index: 1,
        //   text: "商家",
        //   iconPath: "https://static.ttkuan.com/supplier/2019-01-14/0d942c4da40f23695e9c375ddf31b721.jpg?x-oss-process=image/resize,h_81",
        //   selectedIconPath: "https://static.ttkuan.com/supplier/2019-01-14/0d942c4da40f23695e9c375ddf31b721.jpg?x-oss-process=image/resize,h_81"
        // })
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