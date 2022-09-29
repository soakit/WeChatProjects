App({
    onLaunch() {

        wx.getSystemInfo({
            success: res => {

                console.log(res)

                wx.showModal({
                    content: `微信版本：${res.version}\n基础库版本：${res.SDKVersion}\n系统：${res.system}\n机型：${res.model}`,
                    showCancel: false
                })

            }
        })

    }
})
