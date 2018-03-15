import helper from '@/helper'

// 创建一个对象存储一系列我们接下来要写的 mutation 函数
const mutations = {
  // ===mutation 的第一个参数是当前的 state
  // ===你可以在函数里修改 state

  // 登录状态
  setLogin (state, isLogin) {
    state.isLogin = isLogin
  },

  // 账户信息（退出登录时不清除）
  setAccount(state, account) {
    state.account = account
    helper.setJson({account});
  },

  // 个人信息
  setUserInfo (state, userInfo) {
    state.userInfo = userInfo;
    helper.setJson({userInfo});
  },

  // 更新个人信息
  updateUserInfo (state, userInfo) {
    userInfo = $.extend({}, state.userInfo, userInfo)
    state.userInfo = userInfo;
    helper.setJson({userInfo});
  },

  // 亲属端 老人信息
  setCurrentCustomer (state, customer) {
    state.currentCustomer = customer
    helper.setJson({'currentCustomer': customer})
  },

  // 亲属端 门店信息
  setCurrentShop (state, shop) {
    state.currentShop = shop
    helper.setJson({'currentShop': shop})
  },

  // 设置医护端老人档案
  setCurrentOldMan (state, OldMan) {
    state.currentOldMan = OldMan
    helper.setJson({'currentOldMan': OldMan})
  },

  // 医护端 当前提醒
  setCurrentRemind (state, Remind) {
    state.currentRemind = Remind
    helper.setJson({'currentRemind': Remind})
  },

  // 定位信息
  setLocation (state, location) {
    // location = {
    //   point: 经纬度
    //   address: 定位地址 {province, city, district}
    //   select: 客户选择的城市 {province, city, district}
    // }
    location = $.extend({}, state.location, location)
    state.location = location
    helper.setJson({location})
  },

  // 消息推送注册成功
  registed(state) {
    state.registed = true
  },

  // 清空登录信息
  clearVuex (state) {
    state.userInfo = {}
    state.registed = false
    helper.remove(['token', 'userInfo']);
  },

  // 城市列表
  setCities(state, cities) {
    state.cities = cities
  }

}

export default mutations
