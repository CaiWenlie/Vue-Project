// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import component from './components'
import validate from './validate'
import filter from './filters'
import '@/assets/sass/app.scss'

Vue.config.productionTip = false

/* eslint-disable no-new */
const RootAppConstructor = Vue.extend(App)
new RootAppConstructor({
  el: '#app',
  router
  // template: '<App/>',
  // components: { App }
})
