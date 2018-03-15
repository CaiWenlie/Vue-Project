import {toast, browser} from '@/util'

export default {
  getPictures(success, fail, maxcount) {
    // res : path[]
    // src : "file:// ,"+ path[i]
    try {
      PhotoPickerPlugin.getPictures(success, fail, maxcount)
    } catch (e) {
      // toast(e, () => {}, 3000)
    }
  },
  checkGPSServer(success, fail) {
    try {
      GPSPlugin.checkGPSServer(success, fail)
    } catch (e) {
      // toast(e, () => {}, 3000)
    }
  },
  jumpToSetGPS(success, fail) {
    try {
      GPSPlugin.jumpToSetGPS(success, fail)
    } catch (e) {
      // toast(e, () => {}, 3000)
    }
  },
  setStatusBar(status) {
    // status=0黑字  status=1白字
    // ios only
    if (!browser.v.ios) {
      return
    }
    var success = ()=>{},
        fail = ()=>{}
    try {
      Tools.updateAppStatusStyle(success,fail,status)
    } catch (e) {
      // toast(e, () => {}, 3000)
    }
  },
  copyToPasteboard(pasteInfo, success = () => {}, fail = () => {}) {
    try {
      SHMToolsPlugin.copyToPasteboard(success, fail, pasteInfo)
    } catch (e) {

    }
  },
  openMap(latitude, longitude, success = () => {}, fail = () => {}) {
    try {
      SHMToolsPlugin.skipToMap(success, fail, latitude, longitude)
    } catch (e) {

    }
  },
  // 注册消息推送
  registerDevices(userId, success = () => {}, fail = () => {}) {
    try {
      SHMToolsPlugin.registerDevices(success, fail, userId)
    } catch (e) {
      // toast('异常：'+JSON.stringify(e))
    }
  }

}
