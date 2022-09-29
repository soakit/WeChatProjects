

Page({
    onReady() {},

    openAndDraw() {
        // const ctx = wx.createCanvasContext('canvasIn', this);
        // ctx.drawImage('/images/icons/brand2.png', 0, 0)
        // ctx.draw()
        /* wx.chooseImage({
          success: (res) => {
            const ctx = wx.createCanvasContext('canvasIn', this);
            console.log(res.tempFilePaths[0])
            ctx.drawImage('/images/icons/brand2.png', 0, 0)
            ctx.draw()
          }
        }) */
    },

    export () {
        wx.canvasToTempFilePath({
            canvasId: 'canvasOut',
            success: (res) => {
                wx.saveImageToPhotosAlbum({
                    filePath: res.tempFilePath,
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
        }, this)
    },

    async process() {

        function changeColor(pdata, beforeColor, afterColor) {
            for (var j = 0; j < pdata.length; j += 4) {
                if (pdata[j] === beforeColor[0]) pdata[j] = afterColor[0];
                if (pdata[j + 1] === beforeColor[1]) pdata[j + 1] = afterColor[1];
                if (pdata[j + 2] === beforeColor[2]) pdata[j + 2] = afterColor[2];
            }
            return pdata
        }

        const ctx = wx.createCanvasContext('canvasIn', this);
        await ctx.drawImage('/images/icons/brand2.png', 0, 0)
        await ctx.draw()

        const cfg = {
            x: 0,
            y: 0,
            width: 64,
            height: 64,
        }
        await wx.canvasGetImageData({
            canvasId: 'canvasIn',
            ...cfg,
            success: (res) => {
                console.log('res/data', res)
                const data = changeColor(res.data, [0, 0, 0], [0, 0, 255])
                wx.canvasPutImageData({
                    canvasId: 'canvasOut',
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
        })
    }
})