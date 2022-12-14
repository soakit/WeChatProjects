Page({
  data: {
    appear: false
  },
  onLoad() {
    this._observer = wx.createIntersectionObserver(this, {observeAll: true})
    this._observer
      .relativeTo('.scroll-view')
      .observe('.ball', (res) => {
        console.log(res);
        this.setData({
          appear: res.intersectionRatio > 0
        })
      })
  },
  onUnload() {
    if (this._observer) this._observer.disconnect()
  }
})
