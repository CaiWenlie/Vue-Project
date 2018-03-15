/* eslint-disable */

import rest from '@/rest'

export default {
  login: {
    login: process.env.API + '/login',
    isLogin() {
      return rest.get('/isLogin')
    },
    logOut() {
      return rest.post('/logout')
    },
    sms(data) {
      return rest.post('/sendSms', data)
    }
  },
  home: {

  }

}
