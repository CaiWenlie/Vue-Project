import Vue from 'vue'
import helper from '@/helper'
import dictionary from './dictionary'

// 时间格式化
Vue.filter('format',helper.format);

// number 123,456,789
Vue.filter('number',function(value,format){
    format = format || ',3.2';
    return helper.formatNumber(value,format);
});

// money <100,000  : 100,000.00元
// money >=100,000 : 10.00 万元
Vue.filter('money',function(value,format){
    format = format || ',3.2';
    if(value>=100000){
        value = value/10000;
    }
    return helper.formatNumber(value,format);
});

// money <100,000  : 元
// money >=100,000 : 万元
Vue.filter('unit',function(value,format){
    if(value>=100000){
        return '万元';
    }
    return '元';
});

Vue.filter('birthday', {
  read: function (value, format) {
    if(!value){
      return '';
    }

    var date = '';
    try {
      date = new Date(value);
    } catch (e) {
      console.log(e);
      return '';
    }

    if(!format){
      format = 'MM-dd hh:mm';
      if(date.getFullYear() != new Date().getFullYear()){
        format = 'yyyy-MM-dd hh:mm';
      }
    }


    var o = {
        "M+": date.getMonth() + 1,
        "d+": date.getDate(),
        "h+": date.getHours(),
        "m+": date.getMinutes(),
        "s+": date.getSeconds(),
        "q+": Math.floor((date.getMonth() + 3) / 3),
        "S": date.getMilliseconds()
    };

    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
  },
  write: function(newVal, oldVal) {
    return newVal;
  }
});

/* 高亮
	Usage:
		{{{developer.developerName | highlight(q)}}}
*/
Vue.filter('highlight', function (value, str) {
    new RegExp('(' + str + ')', 'i').test(value);
    var highlight = RegExp.$1;
    return value.replace(new RegExp(highlight), '<span class="text-highlight">' + highlight + '</span>');
});

/* 替换
	Usage:
		{{str | replace('a', 'b')}}
*/
Vue.filter('replace', function (value, a,b) {
    if(value===undefined || value===null){
      return '';
    }
    return String(value).replace(a,b);
});

/* 补零
	Usage:
    {{str | fill(2)}}
		{{str | fill(2,'x')}}
*/
Vue.filter('fill', function (value, length) {
    let array = []
    for (var i = 0; i < length; i++) {
      array.push(0)
    }
    let str = array.join('') + value
    return str.slice(-length)
});


// 根据时间戳返回时分
Vue.filter('getMinutes', function (time) {
  if (time === -1) return ''
  if (time === '') return ''
  if (time === null) return ''
  if (time === undefined) return ''
  let minute = parseInt(time / 3600)
  let second = time % 3600 / 60
  if (minute < 10) minute = "0" + minute
  if (second < 10) second = "0" + second
  return (minute + ':' + second).substring(0, 5)
});

Vue.filter('getWeek', function (val) {
  let week = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
  return week[new Date(val).getDay()]
});

// filter from dictionary
for (let key in dictionary) {
  Vue.filter(key, function (value) {
    let match = dictionary[key].filter(item => item.value == value)[0]
    return match ? match.text : ''
  })
}
