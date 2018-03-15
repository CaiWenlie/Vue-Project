/* eslint-disable */
import Vue from 'vue'
import Vuex from 'vuex'
import helper from '@/helper.js'
import getters from '@/vuex/getters.js'
import mutations from '@/vuex/mutations.js'
import actions from '@/vuex/actions.js'

//使用vuex
Vue.use(Vuex)


// 创建一个对象来保存应用的状态
const state = {
  registed: false,
  isLogin: !!helper.get('token'),
  account: helper.getJson('account'),
  userInfo: helper.getJson('userInfo'),
  currentCustomer: helper.getJson('currentCustomer'),
  currentShop: helper.getJson('currentShop'),
  currentRemind: helper.getJson('currentRemind'),
  currentOldMan: helper.getJson('currentOldMan'),
  location: helper.getJson('location'),
  cities: []
}


// 整合初始状态和变更函数，我们就得到了我们所需的 store
export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
