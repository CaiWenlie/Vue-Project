<template>
<div id="wrapper" class="wrapper" :class="{
  'ios': isIos,
  'android': isAndroid,
  'app': isApp,
  'android-lower': isAndroidLower
  }" @touchstart="touch" @touchend="touchend" @touchmove="touchend" >
  <!-- main view -->
  <div class="container" ref="container">
    <div class="wrap" style="position: relative; height: 100%">
      <transition
        :name="transName"
        v-on:before-enter="transitionStart"
        v-on:after-enter="transitionEnd"
        v-on:enter-cancelled="transitionEnd"
        v-on:before-leave="transitionStart"
        v-on:after-leave="transitionEnd"
        v-on:leave-cancelled="transitionEnd"
      >
        <keep-alive>
          <router-view class="view"></router-view>
        </keep-alive>
      </transition>
    </div>
  </div>

  <!-- 底部导航 -->
  <transition name="fade">

    <ul class="c-flex-row cp-bottom-nav" v-if="showBottomNav">
      <li class="item" :class="{'cur': $route.name == 'home'}" @click="navChange({name: 'home'})">
        <svg-icon icon="icon-shouye_p" v-show="$route.name == 'home'"></svg-icon>
        <svg-icon icon="icon-shouye" v-show="$route.name != 'home'"></svg-icon>
        <p>首页</p>
      </li>
      <li class="item" :class="{'cur': $route.name == 'reservation'}" @click="navChange({name: 'reservation'})">
        <svg-icon icon="icon-yuyue_p" v-show="$route.name == 'reservation'"></svg-icon>
        <svg-icon icon="icon-yuyue" v-show="$route.name != 'reservation'"></svg-icon>
        <p>预约</p>
      </li>
      <li class="item" :class="{'cur': $route.name == 'nursing'}" @click="navChange({name: 'nursing'})">
        <svg-icon icon="icon-zhaohu_p" v-show="$route.name == 'nursing'"></svg-icon>
        <svg-icon icon="icon-zhaohu" v-show="$route.name != 'nursing'"></svg-icon>
        <p>照护</p>
      </li>
      <li class="item" :class="{'cur': $route.name == 'my'}" @click="navChange({name: 'my'})">
        <svg-icon icon="icon-wode_p" v-show="$route.name == 'my'"></svg-icon>
        <svg-icon icon="icon-wode" v-show="$route.name != 'my'"></svg-icon>
        <p>我的</p>
      </li>
    </ul>
  </transition>

  <!-- 页面切换遮罩，防止切换中点击页面空白的bug -->
  <div class="view-cover open" v-show="showCover"></div>

  <!-- loading -->
  <transition name="fade">
    <div class="weui-loading_toast" v-if="loading">
      <div class="weui-mask_transparent"></div>
      <div class="weui-toast loading-toast">
        <i class="weui-loading weui-icon_toast"></i>
        <!-- <p class="weui-toast__content">loading</p> -->
      </div>
    </div>
  </transition>

  <!-- 版本控制 -->
  <version ref="version"></version>

  <!-- 图片预览 -->
  <photo-swipe ref="photoSwipe"></photo-swipe>

  <!-- 列表选择 -->
  <cp-select ref="select"></cp-select>

</div>
</template>
<script type="text/ecmascript-6">
import '@/assets/plugin/iconfont/iconfont.js'

import store from '@/vuex/store.js'
import {browser, isLogin} from '@/util'
import helper from '@/helper'
import version from '@/components/version.vue'
import photoSwipe from '@/components/photoSwipe.vue'
import mapControl from '@/components/control/mapControl'
import {mapGetters, mapMutations} from 'vuex'
import cpSelect from '@/components/cpSelect'
import AppBridge from '@/AppBridge'
import Vue from 'vue'

if(process.env.NODE_ENV !== 'production') {
  // 暴露全局对象
  window.$ = $
  window.moment = moment
  window.helper = helper
}

