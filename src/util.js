/* eslint-disable */
import Vue from 'vue'
import helper from './helper'

export const isLogin = function() {
  return !!helper.get('token')
}

/* 弹出错误信息
    @param msg `String` 要显示的错误信息
    @param handler `Function` 显示完错误信息之后要执行的函数 - 可选
    @param duration `Number` 错误信息停留的时间（毫秒） - 可选
   Usage:
    toast(res.status.msg, function () {
      // do something...
    }, 1000)
*/
export const toast = function(msg, handler = function() {}, duration = 1000) {
  if(typeof handler !== 'function') {
    duration = handler;
    handler = function() {};
  }
  var tip = new Vue({
    data: {
      msg: msg,
      show: false
    },
    template: '<transition name="scale" v-on:after-leave="destroy" v-on:leave-cancelled="destroy">'
              +'<div class="cp-toast" v-show="show" @click="show=false">'
              +'<table><tr><td><span class="msg" v-html="msg"></span></td></tr></table>'
              +'</div></transition>',
    mounted() {
      this.show = true;
      if (duration != 'forever') {
        setTimeout(() => {
          this.show = false;
        }, duration);
      }
    },
    methods: {
      destroy() {
        this.$destroy(true);
        $(this.$el).remove();
      }
    },
    destroyed() {
      handler();
    }
  });
  $('body').append(tip.$mount().$el)
}


/*获取本周、本月、本年起止日期
 * return {}
 */
export const getNowDate = function() {

  var now = new Date(); //当前日期
  var nowDayOfWeek = now.getDay(); //今天本周的第几天
  var nowDay = now.getDate(); //当前日
  var nowMonth = now.getMonth(); //当前月
  var nowYear = now.getYear(); //当前年
  nowYear += (nowYear < 2000) ? 1900 : 0; //

  //格式化日期：yyyy-MM-dd
  function formatDate(date) {
    var myyear = date.getFullYear();
    var mymonth = date.getMonth() + 1;
    var myweekday = date.getDate();

    if (mymonth < 10) {
      mymonth = "0" + mymonth;
    }
    if (myweekday < 10) {
      myweekday = "0" + myweekday;
    }
    return (myyear + "-" + mymonth + "-" + myweekday);
  }

  //获得某月的天数
  function getMonthDays(myMonth) {
    var monthStartDate = new Date(nowYear, myMonth, 1);
    var monthEndDate = new Date(nowYear, myMonth + 1, 1);
    var days = (monthEndDate - monthStartDate) / (1000 * 60 * 60 * 24);
    return days;
  }



  return {
    nowYearStart: formatDate(new Date(nowYear, 0, 1)),
    nowYearEnd: formatDate(new Date(nowYear, 11, 31)),
    nowMonthStart: formatDate(new Date(nowYear, nowMonth, 1)),
    nowMonthEnd: formatDate(new Date(nowYear, nowMonth, getMonthDays(nowMonth))),
    nowWeekStart: formatDate(new Date(nowYear, nowMonth, nowDay - nowDayOfWeek + 1)),
    nowWeekEnd: formatDate(new Date(nowYear, nowMonth, nowDay + (6 - nowDayOfWeek + 1)))
  }
}


export const browser = {
  v: function() {
    var u = navigator.userAgent,
      app = navigator.appVersion,
      androidLower = function(){
        if(/Android ([\d\.]*)/.test(u)){
          return Number(RegExp.$1) < 4.4;
        }
        return undefined;
      }();
    return { //移动终端浏览器版本信息
      trident: u.indexOf('Trident') > -1, //IE内核
      presto: u.indexOf('Presto') > -1, //opera内核
      webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
      gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
      mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/), //是否为移动终端
      ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
      android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器,
      iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQ HD浏览器
      iPad: u.indexOf('iPad') > -1, //是否iPad
      webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
      androidLower: androidLower === true,
      androidHigher: androidLower === false
    };
  }(),
  language: (navigator.browserLanguage || navigator.language).toLowerCase()
}


// 累加
// sum(a,b,c...)
export const sum = function() {
  let total = 0
  for (var i = 0; i < arguments.length; i++) {
    let value = arguments[i] || 0
    total = total + value
  }
  return total
}

// 数组合并
// combine(a,[b,c]...) => [a,b,c]
export const combine = function() {
  let array = []
  for (var i = 0; i < arguments.length; i++) {
    let target = arguments[i]
    if(helper.isArray(target)) {
      array = array.concat(target)
    }
    else {
      array.push(target)
    }
  }
  return array
}

// 根据经纬度计算距离
export const getDistance = function (lat1, lng1, lat2, lng2) {
  var radLat1 = lat1 * Math.PI / 180.0;
  var radLat2 = lat2 * Math.PI / 180.0;
  var a = radLat1 - radLat2;
  var b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;
  var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
  s = s * 6378.137;
  s = Math.round(s * 10000) / 10000;
  return s
}
