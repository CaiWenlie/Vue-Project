<!--
  列表
    @title 页面标题
    @api 页面初始化列表的API
    @type 调用API的type
    @params 调用API传递的参数
  Usage:
  <li class="form-select" @click="$root.go({ name: 'selectList' }, { name: '', title: '合作模式', api: 'api/v1/dictionary/getDictByType', type: 'get', params: { type: 'COPTMD' } })"></li>
-->
<template>
  <div class="view-developer-search">
    <div class="cp-topper"></div>
    <div class="cp-inner">
        <span class="back" @click="$root.back('')">返回</span>
        <h1>{{title}}</h1>
    </div>
    <div class="view-content" v-on:scroll="scroll">
      <div v-if="list.length > 0" class="search-list">
        <ul>
          <li v-for="item in list" v-on:click="choose(item, $index)">
            {{item.paraValue}}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">

import helper from '../modules/helper'
import rest from '../modules/rest'
import {toast} from '../modules/util'

export default {

  //==数据配置===
  data() {
    return {
      list: [],
      title: ''
    }
  },
  methods: {
    scroll() {

    },
    choose(item, index) {
      var routeData = this.$root.getRouteData();
      var _p = routeData.params || {};
      var _t = _p.type, _data = {};
      switch(_t) {
        case 'PROTYP':
          _data = { type: item.paraCode, typeLabel: item.paraValue };
          break;
        case 'COPTMD':
          _data = { cooperationMode: item.paraCode, cooperationModeLabel: item.paraValue };
          break;
        default:
          _data = {item: item, index: index, from: routeData.name};
          break;
      }
      this.$root.back(_data);
    }
  },
  events: {

  },
  computed: {

  },

  //==路由配置===
  route: {
    data() { //获取数据
      var routeData = this.$root.getRouteData(), _this = this;
      this.title = routeData.title;
      // 刷新页面会导致routeData丢失
      if (!routeData.type && !routeData.list) return this.$root.back('');

      if (routeData.type) {
          // 获取列表
          rest[routeData.type](routeData.api, routeData.params).done(function (res) {
            console.log(res);
            if (helper.isSuccess(res)) {
              _this.list = res.data;
            } else {
              toast(res.status.msg);
            }
          })
      } else if (routeData.list) {
        this.list = routeData.list;
      }
      
    }
  },

  components: {

  },

  created() {},

  compiled() {},

  destroyed() {}
}
</script>
