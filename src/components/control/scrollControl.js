export default class {
  constructor() {
    this.queue = []
  }
  // 添加breakpoint
  watch(data) {
    // data = {
    //   breakpoint: 100,
    //   before() {},
    //   after() {}
    // }
    this.queue.push(data)
  }
  // 事件监听
  listen(e) {
    let scrollTop = e.target.scrollTop
    this.queue.forEach(item => {
      if(!item.breaked && scrollTop > item.breakpoint) {
        item.breaked = true
        item.after && item.after()
      }
      if(item.breaked && scrollTop < item.breakpoint) {
        item.breaked = false
        item.before && item.before()
      }
    })
  }
}
