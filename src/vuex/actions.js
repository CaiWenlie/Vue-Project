import helper from '@/helper'
import AppBridge from '@/AppBridge'
import api from '@/api'
import {toast} from '@/util'

let regionRequest = null
let citiesRequest = null

// 创建一个对象存储一系列我们接下来要写的 mutation 函数
const actions = {
  // ===mutation 的第一个参数是当前的 state
  // ===你可以在函数里修改 state

  // 获取省市区数据
  async fetchRegionData({commit}) {
    if(!regionRequest) {
      regionRequest = api.region()
    }
    let res = await regionRequest
    let data = res.data || []
    return data
  },

  // 获取已开通门店的城市
  async fetchCities({commit, state}) {
    if(state.cities.length) {
      return state.cities
    }
    if(!citiesRequest) {
      citiesRequest = api.shop.cities()
    }
    let res = await citiesRequest
    let cities = res.data || []
    cities = cities.filter(item => item.state == 0 || item.state == 1)
    cities.forEach(item => item.city = item.cityName.replace(/市$/, ''))
    commit('setCities', cities)
    return cities
  },

  // 更新老人信息
  updateCustomerInfo({commit, state}, id) {
    if(!id && !state.currentCustomer.id) return

    return api.customer.detail({
      custId: id || state.currentCustomer.id,
      phone: state.userInfo.mobile
    }).done(res => {
      if(helper.isSuccess(res) && res.data) {
        commit('setCurrentCustomer', res.data)
      }
    })
  },

  // 注册消息推送
  registerDevices({commit, state}) {
    let timeout = null
    let register = function() {
      if(state.registed) return
      AppBridge.registerDevices(state.userInfo.id, () => {
        // toast('注册成功')
        commit('registed')
      }, () => {
        // toast('注册失败')
      })
      setTimeout(register, 1000)
    }
    register()
  }

}

export default actions
