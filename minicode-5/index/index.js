// index.js
// 获取应用实例
const app = getApp()

Page({
    data: {
        scrollViewInstance: null,
        viewportWidth: 0,
        gradientWidth: 0
    },
    onReady() {

        wx.createSelectorQuery()
            .selectViewport()
            .boundingClientRect(rect => {
                this.setData({
                    viewportWidth: rect.width
                })
            }).exec()

        wx.createSelectorQuery()
            .select('#gradient')
            .boundingClientRect(rect => {
                this.setData({
                    gradientWidth: rect.width
                })
            }).exec()

        wx.createSelectorQuery()
            .select('#carousel')
            .node()
            .exec((res) => {
                const scrollViewInstance = res[0].node

                console.log('scroll view instance', scrollViewInstance)

                this.setData({
                    scrollViewInstance
                })
            })

    },
    scroll() {

        const fullScrollLength = this.data.gradientWidth - this.data.viewportWidth

        wx.createSelectorQuery()
            .select('#carousel')
            .scrollOffset(res => {

                console.log('scroll view instance', scrollViewInstance, res)
                const scrollViewInstance = res

                scrollViewInstance.scrollTo({
                    left: res.scrollLeft !== fullScrollLength ? fullScrollLength : 0,
                    animated: true,
                    duration: 300
                })

            }).exec()

    }

})