export default {
  data () {
    return {
      client: process.env.CLIENT,
      allTransName: ['transleft', 'transright', 'scale', 'fade', 'up', 'down', 'abovein', 'aboveout', 'downenter', 'downleave'],
      routeData: {}, // 页面路由传参对象
      hasRouteData: false,
      transName: '',
      isApp: false,
      isIos: browser.v.ios,
      isAndroid: browser.v.android,
      isAndroidLower: browser.v.androidLower,
      isAndroidHigher: browser.v.androidHigher,
      loading: false,
      loadingTimeout: null,
      showCover: false,
      isDev: process.env.NODE_ENV !== 'production',
      eventHub: new Vue(),

      Plugins: {
        FastClick () {
          require(['@/assets/plugin/fastclick.js'], FastClick => {
            FastClick.attach(document.body);
          });
        },
        weui : () => {
          require(['@/assets/plugin/weui/weui.min.js', '@/assets/plugin/weui/weui.min.css'], W => {
            this.Plugins.weui = W.weui  //替换成weui
          })
        },
        Swiper (selector, options, vm) {
          return new Promise((resolve, reject) => {
            require(['@/assets/plugin/swiper/swiper-3.4.1.jquery.min.js', '@/assets/plugin/swiper/swiper-3.4.1.min.css'], Module => {
              if(selector === false) {
                // 仅下载插件
                resolve()
                return
              }
              let Swiper = Module.default
              let swiper = new Swiper(selector, options)
              if(vm) {
                vm.swiper = swiper
              }
              resolve(swiper)
            })
          })
        }
      },

      // APP接口
      AppBridge

    }
  },
  computed: {
    ...mapGetters(['isLogin', 'userInfo', 'currentCustomer']),
    showBottomNav () {
      return this.$route.meta && this.$route.meta.bottom
    },

    viewSize () {
      let w = $(window)
      let base = parseInt($('html').css('font-size'))
      let headerHeight = 50
      let phoneTop = 20
      let navHeight = 50
      if (this.isApp && this.isIos) {
        headerHeight = headerHeight + phoneTop
      }
      return {
        windowHeight: w.height(),
        windowWidth: w.width(),
        headerHeight: headerHeight / 14 * base,
        navHeight: navHeight / 14 * base
      }
    },
    authoritiesArray () {
      if (this.authorities) {
        return this.authorities.split(',')
      } else {
        return []
      }
    }

  },
  store: store, // 在根组件加入 store，让它的子组件和 store 连接
  methods: {
    ...mapMutations([]),
    // 转场动画start
    transitionStart () {
      this.loadingEnd();
      this.showCover = true
    },
    // 转场动画end
    transitionEnd () {
      this.showCover = false
      this.eventHub.$emit('transitionEnd')
    },
    // 公共后退
    back (step = -1, transName, data = {}) {
      // step: 回退步数
      // 参数位移
      if (typeof transName === 'object') {
        // (step, data)
        data = transName
        transName = undefined
      }
      if(typeof step === 'string') {
        // (transName, data)
        transName = step
        step = undefined
      }
      if(typeof step === 'object') {
        // (data)
        data = step
        step = undefined
      }
      // step
      step = step ? step > 0 ? -step : step : -1;

      // 默认后退动画
      this.transName = (transName || transName === '') ? transName : 'transleft'
      // 设置页面参数
      this.routeData = $.extend(true, {}, data) // extend将数据纯净化
      this.hasRouteData = true // 每个页面切换之后会置为false
      // 页面切换
      this.$nextTick(function () {
        this.$router.go(step)
      })
    },
    /* 公共跳转新页面方法
     * 参数：route 路由对象, transName 页面切换动画名, data 非URL传参
     */
    go (route, transName, data = {}) {
      // 参数位移
      if (typeof transName === 'object') {
        data = transName
        transName = undefined
      }
      // 默认切换动画
      this.transName = (transName || transName === '') ? transName : 'transright'

      // 设置页面参数
      this.routeData = $.extend(true, {}, data)
      this.hasRouteData = true
      // 页面切换
      this.$nextTick(function () {
        this.$router.push(route)
      })
    },
    /* 公共替换页面方法
     * 参数：route 路由对象 transName 页面切换动画名, 为空表示没动画 data 非URL传参
     */
    replace (route, transName, data = {}) {
      // 参数位移
      if (typeof transName === 'object') {
        data = transName
        transName = undefined
      }
      // 默认切换动画
      this.transName = (transName || transName === '') ? transName : 'transright'
      // 设置页面参数
      this.routeData = $.extend(true, {}, data)
      this.hasRouteData = true

      // 页面切换
      this.$nextTick(function () {
        this.$router.replace(route)
      })
    },
    // 子页面获取从上个页面传入的参数，非URL参数，一次性
    getRouteData () {
      return this.routeData
    },
    navChange (route) {
      this.go(route, 'fade')
    },

    // 用户权限
    hasRight (authId) {
      return this.authoritiesArray.indexOf(String(authId)) > -1
    },

    // 相册
    openPhotoSwipe (index, items) {
      items = items.map(item => {
        let src, w, h
        src = item.imagePath
        w = item.width
        h = item.height

        return {
          src: src,
          w: w,
          h: h
        }
      })
      this.$refs.photoSwipe.open(index, items)
    },

    loadingStart (delay = 1000) {
      this.showCover = true
      this.loadingCancel()
      this.loadingTimeout = setTimeout(() => {
        this.loading = true
      }, delay);
    },
    loadingEnd () {
      this.showCover = false
      this.loadingCancel()
      this.loading = false
    },
    loadingCancel () {
      if(this.loadingTimeout) {
        clearTimeout(this.loadingTimeout)
        this.loadingTimeout = null
      }
    },

    getTouchedItem (target, selector) {
      target = $(target)
      if (target.is(selector)) {
        return target
      }
      let parents = target.parents(selector)
      if (parents.length) {
        return parents.eq(0)
      } else {
        return $([])
      }
    },
    touch (e) {
      let target = $(e.target)
      if(target.is('a,button,.slide-btn')) {
        return true
      }

      target = this.getTouchedItem(target, 'li,.touch-item')
      if (!target.is('.notouch')) {
        target.addClass('touch')
      }
    },
    touchend (e) {
      let target = $(e.target)
      target = this.getTouchedItem(target, 'li,.touch-item')
      target.removeClass('touch')
    },
    requirePlugins() {

      // FastClick
      this.Plugins.FastClick()

      // weui
      this.Plugins.weui()

    }

  },
  components: {
    version,
    photoSwipe,
    cpSelect
  },
  mounted () {
    var that = this
    this.$router.beforeEach(function (to, from, next) {
      // 清空路由传参
      if (!that.hasRouteData) {
        that.routeData = {}
      }
      // // 登录验证
      // if (!isLogin() && to.path !== '/login' && to.path !== '/register' && to.path !== '/register/find') {
      //   next('/login')
      // } else {
      //   next()
      // }

      next()
    })
    this.$router.afterEach(() => {
      // 默认设置下一页面没有routeData
      that.hasRouteData = false
      // 重置动画
      that.$nextTick(function () {
        that.transName = 'fade'
      })

      // setTimeout(() => {
      //   if(this.showBottomNav) {
      //     $(this.$refs.container).addClass('bottom-nav')
      //   }
      //   else {
      //     $(this.$refs.container).removeClass('bottom-nav')
      //   }
      // }, 400 )

    })

    this.requirePlugins();

  }
}
</script>
